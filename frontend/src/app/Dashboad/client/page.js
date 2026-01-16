"use client";
import { useEffect, useState } from 'react';
import api from 'axios';
// import { PDivlus, Users, ShieldCheck } from 'lucide-react';
import ClientForm from '../../../components/ClientForm';
import InsuranceForm from '../assurance/page';

export default function Dashboard() {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalins, setShowModalins] = useState(false);

    // Fonction de rafraîchissement (utilisée par le bouton et le formulaire)
    const refreshData = async () => {
        try {
            const response = await api.get('/client/');
            setClients(response.data);
        } catch (error) {
            console.error("Erreur API:", error);
        }
    };

    // Solution : L'effet appelle la logique de manière isolée
    useEffect(() => {
        let isMounted = true;

        const loadInitialData = async () => {
            try {
                const response = await api.get('/client/');
                if (isMounted) {
                    setClients(response.data);
                }
            } catch (error) {
                console.error("Erreur au chargement:", error);
            }
        };

        loadInitialData();

        return () => { isMounted = false; }; // Nettoyage pour éviter les fuites de mémoire
    }, []); 

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* ... Sidebar ... */}
            <main className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Gestion des Clients</h1>
                    <button 
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <div size={18}> Nouveau Client</div>
                    </button>
                      <button 
                        onClick={() => setShowModalins(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <div size={18}> Nouvelle Assurance</div>
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-4 font-semibold">Nom</th>
                                <th className="p-4 font-semibold">Email</th>
                                <th className="p-4 font-semibold">Succursale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{client.first_name} {client.last_name}</td>
                                    <td className="p-4 text-gray-600">{client.email}</td>
                                    <td className="p-4">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">
                                            {client.branch_name}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Notez l'utilisation de refreshData ici */}
            {showModal && <ClientForm closeModal={() => setShowModal(false)} refreshData={refreshData} />}
            {showModalins && <InsuranceForm closeModal={() => setShowModalins(false)} refreshData={refreshData} />}
        </div>
    );
}