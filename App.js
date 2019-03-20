import React from 'react';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { flipX, flipY } from 'react-navigation-transitions';
import SplashScreen from './SplashScreen';
import ScanScreen from './ScanScreen';
import AccountScreen from './AccountScreen';
import ContactScreen from './ContactScreen';
import ContactDetailScreen from './ContactDetailScreen';
import InputInformation from './InputInformation';

const tabIcon = (tintColor, name) => {
  return (
    <Icon 
        name = {name}
        type = 'MaterialCommunityIcons' 
        size = {30} 
        color = {tintColor}
    />
  )
}

const Scan = createBottomTabNavigator({
  Scan: {
    screen: ScanScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => tabIcon(tintColor, 'camera'),
    }
  },
  Contact: createStackNavigator({
    ContactMain: {
      screen: ContactScreen,
      navigationOptions:{
        header: null,
      }
    },
    ContactDetail: ContactDetailScreen,
  },{
    navigationOptions: {
      tabBarIcon: ({tintColor}) => tabIcon(tintColor, 'contacts')
    },
    initialRouteName: 'ContactMain'
  }),
  Account: createStackNavigator({
    AccountInner: AccountScreen,
    InfoEdit: InputInformation
  }, {
    headerMode: 'none',
    navigationOptions: {
      tabBarIcon: ({tintColor}) => tabIcon(tintColor, 'account')
    },
    initialRouteName: 'AccountInner'
  }),
}, {
  tabBarOptions: {
    showLabel: true,
    activeTintColor: '#4F352D',
    inactiveTintColor: '#804F352D',
    style: {
      backgroundColor: '#FFD54F',
      height: responsiveHeight(8),
    },
  },
})

const splash = createStackNavigator({
  Splash: SplashScreen,
  Info: InputInformation,
  Scan: Scan,
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
})

export default createAppContainer(splash);