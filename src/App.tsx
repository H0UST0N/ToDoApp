import React from 'react';
import { ToDosProvider } from './contexts/ToDosContext';

import Routes from './routes';

const App = () => {
  return (
    <ToDosProvider>
      <Routes />
    </ToDosProvider>
  );
};

export default App;
