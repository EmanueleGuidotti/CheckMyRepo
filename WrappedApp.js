import React from 'react';
import App from './App';
import {GlobalProvider} from './context/context';

const WrappedApp = props => {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
};

export default WrappedApp;
