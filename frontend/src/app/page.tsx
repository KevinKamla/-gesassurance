"use client"

import { useRouter } from 'next/navigation';
import { useState } from "react";
import api from "./api";
import toast from "react-hot-toast";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

 const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            toast.success("Transaction Supprimé")
            router.push('/Dashboad/client'); // On redirigera vers le dashboard après
        } catch (error) {
            toast.error("Erreur de connexion : Vérifiez vos identifiants");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Assurance Login</h1>
                <label className="text-blue-800">Nom</label>
                <input 
                
                    type="text" placeholder="Utilisateur" 
                    className="w-full p-2 mb-4 border rounded text-blue-800"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label className="text-blue-800">Mot de passe</label>
                <input 
                    type="password" placeholder="Mot de passe" 
                    className="w-full p-2 mb-4 border rounded text-blue-800"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Se connecter
                </button>
            </form>
        </div>
    );
}











