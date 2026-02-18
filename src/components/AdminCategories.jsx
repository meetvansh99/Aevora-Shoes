

import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Plus, Trash2, Edit2, X, Check, Loader } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(cats);
    });
    return () => unsubscribe();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "categories"), { name: newCategory.trim() });
      setNewCategory("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      try { await deleteDoc(doc(db, "categories", id)); } catch (error) { console.error(error); }
    }
  };

  const handleUpdate = async () => {
    if (!editingName.trim()) return;
    try {
      await updateDoc(doc(db, "categories", editingId), { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
    } catch (error) { console.error(error); }
  };

  return (
    <div className="bg-white/5 p-4 md:p-8 rounded-[1.5rem] md:rounded-3xl shadow-glass border border-white/10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none text-white">Manage Categories</h2>
          <span className="bg-chrome-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">{categories.length}</span>
        </div>
      </div>

      {/* --- ADD FORM --- */}
      <form onSubmit={handleAdd} className="flex flex-row gap-2 mb-8">
        <input
          type="text"
          placeholder="New Category..."
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-chrome-400 transition-all placeholder-white/20"
        />
        <button
          type="submit"
          disabled={loading || !newCategory}
          className="aspect-square sm:aspect-auto bg-chrome-600 text-white p-3 sm:px-6 sm:py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-chrome-500 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-md border border-white/10"
        >
          {loading ? <Loader size={18} className="animate-spin" /> : <Plus size={20} />}
          <span className="hidden sm:inline text-xs">Add</span>
        </button>
      </form>

      {/* --- LIST --- */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-chrome-400 text-center py-10 text-[10px] font-bold uppercase tracking-widest border-2 border-dashed border-white/10 rounded-2xl">
            Empty List
          </p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="group flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-transparent hover:border-white/10 transition-all hover:bg-white/10 hover:shadow-sm">

              {editingId === cat.id ? (
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
                    {cat.name}
                  </span>
                  <div className="flex gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setEditingId(cat.id)} className="p-2 text-chrome-300 hover:bg-white/10 rounded-lg hover:text-white"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button>
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

export default AdminCategories;