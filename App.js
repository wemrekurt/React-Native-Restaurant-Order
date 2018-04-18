/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { Component } from 'react';
import {
  TabNavigator,
  StackNavigator,
  TabBarBottom
} from 'react-navigation';
import Home from './src/components/Home';
import MenuList from './src/components/MenuList';
import Basket from './src/components/Basket';
import Products from './src/components/Products';

const MenuStack = StackNavigator({
  Menu: { screen: MenuList },
  Basket: { screen: Basket },
  Products: {screen: Products}
});


export default TabNavigator(
  {
    Anasayfa: { screen: Home },
    MenuList: { screen: MenuStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Anasayfa') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Menu' || routeName === 'MenuList') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);