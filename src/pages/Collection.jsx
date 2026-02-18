import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import { Loader, ChevronDown } from 'lucide-react';

const Collection = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]); // New Filter State
    const [loading, setLoading] = useState(true);
    const [filterCategory, setFilterCategory] = useState("All");
    const [activeFilter, setActiveFilter] = useState("All"); // New Active Filter State
    const [isTypeOpen, setIsTypeOpen] = useState(false); // Dropdown State
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // Category Dropdown State

    useEffect(() => {
        // 1. Fetch Categories
        const unsubCat = onSnapshot(collection(db, "categories"), (snap) => {
            setCategories(snap.docs.map(d => d.data().name));
        });

        // 2. Fetch Filters
        const unsubFilters = onSnapshot(collection(db, "filters"), (snap) => {
            setFilters(snap.docs.map(d => d.data().name));
        });

        // 3. Fetch Products
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const unsubProd = onSnapshot(q, (snap) => {
            setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        });

        return () => { unsubCat(); unsubFilters(); unsubProd(); };
    }, []);

    // Filter Logic
    const filteredProducts = products.filter(p => {
        const categoryMatch = filterCategory === "All" || p.category === filterCategory;
        const filterMatch = activeFilter === "All" || p.filter === activeFilter;
        return categoryMatch && filterMatch;
    });

    if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader className="animate-spin text-white" /></div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">The Collection</h1>
                    <p className="text-chrome-300 font-bold uppercase tracking-widest text-xs mt-2">Browse our exclusive drops</p>
                </div>

                {/* Filter Section */}
                <div className="flex flex-col gap-4">

                    {/* Secondary Filters (Gender/Type) */}
                    {/* Secondary Filters (Gender/Type) - Dropdown Style */}
                    <div className="relative">
                        <button
                            onClick={() => setIsTypeOpen(!isTypeOpen)}
                            className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white/10 transition-all shadow-sm"
                        >
                            <span className="opacity-60">Type:</span> {activeFilter === "All" ? "All Types" : activeFilter}
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isTypeOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isTypeOpen && (
                            <div className="absolute left-0 top-full mt-2 w-48 bg-chrome-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={() => { setActiveFilter("All"); setFilterCategory("All"); setIsTypeOpen(false); }}
                                    className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${activeFilter === "All" ? 'bg-chrome-600 text-white' : 'text-chrome-200'}`}
                                >
                                    All Types
                                </button>
                                {filters.map(f => (
                                    <button
                                        key={f}
                                        onClick={() => { setActiveFilter(f); setFilterCategory("All"); setIsTypeOpen(false); }}
                                        className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${activeFilter === f ? 'bg-chrome-600 text-white' : 'text-chrome-200'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Categories Bar - Dropdown Style */}
                    <div className="relative">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white/10 transition-all shadow-sm"
                        >
                            <span className="opacity-60">Category:</span> {filterCategory === "All" ? "All Categories" : filterCategory}
                            <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isCategoryOpen && (
                            <div className="absolute left-0 top-full mt-2 w-48 bg-chrome-900/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                                <button
                                    onClick={() => { setFilterCategory("All"); setIsCategoryOpen(false); }}
                                    className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${filterCategory === "All" ? 'bg-chrome-600 text-white' : 'text-chrome-200'}`}
                                >
                                    All Categories
                                </button>
                                {categories
                                    .filter(cat => activeFilter === "All" || products.some(p => p.category === cat && p.filter === activeFilter)) // Only show relevant categories
                                    .map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => { setFilterCategory(cat); setIsCategoryOpen(false); }}
                                            className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${filterCategory === cat ? 'bg-chrome-600 text-white' : 'text-chrome-200'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
                <div className="py-40 text-center uppercase font-black text-chrome-400 tracking-widest">No products found in this category</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Collection;
