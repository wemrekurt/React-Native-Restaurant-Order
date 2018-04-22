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
import About from './src/components/About';
import Order from './src/components/Order';
import Information from './src/components/Information';


const MenuStack = StackNavigator({
  Menu: { screen: MenuList },
  Basket: { screen: Basket },
  Products: {screen: Products},
  Order: { screen: Order }
});


export default TabNavigator(
  {
    Anasayfa: { screen: Home },
    MenuList: { screen: MenuStack },
    About: { screen: About },
    Information: { screen: Information }
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
        }else if (routeName === 'About' || routeName === 'Hakkımızda') {
          iconName = `ios-information${focused ? '-circle' : ''}`;
        }else if (routeName === 'Information') {
          iconName = `ios-pin${focused ? '' : '-outline'}`;
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