import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Expo from 'expo';
import { Provider } from 'react-redux';

import Maps from './src/screens/Maps';
import Places from './src/screens/Places';
import Bookmarks from './src/screens/Bookmarks';
import Locate from './src/screens/Locate';
import Setting from './src/screens/Setting';
import store from './src/store';

class App extends Component {
   render() {
      const MainNavigator = TabNavigator({
         maps: { screen: Maps },
         places: { screen: Places },
         bookmarks: {
            screen: StackNavigator({
               bookmarks: { screen: Bookmarks },
               setting: { screen: Setting },
               locate: { screen: Locate }
            })
         }
      }, {
         tabBarPosition: 'bottom',
         lazy: true
      });

      return (
         <Provider store={store}>
            <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
               <MainNavigator />
            </View>
         </Provider>
      );
   }
}

export default App;
