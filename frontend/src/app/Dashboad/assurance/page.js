"use client";
import { useState, useEffect } from 'react';
import api from 'axios';

export default function InsuranceForm({ closeModal, refreshData }) {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        client: '',
        type: 'AUTO',
        policy_number: '',
        start_date: '',
        end_date: '',
        premium_amount: '',
        status: 'ACTIVE'
    });

    // Chargement des clients au montage uniquement
    useEffect(() => {
        let isMounted = true;
        api.get('/client/')
            .then(res => {
                if (isMounted) {
                    setClients(res.data);
                    setLoading(false);
                }
            })
            .catch(err => console.error(err));
        
        return () => { isMounted = false; };
    }, []); // Dépendances vides pour éviter les boucles

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/insurance/', formData);
            refreshData();
            closeModal();
        } catch (error) {
            alert("Erreur lors de la création du contrat");
        }
    };

    if (loading) return <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-white">Chargement...</div>;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl">
                <h2 className="text-xl font-bold mb-6 text-slate-800">Nouveau Contrat Assurance</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Sélectionner le Client</label>
                        <select 
                            required 
                            className="border p-2 rounded w-full bg-gray-50"
                            onChange={e => setFormData({...formData, client: e.target.value})}
                        >
                            <option value="">-- Choisir un client --</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Type de Contrat</label>
                            <select className="border p-2 rounded w-full" onChange={e => setFormData({...formData, type: e.target.value})}>
                                <option value="AUTO">Automobile</option>
                                <option value="SANTE">Santé</option>
                                <option value="VIE">Vie</option>
                                <option value="INCENDIE">Incendie</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">N° de Police</label>
                            <input required placeholder="POL-2026-XXXX" className="border p-2 rounded w-full" onChange={e => setFormData({...formData, policy_number: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Date Début</label>
                            <input required type="date" className="border p-2 rounded w-full" onChange={e => setFormData({...formData, start_date: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Date Fin</label>
                            <input required type="date" className="border p-2 rounded w-full" onChange={e => setFormData({...formData, end_date: e.target.value})} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Montant de la Prime (CFA)</label>
                        <input required type="number" placeholder="0.00" className="border p-2 rounded w-full" onChange={e => setFormData({...formData, premium_amount: e.target.value})} />
                    </div>

                    <div className="flex justify-end gap-3 mt-6 border-t pt-4">
                        <button type="button" onClick={closeModal} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Annuler</button>
                        <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-colors">
                            Valider le Contrat
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}