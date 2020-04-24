import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, TextInput, Button, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Callout, ProviderPropType } from 'react-native-maps';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 42.3601;
const LONGITUDE = -71.0589;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
const MyButton = ({ onPress, buttonText, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{buttonText}</Text>
    </TouchableOpacity>
  );
};


function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

getJson = (country) => {
//    let username = name.toLowerCase().trim();
    country = country.replace(" ", "-")
    console.log(country)
    const URL = `https://api.covid19api.com/total/country/${country}`;
    return fetch(URL)
            .then((res) => res.json());
}

getLiveJson = () => {
  const URL = `https://api.covid19api.com/world/total`;
  return fetch(URL)
          .then((res) => res.json());
}

export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      TotalConfirmed: '',
      TotalDeaths: '',
      Date: '',
      date: 'Live',
      country: '',
      totalCases: '',
      totalRecovered: '',
      totalDeaths: '',
      newCases: '',
      newDeaths: '',
      newRecovered: '',
      error: false,
      poi: null,
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPoiClick = this.onPoiClick.bind(this);
  }

  onPoiClick(e) {
    const poi = e.nativeEvent;
    this.setState({
      poi,
    });
  }

  getInitialState() {
    return {
      region: {
        latitude: 42.3601,
        longitude: -71.0589,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  onRegionChange(region) {
    this.setState({ region });
  }

  handleChange(e) {
    this.setState({
      country: e.nativeEvent.text
    });
  }

  handleSubmit() {
    getJson(this.state.country)
        .then((res) => {            
            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            if (month < 10)
              month = "0" + month
            if (date < 10)
              date = "0" + date
            var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";
            let ii = res.length;
            console.log(res[ii-1]['Date']);
            this.setState({
                Date: res[ii-1]['Date']
            })
            console.log(res[ii-1]);
                this.setState({
                  totalCases: res[ii-1]['Confirmed'],   
                  totalRecovered: res[ii-1]['Recovered'],
                  totalDeaths: res[ii-1]['Deaths'] 
                });
                this.setState({
                  newCases: parseInt(res[ii-1]['Confirmed']) - parseInt(res[ii-2]['Confirmed']), 
                  newDeaths: parseInt(res[ii-1]['Deaths']) - parseInt(res[ii-2]['Deaths']),
                  newRecovered: parseInt(res[ii-1]['Recovered']) - parseInt(res[ii-2]['Recovered']),
                });
          
      });
  }

  render(){
    let showErr = (
      this.state.error ?
      <Text>
        {this.state.error}
      </Text> :
      <View></View>
    );

    const { region, polygon } = this.state;
    return(
    <View style={styles.main}>
        <Text style={styles.title}>Searching Country</Text>
        <TextInput
              style={styles.searchInput}
              onChange={this.handleChange}
        />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Search
              </Text>
        </TouchableHighlight>
        <Text style={styles.result}>Date: {this.state.Date} </Text>
        <Text style={styles.result}>Total Confirmed: {this.state.totalCases} </Text>
        <Text style={styles.result}>Total Deaths: {this.state.totalDeaths} </Text>
        <Text style={styles.result}>Total Recovered: {this.state.totalRecovered} </Text>
        <Text style={styles.result}>New Confirmed: {this.state.newCases} </Text>
        <Text style={styles.result}>New Deaths: {this.state.newDeaths}</Text>        
        <Text style={styles.result}>New Recovered: {this.state.newRecovered}</Text>
            {showErr}
      </View>
    )
  }
}


Search.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    marginBottom:25,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  },
  searchInput: {
    height: 50,
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    alignItems: 'center'
    // alignSelf: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'black',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  result: {
    padding: 15,
    color: 'black',
    fontSize: 18
  }
});
