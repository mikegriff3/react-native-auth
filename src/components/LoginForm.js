import React, { Component } from 'react';
import { Text } from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

export default class LoginForm extends Component{

  state = {
    email: "",
    password: "",
    error: "",
    loading: false
  }

  onButtonPress(){
    const {email, password} = this.state;

    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
      })
  }

  onLoginSuccess(){
    this.setState({email: "", password: "", loading: false, error: ""})
  }

  onLoginFail(){
    this.setState({error: "Authentication Failed", loading: false})
  }

  renderButton(){
    if (this.state.loading){
      return (
        <Spinner size='small'/>
      );
    }

    return (
        <Button onPress={this.onButtonPress.bind(this)}>Log In</Button>
      );
  }

  render(){
    return (
      <Card>
      <CardSection>
        <Input 
        label="Email"
        placeholder="user@gmail.com"
        value={this.state.email}
        autoCapitalize="none"
        onChangeText={email => {this.setState({email})}}/>
      </CardSection>
      <CardSection>
        <Input
          label="Password"
          placeholder="password"
          value={this.state.password}
          secureTextEntry
          onChangeText={password => {this.setState({password})}}/>
      </CardSection>
      <Text style={{fontSize: 20, alignSelf: 'center', color: 'red'}}>{this.state.error}</Text>
      <CardSection>
        {this.renderButton()}
      </CardSection>
      </Card>
    );
  }
} 