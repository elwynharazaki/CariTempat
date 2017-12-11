import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';
import { Card } from 'react-native-elements';

class Locate extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: navigation.state.params.name
      };
   }

   state = {
      region: {
         latitude: this.props.navigation.state.params.coordinate.lat,
         longitude: this.props.navigation.state.params.coordinate.lng,
         latitudeDelta: 0.09,
         longitudeDelta: 0.04
      }
   }  
   
   placesOnMap() {
      return (
         <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.region}
         >
         <MapView.Marker
            coordinate={this.state.region}
            title={this.props.navigation.state.params.name}
            description={this.props.navigation.state.params.data.vicinity}
         />
         </MapView>
      );
   }

   render() {
      return (
         <View>
            {this.placesOnMap()}
         </View>
      );
   }
}

export default Locate;
