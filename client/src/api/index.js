import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile'))
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  
  return req;
});

export const fetchArticles = () => API.get('/articles');
export const createArticle = (newArticle) => API.post('/articles', newArticle);
export const updateArticle = (id, updatedArticle) => API.patch(`/articles/${id}`, updatedArticle);
export const likeArticle = (id) => API.patch(`/articles/${id}/likeArticle`);
export const deleteArticle = (id) => API.delete(`/articles/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);