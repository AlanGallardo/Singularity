import {
  FETCH_CREDITCARD,
  CREATE_CREDITCARD,
  DELETE_CREDITCARD,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getCreditCard = (user) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchCreditCard(user);
    dispatch({ type: FETCH_CREDITCARD, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createCreditCard = (card) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createCreditCard(card);
    
    dispatch({ type: CREATE_CREDITCARD, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCreditCard = (id) => async (dispatch) => {
  try {
    await api.deleteCreditCard(id);
    dispatch({ type: DELETE_CREDITCARD, payload: id });
  } catch (error) {
    console.log(error);
  }
};
