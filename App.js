import React, {Component} from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './src/components/Game'
import LeaderBoard from './src/components/LeaderBoard'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {getData} from './src/components/LeaderBoard';


function GameScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Leader board"
        onPress={() => {
          navigation.navigate('leaderBoard')
        }}
      />
      <Game/>
    </View>
  );
}


function ScoresScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go back to the game!"
        onPress={() => navigation.navigate('Simon')}
      />
      <LeaderBoard/>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen name = 'Simon' component={GameScreen} />
        <Stack.Screen name="leaderBoard" component={ScoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
