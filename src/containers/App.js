import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Index from '../views/Index';
import '../styles/styles.scss';

const App = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Index} />
    </div>
  </BrowserRouter>
);

export default App;
