import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSpeciesDetails } from '../services/swapi';
import { useFavorites } from '../hooks/useFavorites';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import SectionList from "../components/SectionList.jsx";

export default function SpeciesDetails() {
    const { id } = useParams();
    const [specie, setSpecie] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(Number(id));

    useEffect(() => {
        fetchSpeciesDetails(id)
            .then(data => setSpecie(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-10">Carregando espécie...</div>;
    if (!specie) return <div className="text-center mt-10">Espécie não encontrada.</div>;

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
                    alt={specie.name}
                    className="w-full md:w-1/3 rounded shadow object-cover"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x600?text=Sem+Imagem';
                    }}
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{specie.name}</h1>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                        <div><strong>Classificação:</strong> {specie.classification} cm</div>
                        <div><strong>Designação:</strong> {specie.designation}</div>
                        <div><strong>Altura média:</strong> {specie.average_height}</div>
                        <div><strong>Cores de pele:</strong> {specie.skin_colors}</div>
                        <div><strong>Cores de cabelo:</strong> {specie.hair_colors}</div>
                        <div><strong>Tempo de vida médio:</strong> {specie.average_lifespan}</div>
                        <div>{specie.homeworld?.length > 0 && (
                            <SectionList
                                title="Planeta natal"
                                items={specie.homeworld}
                                pathPrefix="/details"
                                labelKey="title"
                            />
                        )}</div>
                        <div><strong>Lingua:</strong> {specie.language}</div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Detalhes adicionais</h2>
                        <h3 className="text-2xl font-semibold mb-2">Aparições</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {specie.films?.length > 0 && (
                                <SectionList
                                    title="Filmes"
                                    items={specie.films}
                                    pathPrefix="/details"
                                    labelKey="title"
                                />
                            )}
                            {specie.people?.length > 0 && (
                                <SectionList
                                    title="Personagens"
                                    items={specie.people}
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
