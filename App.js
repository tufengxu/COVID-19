import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, TextInput, Button, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Callout, ProviderPropType } from 'react-native-maps';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Map from "./Map";
import Search from "./Search";
import Home from "./Home";


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

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      TotalConfirmed: '',
      TotalDeaths: '',
      Date: '',
      date: 'Live',
      latitude: null,
      longitude: null,

      country: '',
      totalCases: '',
      totalRecovered: '',
      totalDeaths: '',
      newCases: '',
      newDeaths: '',
      newRecovered: '',
      error: false,
      
      x: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      y: {
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      poi: null,
      polygon: [
        {
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE + SPACE,
        },
        {
          latitude: LATITUDE + SPACE,
          longitude: LONGITUDE - SPACE,
        },
        {
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE - SPACE,
        },
        {
          latitude: LATITUDE - SPACE,
          longitude: LONGITUDE + SPACE,
        },
      ],
    };

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

  render(){
    let showErr = (
      this.state.error ?
      <Text>
        {this.state.error}
      </Text> :
      <View></View>
    );

    const { region, polygon } = this.state;
    return <AppContainer />;
  }
}

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: Home
  },
  Search: {
    screen: Search
  },
  Map: {
    screen: Map
  }  
}, {
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

// App.navigationOptions = {
//   header: null,
// };

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor:'#FFFFFF',
    paddingBottom: 50,
  },

  // title:{
  //   marginTop: 20,
  //   fontSize: 25,
  //   textAlign: "center",
  // },

  text: {
    color: 'gray',
    marginTop: 5,
    marginLeft: 25,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  },

  text1: {
    color: 'black',
    padding: 10,
    marginTop: 20,
    marginLeft: 5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },

  datetext: {
    color: 'gray',
    marginTop: 10,
    fontSize: 10,
    textAlign: "center",
  },

  main: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    marginBottom:25,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black'
  },
  // buttonText: {
  //   fontSize: 18,
  //   color: 'white',
  //   alignSelf: 'center'
  // },
  // button: {
  //   height: 45,
  //   flexDirection: 'row',
  //   backgroundColor:'black',
  //   borderColor: 'black',
  //   borderWidth: 1,
  //   marginBottom: 10,
  //   marginTop: 10,
  //   alignSelf: 'stretch',
  //   justifyContent: 'center'
  // },
  result: {
    padding: 15,
    marginTop: 20,
    color: 'black',
    fontSize: 18
  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    marginTop: 50,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 15,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    // flex: 1,
    fontSize: 18,
    margin: 3,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#5DADE2",
    color: 'white',
    fontWeight: 'normal',
    padding: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#5DADE2",
    color: 'white',
    fontWeight: 'normal',
  },
  
});
