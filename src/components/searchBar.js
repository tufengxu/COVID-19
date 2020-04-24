import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit, placehold="Search for a Country (eg: Chad)" }) => {
    // console.log(`placeholder: ${placehold}`)
    return (
        <View style={styles.backgroundStyle}>
            <Feather name="search" style={styles.iconStyle} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder={placehold} 
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 30,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    backgroundStyle: {
        backgroundColor: '#F0FEEE', // String, rgb(r,g,b), or hex
        height: 50,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    inputStyle: {
        borderColor: 'black',
        borderWidth: 0,
        width: 100,
        flex: 1,
        borderRadius: 10,
        // marginLeft: 10
        // margin: 10
    }
});

export default SearchBar;