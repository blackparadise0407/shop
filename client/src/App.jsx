import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  ErrorPage,
  RegisterPage,
  StorePage,
  ConfirmPage,
  ResetPage,
  ProductPage,
  CheckoutPage
} from './pages';
import { Header } from './components';
import { loadUser } from './redux/actions/authAction';
import { clearErr } from './redux/actions/errorAction';
import { loadCart, loadAuthCart } from './redux/actions/cartAction.js';

import { ClipSpinner } from './utils/Loader';
const App = ({
  isLoading,
  isAuthenticated,
  loadCart,
  loadUser,
  loadAuthCart,
  clearErr
}) => {
  useEffect(() => {
    loadUser();
    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        loadAuthCart();
        //clearErr();
      } else {
        loadCart();
      }
    }
  }, [loadUser, loadAuthCart, loadCart, isAuthenticated])
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <HomePage />} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/reset" exact component={ResetPage} />
        <Route path="/store" component={StorePage} />
        <Route path="/confirm/:id" component={ConfirmPage} />
        <Redirect from="/product" exact to="/" />
        <Route path="/product" render={() => <ProductPage />} />
        <Route path="/checkout" render={() => <CheckoutPage />} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading
})

export default connect(
  mapStateToProps,
  { loadUser, loadCart, loadAuthCart, clearErr }
)(App);
