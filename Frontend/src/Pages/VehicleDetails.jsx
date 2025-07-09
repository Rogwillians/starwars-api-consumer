import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchVehicleDetails } from '../services/swapi';
import { useFavorites } from '../hooks/useFavorites';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import SectionList from "../components/SectionList.jsx";

export default function VehicleDetails() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(Number(id));

    useEffect(() => {
        fetchVehicleDetails(id)
            .then(data => setVehicle(data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="text-center mt-10">Carregando veículo...</div>;
    if (!vehicle) return <div className="text-center mt-10">Veículo não encontrado.</div>;

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
                    alt={vehicle.name}
                    className="w-full md:w-1/3 rounded shadow object-cover"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/400x600?text=Sem+Imagem';
                    }}
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{vehicle.name}</h1>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                        <div><strong>Modelo:</strong> {vehicle.model} cm</div>
                        <div><strong>Fabricante:</strong> {vehicle.manufacturer}</div>
                        <div><strong>Custo em créditos:</strong> {vehicle.cost_in_credits}</div>
                        <div><strong>Comprimento:</strong> {vehicle.lengths}</div>
                        <div><strong>Velocidade Máxima:</strong> {vehicle.max_atmosphering_speed}</div>
                        <div><strong>Tripulação:</strong> {vehicle.crew}</div>
                        <div><strong>Passageiros:</strong> {vehicle.passengers}</div>
                        <div><strong>Capacidade de carga:</strong> {vehicle.cargo_capacity}</div>
                        <div><strong>Duração dos suprimentos:</strong> {vehicle.consumables}</div>
                        <div><strong>Classe do veiculo:</strong> {vehicle.vehicle_class}</div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-2">Detalhes adicionais</h2>
                        <h3 className="text-2xl font-semibold mb-2">Aparições</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {vehicle.films?.length > 0 && (
                                <SectionList
                                    title="Filmes"
                                    items={vehicle.films}
                                    pathPrefix="/details"
                                    labelKey="title"
                                />
                            )}
                            {vehicle.pilots?.length > 0 && (
                                <SectionList
                                    title="Pilotos"
                                    items={vehicle.pilots}
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
