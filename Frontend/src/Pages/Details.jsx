import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFilmDetails } from '../services/swapi';

export default function Details() {
    const { id } = useParams();
    const [film, setFilm] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilmDetails(id)
            .then(data => setFilm(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Carregando detalhes...</div>;
    }

    if (!film) {
        return <div className="text-center mt-10">Filme não encontrado.</div>;
    }

    const posterUrl = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;

    return (
        <div className="container mx-auto p-4">
            <Link to="/" className="text-blue-500 hover:underline">← Voltar</Link>

            <div className="mt-4 flex flex-col md:flex-row items-start gap-6">
                <img
                    src={posterUrl}
                    alt={film.title}
                    className="w-full md:w-1/3 rounded shadow"
                    onError={(e) => e.target.src = '/placeholder.png'}
                />

                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{film.title}</h1>
                    <p className="mt-2 italic">Episódio {film.episode_id}</p>
                    <p className="mt-4">{film.opening_crawl}</p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <strong>Diretor:</strong> {film.director}
                        </div>
                        <div>
                            <strong>Produtor:</strong> {film.producer}
                        </div>
                        <div>
                            <strong>Data de lançamento:</strong> {film.release_date}
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Personagens</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {film.characters.map(char => (
                            <Link key={char.id} to={`/people/${char.id}`}>
                                <div className="bg-gray-200 rounded p-2 hover:bg-gray-300 transition text-center">
                                    {char.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
