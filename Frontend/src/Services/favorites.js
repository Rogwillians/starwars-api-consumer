import API from './api';

export const getFavorites = () => API.get('/favorites').then(r => r.data);
export const addFavorite = id => API.post('/favorites', { character_id: id });
export const removeFavorite = id => API.delete(`/favorites/${id}`);
