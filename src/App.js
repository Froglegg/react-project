import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

// Routes to be added


// import 
// /ratedwines
// profile 
// import Profile './Profile'
// import ViewRatedWines from './ViewRatedWines';
// /myfavorites
// import MyFavorites from './MyFavorites';



import LoginForm from './containers/LoginFormContainer';
import SignUpForm from './containers/SignUpFormContainer';

import { createStore, combineReducers } from 'redux';
import { wines, wineSearch, user } from './reducers';
import WineSearch from './containers/WineSearchContainer';
import WineForm from './containers/WineFormContainer';
import WineList from './containers/WineListContainer';
import WineSearchResults from './containers/WineSearchContainer';

import { Provider } from 'react-redux';


const rootReducer = combineReducers({wines, wineSearch, user})
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



function App() {
  return (
    <Router>
        <Provider store={store}>
    <div className="App">
      <div className="content-container">

    <Header 
      />
      <Switch>
          
        <Route path="/">
          <LoginForm /> 
        </Route>

        <Route path="/signup">
          <SignUpForm />
        </Route>

        {/* <Route path="/profile">
            <Profile />
        </Route> */}



        <Route path="/home">
            <Content />
            <WineForm />
            <WineList />
        </Route>

        {/* <Route path="/myfavorites">
          <MyFavorites />
        </Route>

        <Route path="/allwines">
          <ViewRatedWines />
        </Route> */}
        
        {/* <WineSearch /> */}
  
    </Switch>
      <Footer />
      </div>
    </div>
      </Provider>
      
    </Router>
  );
}

export default App;
