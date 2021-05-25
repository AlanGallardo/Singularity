import {
  FETCH_ALL,
  FETCH_ARTICLE,
  FETCH_BY_KEYWORD,
  FETCH_BY_TAG,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE
} from '../constants/actionTypes';
import * as api from '../api/index.js';

// Action Creators
export const getArticles = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchArticles(page);
    dispatch({ type: FETCH_ALL, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getArticle = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchArticle(id);
    dispatch({ type: FETCH_ARTICLE, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesByKeyword = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchArticlesByKeyword(keyword);
    console.log(data);
    dispatch({ type: FETCH_BY_KEYWORD, payload: data });
    
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getArticlesByTag = (tags) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchArticlesByTag(tags);
    dispatch({ type: FETCH_BY_TAG, payload: data });
    
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = (article, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createArticle(article);

    history.push(`/articles/${data._id}`);
    
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
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