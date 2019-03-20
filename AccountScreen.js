import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, AsyncStorage, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AntIcon from "react-native-vector-icons/AntDesign";
import qRCode from './Components/QRCodeGenerator';

export default class AccountScreen extends React.Component {  
  constructor(props){
    super(props)
    this.state = {
      myFirstName: '',
      myLastName: '',
      myPhoneNumber: '',
      myEmail: ''
    }
    this.getPersonalData()
  }

  getPersonalData = async() => {
    let personalData = await AsyncStorage.getItem('personalData');
    personalData = JSON.parse(personalData);
    this.setState({
      myFirstName: personalData.myFirstName,
      myLastName: personalData.myLastName,
      myPhoneNumber: personalData.myPhoneNumber,
      myEmail: personalData.myEmail
    })
  }

  render() {
    return (
      <SafeAreaView style = {{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.detailsView}>
            <Text style={[styles.detailsViewText, {fontSize: responsiveFontSize(4)}]}>{this.state.myFirstName} {this.state.myLastName}</Text>
          </View>
          <View style={styles.detailsView}>
            <Text style={styles.detailsViewText}>{this.state.myPhoneNumber}</Text>
          </View>
          <View style={styles.detailsView}>
            <Text style={styles.detailsViewText}>{this.state.myEmail}</Text>
          </View>
          <View style={styles.detailsView}>
            {qRCode.generateQRCode(this.state.myFirstName, this.state.myLastName, this.state.myPhoneNumber, this.state.myEmail)}
          </View>
          {/* <View style = { styles.editIcon }>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate('InfoEdit', {refresh: this.getPersonalData, editMode: true})}>
              <Image
                style = {{ width: 45, height: 45 }}
                source = {require('./images/edit.png')}
              />
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.editIcon}>
          <TouchableOpacity onPress = {() => this.props.navigation.navigate('InfoEdit', {refresh: this.getPersonalData, editMode: true})}>
            <View>
              <AntIcon 
                style = {{}}
                name = 'edit'
                size = {30}
                color = '#4F352D' // brown
              />
            </View>
          </TouchableOpacity>
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
  detailsView: {
    marginTop: 20,
    marginBottom: 20,
  },
  detailsViewText: {
    fontSize: responsiveFontSize(3),
    color: '#4F352D', // brown
  },
  editIcon: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
    shadowColor: '#4F352D',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 2},
  }
});