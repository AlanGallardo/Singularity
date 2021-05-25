import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile'))
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  
  return req;
});

export const fetchArticles = (page) => API.get(`/articles?page=${page}`);
export const fetchArticle = (id) => API.get(`/articles/${id}`);
export const fetchArticlesByKeyword = (keyword) => API.get(`/articles/search?keyword=${keyword}`); // DE AQUI NO PASA MISTERIOSAMENTE
export const fetchArticlesByTag = (tags) => API.get(`/articles/search?tags=${tags.tags}`);
export const createArticle = (newArticle) => API.post('/articles', newArticle);
export const updateArticle = (id, updatedArticle) => API.patch(`/articles/${id}`, updatedArticle);
export const likeArticle = (id) => API.patch(`/articles/${id}/likeArticle`);
export const deleteArticle = (id) => API.delete(`/articles/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);