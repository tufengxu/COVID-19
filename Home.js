import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      TotalConfirmed: '',
      TotalDeaths: '',
      Date: '',
      error: false,
    };
  }

  componentDidMount() {
    fetch("https://api.covid19api.com/summary", {method: 'GET'})
      .then((response) => response.json())
      .then(json => {
        this.setState({
          TotalConfirmed: json["Global"]['TotalConfirmed'],
          TotalRecovered: json["Global"]['TotalRecovered'],
          TotalDeaths: json["Global"]['TotalDeaths'],
          NewConfirmed: json["Global"]['NewConfirmed'],
          NewRecovered: json["Global"]['NewRecovered'],
          NewDeaths: json["Global"]['NewDeaths'],
        },
        function(){}
      );
      console.log(this.state.jsondata);
      })
      .catch(error => {
        console.error(error);
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

    <View style={styles.container}>
        <Text style={styles.title}> Global COVID-19 </Text>
        <Text style={styles.text1}> Total Cases </Text>
        <Text style={styles.result}> Confirmed: {this.state.TotalConfirmed} </Text>
        <Text style={styles.result}> Deaths: {this.state.TotalDeaths} </Text>
        <Text style={styles.result}> Recovered: {this.state.TotalRecovered} </Text>
        <Text style={styles.text1}> New Cases </Text>
        <Text style={styles.result}> Confirmed: {this.state.NewConfirmed} </Text>
        <Text style={styles.result}> Deaths: {this.state.NewDeaths}</Text>        
        <Text style={styles.result}> Recovered: {this.state.NewRecovered}</Text>
            {showErr}
      </View>
    )
  }
}

Home.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor:'#FFFFFF',
    paddingBottom: 400,
  },

  title: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 25,
    color: 'black',
    textAlign: 'center'
  },

  text1: {
    color: 'black',
    padding: 10,
    marginTop: 10,
    marginLeft: 5,
    fontSize: 20,
    backgroundColor: '#FFFFFF',
  },
  
  result: {
    color: 'gray',
    // marginTop: 5,
    marginLeft: 25,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
  }
});
