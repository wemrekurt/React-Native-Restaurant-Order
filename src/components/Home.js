import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import { 
  Container, 
  Header, 
  Content, 
  Button, 
  Text, 
  Badge 
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Storage from 'react-native-storage';

// storage nesnesi oluştur.
let storage = new Storage({
	size: 3000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 365,
	enableCache: true,
	sync: {
		// we'll talk about the details later.
	}
});
// storage'ı global yap.
global.storage = storage;


export default class Home extends React.Component {

  render() {
    return (
      <ImageBackground
        source={require('../images/background.png')}
        style={styles.backgroundImage}
      >
        <Grid>
          <Row size={35}>
            <View style={styles.logo}>
              <Image source={require('../images/logo.png')} />
            </View>
          </Row>
          <Row size={15}>
            <View style={styles.middleRow}>
              <Text style={styles.middleText}> 
                Merkez: Cumhuriyet Mah. Atatürk Bulvarı No:56 - 19 Mayıs
              </Text><Text style={styles.middleText}> 
                Şube: Cumhuriyet Mh. Cumhuriyet Cd. No: 25 - Bafra
              </Text><Text style={styles.middleText}> 
                İmalat: Cumhuriyet Mh. Cemil Engizli Sk. No: 48
              </Text>
            </View>
          </Row>
          <Row size={5}></Row>
          <Row size={45}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <View>
                <Button style={styles.button} iconLeft transparent onPress={() => {this.props.navigation.navigate('MenuList')}} >
                  <Icon name='ios-beer' style={styles.buttonText} />
                  <Text style={styles.buttonText}>Menü</Text>
                </Button>
              </View>
              <View>
                <Button style={styles.button} iconLeft transparent onPress={() => {this.props.navigation.navigate('Basket')}} >
                  <Icon name='ios-basket' style={styles.buttonText} />
                  <Text style={styles.buttonText}>Sepet</Text>
                </Button>
              </View>
              <View>
                <Button style={styles.button} iconLeft transparent onPress={() => {this.props.navigation.navigate('Contact')}} >
                  <Icon name='ios-pin' style={styles.buttonText} />
                  <Text style={styles.buttonText}>İletişim</Text>
                </Button>
              </View>
              <View>
                <Button style={styles.button} iconLeft transparent onPress={() => {this.props.navigation.navigate('Information')}} >
                  <Icon name='ios-pin' style={styles.buttonText} />
                  <Text style={styles.buttonText}>Bilgilerim</Text>
                </Button>
              </View>
            </View>
          </Row>
        </Grid>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: { 
    margin: 2,
    backgroundColor: 'rgba(256, 256, 256, 0.5)',
    padding: 5,
    width: 140
  },
  buttonText: {
    color: '#fff', 
    fontSize: 20
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
    backgroundColor: 'rgba(256, 256, 256, 0.7)', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  middleText: { 
    color: '#000', 
    fontSize: 16,
    padding: 2
  }
});