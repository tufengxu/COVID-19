import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
  Button,
  Image,
} from "react-native";
// import { PROVIDER_GOOGLE, PROVIDER_DEFAULT, MapView } from "react-native-maps";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import DatePicker from "react-native-date-ranges";
import { withNavigation } from 'react-navigation';
import useResults from "../hooks/useResults"; // Should do this in a better way
import SearchBar from "../components/searchBar";


const IMAGE_SIZE = 64
const geoData = require('../../country-json/src/country-by-geo-coordinates.json');

function parseCoords(inputData, resultData) {
    let coords = 0
    try {
        temp = inputData.filter( (obj) => {
            return ((obj.country === resultData))
        })
        // console.log(temp)
        console.log(temp)
        coords = {
          latitude: (parseFloat(temp[0]['north']) + parseFloat(temp[0]['south']))/2,
          longitude: (parseFloat(temp[0]['west']) + parseFloat(temp[0]['east']))/2
        }
        // console.log(coords)
    } catch(error) {
        coords = {
          latitude: -89,
          longitude: 89 
        }
    }
    if (isNaN(coords.latitude) | isNaN(coords.longitude)) {
        coords = {
          latitude: -89,
          longitude: 89 
        }
    }
    return coords
}


const styles = StyleSheet.create({
  mapContainer: {
    //...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    height: IMAGE_SIZE, 
    width: IMAGE_SIZE,
    padding:20,
    margin:10,
    borderRadius: 8,
    },
});

const myButton = (onConfirm) => {
  return (
    <View style={{ alignItems: "flex-start" }}>
      <Button title="Submit: " onPress={onConfirm} />
    </View>
  );
};
// console.log(parseCoords(geoData, 'United States'))
var markers = [
  {
    coordinate: parseCoords(geoData, 'United States'),
    title: "United States",
    subtitle: "Subtitle data",
    abb: "US",
  }, 
  {
    coordinate:  parseCoords(geoData, 'Canada'),
    title: "Canada",
    subtitle: "Subtitle data",
    abb: "CA",
  }
]

const MapScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  [searchApi, results, errorMessage] = useResults();

  return (
    <View style={{}}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 42,
            longitude: 40,
            latitudeDelta: 90, // Pretty good swath to see a few countries
            longitudeDelta: 180,
          }}
        >
        {console.log(results[0])}
        {results[0] != null  && results.map((result, index) => (
              <Marker
                  key = {index}
                  coordinate = {parseCoords(geoData, result.Country)}
                  title = { result.Country }
                  description={`New Confirmed: ${result.NewConfirmed}`}
                  anchor={{ x: 0.5, y: 0.5 }}
                  onCalloutPress={() => (navigation.navigate('ResultsShow', {id: result.Country, result: result}))}
              >
              <Image
                style={styles.image}
                source={{ uri: `https://www.countryflags.io/${result.CountryCode}/shiny/${IMAGE_SIZE}.png`}} 
              />
              </Marker>
          ))

         }
            
        </MapView>
      </View>
      <DatePicker
        markText="Select date range:"
        buttonText="Submit"
        style={{ width: 350, height: 45, margin: 10 }}
        // customStyles = { {
        //     placeholderText:{ fontSize:20 } // placeHolder style
        //     headerStyle : {  },     // title container style
        //     headerMarkTitle : { }, // title mark style
        //     headerDateTitle: { }, // title Date style
        //     contentInput: {}, //content text container style
        //     contentText: {}, //after selected text Style
        // } } // optional
        centerAlign={false} // optional text will align center or not
        allowFontScaling={false} // optional
        placeholder={"Select a date-range"}
        mode={"range"}
        customButton={myButton}
        // onConfirm  Function  Optional. call function after click button
        //    return a date object {startDate:'', endDate:''} e.g( value=>console.log(value))
      />
    </View>
  );
};
export default MapScreen;