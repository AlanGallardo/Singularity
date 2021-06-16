import {
  FETCH_ALL,
  FETCH_ARTICLE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
} from '../constants/actionTypes';

const articleReducer = (state = { isLoading: true, articles: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return { 
        ...state,
        articles: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_ARTICLE:
      return { ...state, article: action.payload };
    case FETCH_BY_SEARCH:
      return { ...state, articles: action.payload };
    case CREATE:
      return { ...state, articles: [...state.articles, action.payload] };
    case UPDATE:
      return { ...state, articles: state.articles.map((article) => (article._id === action.payload._id ? action.payload : article)) };
    case DELETE:
      return {...state, articles: state.articles.filter((article) => article._id !== action.payload) };
    default:
      return state;
  }
};

export default articleReducer;