import React from 'react';
import QRCode from 'react-native-qrcode';
import { StyleSheet, View, TextInput } from 'react-native';

class QRCodeGeneration{
    generateQRCode = (firstName, lastName, phoneNumber, email) =>{
        let contactData = {
            'firstName' : firstName,
            'lastName' : lastName,
            'phoneNumber' : phoneNumber,
            'email' : email
        }

        let qrc = <QRCode
        value={JSON.stringify(contactData)}
        size={150}
        bgColor='#4F352D'
        fgColor='white'/>
        
        return qrc;
    }
}

const qRCode = new QRCodeGeneration();
export default qRCode;