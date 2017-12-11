import { GET_PLACES } from './../actions/types';

const INITIAL_STATE = { result: [] };

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case GET_PLACES:
         return action.payload;
      default:
         return state;
   }
};
