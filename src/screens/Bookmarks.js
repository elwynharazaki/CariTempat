import React, { Component } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import qs from 'qs';

import * as actions from './../actions';

const NO_IMAGE = 'http://us.yuneec.com/c.4198727/sca-dev-vinson/img/no_image_available.jpeg';
const IMAGE = 'https://maps.googleapis.com/maps/api/place/photo?';
const IMAGE_QUERY_PARAMS = {
    photoreference: '',
    key: 'AIzaSyCTF_ySDkeHE4Dav52HmzP3VM3__EqgpAQ',
    maxwidth: 250,
    maxheight: 250
};

class Bookmarks extends Component {
   static navigationOptions = ({ navigation }) => {
      return {
         tabBarLabel: 'BOOKMARKS',
         headerRight: (
				<Button
					title='Setting'
					backgroundColor='rgba(0,0,0,0)'
					color='rgba(0, 122, 255, 1)'
					onPress={() => navigation.navigate('setting')}
				/>
			)
      };
   }

   onButtonPress({ places, name, coordinate }) {
      this.props.navigation.navigate('locate', { places, name, coordinate });
   }

   placesImage(places) {
      try {
         const params = qs.stringify({
            ...IMAGE_QUERY_PARAMS,
            photoreference: places.photos[0].photo_reference,
         }); 
         const uri = IMAGE + params;
         console.log(uri);
         return {
              uri
         };
      } catch (error) {
          return {
              uri: NO_IMAGE
         };
      }
   }

   showBookmarks() {
      return this.props.bookmarks.map((places) => {
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
                     style={{ width: '100%', height: 230 }}
                  />
                  </View>
               </View>

               <View style={styles.detailContainer}>
                  <Text style={styles.textStyle}>{places.vicinity}</Text>
               </View>

               <Button
                  buttonStyle={styles.buttonStyle}
                  title='LOCATE'
                  backgroundColor='rgba(0, 122, 255, 1)'
                  onPress={this.onButtonPress.bind(this, {
                     places, 
                     name: places.name,
                     coordinate: places.geometry.location
                     }
                  )}
               />
            </Card>
         );
      });
   }

   render() {
      return (
         <ScrollView>
            {this.showBookmarks()}
         </ScrollView>
      );
   }
}

const styles = {
   detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 10
   },
   subHeaderStyle: {
      flexDirection: 'row',
		justifyContent: 'space-around'
   },
   textStyle: {
      fontWeight: 'bold'
   },
   buttonStyle: {
      marginTop: 10,
   }
};

const mapStateToProps = (state) => {
   return {
      bookmarks: state.bookmarks
   };
};

export default connect(mapStateToProps, actions)(Bookmarks);
