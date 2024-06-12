import React from 'react';

import Routes from './navigator/root-navigator';
import {Provider} from 'react-redux';
import {store} from './stores';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Routes />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
