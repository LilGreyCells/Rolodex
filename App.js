import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from './SplashScreen';
import ScanScreen from './ScanScreen';
import AccountScreen from './AccountScreen';
import ContactScreen from './ContactScreen';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView style = {{ flex:1 }}>
        <View style={styles.container}>
          {/* <Text>Open up App.js to start working on your app!</Text> */}
          <SplashScreen />
        </View>
      </SafeAreaView>
    );
  }
}

// const splash = createStackNavigator(
//   {
//     Splash: {screen: SplashScreen, navigationOptions: {header: null}},
//     Scan: {screen: ScanScreen, navigationOptions: {header: null}},
//   },
//   {
//     initialRouteName: 'Splash',
//   }
// );

const splash = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'Splash',
  }
);

const tabNavigator = createBottomTabNavigator(
  {
    Scan: {
      screen: ScanScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon 
          name = 'camera' 
          type = 'MaterialCommunityIcons' 
          size = {30} 
          color = {tintColor} />
        )
      }
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon 
          name = 'contacts' 
          type = 'MaterialCommunityIcons' 
          size = {30} tin
          color = {tintColor}/>
        )
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
          name = 'account' 
          type = 'MaterialCommunityIcons' 
          size = {30} 
          color = { tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions : {
      showLabel: true,
      activeTintColor: '#4F352D',
      inactiveTintColor: '#804F352D',
      style: {
        backgroundColor: '#FFD54F',
        height: responsiveHeight(8),
      }
    }
  },
  {
    initialRouteName : 'Scan',
  }
);

export default createAppContainer(tabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
