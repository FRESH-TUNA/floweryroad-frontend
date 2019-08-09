import React from 'react';
import '../../css/components/App.css';
import { Route, Switch } from 'react-router-dom'

import Home from '../../routes/home/home'
import SearchResult from '../../routes/search/searchFlower'
import Signin from '../../routes/signin'
import Signup from '../../routes/signup'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/search' component={() => <SearchResult testprops={'a'} />} />  
        <Route path='/signin' component={() => <Signin testprops={'a'} />} />  
        <Route path='/signup' component={() => <Signup testprops={'a'} />} />  
        <Route path='/' component={() => <Home testprops={'a'} />} />
      </Switch>
    </div>
  );
}

export default App;
