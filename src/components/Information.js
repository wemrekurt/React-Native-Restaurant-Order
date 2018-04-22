import React, { Component } from 'react';
import {
  StyleSheet,
  View
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

export default class Information extends React.Component {
  static navigationOptions = {
    headerTitle: 'Bilgilerim',
    title: 'Bilgilerim'
  }

  state = {isEmpty: true, basket: {}, total: 0, phone: "", name: "", address: "", customer_id: ""}
  
  componentDidMount(){
    storage.load({ key: 'info' }).then(ret => {
      console.log(ret);
      this.setState({ phone: ret.phone, name: ret.name, address: ret.address, customer_id: ret.id });
    })
  }

  clearData(){
    storage.remove({
      key: 'info'
    }).then( ret => {
      this.setState({phone: "", name: "", address: "", customer_id: ""});
      alert('Verileriniz Temizlendi');
    });
  }

  updateInformation(){
    storage.save({
      key: 'info',
      data: {
        id: "",
        phone:  this.state.phone, 
        name:   this.state.name,
        address:this.state.address        
      }
    });
  }

  render() {
    return(
      <Container>        
        <Content>
          <Form>
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
            <Grid>
              <Col>
                <Button success style={{ margin: 5 }} onPress={() => { this.updateInformation() }} block>
                  <Text>BİLGİLERİMİ GÜNCELLE</Text>
                </Button>
              </Col>
              <Col>
                <Button danger style={{ margin: 5 }} onPress={() => { this.clearData() }} block>
                  <Text>BENİ UNUT</Text>
                </Button>
              </Col>
            </Grid>
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
