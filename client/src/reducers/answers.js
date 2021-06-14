import {
  START_LOADING,
  END_LOADING,
  FETCH_ANSWER,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
} from '../constants/actionTypes';

const answerReducer = (state = { isLoading: true, answers: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ANSWER:
      return { ...state, answer: action.payload };
    case CREATE_ANSWER:
      return { ...state, answers: [...state.answers, action.payload] };
    case UPDATE_ANSWER:
      return { ...state, answers: state.answers.map((answer) => (answer._id === action.payload._id ? action.payload : answer)) };
    case DELETE_ANSWER:
      return {...state, answers: state.answers.filter((answer) => answer._id !== action.payload) };
    default:
      return state;
  }
};

export default answerReducer;
