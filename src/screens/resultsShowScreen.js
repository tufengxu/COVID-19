import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import FlashMessage from "react-native-flash-message";
import jhcovid from '../api/jhcovid'
import SearchBar from "../components/searchBar";
import { Root, Popup } from 'popup-ui'




const abbData = require('../../country-json/src/country-by-abbreviation.json');
const popData = require('../../country-json/src/country-by-population.json');
const denData = require('../../country-json/src/country-by-population-density.json');

const IMAGE_SIZE = 64

function parseJSON(inputData, fieldName, resultData) {
    let countryData = 0
    try {
        temp = inputData.filter( (obj) => {
            return ((obj.country === resultData))
        })
        // console.log(temp)
        countryData = temp[0][fieldName]
    } catch(error) {
        countryData = 'N/A'
    }
    return countryData
}
function doAdelay(){
    setTimeout(function(){return true;},5000);
};
const ResultsShowScreen = ( { navigation } ) => {
    // const [result, setResult] = useState(null); // Expect a single object (from yelp)
    const id = navigation.getParam('id');
    const result = navigation.getParam('result');
    if (!result) {
        console.log('Error: Passed empty result')
        {navigation.navigate('Search')}   

        return (
            <Root>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            Popup.show({
                                type: 'Success',
                                title: 'Upload complete',
                                button: false,
                                textBody: 'Congrats! Your upload successfully done',
                                buttontext: 'Ok',
                                callback: () => Popup.hide()
                            })
                        }
                    >
            <Text>Open Popup</Text>
        </TouchableOpacity>
    </View>
</Root>
        // return (
        //  <View style={{ flex: 1 }}>
        //    {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
        //    <FlashMessage position="top" animated={true} />
        //  </View>
        );
    }
    const abb = parseJSON(abbData, 'abbreviation', result.Country)
    console.log('abbreviation')
    console.log(abb)
    const countryPopulation = parseJSON(popData, 'population',  result.Country)
    const countryPopDensity = parseJSON(denData, 'density',     result.Country)
    const urlString = `https://www.countryflags.io/${abb}/shiny/${IMAGE_SIZE}.png`
    console.log(urlString)
    // const getResult = async (id) => {
    //     const response = await jhcovid.get('/summary') //(`/${id}`)
    //     setResult(response.data);
    // }
    // console.log(result);

    // useEffect(() => {
    //     getResult(id);
    // }, []);

    if (!result) { // If result was not assigned, punt
        console.log('Result empty')
        return null;
    }
    // console.log(result)
    return (
        <View style={{flex: 1}}>
            <Text style={styles.text}>
                Test: {result.Country}{"\n"}
                New confirmed: {result.NewConfirmed}{"\n"}
                Total Confirmed: {result.TotalConfirmed}{"\n"}
                New Deaths: {result.NewDeaths}{"\n"}
                Total Deaths: {result.TotalDeaths}{"\n"}
                New Recovered: {result.NewRecovered}{"\n"}
                Total Recovered: {result.TotalRecovered}{"\n"}
                Total Population: {countryPopulation}{"\n"}
                Population Density: {countryPopDensity}{"\n"}
                Date: {result.Date}
            </Text>
            <Image 
                style={styles.image}
                source={{ uri: urlString}} 
            />
            {/*
            <FlatList
                data={result.Country}
                keyExtractor={(Country) => result.Country}
                renderItem={({ item }) => {
                    return <Image 
                        style={styles.image}
                        // source={{ uri: urlString}} 
                    />
                }}
            />
            */}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: IMAGE_SIZE*2, 
        width: IMAGE_SIZE*2,
        padding:20,
        margin:10,
        borderRadius: 8,

    },
    text: {
        margin:10
    }
});

export default ResultsShowScreen;