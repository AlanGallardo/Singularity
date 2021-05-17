import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const getArticles = () => async (dispatch) => {
  try {
    const { data } = await api.fetchArticles();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data: { data } } = await api.fetchArticlesBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = (article) => async (dispatch) => {
  try {
    const { data } = await api.createArticle(article);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateArticle = (id, article) => async (dispatch) => {
  try {
    const { data } = await api.updateArticle(id, article);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteArticle = (id) => async (dispatch) => {
  try {
    await api.deleteArticle(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likeArticle = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeArticle(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};