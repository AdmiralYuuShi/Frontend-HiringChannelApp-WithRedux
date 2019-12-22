import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './public/redux/store'

import Main from './web/Main'

function App() {
  return (
    <>
      <Main/>
    </>
  );
}

function Root() {
  return(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

export default Root;
