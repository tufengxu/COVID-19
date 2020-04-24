import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const popData = require('../../country-json/src/country-by-population.json');
const denData = require('../../country-json/src/country-by-population-density.json');
// console.log('pop-data')
// console.log(popData.length)
// console.log(popData)
// console.log('end pop-data')


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

const ResultsDetail = ({ result }) => {

    // Super shitty code to extract values from json file
    // console.log('population')
    // console.log(result.Country)
    const countryPopulation = parseJSON(popData, 'population',  result.Country)
    const countryPopDensity = parseJSON(denData, 'density',     result.Country)

    return (
        <View style={styles.container}>
            {/*
            <Image 
                style={styles.image}
                source={{ uri: result.image_url }} 
            />
            */}
            <Text style={styles.name}>
                {result.Country} 
            </Text>
            <Text style={styles.rating}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10
    },
    image: {
        width: 250,
        height:120,
        borderRadius: 8,
        marginLeft: 10

    },
    name: {
        padding: 1,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    rating: {
        marginLeft: 10
    }
});

export default ResultsDetail;