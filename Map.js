import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Platform, TextInput, Button, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Callout, ProviderPropType } from 'react-native-maps';

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
    country = country.replace(" ", "-")
    console.log(country)
    const URL = `https://api.covid19api.com/total/country/${country}`;
    // const URL = `https://api.covid19api.com/world/total`;
    return fetch(URL)
            .then((res) => res.json());
}

// getLiveJson = () => {
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//       };
      
//     return fetch("https://api.covid19api.com/all", requestOptions)
//         .then(response => response.text())
//         .then(result => console.log(result))
//         .catch(error => console.log('error', error));
// //   const URL = `https://api.covid19api.com/world/total`;
//     // const URL = `https://api.covid19api.com/world/total`;
//     // return fetch(URL)
//     //       .then((res) => res.json());
// }

const CountryList = ["China", "United States", "United Kingdom", "Russia", "Canada", "Japan", "Germany", "Australia", "Italy", "India"];


export default class Map extends React.Component {
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
        title1: '',
        description1: '',

        Info: {
            CountryName: '',
            LAT: '',
            LON: '',
        },
        
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

        CHN: '',
        US: '',
        UK: '',
        RUS: '',
        CAN: '',
        JAP: '',
        GEM: '',
        AUS: '',
        ITA: '',
        IND: '',

