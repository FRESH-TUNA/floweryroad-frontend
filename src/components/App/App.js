import React from 'react';
import '../../css/components/App.css';
import { Route, Switch } from 'react-router-dom'

import Home from '../../routes/home/home'
import SearchResult from '../../routes/search/searchFlower'
import Signin from '../../routes/signin'
import Signup from '../../routes/signup'
import FlowerDetail from '../../routes/flowerDetail'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/search' component={() => <SearchResult/>} />  
        
        <Route path='/signin' component={() => <Signin/>} />  
        <Route path='/signup' component={() => <Signup/>} />  

        <Route path='/flowers/:id' component={() => <FlowerDetail/>} /> 
        
        <Route path='/' component={() => <Home testprops={'a'} />} />
      </Switch>
    </div>
  );
}

export default App;
