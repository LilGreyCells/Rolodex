import React from 'react';
import { SafeAreaView, AsyncStorage, Text, TextInput, StyleSheet, View, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class InputInformation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            myFirstName: '',
            myLastName: '',
            myPhoneNumber: '',
            myEmail: ''
        }
        this.addValueToTextFields();
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    componentWillUnmount = () => {
        let refresh = this.props.navigation.getParam('refresh')
        refresh()
    }

    addValueToTextFields = async () => {
        let personalData = await AsyncStorage.getItem('personalData')
        if (personalData){
            personalData = JSON.parse(personalData)
            this.setState({
                myFirstName: personalData.myFirstName,
                myLastName: personalData.myLastName,
                myPhoneNumber: personalData.myPhoneNumber,
                myEmail: personalData.myEmail,
            }, () => {
            })
        }
    }

    storePersonalData = async () => {
        try{
            if(this.state.myFirstName !== '' && this.state.myFirstName !== ' ' && this.state.myFirstName !== null && this.state.myLastName !== '' && this.state.myLastName !== ' ' && this.state.myLastName !== null && this.state.myPhoneNumber !== '' && this.state.myPhoneNumber !== ' ' && this.state.myPhoneNumber !== null && this.state.myEmail !== '' && this.state.myEmail !== ' ' && this.state.myEmail !== null){
                if(!this.state.myPhoneNumber.match(/[a-z]/i)){
                    if(this.state.myEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
                        await AsyncStorage.setItem('personalData', JSON.stringify({
                            myFirstName: this.state.myFirstName,
                            myLastName: this.state.myLastName,
                            myPhoneNumber: this.state.myPhoneNumber,
                            myEmail: this.state.myEmail
                        }));
                        if(this.props.navigation.getParam('editMode')){
                            this.props.navigation.goBack()
                        }
                        else{
                            this.props.navigation.navigate('Scan')
                        }
                    }else(
                        alert('Please enter a valid email address.')
                    )
                }
                else(
                    alert('Please only enter digits or "+" in the phone number field.')
                )
            }
            else(
                alert("Please enter information in all the fields.")
            )
        }catch(e){
            alert(e)
        }
    };

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior = {'padding'} enabled>
                <SafeAreaView style = {{flex : 1}}>
                    <ScrollView style={styles.container}>
                            <View style={styles.container}>
                                <Text style={[{textAlign: 'center', color: '#4F352D', fontSize: responsiveFontSize(3.5), marginBottom: 30}]}>
                                    Let's get to know you!
                                </Text>
                                <TextInput
                                    style={styles.textInputView}
                                    placeholder="First Name"
                                    value = {this.state.myFirstName}
                                    onChangeText={(text) => this.onChangeText('myFirstName', text)}
                                />
                                <TextInput
                                    style={styles.textInputView}
                                    placeholder="Last Name"
                                    value = {this.state.myLastName}
                                    onChangeText={(text) => this.onChangeText('myLastName', text)}
                                />
                                <TextInput
                                    style={styles.textInputView}
                                    placeholder="Phone Number"
                                    value = {this.state.myPhoneNumber}
                                    onChangeText={(text) => this.onChangeText('myPhoneNumber', text)}
                                />
                                <TextInput
                                    style={styles.textInputView}
                                    placeholder="Email ID"
                                    value = {this.state.myEmail}
                                    onChangeText={(text) => this.onChangeText('myEmail', text)}
                                />
                                <View style = {{ width: responsiveWidth(20), backgroundColor: '#458B00', height: responsiveHeight(6), borderRadius: 5, marginTop: 20, justifyContent:'center' }}>
                                    <Button
                                        title="Save"
                                        color="#fff"
                                        style = {{ marginTop: 20, marginBottom: 20}}
                                        accessibilityLabel="Save"
                                        onPress={this.storePersonalData}
                                    />
                                </View>
                            </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
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
    textInputView: {
        height: responsiveHeight(6),
        width: responsiveWidth(80),
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    }
});