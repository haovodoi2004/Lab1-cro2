import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import ThuChiScreen from './src/screens/thuChiScreen/ThuChiScreen';

const App = () => {
  return (
    <Provider store={store}>
      <ThuChiScreen />
    </Provider>
  );
}

export default App;
