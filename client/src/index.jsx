import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './components/App';
import MainPage from './components/MainPage';

import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/main">
          <MainPage />
        </Route>
      </Switch>
    </Router>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
