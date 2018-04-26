import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  AsyncStorage,
  TouchableOpacity
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
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <ImageBackground
        source={require('../images/background.jpg')}
        style={styles.backgroundImage}
      >
        <Grid>
          <Row size={10}>
            <View style={styles.logo}>
              <Image source={require('../images/logo.png')} />
            </View>
          </Row>          
          
          <Row size={25}>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <View>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('MenuList')}}>
                  <Image source={require('../images/menu.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Basket')}}>
                  <Image source={require('../images/sepet.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Contact')}}>
                  <Image source={require('../images/iletisim.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Information')}}>
                  <Image source={require('../images/bilgilerim.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnView}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('OldOrders')}}>
                  <Image source={require('../images/siparislerim.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </Row>         
        </Grid>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  btnView: { marginTop: 10 },
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
  }
});