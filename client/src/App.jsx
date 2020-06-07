import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './redux/store.js';
import { HomePage, LoginPage, ErrorPage, RegisterPage, StorePage } from './pages';
import { Header } from './components';
import { Provider } from 'react-redux'
import { loadUser } from './redux/actions/authAction';
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [loadUser])
  return (
    <Provider store={store} >
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/store" exact component={StorePage} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
