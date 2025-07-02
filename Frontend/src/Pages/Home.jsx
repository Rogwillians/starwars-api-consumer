import React, { useEffect, useState } from 'react';
import { fetchFilms } from '../services/swapi';
import { Link } from 'react-router-dom';

export default function Home() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilms().then(data => {
            setFilms(data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Carregando filmes...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Filmes de Star Wars</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {films.map(film => (
                    <Link key={film.id} to={`/details/${film.id}`}>
                        <div className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                            <img
                                src={`src/img/films/${film.episode_id}.jpg`}
                                alt={film.title}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://placehold.co/400x600?text=Sem+Imagem';
                                }}
                            />
                            <div className="p-3">
                                <h2 className="font-semibold text-lg text-center truncate">{film.title}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
