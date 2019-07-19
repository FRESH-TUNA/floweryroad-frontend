import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import Home from '../src/components/home'
import FlowerDetail from '../src/components/flowerDetail'
import MeetupList from '../src/components/meetupList'

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/meetup' component={() => <MeetupList testprops={'a'} />} />
          <Route path='/' component={() => <Home testprops={'a'} />} />
        </Switch>

        <Switch>
          <Route exact path='/meetup/flowerDetail' component={() => <FlowerDetail testprops={'a'} />} />
          <Route exact path='/flowerDetail' component={() => <FlowerDetail testprops={'a'} />} />
        </Switch>
        
    </div>
  );
}

export default App;
