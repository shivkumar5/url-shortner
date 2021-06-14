import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './component/Home.js';
import UrlList from './component/UrlList.js';

const Routes = () => {
  return (
    <Router>
     <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/url-list">
          <UrlList />
        </Route>
      </Switch>
    </Router>
    
  )
}

export default Routes
