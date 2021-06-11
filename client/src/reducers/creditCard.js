import {
  FETCH_CREDITCARD,
  CREATE_CREDITCARD,
  DELETE_CREDITCARD,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';

const creditCardReducer = (state = { isLoading: true, creditCard: [] }, action) => {
  switch(action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_CREDITCARD:
      return { ...state, creditCard: action.payload };
    case CREATE_CREDITCARD:
      return { ...state, creditCard: [...state.creditCard, action.payload] };
    case DELETE_CREDITCARD:
      return {...state, creditCard: state.creditCard.filter((card) => card._id !== action.payload) };
    default:
      return state;
  }
};

export default creditCardReducer;
