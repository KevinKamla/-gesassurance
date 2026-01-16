"use client";
import { useState } from 'react';
import api from 'axios';
//import { X } from 'lucide-react';

export default function ClientForm({ closeModal, refreshData }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // L'URL correspond à ton API Django : http://127.0.0.1:8000/api/clients/
            await api.post('/client/', formData);
            
            // On rafraîchit la liste dans le dashboard et on ferme la modale
            refreshData();
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'enregistrement:", error);
            alert("Erreur : Vérifiez que tous les champs sont corrects.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b bg-gray-50">
                    <h2 className="text-xl font-bold text-slate-800">Nouveau Client</h2>
                    <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <div size={24}></div>
                    </button>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Prénom</label>
                            <input 
                                required
                                type="text"
                                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                onChange={e => setFormData({...formData, first_name: e.target.value})}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Nom</label>
                            <input 
                                required
                                type="text"
                                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                onChange={e => setFormData({...formData, last_name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input 
                            required
                            type="email"
                            placeholder="exemple@mail.com"
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Téléphone</label>
                        <input 
                            required
                            type="tel"
                            placeholder="+237 ..."
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Adresse</label>
                        <textarea 
                            rows="2"
                            className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            onChange={e => setFormData({...formData, address: e.target.value})}
                        ></textarea>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                        <button 
                            type="button" 
                            onClick={closeModal}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        >
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-blue-300 transition-all"
                        >
                            {loading ? "Enregistrement..." : "Enregistrer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}