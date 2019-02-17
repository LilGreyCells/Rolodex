import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class SplashScreen extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          fadeValue: new Animated.Value(0),
          noFadeValue: new Animated.Value(1)
      }
  }

  componentDidMount(){
    Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 2000,
      }).start();
  }

  render() {
    return (
      <SafeAreaView style = {{ flex:1 }}>
        <View style={styles.container}>
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