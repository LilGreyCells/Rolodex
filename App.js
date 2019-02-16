import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from './SplashScreen';
import ScanScreen from './ScanScreen';
import AccountScreen from './AccountScreen';
import ContactScreen from './ContactScreen';
// import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const routeNavigator = createStackNavigator(
  {
    Splash: {screen: SplashScreen},
    tabNav: {screen: Scan}
  },
  {
    initialRouteName: 'Splash',
  }
)

const tabNavigator = createBottomTabNavigator({
  Scan: ScanScreen,
  Contact: ContactScreen,
  Account: AccountScreen
});

export default createAppContainer(routeNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
