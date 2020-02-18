import React from 'react';
import './App.css';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import { createStore } from 'redux';
import { wines } from './reducers';
import WineSearchBar from './WineSearchBar';
import WineForm from './containers/WineFormContainer';
import WineList from './containers/WineListContainer';
import { Provider } from 'react-redux';



const store = createStore(wines, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Provider store={store}>
        <WineForm />
        <WineList />
      </Provider>
      <Footer />
    </div>
  );
}

export default App;
