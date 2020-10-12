import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: 'Hey There!',
    }
  }

  onClick = () => {
    loadGreeting().then(g => this.setState({name:g+" :-)"}))
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.nameText}>{this.state.name}</Text>
        <Button color='#4169E1' onPress={() => {this.onClick()}} title='Click me'> </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 38,
    padding: 15,
  }
});
async function loadGreeting() {
  var graphql = JSON.stringify({
  query: "{  get(type: greeting, id: \"01EM92HHJVZNFCRB1JPG9K02VD\"){    ... on greeting {      hypi{        id        created        updated      }      greeting    }  }}",
  variables: {}
})
   const response =  await fetch('https://api.hypi.app/graphql', {
      method:'POST',
      headers:{'content-type':'application/json','Authorization': 'eyJhbGciOiJSUzI1NiJ9.eyJoeXBpLmluc3RhbmNlIjp7InJlYWxtIjoibWFuaXNoYXNwIiwibmFtZSI6InN0b3JlIiwicmVsZWFzZSI6ImxhdGVzdCJ9LCJoeXBpLmxvZ2luIjp0cnVlLCJoeXBpLnB1cnBvc2UiOiJsb2dpbiIsImh5cGkudXNlcm5hbWUiOiJtYW5pc2hhQHRla2J1ZHMuY29tIiwiYXVkIjoibWFuaXNoYXNwIiwiaWF0IjoxNjAyMjQ4MTY5LCJleHAiOjE2MDQ4NDAxNjksInN1YiI6IjAxRU02UFhHTUEwR1ZRN1Q5TlpQQVlKOFozIiwibmJmIjoxNjAyMjQ4MTY5fQ.H7AykAvhLxJtR7YgUyq7gYfK5sQRkRRXdicaVJnZ6_4i0LdMBFCsdugHCDHE7YvFtAhbLj3Q4_LuxZFvmR0MGtiEHx3uCefY3GCYYiHeBDiObcxp8hS_zJgNf6NN1eIf8ZGu1hZ8ulRegO5_2xb3yRp6FJiPgCM7pLJKCcTVsQZqdhYPPeF3I6B4A2NV0ZxzUpgomYio_jnhqMH0V4-3HO6zYSgP2Q29DNVYwdYG_45ggTYcCrOTDGHXlD_-hmeo-QxSzob1vWOl263bzdDf1wUjDBF0EMyGWg1OZgDI3gKkT7UthMgwmOJWG_k7DkIINz6Ned-cpBL_-t0lYbVTQA','hypi-domain': 'alpha.react-native-graphql.com'},
      body:graphql
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.get.greeting;

}
