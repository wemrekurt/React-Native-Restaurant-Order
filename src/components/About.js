import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


export default class About extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Hakkımızda'
  });

  render() {
    return (
      <ImageBackground
        source={require('../images/background.jpg')}
        style={styles.backgroundImage}
      >
        <Grid>
          <Row size={35}>
            <View style={styles.logo}>
              <Image source={require('../images/logo.png')} />
            </View>
          </Row>
          <Row size={60}>
            <View style={styles.middleRow}>
              <Text style={styles.title}>
                HAKKIMIZDA
              </Text>
              <Text style={styles.middleText}> 
              Bado Dondurma Cafe & Restaurant,  acı tatlı ekşi bizim işimiz. Helal et sertifikalı ürünlerimiz ile en kaliteliyi üretmeyi amaç edindik. Bölgede eşi-benzeri olmayan ürünlerimiz ve sunumumuzla sizler için en iyisini hazırlıyoruz.
              </Text><Text style={styles.middleText}> 
              İnsanlara, lezzetli bir dondurma nasıldır sorusuna yanıt aramalarına fırsat vermeden kendi zevklerine göre seçtikleri olağanüstü menümüzden tattırıyoruz. Telaffuzları kolay ve ilgi çekici menü isimlerimiz ile adeta damaktan sonra akılda da kalıcı olmaya çalışıyoruz.
              </Text>
            </View>
          </Row>
          <Row size={5}>
          </Row>

        </Grid>
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
  }
});