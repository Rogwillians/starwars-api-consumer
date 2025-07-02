import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function CharacterCard({ character }) {
    const { id, name } = character;
    const imgUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(character.id);

    return (
    <div className="relative">
            <button
                onClick={() => toggleFavorite(character.id)}
                className="absolute top-2 right-2 z-10 text-red-500"
            >
                {isFav ? <AiFillHeart size={24}/> : <AiOutlineHeart size={24}/>}
            </button>

        <Link to={`/people/${id}`} className="block">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                <img
                    src={imgUrl}
                    alt={name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x600?text=Sem+Imagem';
                    }}
                />
                <div className="p-3">
                    <h2 className="font-semibold text-lg text-center truncate">{name}</h2>
                </div>
            </div>
        </Link>
    </div>
    );
}
