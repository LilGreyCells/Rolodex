import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ContactScreen from './ContactScreen';
import ScanScreen from './ScanScreen';

export default class SplashScreen extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          fadeValue: new Animated.Value(0),
          noFadeValue: new Animated.Value(1)
      }
  }

  componentDidMount(){
    // this.timeoutHandle = setTimeout(() => {
    //     this.setState({ component: <ScanScreen />})
    // }, 5000);
    Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 3000,
    }).start();
  }

  render() {
    return (
      <SafeAreaView style = {{ flex:1 }}>
        <View style={styles.container}>
            {/* this.state.component(); */}
            <Text style = {styles.titleTextStyle}>Rolodex</Text>
            <Animated.View style = {[{opacity: this.state.fadeValue}]}>
                <Animated.Image
                    source = {require('./images/qrcode.png')}
                    // onLoad = {this._fadeAnimation}
                />
            </Animated.View>
        </View>
      </SafeAreaView>  
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
  titleTextStyle: {
    fontSize: responsiveFontSize(7),
    fontFamily: 'HelveticaNeue-Thin',
    color: '#C79A00',
    paddingBottom: 70
  }
});