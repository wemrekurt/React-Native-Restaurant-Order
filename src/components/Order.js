import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Text, 
  Button,
  Form,
  Item,
  Label,
  Input,
  Body
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
import axios from 'axios';
import Realm from 'realm';

const orderScheme = {
  name: 'Orders',
  properties: {
    price: 'string',
    name: 'string',
    date: 'string'
  }
};

export default class Order extends React.Component {
  static navigationOptions = {
    headerTitle: 'Sipariş Oluştur',
    title: 'Menü',
    headerStyle: {
      backgroundColor: 'tomato'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  }
  state = {isEmpty: true, basket: {}, total: 0, phone: "", name: "", address: "", customer_id: ""}

  componentDidMount(){
    this.loadBasket();
    this.loadInfo();
  }

  loadBasket(){
    storage.load({ key: 'basket' }).then(ret => {
      this.setState({ isEmpty: false, basket: ret});
      let tot = 0;
      Object.keys(ret).forEach(item => { 
        tot += ret[item].price;
      });
      this.setState({ total: tot });
    }).catch(err => {
      console.log('Basket can\'t load from storage');
    });
  }

  loadInfo(){
    storage.load({ key: 'info' }).then(ret => {
      this.setState({ phone: ret.phone, name: ret.name, address: ret.address, customer_id: ret.id });
    }).catch(err => {
      console.log('User information can\'t load from storage');
    });
  }

  saveUserData(id){
    storage.save({
      key: 'info',
      data: {
        id:     id,
        phone:  this.state.phone, 
        name:   this.state.name,
        address:this.state.address        
      }
    });
  }
  
  clearBasket(){
    storage.remove({
      key: 'basket'
    });
  }

  renderUserForm(){
    if(this.state.customer_id){
        return(
        <Text>
          Sayın {this.state.name}, siparişiniz kayıtlı olan {this.state.address} adresinize gönderilecektir. 
          Düzenlemek için lütfen ana sayfadaki bilgilerim bölümünü kullanın.
        </Text>);
      }else{
      return(
        <View>
          <Item>
            <Label>İsim Soyisim</Label>
            <Input 
              onChangeText={(text) => this.setState({ name: text })} 
              value={this.state.name}
            />
          </Item>
          
          <Item>
            <Label>Telefon</Label>
            <Input
              placeholder="544xxxxxxx"
              onChangeText={(text) => this.setState({ phone: text })} 
              keyboardType='phone-pad'
              maxLength={10}
              value={this.state.phone}
            />
          </Item>

          <Item>
            <Icon active name='ios-home' />
            <Input
              onChangeText={(text) => this.setState({ address: text })} 
              placeholder='Adres'
              value={this.state.address}
            />
          </Item>
        </View>
      );
    }
  }

  makeOrder(){    
   axios({
      method: 'POST',
      url: 'http://api.bado.com.tr/makeorder.php',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: "id="+this.state.customer_id+"&phone="+this.state.phone+"&name="+this.state.name+"&address="+this.state.address+"&order="+JSON.stringify(this.state.basket)
    }).then(response => {
      if(response.data.success){
        this.setState({ isEmpty: true })
        Alert.alert(
          'İşlem Tamam',
          'Siparişiniz bize ulaştı.',
          [
            {text: 'Siparişi Gör', onPress: () => this.props.navigation.navigate('OldOrders')},
            {text: 'Tamam', onPress: () => this.props.navigation.navigate('Basket')},
          ],
          { cancelable: false }
        );
        this.saveUserData(response.data.data.customer_id);
        this.saveOrderToDb(this.state.basket);
        this.clearBasket();
      }else{
        alert(response.data.message)
      }
    });
    
  }

  saveOrderToDb(basket){
    let names = "";
    let price = 0;
    Object.keys(basket).forEach(item => { 
      names = names + ", " + basket[item].item.isim + " (" + basket[item].size + " Ad.)";
      price += basket[item].price;
    });
    names = names.substr(2);
    let d = this.formatDate(new Date());
    Realm.open({schema: [orderScheme], schemaVersion: 1})
    .then(realm => {
      realm.write(() => {
        realm.create('Orders', {
          price: price.toString(),
          name: names,
          date: d.toString()
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  formatDate(date) {
    var monthNames = [
      "Ocak", "Şubat", "Mart",
      "Nisan", "Mayıs", "Haziran", "Temmuz",
      "Ağustos", "Eylül", "Ekim",
      "Kasım", "Aralık"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  render() {
    if(this.state.isEmpty){
      return (
        <View style={styles.container}>
          <Text>Sepetinizde Ürün Yok</Text>
        </View>
      );
    }
    return(
      <Container>        
        <Content>
          <List style={{ backgroundColor: '#ffffff' }}>
            <ListItem>
              <Body>
                <Grid>
                  <Col>
                    <Text>Sipariş Tutarı:</Text>
                  </Col>
                  <Col>
                    <Text>{this.state.total} TL</Text>
                  </Col>
                </Grid>
              </Body>
            </ListItem>
          </List>
            <Form>               
              {this.renderUserForm()}
              <Button success style={{ margin: 5 }} onPress={() => { this.makeOrder() }} block>
                <Text>SİPARİŞİ GÖNDER</Text>
              </Button>
            </Form>

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