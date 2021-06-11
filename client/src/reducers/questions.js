import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL_QUESTIONS,
  FETCH_QUESTION,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from '../constants/actionTypes';

const questionReducer = (state = { isLoading: true, questions: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL_QUESTIONS:
      return { ...state, questions: action.payload.data };
    case FETCH_QUESTION:
      return { ...state, question: action.payload };
    case CREATE_QUESTION:
      return { ...state, questions: [...state.questions, action.payload] };
    case UPDATE_QUESTION:
      return { ...state, questions: state.questions.map((question) => (question._id === action.payload._id ? action.payload : question)) };
    case DELETE_QUESTION:
      return {...state, questions: state.questions.filter((question) => question._id !== action.payload) };
    default:
      return state;
  }
};

export default questionReducer;
