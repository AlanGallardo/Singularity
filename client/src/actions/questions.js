import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL_QUESTIONS,
  FETCH_QUESTION,
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getQuestions = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchQuestions();
    dispatch({ type: FETCH_ALL_QUESTIONS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchQuestion(id);
    dispatch({ type: FETCH_QUESTION, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createQuestion = (question, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createQuestion(question);

    dispatch({ type: CREATE_QUESTION, payload: data });
    
    history.push(`/forum/${data._id}`);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateQuestion = (id, question) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestion(id, question);
    dispatch({ type: UPDATE_QUESTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id) => async (dispatch) => {
  try {
    await api.deleteQuestion(id);
    dispatch({ type: DELETE_QUESTION, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const answerQuestion = (id, answer) => async (dispatch) => {
  try {
    const { data } = await api.answerQuestion(id, answer);
    dispatch({ type: UPDATE_QUESTION, payload: data });
  } catch (error) {
    console.log(error);
  }
};