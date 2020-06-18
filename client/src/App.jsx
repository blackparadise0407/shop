import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store.js';
import { HomePage, LoginPage, ErrorPage, RegisterPage, StorePage, DetailProductPage, ConfirmPage } from './pages';
import { Header } from './components';
import { loadUser } from './redux/actions/authAction';
import { clearErr } from './redux/actions/errorAction';

import { ClipSpinner } from './utils/Loader';
const App = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated;
  const isLoading = store.getState().auth.isLoading;
  useEffect(() => {
    store.dispatch(loadUser())
    if (isAuthenticated) clearErr();
  }, [isAuthenticated])
  if (isLoading) return (<ClipSpinner />)
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
        <Route path="/store" exact component={StorePage} />
        <Route path="/products/:productID" exact component={DetailProductPage} />
        <Route path="/confirm/:id" exact component={ConfirmPage} />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
