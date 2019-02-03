import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import App  from './App.js';
import Gallery from './Components/Gallery';
class Routes extends React.Component{
    render(){
        return(
          <Router>
            <Switch>

                      <Route path='/gallery' component={Gallery}/>
                      <Route path='/' component={App} />
           </Switch>

           </Router>

        );
    }
}
export default Routes;
