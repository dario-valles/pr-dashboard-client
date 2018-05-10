import * as actionTypes from '../actions/authActionTypes';

export const STATE_KEY = 'currentUser';

const initialState = {
  current_User: {},
  isAuthenticated: false,
  error: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
      case actionTypes.INJECT:
        return {
          ...state,
          isAuthenticated: true,
          currentUser: payload.user
        }
    
      case actionTypes.LOGOUT:
        return {
          ...initialState
        }

      default:
        return state;
    }
}
