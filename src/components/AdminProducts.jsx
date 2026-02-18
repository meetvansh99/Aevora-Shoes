

import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import uploadToCloudinary from '../utils/uploadCloudinary';
import { Plus, Trash2, Edit2, UploadCloud, Loader, Star, X } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]); // New Filter State
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState(""); // New Filter Selection
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  // --- MULTI-IMAGE STATES ---
  const [images, setImages] = useState([]); // Raw files
  const [previews, setPreviews] = useState([]); // Display URLs

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snap) => {
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    // Fetch Filters
    onSnapshot(collection(db, "filters"), (snap) => {
      setFilters(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previews.length > 4) {
      return alert("Bhai, sirf 4 photos allow hain!");
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...files]);
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPreviews(previews.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));
  };

  const reset = () => {
    setIsEditing(false); setName(""); setPrice(""); setCategory(""); setFilter("");
    setDescription(""); setImages([]); setPreviews([]); setFeatured(false);
    setEditId(null); setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) return alert("Select Category first!");
    if (previews.length === 0) return alert("At least 1 photo zaroori hai!");
    setLoading(true);

    try {
      // Multiple Upload Loop
      const uploadPromises = images.map(file => uploadToCloudinary(file));
      const newUrls = await Promise.all(uploadPromises);

      const existingUrls = previews.filter(p => p.startsWith('http'));
      const finalImageUrls = [...existingUrls, ...newUrls];

      const productData = {
        name,
        price: Number(price),
        category,
        filter, // Save filter
        description,
        imageUrls: finalImageUrls,
        featured,
        updatedAt: new Date()
      };

      if (isEditing) {
        await updateDoc(doc(db, "products", editId), productData);
        alert("✅ Drop Updated!");
      } else {
        await addDoc(collection(db, "products"), { ...productData, createdAt: new Date() });
        alert("🚀 Product Launched!");
      }
      reset();
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-10 pb-10">
      {/* --- FORM SECTION --- */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-2 gap-8 bg-white/5 p-4 md:p-8 rounded-[2.5rem] border border-white/10 shadow-glass">

        {/* Left Side: Inputs */}
        <div className="space-y-4">
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 font-bold text-sm text-white outline-none focus:border-chrome-400 placeholder-white/30" required />

          <div className="flex flex-row gap-3">
            <input type="number" placeholder="Price (₹)" value={price} onChange={e => setPrice(e.target.value)} className="w-1/2 p-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 font-bold text-sm text-white outline-none focus:border-chrome-400 placeholder-white/30" required />
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-1/2 p-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 font-bold text-xs md:text-sm text-white outline-none focus:border-chrome-400 [&>option]:text-black" required>
              <option value="">Category</option>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          {/* New Filter Dropdown */}
          <select value={filter} onChange={e => setFilter(e.target.value)} className="w-full p-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 font-bold text-xs md:text-sm text-white outline-none focus:border-chrome-400 [&>option]:text-black">
            <option value="">Select Filter (Optional)</option>
            {filters.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
          </select>

          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 h-24 md:h-32 resize-none text-sm text-white outline-none focus:border-chrome-400 placeholder-white/30" />

          <div className="flex items-center gap-3 p-2 cursor-pointer active:scale-95 transition-all" onClick={() => setFeatured(!featured)}>
            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl border-2 flex items-center justify-center transition-all ${featured ? 'bg-chrome-500 border-chrome-500 text-white' : 'bg-transparent border-white/20'}`}>
              <Star size={14} fill={featured ? "white" : "none"} className={featured ? "" : "text-white/20"} />
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-chrome-300">Featured on Home</span>
          </div>
        </div>

        {/* Right Side: Multi-Image Section */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-chrome-300 ml-1">Product Images (Max 4)</p>

          <div className="grid grid-cols-2 gap-3 min-h-[200px] md:min-h-[280px]">
            {/* Display Previews */}
            {previews.map((src, index) => (
              <div key={index} className="relative group rounded-2xl overflow-hidden border-2 border-white/10 bg-white/5 aspect-square shadow-sm">
                <img src={src} className="w-full h-full object-cover" alt="preview" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full shadow-lg active:scale-75 transition-transform hover:bg-red-500"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {/* Add Photo Button */}
            {previews.length < 4 && (
              <label className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-white/5 hover:border-chrome-400 hover:bg-white/10 transition-all aspect-square group">
                <div className="bg-chrome-600/20 p-3 rounded-full group-hover:bg-chrome-500 group-hover:text-white transition-colors text-chrome-300">
                  <Plus size={20} />
                </div>
                <span className="text-[8px] font-black uppercase mt-2 text-chrome-300 group-hover:text-white tracking-widest">Add Photo</span>
                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}

            {/* Placeholder for empty state */}
            {previews.length === 0 && (
              <div className="border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center bg-white/5 aspect-square">
                <UploadCloud size={20} className="text-white/10" />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="bg-chrome-600 text-white p-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs shadow-xl active:scale-95 transition-all hover:bg-chrome-500 border border-white/10">
            {loading ? <div className="flex items-center justify-center gap-2"><Loader className="animate-spin" size={16} /> SYNCING...</div> : (isEditing ? "Update Drop" : "Launch Product")}
          </button>
          {isEditing && <button type="button" onClick={reset} className="text-[10px] font-bold uppercase text-chrome-400 text-center hover:text-white">Cancel Edit</button>}
        </div>
      </form>

      {/* --- LIST SECTION --- */}
      {/* --- LIST SECTION (Grouped by Category) --- */}
      <div className="space-y-12">
        {categories.map((cat) => {
          const categoryProducts = products.filter(p => p.category === cat.name);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={cat.id} className="space-y-4">
              <h3 className="text-xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-2 flex items-center gap-3">
                {cat.name}
                <span className="text-[10px] bg-white/10 text-white px-2 py-1 rounded-full">{categoryProducts.length}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {categoryProducts.map(p => (
                  <div key={p.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:bg-white/10 transition-colors">
                    <img src={p.imageUrls?.[0]} className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl object-cover border border-white/10" alt="" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-white truncate uppercase text-[10px] md:text-xs tracking-tight">{p.name}</h4>
                      <p className="font-black text-chrome-300 text-[9px] md:text-[10px] italic">₹{p.price}</p>
                    </div>
                    <div className="flex gap-1 md:gap-2">
                      <button onClick={() => {
                        setIsEditing(true); setEditId(p.id); setName(p.name); setPrice(p.price); setCategory(p.category); setFilter(p.filter || "");
                        setDescription(p.description); setPreviews(p.imageUrls || []); setFeatured(p.featured);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} className="p-2 md:p-3 bg-white/5 text-chrome-300 rounded-lg md:rounded-xl hover:bg-white/20 hover:text-white"><Edit2 size={14} /></button>
                      <button onClick={async () => { if (window.confirm("Delete Product?")) await deleteDoc(doc(db, "products", p.id)) }} className="p-2 md:p-3 bg-red-500/10 text-red-500 rounded-lg md:rounded-xl hover:bg-red-500 hover:text-white"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Products handling for Uncategorized or deleted categories */}
        {products.filter(p => !categories.some(c => c.name === p.category)).length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase tracking-tight text-red-500 border-b border-red-500/20 pb-2 flex items-center gap-3">
              Uncategorized / Old
              <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                {products.filter(p => !categories.some(c => c.name === p.category)).length}
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {products.filter(p => !categories.some(c => c.name === p.category)).map(p => (
                <div key={p.id} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-red-900/10 backdrop-blur-sm border border-red-500/20 rounded-2xl md:rounded-[2.5rem] shadow-sm">
                  <img src={p.imageUrls?.[0]} className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl object-cover border border-red-500/20" alt="" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-red-400 truncate uppercase text-[10px] md:text-xs tracking-tight">{p.name}</h4>
                    <p className="font-bold text-red-300 text-[9px] md:text-[10px] uppercase">{p.category} (Invalid)</p>
                  </div>
                  <div className="flex gap-1 md:gap-2">
                    <button onClick={() => {
                      setIsEditing(true); setEditId(p.id); setName(p.name); setPrice(p.price); setCategory(p.category); setFilter(p.filter || "");
                      setDescription(p.description); setPreviews(p.imageUrls || []); setFeatured(p.featured);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} className="p-2 md:p-3 bg-blue-500/10 text-blue-500 rounded-lg md:rounded-xl hover:bg-blue-500 hover:text-white"><Edit2 size={14} /></button>
                    <button onClick={async () => { if (window.confirm("Delete Product?")) await deleteDoc(doc(db, "products", p.id)) }} className="p-2 md:p-3 bg-red-500/10 text-red-500 rounded-lg md:rounded-xl hover:bg-red-500 hover:text-white"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProducts;