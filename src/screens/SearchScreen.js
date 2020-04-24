import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/searchBar";
import jhcovid from "../api/jhcovid";
import useResults from "../hooks/useResults";
import ResultsList from "../components/resultList";



const SearchScreen = ( {navigation} ) => {
    // console.log(props)
    const [term, setTerm] = useState("");
    [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (threshholdmin, threshholdmax) => {
        // price === '$' || '$$' || '$$$'
        return results.filter((result) => {
            // console.log(result.NewConfirmed)
            return (result.NewConfirmed < threshholdmax && result.NewConfirmed >= threshholdmin);
        });
    };
    const filterResultByCountry = ( countryVal ) => {
        return results.filter((result) =>  {
            return result.Country === countryVal; // Will this return null otherwise, or crash
        })[0];
    }

    let myCallback = (term) => {
        let resultByCountry = filterResultByCountry(term)
        if (resultByCountry) {
            navigation.navigate('ResultsShow', {id: null, result: filterResultByCountry(term)})
        } else {
            console.log('Add warning message')
        }
    }

    // console.log(results[10])
    // const test = filterResultByCountry('Argentina');
    // console.log(test)
    // console.log('^^Filter to Argentina^^')
    // const filterResultsNoPrice = () => {
    //     // price === '$' || '$$' || '$$$'
    //     return results.filter(result => {
    //         return (!result.price.includes('$'))
    //     });
    // }
    // console.log(results)
    // Reference to search API, error message, term
    return (
        <>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => (myCallback(term))}
                placehold='Enter a valid country (ie Chad)'
            />
            {/*<Text>You have entered: {term}</Text>*/}
            {/*
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Text style={styles.errorMessage}>We have found {results.length} results</Text>
            */}
            {/*Need grouping logic to parse search results by price proprety*/}
            <ScrollView>
                <ResultsList
                    title="Nothing new"
                    results={filterResultsByPrice(0, 1)}
                />
                <ResultsList
                    title="Less than 100"
                    results={filterResultsByPrice(1, 100)}
                />
                <ResultsList
                    title="Less than 1000"
                    results={filterResultsByPrice(100, 1000)}
                />
                <ResultsList
                    title="The rest"
                    results={filterResultsByPrice(1000, Infinity)}
                />
            </ScrollView>
            {/*
            <ResultsList 
                title='Unknown Price'
                results={filterResultsNoPrice()}
            />
            */}
        </>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        marginLeft: 15,
    },
});

export default SearchScreen;