import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants';

import {
   BOOKMARK_PLACES,
   RESET_BOOKMARKS
} from './../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case REHYDRATE:
         return action.payload.bookmarks || INITIAL_STATE;
      case BOOKMARK_PLACES:
         const newArray = _.uniqBy([
            ...state, action.payload
         ], 'id');
         const message = newArray.length === state.length
                              ? 'Place already bookmarked'
                              : 'Place has been bookmark';
         alert(message);
         return newArray;
      case RESET_BOOKMARKS:
         return INITIAL_STATE;
      default:
         return state;
   }
};
