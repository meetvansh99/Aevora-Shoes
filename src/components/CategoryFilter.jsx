import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const CategoryFilter = ({ activeCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Real-time listener: Jaise hi Admin category add karega, yahan dikh jayegi
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const cats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(cats);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* 'All' Button */}
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-5 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
          activeCategory === "All"
            ? "bg-black text-white border-black shadow-lg scale-105"
            : "bg-white/50 text-gray-500 border-gray-300 hover:border-black hover:text-black backdrop-blur-sm"
        }`}
      >
        All
      </button>

      {/* Dynamic Categories from Firebase */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.name)}
          className={`px-5 py-2 md:px-6 md:py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
            activeCategory === cat.name
              ? "bg-black text-white border-black shadow-lg scale-105"
              : "bg-white/50 text-gray-500 border-gray-300 hover:border-black hover:text-black backdrop-blur-sm"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;