        Countries:{
            China: {
                region:{
                    latitude: 35.8617,
                    longitude: 104.1954,
                },
            },
            US: {
                region:{
                    latitude: 37.0902,
                    longitude: -95.7129,
                },
            },
            Canada: {
                region:{
                    latitude: 56.1304,
                    longitude: -106.3468,
                },
            },
            Japan: {
                region:{
                    latitude: 36.2048,
                    longitude: 138.2529,
                },
            },
            Italy: {
                region:{
                    latitude: 41.8719,
                    longitude: 12.5674,
                },
            },
            Germany: {
                region:{
                    latitude: 51.1657,
                    longitude: 10.4515,
                },
            },
            Russia: {
                region:{
                    latitude: 61.5240,
                    longitude: 105.3188,
                },
            },
            UK: {
                region:{
                    latitude: 55.3781,
                    longitude: -3.4360,
                },
            },
            Australia: {
                region:{
                    latitude: -25.2744,
                    longitude: 133.7751,
                },
            },
            India: {
                region:{
                    latitude: 20.5937,
                longitude: 78.9629,
                },
            },
        },
        

      };
  
      this.onPoiClick = this.onPoiClick.bind(this);
    }

    onPoiClick(e) {
        const poi = e.nativeEvent;
        this.setState({
          poi,
        });
    }

    // componentDidMount() {
    //     for(let ii = 0; ii < CountryList.length; ii++) {
    //         // var country = CountryList[ii];
    //         getJson(CountryList[ii])
    //             .then((res) => {            
    //                 var date = new Date().getDate();
    //                 var month = new Date().getMonth() + 1;
    //                 var year = new Date().getFullYear();
    //                 if (month < 10)
    //                 month = "0" + month
    //                 if (date < 10)
    //                 date = "0" + date
    //                 var fullDate = year + "-" + month + "-" + date + "T00:00:00Z";
    //                 for (let i = 0; i < res.length; i++) {
    //                     this.setState({
    //                         totalConfirmed: res[i]['Confirmed'],
    //                         totalRecovered: res[i]['Recovered'],
    //                         totalDeaths: res[i]['Deaths'],
    //                     });
    //                     if (i == res.length - 1) {
    //                         // this.setState({
    //                         //     description1: "Confirmed: " + res[i]['Confirmed'] + "\nDeath: " + res[i]['Deaths'] + "\nRecovered: " + res[i]['Recovered'],
    //                         // });
    //                         var description1 = "Confirmed: " + res[i]['Confirmed'] + "\nDeath: " + res[i]['Deaths'] + "\nRecovered: " + res[i]['Recovered'];
    //                         DescriptionList.push(description1);
    //                     }
    //                 }
                    
    //                 // let iii = res.length;
    //                 // console.log(res[iii-1]);
    //                     // this.setState({
    //                     //   totalCases: res[ii-1]['Confirmed'],   
    //                     //   totalRecovered: res[ii-1]['Recovered'],
    //                     //   totalDeaths: res[ii-1]['Deaths'] 
    //                     // });
    //                     // this.setState({
    //                     //   newCases: parseInt(res[ii-1]['Confirmed']) - parseInt(res[ii-2]['Confirmed']), 
    //                     //   newDeaths: parseInt(res[ii-1]['Deaths']) - parseInt(res[ii-2]['Deaths']),
    //                     //   newRecovered: parseInt(res[ii-1]['Recovered']) - parseInt(res[ii-2]['Recovered']),
    //                     // });
    //                     // this.setState({
    //                     //     description1: "Confirmed: " + res[iii-1]['Confirmed'] + "\nDeath: " + res[iii-1]['Deaths'] + "\nRecovered: " + res[iii-1]['Recovered'],
    //                     // });
                        
    //             });
    //     }
    // }


    render(){
        var DescriptionList = [];
        for(let ii = 0; ii < CountryList.length; ii++) {
            var description1 = '';
            getJson(CountryList[ii]).then((res) => {        
                switch (CountryList[ii]) {
                    case "China":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    CHN: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "United States":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    US: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "United Kingdom":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    UK: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "Russia":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    RUS: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "Canada":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    CAN: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "Japan":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    JAP: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "Germany":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    GEM: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "Australia":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    AUS: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "Italy":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    ITA: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                    case "India":
                        for (let i = 0; i < res.length; i++) {
                            if (i == res.length - 1) {
                                this.setState({
                                    IND: res[i]['Confirmed'] + " / " + res[i]['Deaths'] + " / " + res[i]['Recovered']
                                })
                            }
                        }
                        break;
                }

                // for (let i = 0; i < res.length; i++) {
                //     // this.setState({
                //     //     totalConfirmed: res[i]['Confirmed'],
                //     //     totalRecovered: res[i]['Recovered'],
                //     //     totalDeaths: res[i]['Deaths'],
                //     // });
                //     if (i == res.length - 1) {
                //             // this.setState({
                //             //     description1: "Confirmed: " + res[i]['Confirmed'] + "\nDeath: " + res[i]['Deaths'] + "\nRecovered: " + res[i]['Recovered'],
                //             // });
                //         description1 += "Confirmed: " + res[i]['Confirmed'] + "\nDeath: " + res[i]['Deaths'] + "\nRecovered: " + res[i]['Recovered'];
                //         DescriptionList.push(description1);
                //     }
                // }      
            });
        }
        
        let showErr = (
        this.state.error ?
        <Text>
            {this.state.error}
        </Text> :
        <View></View>
        );

        const { region } = this.state;
        return(
            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={region}
                onPoiClick={this.onPoiClick}
            >
                {this.state.poi && (
                    <Marker coordinate={this.state.poi.coordinate}>
                        <Callout>
                            <View>
                            <Text>Name: {this.state.poi.name}</Text>
                            <Text>Confirmed: {this.state.totalCases}</Text>
                            <Text>Death: {this.state.totalDeaths}</Text>
                            <Text>Recovered: {this.state.totalRecovered}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )}

                <Marker
                    coordinate={this.state.region}
                    onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                    draggable
                    title={this.state.title1}
                    description={this.state.description1}
                />
                {/* <Marker
                    coordinate={{latitude: 42.3505,
                                longitude: -71.1054,}}
                    onSelect={e => log('onSelect', e)}
                    onDrag={e => log('onDrag', e)}
                    onDragStart={e => log('onDragStart', e)}
                    onDragEnd={e => log('onDragEnd', e)}
                    onPress={e => log('onPress', e)}
                    draggable
                /> */}
                {/* China */}
                <Marker
                    coordinate={this.state.Countries.China.region}
                    title={"China: Confirmed/Death/Recovered"}
                    // description={"Confirmed: "+this.state.Countries.China.Confirmed+"\nDeaths: "+this.state.Countries.China.Death+"\nRecovered: "+this.state.Countries.China.Recovered}
                    description={this.state.CHN}
                />
                {/* USA */}
                <Marker
                    coordinate={this.state.Countries.US.region}
                    title={"USA: Confirmed/Death/Recovered"}
                    description={this.state.US}
                />
                {/* UK */}
                <Marker
                    coordinate={this.state.Countries.UK.region}
                    title={"UK: Confirmed/Death/Recovered"}
                    description={this.state.UK}
                />
                {/* Russia */}
                <Marker
                    coordinate={this.state.Countries.Russia.region}
                    title={"Russia: Confirmed/Death/Recovered"}
                    description={this.state.RUS}
                />
                {/* Canada */}
                <Marker
                    coordinate={this.state.Countries.Canada.region}
                    title={"Canada: Confirmed/Death/Recovered"}
                    description={this.state.CAN}
                />
                {/* Japan */}
                <Marker
                    coordinate={this.state.Countries.Japan.region}
                    title={"Japan: Confirmed/Death/Recovered"}
                    description={this.state.JAP}
                />
                {/* Germany */}
                <Marker
                    coordinate={this.state.Countries.Germany.region}
                    title={"Germany: Confirmed/Death/Recovered"}
                    description={this.state.GEM}
                />
                {/* Australia */}
                <Marker
                    coordinate={this.state.Countries.Australia.region}
                    title={"Australia: Confirmed/Death/Recovered"}
                    description={this.state.AUS}
                />
                {/* Italy */}
                <Marker
                    coordinate={this.state.Countries.Italy.region}
                    title={"Italy: Confirmed/Death/Recovered"}
                    description={this.state.ITA}
                />
                {/* India */}
                <Marker
                    coordinate={this.state.Countries.India.region}
                    title={"India: Confirmed/Death/Recovered"}
                    description={this.state.IND}
                />
            </MapView>
        )
    }
}

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