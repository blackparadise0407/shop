import React, { useEffect } from 'react';
import { connect } from 'react-redux';
//import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  ErrorPage,
  RegisterPage,
  StorePage,
  ConfirmPage,
  ResetPage,
  ProductPage,
  CheckoutPage,
  DashboardPage
} from './pages';
import { Header } from './components';
import { loadUser } from './redux/actions/authAction';
import { loadCart, loadAuthCart } from './redux/actions/cartAction.js';
import history from './utils/history';
// import ProtectedRoute from './utils/AuthRoute';

const App = ({
  isLoading,
  isAuthenticated,
  loadCart,
  loadUser,
  loadAuthCart,
}) => {
  useEffect(() => {
    loadUser();
    if (isAuthenticated) {
      loadAuthCart();
    } else {
      loadCart();
    }

  }, [isAuthenticated, loadAuthCart, loadCart, loadUser])
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact render={() => <HomePage />} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/reset" exact component={ResetPage} />
        <Route path="/store" component={StorePage} />
        <Redirect from="/user" exact to="/user/dashboard" />
        <Route path="/user/dashboard" component={DashboardPage} />
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
  { loadUser, loadCart, loadAuthCart }
)(App);
