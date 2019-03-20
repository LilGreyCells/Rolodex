import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableHighlight, AsyncStorage, Button} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import AntIcon from "react-native-vector-icons/AntDesign";
import { Icon, withTheme } from 'react-native-elements';

export default class ContactScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      peopleData: [],
    }
    this.getPeopleData();
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'halkat',
      tabBarOnPress: ({navigation, defaultHandler}) => {
        console.log('TabBarOnPress')
        defaultHandler()
      }
    }
  }

  // tabBarOnPress = (object) => {
  //   console.log("hello: " + object)
  // }

  getPeopleData = async () => {
    let peopleData = await AsyncStorage.getItem('peopleData');
    peopleData = JSON.parse(peopleData);
    this.setState({
      peopleData : peopleData,
    })
  }

  deleteContact = async (item) => {
    let peopleData = await AsyncStorage.getItem('peopleData');
    peopleData = JSON.parse(peopleData)
    for (let i=0; i<peopleData.length; i++){
      if (item.phoneNumber === peopleData[i].phoneNumber){
        peopleData.splice(i, 1)
        break;
      }
    }
    await AsyncStorage.setItem('peopleData', JSON.stringify(peopleData))
    this.getPeopleData()
  }
  
  render() {
    return (
      <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
        <View>
          <View style = {styles.contactsHeader}>
            <Text style = {styles.contactsHeaderText}>Contacts</Text>
          </View>
          <SwipeListView
            useFlatList
            ListEmptyComponent = {
              <Text style = {{ paddingTop: 30, fontSize: 20, textAlign: 'center' }}>There is no data to display.</Text>
            }
            data = {this.state.peopleData}
            renderItem = {({item}) => (
                <View style = {{backgroundColor: 'white',}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactDetail', {firstName: item.firstName, lastName: item.lastName, phoneNumber: item.phoneNumber, email: item.email})}>
                    <View style={styles.eachItem}>
                      <Text style = {styles.eachItemText}>{item.firstName} {item.lastName}</Text>
                      <AntIcon
                        name = 'right'
                        size = {15}
                        color = '#4F352D'
                      />
                    </View>
                  </TouchableOpacity>
                </View>
            )}
            renderHiddenItem = {({item}) => (
              <View style={styles.rowBack}>
                <Icon
                  name='delete'
                  type='AntDesign'
                  color='#4F352D'
                  size={25}
                  onPress = {() => this.deleteContact(item)}
                />
              </View>
            )}
            leftOpenValue={50}
            // rightOpenValue={-50}

            keyExtractor = {(item, index) => item.phoneNumber}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactsHeader: {
    backgroundColor: '#FFD54F', // yellow
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    shadowColor: '#4F352D', // brown
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  contactsHeaderText: {
    color: '#4F352D', // brown
    fontSize: responsiveFontSize(2.5),
  },
  eachItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#e4e4e4',
    borderBottomWidth: 0.5,
  },
  eachItemText: {
    fontSize: responsiveFontSize(2),
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});