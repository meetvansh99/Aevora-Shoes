import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Star, Trash2, PackageSearch } from 'lucide-react';

const AdminFeatured = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sirf wahi products jo 'featured' marked hain
    const q = query(collection(db, "products"), where("featured", "==", true));

    const unsubscribe = onSnapshot(q, (snap) => {
      setFeatured(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-chrome-300 font-bold uppercase tracking-widest animate-pulse">Loading Drops...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-white">Live on Home Page</h2>
        <span className="text-[10px] bg-chrome-600 text-white px-3 py-1 rounded-full font-bold">
          {featured.length} Items
        </span>
      </div>

      {featured.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white/5 rounded-[2rem] border-2 border-dashed border-white/10">
          <PackageSearch size={48} className="text-chrome-400 mb-4" />
          <p className="text-white font-bold uppercase tracking-widest text-xs">No Featured Drops Found</p>
          <p className="text-[10px] text-chrome-300 mt-2">Add products to featured list from the 'Products' tab</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => (
            <div key={p.id} className="group relative bg-white/5 border border-white/10 p-4 rounded-[2rem] shadow-glass hover:shadow-neon transition-all duration-500 hover:bg-white/10">

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 bg-white/5">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Star Badge */}
                <div className="absolute top-3 right-3 bg-chrome-600 p-2 rounded-full shadow-lg border-2 border-white/20">
                  <Star size={14} fill="white" color="white" />
                </div>
              </div>

              {/* Info */}
              <div className="space-y-1 mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-chrome-400">{p.category}</span>
                <h4 className="font-black uppercase tracking-tight text-white truncate">{p.name}</h4>
                <p className="font-bold text-chrome-300 text-sm italic">₹{p.price}</p>
              </div>

              {/* Quick Action */}
              <button
                onClick={() => updateDoc(doc(db, "products", p.id), { featured: false })}
                className="w-full flex items-center justify-center gap-2 p-3 bg-red-500/10 text-red-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 group-hover:shadow-md border border-red-500/10"
              >
                <Trash2 size={14} /> Remove from Home
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeatured;