import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import qRCode from './Components/QRCodeGenerator';

export default class ContactDetailScreen extends React.Component{
    render(){
        const firstName = this.props.navigation.getParam('firstName');
        const lastName = this.props.navigation.getParam('lastName');
        const phoneNumber = this.props.navigation.getParam('phoneNumber');
        const email = this.props.navigation.getParam('email');
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.detailsView}>
                        <Text style={[styles.detailsViewText, {fontSize: responsiveFontSize(4)}]}>{firstName} {lastName}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsViewText}>{phoneNumber}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        <Text style={styles.detailsViewText}>{email}</Text>
                    </View>
                    <View style={styles.detailsView}>
                        {qRCode.generateQRCode(firstName, lastName, phoneNumber, email)}
                    </View>
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
});