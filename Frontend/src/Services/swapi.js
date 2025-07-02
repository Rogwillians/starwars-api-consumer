const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchPeople(page = 1) {
    const res = await fetch(`${API_BASE}/api/people?page=${page}`);
    return res.json();
}

export async function fetchPersonDetails(id) {
    const res = await fetch(`${API_BASE}/api/people/${id}`);
    return res.json();
}

export async function fetchFilms() {
    const res = await fetch(`${API_BASE}/api/films`);
    return res.json();
}

export async function fetchFilmDetails(id) {
    const res = await fetch(`${API_BASE}/api/films/${id}`);
    return res.json();
}

export async function fetchSpeciesDetails(id) {
    const res = await fetch(`/api/species/${id}`);
    return res.json();
}

export async function fetchStarshipDetails(id){
    const res = await fetch(`/api/starships/${id}`);
    return res.json();
}
export async function fetchVehicleDetails(id){
    const res = await fetch(`/api/vehicle/${id}`);
    return res.json();
}


