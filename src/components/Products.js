import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ImageBackground
} from 'react-native';
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Text, 
  Body, 
  Card, 
  CardItem, 
  Left, 
  Right, 
  Icon,
  Spinner,
  Button as Btn
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';


export default class Products extends React.Component {
  static navigationOptions = {
    title: 'Menü',
    headerTitle: 'Ürünler',
    headerStyle: {
      backgroundColor: 'tomato'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
  }

  state = { data: [], loading: true, category: {name:""}, basketModal: false, tempItem: {isim: '', fotograf:'', fiyat: 0.0}, emptyItem: {isim: '', fotograf:'', fiyat: 0.0} };
  

  getItems() {
    let uri = 'http://api.bado.com.tr/categories/'+ this.props.navigation.state.params.cat_id + '.json';
    axios.get(uri)
      .then(
        response => {
          this.setState({
            category: response.data.data.category,
            data: this.state.data.concat(response.data.data.products),
            loading: false
          });
        }
      );
  }

  addToBasket(){
    if( this.state.text > 0){
      let item = this.state.tempItem;
      let basket = {};
      storage.load({ key: 'basket' }).then(ret => {
        basket = ret;
        this.saveBasket(basket, item);
      }).catch(err => {
        this.saveBasket(basket, item);
      });
    }else{
      Alert.alert(
        'Hata',
        'En az bir ürün eklemelisiniz!'
      );
    }
  }

  saveBasket(basket, item){
    basket[item.id] = {item: item, size: this.state.text, price: item.fiyat * this.state.text}
    storage.save({
      key: 'basket',
      data: basket
    });
    this.setState({ basketModal: false });
    Alert.alert(
      'İşlem Tamam',
      'Ürün sepete eklendi.',
      [
        {text: 'Sepete Git', onPress: () => this.props.navigation.navigate('Basket')},
        {text: 'Tamam'},
      ],
      { cancelable: false }
    )    
  }

  componentDidMount(){
    this.getItems();
  }

  showAddBasket(visible, item){
    this.setState({ text: 0, basketModal: visible, tempItem: item });
  }

  render() {
    if (this.state.loading) {
      return (
          <View style={styles.container}>
            <Spinner color='red' />
          </View>
      );
    }
    return (      
      <Container>        
        <Content>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.basketModal}
            onRequestClose={() => {
              this.showAddBasket(false, this.state.emptyItem);
            }}>
            <ImageBackground
              source={require('../images/background.jpg')}
              style={styles.backgroundImage}
            >
              <View style={{ backgroundColor: 'white', marginLeft: 15, marginRight: 15, marginTop: 32, padding: 20 }}>
                <View style={{flexDirection: "row", flex: 1}}>
                  <Image 
                    indicator={Progress.Bar}
                    source={{ uri: 'https://www.bado.com.tr/content/'+ this.state.tempItem.fotograf +'.png' }} 
                    style={{flex: 1, width: null, height: 200}}
                  />
                </View>
                <View style={{ marginTop: 230 }}>
                  <Text>{this.state.tempItem.isim} - {this.state.tempItem.fiyat} TL</Text>
                  <TextInput
                    style={{height: 40}}
                    keyboardType='phone-pad'
                    placeholder="Miktar Belirtin!"
                    onChangeText={(text) => this.setState({text})}
                  />
                  <Button
                    style={{ backgroundColor: 'tomato' }}
                    title="Sepete Ekle"
                    onPress={() => {
                      this.addToBasket();
                    }}>
                  </Button>
                </View>
              </View>
            </ImageBackground>
          </Modal>
          <List
            style={styles.list}
            dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
                <Thumbnail size={80} source={{ uri: 'https://www.bado.com.tr/content/small/'+ item.fotograf +'-300x300.png' }} />
                <Body>
                  <Grid>
                    <Col>
                      <Text>{item.isim}</Text>
                      <Text note>{item.fiyat} TL</Text>
                    </Col>
                    <Col style={{ width: 50 }}>
                      <Btn style={{ backgroundColor: 'tomato' }} onPress={() => {
                          this.showAddBasket(true, item);
                        }}>
                        <Icon name='add' /> 
                      </Btn>
                    </Col>
                  </Grid>
                </Body>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: '#fff'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  }
});