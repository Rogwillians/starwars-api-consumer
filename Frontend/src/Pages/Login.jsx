import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../Hooks/UseAuth.jsx';

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({ email:'', password:'' });

    const submit = async (e) => {
        e.preventDefault();
        await login(form).then(r => { setUser(r.data); navigate('/'); });
    };

    return (
        <form onSubmit={submit}>
            {/* campos de login */}
            <button type="submit">Entrar</button>
        </form>
    );
}
