import axios from 'axios';
import { Location } from 'expo';
import qs from 'qs';

import {
   GET_PLACES,
   BOOKMARK_PLACES,
   RESET_BOOKMARKS
} from './types';

const PLACES_ROOT_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const PLACES_QUERY_PARAMS = {
   key: 'AIzaSyCTF_ySDkeHE4Dav52HmzP3VM3__EqgpAQ',
   radius: 1000
};

const buildPlacesUrl = (location, keyword) => {
   const params = qs.stringify({ ...PLACES_QUERY_PARAMS,
            location: `${location.latitude},${location.longitude}`,
            keyword: keyword
   });
   console.log(PLACES_ROOT_URL + params);
   return PLACES_ROOT_URL + params;
};

export const getPlaces = (region, keyword, callback) => {
   return async (dispatch) => {
      try {
         const location = region;
         
         const url = buildPlacesUrl(location, keyword);
         
         const response = await axios.get(url);
            dispatch({
               type: GET_PLACES,
               payload: response.data
            });
            console.log(response.data);
         callback();
      } catch (error) {
         console.log(error);
      }
   };
};

export const bookmarkPlaces = (places) => {
   return {
      type: BOOKMARK_PLACES,
      payload: places
   };
};

export const resetBookmarks = () => {
   return {
      type: RESET_BOOKMARKS
   };
};
