import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ScrollView, TextInput, AsyncStorage } from 'react-native';
import {Contacts, Permissions, BarCodeScanner} from 'expo';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class ScanScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      modalVisible: false,
      message: null
    };
  }

  setModalVisible(visible){
    this.setState({modalVisible: visible});
  }

  async componentWillMount(){
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  onBarCodeScanned = (scannedCode) => {
    scannedCode = JSON.parse(scannedCode.data);
    this.setState({
      firstName: scannedCode.firstName,
      lastName: scannedCode.lastName,
      phoneNumber: scannedCode.phoneNumber,
      email: scannedCode.email,
    })
    this.setModalVisible(true);
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  saveOrCancel = async (option) => { 
    this.setState({
      message: null
    })
    if (option === 'save'){

      let peopleData = await AsyncStorage.getItem('peopleData');
      peopleData = JSON.parse(peopleData);
      if (peopleData === null){
        peopleData = []
      }

      let numPresent = false;
      for (let i=0; i < peopleData.length; i++){
        if (this.state.phoneNumber === peopleData[i].phoneNumber){
          numPresent = true;
          break;
        }
      }
      
      if (numPresent === false){
        peopleData.push({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
        })
  
        await AsyncStorage.setItem('peopleData', JSON.stringify(peopleData))
        this.saveToPhone()
        setTimeout(() => {
          this.setModalVisible(!this.state.modalVisible);
        },2000)
      }
      else{
        this.notify(true, 'Contact is already saved!')
      }

    }
    else{
      setTimeout(() => {
        this.setModalVisible(!this.state.modalVisible);
      },2000)
    }
  }

  saveToPhone = async () => {
    const contact = {
      [Contacts.Fields.FirstName]: this.state.firstName,
      [Contacts.Fields.LastName]: this.state.lastName,
      [Contacts.Fields.PhoneNumbers]: [{
        number: this.state.phoneNumber,
        isPrimary: true,
      }],
      [Contacts.Fields.Emails]: [{
        email: this.state.email,
        isPrimary: true,
        label: 'home'
      }],
    }
    Contacts.addContactAsync(contact);
    this.notify(false, 'Contact saved to phone!')
  }

  notify = (isError, text) => {
    this.setState({
      message: {
        isError: isError,
        text: text,
      }
    }, () => {
      setTimeout(() => {
        this.setState({
          message: null
        })
      },2000)
    })
  }

  // componentWillUnmount(){
  //   console.log('Unmounting Camera')
  //   window.removeEventListener('beforeunload', this.componentGracefulUnmount);
  // }
  
  render() {
    const {hasCameraPermission} = this.state;
    if (hasCameraPermission === null){
      return <View />
    }
    else if (hasCameraPermission === false){
      return <Text>No access to camera</Text>;
    }
    else{
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner 
            style = {{flex:1}}
            onBarCodeScanned = {this.onBarCodeScanned}
          />

          <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
            <View style={{ marginTop: 22, flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000099' }}>
              <View style = { styles.modalView }>
                <View style = {{ flex:1 }}>
                  <ScrollView>
                    {this.state.message ? (
                      <View style={{flex: 1, backgroundColor: this.state.message.isError ? 'red' : 'green'}}>
                        <Text style={{textAlign: 'center', color: 'white', height: responsiveHeight(4), fontSize: responsiveFontSize(2)}}>{this.state.message.text}</Text>
                      </View>
                    ) : (
                      null
                    )}
                    <TextInput
                      style={[styles.textInputStyle, {marginTop: responsiveHeight(9), fontSize: responsiveFontSize(3)}]}
                      value={`${this.state.firstName} ${this.state.lastName}`}
                      onChangeText={(text) => {
                        var names = text.split(' ')
                        this.onChangeText('firstName', names[0])
                        this.onChangeText('lastName', names[1])
                      }}
                    />
                    <TextInput
                      style={styles.textInputStyle}
                      value={this.state.phoneNumber}
                      onChangeText={(text) => {
                        this.onChangeText('phoneNumber', text)
                      }}
                    />
                    <TextInput
                      style={styles.textInputStyle}
                      value={this.state.email}
                      onChangeText={(text) => {
                        this.onChangeText('email', text)
                      }}
                    />
                  </ScrollView>
                </View>

                <View style = {{ flexDirection: 'row', justifyContent: 'center' }}>  
                  <View style={[styles.buttonView, {borderBottomLeftRadius: 10}]}>
                    <TouchableOpacity onPress={() => this.saveOrCancel('save')}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                  </View>                    
                  <View style={[styles.buttonView, {borderBottomRightRadius: 10}]}>
                    <TouchableOpacity onPress={() => this.saveOrCancel('cancel')}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: responsiveWidth(70),
    height: responsiveHeight(50),
    marginBottom: responsiveHeight(8),
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOffset:{  width: 0,  height: 0.5  },
    shadowColor: 'white',
    shadowOpacity: 0.5,
  },
  textInputStyle: {
    color: '#4F352D',
    fontSize: responsiveFontSize(2.5),
    marginTop: responsiveHeight(3.5),
    marginBottom: responsiveHeight(3.5),
    paddingBottom: responsiveHeight(0.1),
    flexWrap: 'wrap',
    textAlign: 'center',
    borderBottomWidth: 0.25,
    marginLeft: responsiveWidth(6),
    marginRight: responsiveWidth(6),
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F352D',
    height: responsiveHeight(5.5),
  },
  buttonText: {
    color: 'white',
    fontSize: responsiveFontSize(2.5),
  }
});