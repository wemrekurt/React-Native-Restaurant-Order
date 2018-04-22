import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Thumbnail, 
  Text, 
  Body,
  Spinner
} from 'native-base';

import { NavigationActions } from 'react-navigation';
import Storage from 'react-native-storage';
import axios from 'axios';
import Basket from './Basket';


export default class MenuList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Menü',
    headerRight:  <Button title={"Sepet"} onPress={() => {navigation.navigate('Basket')}} />
  });

  state = { data: [], loading: true };

  getItems() {
    storage.load({ key: 'cats' }).then(ret => {
			this.setState({ data: ret, loading: false });
    }).catch(err => {
      axios.get('http://api.bado.com.tr/categories.json')
      .then(
        response => {
          this.setState({
            data: this.state.data.concat(response.data),
            loading: false
          });
          storage.save({
            key: 'cats',
            data: this.state.data
          });
        }
      );
    });   
  }
  
  UNSAFE_componentWillMount(){
  }

  componentDidMount(){
    this.getItems();       
  }
  
  goProduct(cat_id, title){
    this.props.navigation.navigate('Products', {headerTitle: title, title: title, cat_id: cat_id });
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
          <List 
            style={styles.list}
            dataArray={this.state.data}
            renderRow={(item) =>
              <ListItem>
                <TouchableOpacity style={{ flex: 1, justifyContent:'center' }} onPress={() => this.goProduct(item.id, item.name)}>
                  <Body>
                    <Text>{item.name}</Text>
                  </Body>
                </TouchableOpacity>
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
  }
});