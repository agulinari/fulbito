import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './store/reducers/auth';
import playersReducer from './store/reducers/players';
import matchesReducer from './store/reducers/matches';
import enlistReducer from './store/reducers/enlist';
import votesReducer from './store/reducers/votes';
import statusReducer from './store/reducers/status';
import  { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import NavigationContainer from './navigation/NavigationContainer';
//import { enableScreens } from 'react-native-screens';

//enableScreens();

const rootReducer = combineReducers({
  auth: authReducer,
  players: playersReducer,
  matches: matchesReducer,
  enlist: enlistReducer,
  votes: votesReducer,
  status: statusReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setFontLoaded(true)} 
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
}
