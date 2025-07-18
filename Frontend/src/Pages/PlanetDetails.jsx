import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSpeciesDetails } from '../services/swapi';
import { useFavorites } from '../hooks/useFavorites';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import SectionList from "../components/SectionList.jsx";

export default function SpeciesDetails() {
    const { id } = useParams();
    const [planet, setPlanet] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(Number(id));

    useEffect(() => {
        fetchSpeciesDetails(id)
            .then(data => setPlanet(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-10">Carregando planeta...</div>;
    if (!planet) return <div className="text-center mt-10">Planeta não encontrado.</div>;

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
                    alt={planet.name}
                    className="w-full md:w-1/3 rounded shadow object-cover"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x600?text=Sem+Imagem';
                    }}
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{planet.name}</h1>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                        <div><strong>Tempo de rotação:</strong> {planet.rotation_period} cm</div>
                        <div><strong>Tempo de orbita:</strong> {planet.orbital_period}</div>
                        <div><strong>Diametro:</strong> {planet.diameter}</div>
                        <div><strong>Clima:</strong> {planet.climate}</div>
                        <div><strong>Gravidade:</strong> {planet.gravity}</div>
                        <div><strong>Terreno:</strong> {planet.terrain}</div>
                        <div><strong>Agua na superficie:</strong> {planet.surface_water}</div>
                        <div><strong>População:</strong> {planet.population}</div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Detalhes adicionais</h2>
                        <h3 className="text-2xl font-semibold mb-2">Aparições</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {planet.films?.length > 0 && (
                                <SectionList
                                    title="Filmes"
                                    items={planet.films}
                                    pathPrefix="/details"
                                    labelKey="title"
                                />
                            )}
                            {planet.residents?.length > 0 && (
                                <SectionList
                                    title="Habitantes"
                                    items={planet.residents}
                                    pathPrefix="/species"
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
