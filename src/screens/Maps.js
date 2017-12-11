import React, { Component } from 'react';
import { View } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import { Button, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from './../actions';

class Maps extends Component {
   static navigationOptions = () => {
      return {
         tabBarLabel: 'MAPS'
      };
   }

   state = {
      region: {
         latitude: -6.2264329, 
         longitude: 106.7997448,
         latitudeDelta: 0.09,
         longitudeDelta: 0.04
      },
      keyword: '',
      locationGranted: false,
      gotInitialRegion: false
   }

   async componentDidMount() {
      const result = await Permissions.askAsync(Permissions.LOCATION);

      if (result.status === 'granted') {
         this.setState({ locationGranted: true });
         this.getCurrentLocation();
      }
   }

   onRegionChangeComplete(region) {
      this.setState({ region });
   }

   onSearchKeyword(text) {
      this.setState({ keyword: text });
   }

   onSearchPress() {
      this.props.getPlaces(
         this.state.region, this.state.keyword, () => {

         }
      );
   }

   onGoPlaces() {
      this.props.getPlaces(
         this.state.region, this.state.keyword, () => {
            this.props.navigation.navigate('places');
         }
      );
   }

   async getCurrentLocation() {
      const location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      this.setState({
         region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
         },
         gotInitialRegion: true 
      });
   }

   showMarker() {
      // console.log(this.props.places);
      if (this.props.places.results.length > 0) {
         return this.props.places.results.map((places, index) => {
            // console.log(places);
            return (
               <MapView.Marker
                  key={index}
                  pinColor={'green'}
                  title={places.name}
                  description={places.vicinity}
                  coordinate={{
                     latitude: places.geometry.location.lat,
                     longitude: places.geometry.location.lng
                  }}
               />
            );
         });
      }
   }
   renderMap() {
      if (this.state.gotInitialRegion === true) {
      return (
         <MapView
            style={{ flex: 1 }}
            initialRegion={this.state.region}
            onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
         >
            <MapView.Marker
               coordinate={this.state.region}
               title='Your Position'
               description='Your Current Position'
            />
            {this.showMarker()}
         </MapView>
      );
   }
   }
   render() {
      return (
         <View style={{ flex: 1 }}>
            
            {this.renderMap()}
            
            <View style={styles.formInputContainer}>
               <FormInput
                  placeholder='SEARCH PLACES'
                  underlineColorAndroid='transparent'
                  onChangeText={this.onSearchKeyword.bind(this)}
               />
            </View>

            <View style={styles.buttonContainer}>
               <View style={{ flex: 1 }}>
               <Button
                  title='SEARCH'
                  medium
                  color='#FFFFFF'
                  backgroundColor='rgba(0, 122, 255, 1)'
                  icon={{ name: 'search' }}
                  onPress={this.onSearchPress.bind(this)}
               />
               </View>
               
               <View style={{ flex: 1 }}>
               <Button
                  title='VIEW AS LIST'
                  medium
                  color='#FFFFFF'
                  backgroundColor='rgba(51,124,22,1.00)'
                  icon={{ name: 'list' }}
                  onPress={this.onGoPlaces.bind(this)}
               />
               </View>
            </View>
         </View>
      );
   }
}

const styles = {
   buttonContainer: {
      alignSelf: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 20
   },
   formInputContainer: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      position: 'absolute',
      top: 20,
      left: 20,
      right: 20
   }
};

const mapStateToProps = (state) => {
   return {
      places: state.places
   };
};

export default connect(mapStateToProps, actions)(Maps);
