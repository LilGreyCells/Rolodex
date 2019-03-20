import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Animated, AsyncStorage } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default class SplashScreen extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          fadeValue: new Animated.Value(0),
      }
      // AsyncStorage.clear()
  }

  componentDidMount(){
    Animated.timing(
      this.state.fadeValue, {
        toValue: 1,
        duration: 2000,
      }
    ).start();
    this.navToScreen();
  }

  navToScreen = async () => {
    let personalData = await AsyncStorage.getItem('personalData')
    if(personalData) {
      personalData = JSON.parse(personalData)
        setTimeout(() => {
          this.props.navigation.navigate('Scan')
        }, 2000);
    }
    else{
      setTimeout(() => {
        this.props.navigation.navigate('Info')
      }, 2000);
    }
  };

  render() {
    return (
      <SafeAreaView style = {{ flex:1 }}>
        <View style={styles.container}>
            <Text style = { styles.titleTextStyle}>Rolodex</Text>
            <Animated.View style = {[{opacity: this.state.fadeValue}]}>
                <Image
                  source = {require('./images/qrcode.png')}
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