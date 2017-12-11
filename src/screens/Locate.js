import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView } from 'expo';

class Locate extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         title: navigation.state.params.places.name
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
   
   showLocation() {
      return (
            <MapView 
                style={{ flex: 1 }}
                initialRegion={this.state.region}
            >
               <MapView.Marker
                    coordinate={this.state.region}
                    title={this.props.navigation.state.params.name}
                    description={this.props.navigation.state.params.places.vicinity}
               />
            </MapView>
      );
   }

   render() {
      return (
         <View style={{ flex: 1 }}>
            {this.showLocation()}
         </View>
      );
   }
}

export default Locate;
