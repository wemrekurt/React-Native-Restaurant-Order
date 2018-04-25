import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Linking,
  TouchableOpacity
} from 'react-native';
import { 
  Container, 
  Content, 
  Text, 
  Button
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
//import MapView  from 'react-native-maps';
import MapView, { Marker } from 'react-native-maps';
import Communications, { phonecall } from 'react-native-communications';


export default class Contact extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'İletişim',
    headerStyle: {
      backgroundColor: 'tomato'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  });

  state = {
    markers: [
      {
        latlng: { latitude: 41.567714, longitude: 35.904981},
        title: 'Bado Urfa Sofrası Cafe & Restaurant', 
        description: 'Cumhuriyet Mh. Cumhuriyet Cd. No: 25 - Bafra'
      },
      {
        latlng: { latitude: 41.4947049, longitude: 36.0779206 },
        title: 'Bado Dondurma Cafe & Restaurant', 
        description: 'Cumhuriyet Mah. Atatürk Bulvarı No:56 - 19 Mayıs'
      }
    ]
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/background.jpg')}
        style={styles.backgroundImage}
      >
        <Container>        
          <Content>        
            <View style={{ backgroundColor: 'white', padding: 10, margin: 10, marginTop: 30, borderRadius: 4 }}>
              <Text style={styles.title}>
                ADRES BİLGİLERİ
              </Text>
              <MapView 
                style={{ width: '100%', height: 250}}
                region={{
                  latitude: 41.5282046,
                  longitude: 35.972168,
                  latitudeDelta: 0.2052,
                  longitudeDelta: 0.0421,
                }}
                
              >
              {this.state.markers.map(marker => (
                <Marker
                  onPress={()=>{console.log(marker.title)}}
                  coordinate={marker.latlng}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
              </MapView>
              
              <View style={styles.socialIcons}>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://www.facebook.com/n/?badocomtr')}
                  style={{ flexDirection: 'row' }}
                >
                  <Image
                    style={styles.social_icon}
                    source={require('../images/Facebook-64.png')}
                  />
                </TouchableOpacity>
                <Text> &nbsp; </Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://www.instagram.com/badocomtr')}
                  style={{ flexDirection: 'row' }}
                >
                  <Image
                    style={styles.social_icon}
                    source={require('../images/Instagram-64.png')}
                  />
                </TouchableOpacity>                
              </View>
              <View style={styles.elem}>
                <TouchableOpacity
                    onPress={() => phonecall('+903625112772', true)}
                    style={{ flexDirection: 'row' }}
                  >
                  <Image
                    style={styles.icon}
                    source={require('../images/phone-128.png')}
                  />
                  <Text style={styles.text}> 0362 511 2 772 </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.elem}>
                <TouchableOpacity
                    onPress={() => phonecall('+903625430111', true)}
                    style={{ flexDirection: 'row' }}
                  >
                  <Image
                    style={styles.icon}
                    source={require('../images/phone-128.png')}
                  />
                  <Text style={styles.text}> 0362 543 0 111</Text>
                </TouchableOpacity>
              </View>              
            </View>
            
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 23,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    flex: 1,
    alignItems: 'center', 
    width: null, 
    height: 300
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },
  middleRow: { 
    backgroundColor: 'rgba(256, 256, 256, 0.9)', 
    height: 'auto',
    width: '100%',    
    alignItems: 'center'
  },
  middleText: { 
    color: '#000', 
    fontSize: 18,
    padding: 10
  },
  socialIcons: {
    flexDirection: 'row',
    width: null,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 20,
    height: 20
  },
  social_icon: {
    width: 40,
    height: 40
  },
  elem: {
    flexDirection: 'row',
    width: null,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 8,
    marginTop: 4,
    alignItems: 'center'
  }
});