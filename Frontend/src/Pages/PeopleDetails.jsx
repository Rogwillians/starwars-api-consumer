import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPersonDetails } from '../services/swapi';
import { useFavorites } from '../hooks/useFavorites';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import SectionList from "../components/SectionList.jsx";

export default function PeopleDetails() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();

    useEffect(() => {
        fetchPersonDetails(id)
            .then(data => setPerson(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Carregando personagem...</div>;
    }
    if (!person) {
        return <div className="text-center mt-10">Personagem não encontrado.</div>;
    }

    const imgUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    const isFav = favorites.includes(Number(id));
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <Link to="/" className="text-blue-500 hover:underline">← Voltar</Link>
                <button
                    onClick={() => toggleFavorite(Number(id))}
                    className="text-red-500"
                    aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                    {isFav ? <AiFillHeart size={28} /> : <AiOutlineHeart size={28} />}
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={imgUrl}
                    alt={person.name}
                    className="w-full md:w-1/3 rounded shadow object-cover"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x600?text=Sem+Imagem';
                    }}
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{person.name}</h1>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                        <div><strong>Altura:</strong> {person.height} cm</div>
                        <div><strong>Peso:</strong> {person.mass} kg</div>
                        <div><strong>Nascimento:</strong> {person.birth_year}</div>
                        <div><strong>Gênero:</strong> {person.gender}</div>
                        <div><strong>Olhos:</strong> {person.eye_color}</div>
                        <div><strong>Cabelo:</strong> {person.hair_color}</div>
                        <div><strong>Pele:</strong> {person.skin_color}</div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Detalhes adicionais</h2>
                        <h3 className="text-2xl font-semibold mb-2">Aparições</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {person.films?.length > 0 && (
                                <SectionList
                                    title="Filmes"
                                    items={person.films}
                                    pathPrefix="/details"
                                    labelKey="title"
                                />
                            )}
                            {person.species?.length > 0 && (
                                <SectionList
                                    title="Espécies"
                                    items={person.species}
                                    pathPrefix="/species"
                                    labelKey="name"
                                />
                            )}
                            {person.starships?.length > 0 && (
                                <SectionList
                                    title="Naves"
                                    items={person.starships}
                                    pathPrefix="/starships"
                                    labelKey="name"
                                />
                            )}
                            {person.vehicles?.length > 0 && (
                                <SectionList
                                    title="Veículos"
                                    items={person.vehicles}
                                    pathPrefix="/vehicles"
                                    labelKey="name"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
