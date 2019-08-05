import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Header from './point_mall/Header'

import Home from './point_mall/Home';
import Login from './point_mall/Login';
import MyItems from './point_mall/MyItems'
import ItemDetail from './point_mall/ItemDetail'
import CartItems from './point_mall/CartItems'

import Footer from './point_mall/Footer'


function App() {
  return (
    <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/me/items' component={MyItems} />
          <Route exact path='/items/:itemId' component={ItemDetail} />
          <Route exact path='/cates/:cateId' component={Home} />
          <Route exact path='/cart/items' component={CartItems} />
        </Switch>
        <Footer />
    </Router>
  );
}

export default App;
