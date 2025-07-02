import { useState, useEffect, useCallback } from 'react';
import { getFavorites as getFavAPI, addFavorite as addFavAPI, removeFavorite as removeFavAPI } from '../services/favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        getFavAPI().then(data => {
            setFavorites(data.map(f => f.character_id));
        }).catch(console.error);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = useCallback(async id => {
        const isFav = favorites.includes(id);
        if (isFav) {
            await removeFavAPI(id);
            setFavorites(prev => prev.filter(f => f !== id));
        } else {
            await addFavAPI(id);
            setFavorites(prev => [...prev, id]);
        }
    }, [favorites]);

    return { favorites, toggleFavorite };
}
