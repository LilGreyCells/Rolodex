import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, ScrollView, TextInput, AsyncStorage } from 'react-native';
import {Permissions, BarCodeScanner} from 'expo';
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
      error: null
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
      error: null
    })
    console.log('SaveOrCancel Started')
    if (option === 'save'){
      console.log('SaveOrCancel The option is save')

      let peopleData = await AsyncStorage.getItem('peopleData');
      peopleData = JSON.parse(peopleData);
      if (peopleData === null){
        peopleData = []
      }
      console.log('SaveOrCancel This is the data', peopleData)

      let numPresent = false;
      for (let i=0; i < peopleData.length; i++){
        console.log(numPresent)
        console.log('SaveOrCancel Inside a for loop')
        if (this.state.phoneNumber === peopleData[i].phoneNumber){
          console.log('if')
          numPresent = true;
          break;
        }
      }
      
      if (numPresent === false){
        console.log(numPresent)
        console.log(peopleData)
        peopleData.push({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          email: this.state.email,
        })
        console.log(peopleData)
        await AsyncStorage.setItem('peopleData', JSON.stringify(peopleData))
        this.setModalVisible(!this.state.modalVisible);
      }
      else{
        this.setState({
          error: 'This contact is already saved!'
        })
      }

    }
    else{
      this.setModalVisible(!this.state.modalVisible);
    }
  }

  componentWillUnmount(){
    console.log('Unmounting Camera')
    window.removeEventListener('beforeunload', this.componentGracefulUnmount);
  }
  
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
                    {this.state.error ? (
                      <View style={{flex: 1, backgroundColor: 'red'}}>
                        <Text style={{textAlign: 'center', color: 'white'}}>{this.state.error}</Text>
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