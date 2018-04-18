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


export default class Basket extends React.Component {
  static navigationOptions = {
    headerTitle: 'Sepet'
  }
  state = {isEmpty: true, basket: {}}

  componentDidMount(){
    storage.load({ key: 'basket' }).then(ret => {
      this.setState({ isEmpty: false, basket: ret });      
    }).catch(err => {
      
    });
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
          <List dataArray={this.state.basket}
            renderRow={(item) =>
              <ListItem>
                <Thumbnail square size={80} source={{ uri: 'https://www.bado.com.tr/content/small/'+ item.item.fotograf +'-300x300.png' }} />
                <Body>
                  <Grid>
                    <Col>
                      <Text>{item.item.isim}</Text>
                      <Text note>{item.item.fiyat} TL</Text>
                    </Col>
                    <Col>
                      <Text>{item.size}</Text>
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