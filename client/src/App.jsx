import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store.js';
import { HomePage, LoginPage, ErrorPage, RegisterPage } from './pages';
import { Provider } from 'react-redux'
import { getProducts } from './redux/actions/productAction';
import { loadUser } from './redux/actions/authAction';
const App = () => {
  useEffect(() => {
    store.dispatch(getProducts())
  }, [])
  return (
    <Provider store={store} >
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
