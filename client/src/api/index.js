import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile'))
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  
  return req;
});

export const fetchArticles = (page) => API.get(`/articles?page=${page}`);
export const fetchArticlesBySearch = (searchQuery) => API.get(`/articles/search?searchQuery=${searchQuery}`);
export const fetchArticle = (id) => API.get(`/articles/${id}`);
export const createArticle = (newArticle) => API.post('/articles', newArticle);
export const updateArticle = (id, updatedArticle) => API.patch(`/articles/${id}`, updatedArticle);
export const likeArticle = (id) => API.patch(`/articles/${id}/likeArticle`);
export const deleteArticle = (id) => API.delete(`/articles/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);

export const fetchCreditCard = (user) => API.get(`/creditCard/${user}`);
export const createCreditCard = (newCreditCard) => API.post('/creditCard', newCreditCard);
export const deleteCreditCard = (id) => API.delete(`/creditCard/${id}`);

export const fetchQuestions = () => API.get('/forum');
export const fetchQuestion = (id) => API.get(`/forum/${id}`);
export const createQuestion = (question) => API.post('/forum', question);
export const updateQuestion = (id, updatedQuestion) => API.patch(`/forum/${id}`, updatedQuestion);
export const deleteQuestion = (id) => API.delete(`/forum/${id}`);
export const answerQuestion = (id, answer) => API.patch(`/forum/${id}/answerQuestion`, answer);
 