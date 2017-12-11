import { combineReducers } from 'redux';

import places from './places_reducer';
import bookmarks from './bookmarks_reducer';

export default combineReducers({
   places,
   bookmarks
});
