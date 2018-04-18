import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Modal,
  TextInput,
  Image
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
  Icon 
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';

export default class Products extends React.Component {
  static navigationOptions = {
    title: 'Menü'
  }

  state = { data: [], loading: true, category: {}, basketModal: false, tempItem: {isim: '', fotograf:'', fiyat: 0.0}, emptyItem: {isim: '', fotograf:'', fiyat: 0.0} };

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
      alert("En az bir ürün eklemelisiniz!");
    }
  }

  saveBasket(basket, item){
    basket[item.id] = {item: item, size: this.state.text}
    storage.save({
      key: 'basket',
      data: basket
    });
    this.setState({ basketModal: false });
    alsert("Ürün sepete Eklendi");
  }

  componentDidMount(){
    this.getItems();
  }

  showAddBasket(visible, item){
    this.setState({ basketModal: visible, tempItem: item });
  }

  render() {
    if (this.state.loading) {
      return (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#ffffff', fontSize: 21 }}>Loading</Text>
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
              alert('Dikkat! Ürün sepete eklenmedi.');
              this.showAddBasket(false, this.state.emptyItem);
            }}>
            <View style={{ marginTop: 32, padding: 20 }}>
              <View style={{flexDirection: "row", flex: 1}}>
                <Image 
                  onLoadStart={() => console.log('yukleme basladi')}
                  onLoad={() => console.log('yukleniyor')}
                  onLoadEnd={() => console.log('yukleme bitti')}
                  source={{ uri: 'https://www.bado.com.tr/content/'+ this.state.tempItem.fotograf +'.png' }} 
                  style={{flex: 1, resizeMode: "stretch", width: null, height: 200}}
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
                  title="Sepete Ekle"
                  onPress={() => {
                    this.addToBasket();
                  }}>
                </Button>
              </View>
            </View>
          </Modal>
          <List dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
                <Thumbnail square size={80} source={{ uri: 'https://www.bado.com.tr/content/small/'+ item.fotograf +'-300x300.png' }} />
                <Body>
                  <Grid>
                    <Col>
                      <Text>{item.isim}</Text>
                      <Text note>{item.fiyat} TL</Text>
                    </Col>
                    <Col>
                      <Button onPress={() => {
                          this.showAddBasket(true, item);
                        }} title="Sepete Ekle"></Button>
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
});