import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator,createAppContainer} from 'react-navigation';
import ScanScreen from './ScanScreen';

import AccountScreen from './AccountScreen';
import ContactScreen from './ContactScreen';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const tabNavigator= createBottomTabNavigator({
  Scan: ScanScreen,
  Contact: ContactScreen,
  Account: AccountScreen
});

export default createAppContainer(tabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
