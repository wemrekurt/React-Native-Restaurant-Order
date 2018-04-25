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
  Icon,
  SwipeRow,
  Button,
  Spinner
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';


export default class Basket extends React.Component {
  static navigationOptions = {
    headerTitle: 'Sepet',
    title: 'Menü',
    headerStyle: {
      backgroundColor: 'tomato'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    }
  }
  state = {isEmpty: false, loading: true, basket: {}, total: 0}

  componentDidMount(){
    storage.load({ key: 'basket' }).then(ret => {
      this.setState({ isEmpty: false, basket: ret });
      let tot = 0;
      Object.keys(ret).forEach(item => { 
        tot += ret[item].price;
      });
      this.setState({ total: tot, loading: false });
    }).catch(err => {
      this.setState({ isEmpty: true });
    });
    console.log(this.state.basket);
  }

  clearBasket(){
    storage.remove({
      key: 'basket'
    });
    this.setState({ basket: {}, isEmpty: true, total: 0 });
  }

  render() {
    if(this.state.isEmpty){
      return (
        <View style={styles.container}>
          <Text>SEPET BOŞ!</Text>
        </View>
      );
    }else{
      if(this.state.loading){
        return(
          <View style={styles.container}>
            <Spinner color='red' />
          </View>
        );
      }
      return(
        <Container>        
          <Content>          
            <List style={{ backgroundColor: '#fff' }} dataArray={this.state.basket}
              renderRow={(item) =>
                <ListItem>
                  <Body style={{ height: 80, padding: 10 }}>
                    <Grid>
                      <Col style={{ width: 80 }}>
                        <Thumbnail size={80} source={{ uri: 'https://www.bado.com.tr/content/small/'+ item.item.fotograf +'-300x300.png' }} />
                      </Col>
                      <Col>
                        <Text>{item.item.isim}</Text>
                        <Text note>{item.item.fiyat} TL</Text>
                      </Col>
                      <Col>
                        <Text>{item.size} Adet</Text>
                        <Text>{item.price} TL</Text>
                      </Col>
                    </Grid>
                  </Body>
                </ListItem>              
              }>
            </List>
            <List style={{ backgroundColor: '#ffffff' }}>
              <ListItem>
                <Body>
                  <Grid>
                    <Col>
                      <Text>Toplam:</Text>
                    </Col>
                    <Col>
                      <Text>{this.state.total} TL</Text>
                    </Col>
                  </Grid>
                </Body>
              </ListItem>
            </List>

            <Grid>
                <Col>
                  <Button success style={{ margin: 5 }} onPress={() => { this.props.navigation.navigate('Order') }} block>
                    <Text>SİPARİŞ VER</Text>
                  </Button>
                </Col>
                <Col>
                  <Button danger style={{ margin: 5 }} onPress={() => { this.clearBasket() }} block>
                    <Text>SEPETİ TEMİZLE</Text>
                  </Button>
                </Col>
              </Grid>
          </Content>
        </Container>
      );
    }
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