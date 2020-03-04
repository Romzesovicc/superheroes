import { success, error } from 'redux-saga-requests';
import {
  ADD_HERO, DELETE_HERO, GET_HERO, GET_HEROES, UPDATE_HERO,
} from './types';

const initialState = {
  single: null,
  data: [],
  loading: false,
  error: null,
  show: false,
  message: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HERO:
    case GET_HEROES:
    case UPDATE_HERO:
      return { ...state, error: null, loading: true };

    case success(GET_HERO):
      return {
        ...state, single: action.data.data, loading: false, show: true,
      };

    case success(GET_HEROES):
      return {
        ...state, data: action.data.data, loading: false,
      };
    case success(ADD_HERO):
      return {
        ...state, message: action.data.data, loading: false,
      };
    case success(UPDATE_HERO):
      return {
        ...state, single: action.data.data, loading: false,
      };
    case error(GET_HERO):
    case error(GET_HEROES):
    case error(ADD_HERO):
    case error(DELETE_HERO):
    case error(UPDATE_HERO):
      return {
        ...state, loading: false, error: action.error,
      };

    default: return state;
  }
};

export default reducer;
