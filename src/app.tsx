import React from 'react';

import Routes from './navigator/root-navigator';
import {Provider} from 'react-redux';
import {store} from './stores';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
