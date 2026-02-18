
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, X, Check, Loader, Filter } from 'lucide-react';

const AdminFilters = () => {
    const [filters, setFilters] = useState([]);
    const [newFilter, setNewFilter] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const [loading, setLoading] = useState(false);

    // 1. REAL-TIME DATA FETCHING
    useEffect(() => {
        const q = query(collection(db, "filters"), orderBy("name"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFilters(data);
        });
        return () => unsubscribe();
    }, []);

    // 2. ADD FILTER FUNCTION
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newFilter.trim()) return;
        setLoading(true);
        try {
            await addDoc(collection(db, "filters"), { name: newFilter.trim() });
            setNewFilter("");
        } catch (error) {
            console.error("Error adding filter:", error);
        } finally {
            setLoading(false);
        }
    };

    // 3. DELETE FILTER FUNCTION
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this filter?")) {
            try {
                await deleteDoc(doc(db, "filters", id));
            } catch (error) {
                console.error("Error deleting filter:", error);
            }
        }
    };

    // 4. EDIT FUNCTIONS
    const handleUpdate = async () => {
        if (!editingName.trim()) return;
        try {
            await updateDoc(doc(db, "filters", editingId), { name: editingName.trim() });
            setEditingId(null);
            setEditingName("");
        } catch (error) { console.error(error); }
    };

    return (
        <div className="bg-white/5 p-4 md:p-8 rounded-[1.5rem] md:rounded-3xl shadow-glass border border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-white">Manage Filters</h2>
                    <span className="bg-chrome-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">{filters.length}</span>
                </div>
            </div>

            {/* --- ADD FORM --- */}
            <form onSubmit={handleAdd} className="flex flex-row gap-2 mb-8">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
                        <Filter size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder="New Filter (e.g. Men, Sale, Summer)..."
                        value={newFilter}
                        onChange={(e) => setNewFilter(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-chrome-400 transition-all placeholder-white/20"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !newFilter}
                    className="aspect-square sm:aspect-auto bg-chrome-600 text-white p-3 sm:px-6 sm:py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-chrome-500 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-md border border-white/10"
                >
                    {loading ? <Loader size={18} className="animate-spin" /> : <Plus size={20} />}
                    <span className="hidden sm:inline text-xs">Add</span>
                </button>
            </form>

            {/* --- LIST --- */}
            <div className="space-y-2">
                {filters.length === 0 ? (
                    <p className="text-chrome-400 text-center py-10 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-white/10 rounded-2xl">
                        No filters found. Add one above.
                    </p>
                ) : (
                    filters.map((item) => (
                        <div key={item.id} className="group flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-transparent hover:border-white/10 transition-all hover:bg-white/10 hover:shadow-sm">

                            {editingId === item.id ? (
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="text"
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm font-bold text-white outline-none focus:border-chrome-400"
                                        autoFocus
                                    />
                                    <div className="flex gap-1">
                                        <button onClick={handleUpdate} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30"><Check size={16} /></button>
                                        <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"><X size={16} /></button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span className="font-bold text-white uppercase tracking-wide text-xs md:text-sm pl-1 truncate">
                                        {item.name}
                                    </span>
                                    <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => { setEditingId(item.id); setEditingName(item.name); }} className="p-2 text-chrome-300 hover:bg-white/10 rounded-lg hover:text-white"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminFilters;
