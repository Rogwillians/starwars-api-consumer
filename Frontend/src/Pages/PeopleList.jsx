import React, { useEffect, useState } from 'react';
import { fetchPeople } from '../services/swapi';
import CharacterCard from '../components/CharacterCard';

export default function PeopleList() {
    const [data, setData] = useState({ results: [], next_page_url: null, previous_page_url: null });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true);
        fetchPeople(page)
            .then(res => setData(res))
            .finally(() => setLoading(false));
    }, [page]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Personagens</h1>
            {loading
                ? <div className="text-center mt-10">Carregando personagens...</div>
                : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {data.results.map(char => (
                                <CharacterCard key={char.id} character={char} />
                            ))}
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                disabled={!data.previous_page_url}
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Página anterior
                            </button>
                            <button
                                disabled={!data.next_page_url}
                                onClick={() => setPage(prev => prev + 1)}
                                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Próxima página
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    );
}
