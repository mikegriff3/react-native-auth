import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import {Header, Button, Spinner} from './components/common';
import LoginForm from "./components/LoginForm";

export default class App extends Component{

  state = {loggedIn: null}

  componentWillMount(){
    firebase.initializeApp({
    apiKey: "AIzaSyAiQLxJIGyymTJdWfYrUgCzhhGNLRG3Phc",
    authDomain: "auth-9a6da.firebaseapp.com",
    databaseURL: "https://auth-9a6da.firebaseio.com",
    projectId: "auth-9a6da",
    storageBucket: "auth-9a6da.appspot.com",
    messagingSenderId: "322852644443"
  });

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({loggedIn: true})
      }else {
        this.setState({loggedIn: false})
      }
    })
  }

  renderForm(){

    switch(this.state.loggedIn){
      case true:
        return (
        <View style={{flexDirection: 'row', paddingTop: 10}}>
        <Button onPress={() => {firebase.auth().signOut()}}>
          Log Out
        </Button>
        </View>
      );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={{paddingTop: 30}}>
          <Spinner/>
          </View>
          );
    }
  }

  render (){
    return (
      <View>
      <Header headerText="Auth"/>
      {this.renderForm()}
      </View>
    );
  }
}