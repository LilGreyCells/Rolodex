import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';


export default class AccountScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>AccountScreen</Text>
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
});

