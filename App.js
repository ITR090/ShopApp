import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import {Provider} from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import Rootreducers from './reducers/index';
import ShopNav from './navigation/shopNavigation'
import ReduxThunk from 'redux-thunk'
const store =createStore(Rootreducers,applyMiddleware(ReduxThunk))
export default function App() {
  return (
  <Provider store={store}>
    <ShopNav/>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
