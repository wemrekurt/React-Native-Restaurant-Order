import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';


import Realm from 'realm';

const orderScheme = {
  name: 'Orders',
  properties: {
    price: 'string',
    name: 'string',
    date: 'string'
  }
};

export default class OldOrders extends React.Component {
  static navigationOptions = {
    headerTitle: 'Geçmiş Siparişler',
    title: 'Anasayfa',
    headerStyle: {
      backgroundColor: 'tomato'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  }

  state = {orders: []}
  
  componentWillMount(){

  }
  
  componentDidMount(){
    Realm.open({schema: [orderScheme], schemaVersion: 1})
    .then(realm => {
      const arrayResults = _.values(realm.objects('Orders'))
      this.setState({ orders: arrayResults })
     })
    .catch(error => {
      
    });
  }
  
  
  render() {
    if(this.state.orders.length > 0){
      return(
        <Container>
          <Content>
            <Card 
              dataArray={this.state.orders}
              renderRow={(value,key) => 
              <CardItem>
                <Body>
                  <Text>
                    {value.name} - Toplam: {value.price} TL
                  </Text>

                  <Text>
                    {value.date}
                  </Text>
                </Body>
              </CardItem>
            }>
            
          </Card>
          </Content>
        </Container>
      );
    }
    return(
      <View style={styles.container}>
        <Text>Daha önce hiç sipariş vermemişsiniz.</Text>
      </View>
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