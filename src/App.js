import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'

import Home from './components/home'
import MeetupList from './components/meetupList'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/meetup' component={() => <MeetupList testprops={'a'} />} />  
        <Route path='/' component={() => <Home testprops={'a'} />} />
      </Switch>
    </div>
  );
}

export default App;
