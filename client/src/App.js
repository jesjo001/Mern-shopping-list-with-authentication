import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShopingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <div className="App">
          <AppNavbar />
          <Container style={{ marginTop: "2rem" }}>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
