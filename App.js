import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from './src/Component/Color';

import HomeScreen from './src/HomeScreen.js';
import Web from './src/Web.js';
import Rank from './src/Rank';
import NewsScreen from './src/NewsScreen';

const HomeStack = createStackNavigator();
const Home = () => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="WebScreen" component={Web} />
    </HomeStack.Navigator>
  )
};


const TabsScreen = createMaterialBottomTabNavigator()
const Tab = () => {
  return (
    <TabsScreen.Navigator
      barStyle={{ backgroundColor: '#fff' }}
      activeColor={Colors.blue}>

      <TabsScreen.Screen name="HomeScreen" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={22} />
          ),
        }} />

      <TabsScreen.Screen name="Top Covid19" component={Rank}
        options={{
          tabBarLabel: 'Rank',
          tabBarIcon: ({ color }) => (
            <Feather name="activity" color={color} size={22} />
          ),
        }} />

      <TabsScreen.Screen name="News" component={NewsScreen}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" color={color} size={22} />
          ),
        }} />
    </TabsScreen.Navigator>
  )
}


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab />
      </NavigationContainer>
    );
  }
}
