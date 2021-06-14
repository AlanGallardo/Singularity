import {
  START_LOADING,
  END_LOADING,
  FETCH_ANSWER,
  CREATE_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getAnswer = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchAnswer(id);
    dispatch({ type: FETCH_ANSWER, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createAnswer = (answer) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createAnswer(answer);

    dispatch({ type: CREATE_ANSWER, payload: data });
    
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updateAnswer = (id, answer) => async (dispatch) => {
  try {
    const { data } = await api.updateAnswer(id, answer);
    dispatch({ type: UPDATE_ANSWER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id) => async (dispatch) => {
  try {
    await api.deleteAnswer(id);
    dispatch({ type: DELETE_ANSWER, payload: id });
  } catch (error) {
    console.log(error);
  }
};
