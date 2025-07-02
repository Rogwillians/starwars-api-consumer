import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="text-2xl font-bold">
                    StarWars
                </Link>

                <div className="md:hidden">
                    <button onClick={() => setOpen(!open)}>
                        {open ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                    </button>
                </div>

                <ul className={`md:flex md:items-center md:space-x-6 ${open ? 'block' : 'hidden'}`}>
                    <li>
                        <Link to="/" className="block py-2 hover:text-gray-300">
                            Filmes
                        </Link>
                    </li>
                    <li>
                        <Link to="/favorites" className="block py-2 hover:text-gray-300">
                            Favoritos
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="block py-2 hover:text-gray-300">
                            Login
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
