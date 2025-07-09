import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Hooks/UseAuth.jsx';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Details from './Pages/Details';
import PeopleDetails from "./Pages/PeopleDetails.jsx";
import SpeciesDetails from './Pages/SpeciesDetails.jsx';
import StarshipDetails from './Pages/StarshipDetails.jsx';
import VehicleDetails from './Pages/VehicleDetails.jsx';
import Favorites from './Pages/Favorites';
import Navbar from './components/Navbar';
import PeopleList from './pages/PeopleList';
import PlanetDetails from './pages/PlanetDetails.jsx'


function Protected({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

export default function App() {
    const { user } = useAuth();

    return (
        <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/peoples" element={<PeopleList />} />
                <Route path="/people/:id" element={<PeopleDetails />} />
                <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
                <Route path="/species/:id" element={<SpeciesDetails />} />
                <Route path="/starships/:id" element={<StarshipDetails />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
                <Route path="/planets/:id" element={<PlanetDetails />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
