import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import qs from 'qs';

import * as actions from './../actions';

const NO_IMAGE = 'http://epaper2.mid-day.com/images/no_image_thumb.gif';
const IMAGE = 'https://maps.googleapis.com/maps/api/place/photo?';
const IMAGE_QUERY_PARAMS = {
    photoreference: '',
    key: 'AIzaSyCTF_ySDkeHE4Dav52HmzP3VM3__EqgpAQ',
    maxwidth: 250,
    maxheight: 250
};

class Places extends Component {
   static navigationOptions = () => {
      return {
         tabBarLabel: 'PLACES'
      };
   }

   onLikePress(places) {
      this.props.bookmarkPlaces(places);
   }

   placesImage(places, index) {
      try {
         const params = qs.stringify({
            ...IMAGE_QUERY_PARAMS,
            photoreference: places.photos[0].photo_reference,
         }); 
         const uri = IMAGE + params;
         console.log(index, uri);
         return {
              uri
         };
      } catch (error) {
          return {
              uri: NO_IMAGE
         };
      }
   }

   showPlaces() {
      // console.log(this.props.places);
      return this.props.places.results.map((places) => {
         return (
            <Card key={places.id} title={places.name}>
               <View style={{ height: 300 }}>
                  <View style={styles.subHeaderStyle}>
                     <Text style={styles.textStyle}>Open Hours: </Text>
                     <Text style={styles.textStyle}>Rating: {places.rating}</Text>
                  </View>
                  
                  <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                  <Image
                     source={this.placesImage(places)}
                     style={{ width: '100%', height: 280 }}
                  />
                  </View>
               </View>

               <View style={styles.detailContainer}>
                  <Text style={styles.textStyle}>{places.vicinity}</Text>
               </View>

               <Button
                  buttonStyle={styles.buttonStyle}
                  title='BOOKMARK NOW'
                  backgroundColor='rgba(0, 122, 255, 1)'
                  onPress={this.onLikePress.bind(this, places)}
               />
            </Card>
         );
      });
   }

   render() {
      return (
         <ScrollView>
            {this.showPlaces()}
         </ScrollView>
      );
   }
}

const styles = {
   detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 15
   },
   subHeaderStyle: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 15
   },
   textStyle: {
      fontWeight: 'bold'
   },
   buttonStyle: {
      marginTop: 10
   }
};

const mapStateToProps = (state) => {
   return {
      places: state.places
   };
};


export default connect(mapStateToProps, actions)(Places);
