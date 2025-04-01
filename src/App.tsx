import React from 'react';
import logo from './logo.svg';
import './App.css';
import AgreementRenderer from './components/AgreementRenderer';

// Update this for testing mentions
const sampleInitialValue = {
  "Contract Date": "November 17, 2021",
  "Term": "1 year",
  "Governing Law Jurisdiction": "Auckland",
  "Provider": "Blackmoon",
  "Client": "James Inc"
}

function App() {
  return (
    <div className="App">
      <AgreementRenderer value={sampleInitialValue} />
    </div>
  );
}

export default App;
