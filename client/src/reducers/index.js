import { combineReducers } from 'redux';

import articles from './articles';
import auth from './auth';
import creditCard from './creditCard';
import questions from './questions';
import answers from './answers';

export default combineReducers({
  articles,
  auth,
  creditCard,
  questions,
  answers,
});