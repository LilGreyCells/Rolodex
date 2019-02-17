import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

export default class AccountScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      deviceName: DeviceInfo.getDeviceName()
      // phoneNumber: DeviceInfo.getPhoneNumber(),
    }
    console.log(deviceInfo.getDeviceName());
    // const deviceName = DeviceInfo.getDeviceName();
    // const phoneNumber = DeviceInfo.getPhoneNumber();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* console.log(deviceInfo.getDeviceName()) */}
        {/* <Text>{this.state.deviceName}</Text>
        <Text>{this.state.phoneNumber}</Text> */}
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

