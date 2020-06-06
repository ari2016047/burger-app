import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  render() {
    return (
      <div >
        <Layout>
          <Switch>
            {/* only checkout and burgerbuilder will recive history props */}
            <Route path="/checkout" component={Checkout}/>
            <Route path="/" component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
