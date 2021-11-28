import React from 'react';
import './App.css';
import { Autosuggest } from './common/sharedComponents/Autosuggest/Autosuggest';
import { Dummy } from './common/sharedComponents/Dummy/Dummy';
import { Header } from './features/header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Autosuggest suggestions={[{value:"stuff", key:1234}, {value:"news", key:3245}, {value:"nothing", key:5867}]}/>

    </div>
  );
}

export default App;
