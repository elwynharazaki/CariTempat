import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './../actions';

class Setting extends Component {
   render() {
      return (
         <View>
            <Button
               title='Reset All Bookmarks'
               large
               icon={{ name: 'delete-forever' }}
               backgroundColor='rgba(0, 122, 255, 1)'
               buttonStyle={{ marginTop: 10 }}
               onPress={this.props.resetBookmarks}
            />
         </View>
      );
   }
}

export default connect(null, actions)(Setting);
