import React from 'react';
import logo from './logo.svg';
import './App.css';

import { SharedStateProvider } from './store';
import Counter from './Counter';
import TextBox from './TextBox';

const App = () => (
  <SharedStateProvider>
    <div className="App">
      <header className="App-header">
        <Counter />
        <TextBox />
      </header>
    </div>
  </SharedStateProvider>
);

export default App;