// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { ArrowRight, Loader } from 'lucide-react';
// // import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
// // import { db } from '../firebase/firebase';
// // import ProductCard from '../components/ProductCard'; // Ensure this is imported

// // const Home = () => {
// //   const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA";
// //   const tagline = import.meta.env.VITE_TAGLINE || "Walk the Future";

// //   const [featuredProducts, setFeaturedProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const q = query(
// //       collection(db, "products"),
// //       where("featured", "==", true),
// //       limit(4)
// //     );

// //     const unsubscribe = onSnapshot(q, (snapshot) => {
// //       const products = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setFeaturedProducts(products);
// //       setLoading(false);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   return (
// //     // 👇 Background ko deep grey/neutral kiya aur relative rakha mesh gradients ke liye
// //     <div className="min-h-screen pt-36 px-4 md:px-8 pb-32 overflow-x-hidden bg-[#e0e0e0] relative">

// //       {/* --- BG DECORATION (Ye glass effect ko life dete hain) --- */}
// //       <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
// //       <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-200/20 blur-[140px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
// //       <div className="fixed top-[30%] right-[10%] w-64 h-64 bg-yellow-100/30 blur-[100px] rounded-full -z-10"></div>

// //       {/* --- HERO SECTION --- */}
// //       <section className="flex flex-col items-center justify-center text-center space-y-8 mb-24 md:mb-40 animate-in fade-in zoom-in duration-1000">
// //         <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-gray-900 uppercase leading-none select-none drop-shadow-2xl">
// //           {shopName}
// //         </h1>

// //         <p className="text-xs md:text-sm text-gray-600 font-black uppercase tracking-[0.6em] drop-shadow-md">
// //           {tagline}
// //         </p>

// //         <div className="w-16 h-[3px] bg-black mt-10 opacity-60 rounded-full"></div>
// //       </section>

// //       {/* --- FEATURED SECTION --- */}
// //       <section className="max-w-7xl mx-auto relative z-10">

// //         {/* Header Logic */}
// //         <div className="flex items-end justify-between mb-12 px-2">
// //           <div>
// //             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 leading-none drop-shadow-sm">
// //               Featured
// //             </h2>
// //             <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-500/40 leading-none">
// //               Drops
// //             </h2>
// //           </div>

// //           <Link to="/shop" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-900 hover:text-gray-500 transition pb-2 border-b-2 border-black/20 hover:border-black">
// //             Full Catalog <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
// //           </Link>
// //         </div>

// //         {/* DATA RENDER LOGIC */}
// //         {loading ? (
// //           <div className="flex justify-center py-20">
// //             <Loader className="animate-spin text-black/20" size={48} />
// //           </div>
// //         ) : featuredProducts.length === 0 ? (
// //           <div className="text-center py-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] shadow-2xl">
// //             <p className="text-gray-500 font-black uppercase tracking-widest text-sm">
// //               Restocking exclusive drops...
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
// //             {featuredProducts.map((product) => (
// //               // Use the ProductCard component we just fixed
// //               <ProductCard key={product.id} product={product} />
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* Footer Space */}
// //       <div className="h-32"></div>
// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Loader } from 'lucide-react';
// import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
// import ProductCard from '../components/ProductCard'; 

// const Home = () => {
//   const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA";
//   const tagline = import.meta.env.VITE_TAGLINE || "Walk the Future";

//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const q = query(
//       collection(db, "products"),
//       where("featured", "==", true),
//       limit(4)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const products = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setFeaturedProducts(products);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="min-h-screen pt-36 px-3 md:px-8 pb-32 overflow-x-hidden bg-[#E5E5E5] relative">

//       {/* --- PREMIUM GLASS BACKGROUND DECOR --- */}
//       <div className="fixed top-[-5%] left-[-5%] w-[60%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full -z-10"></div>
//       <div className="fixed bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-purple-400/10 blur-[140px] rounded-full -z-10"></div>
//       <div className="fixed top-[40%] left-[20%] w-40 h-40 bg-yellow-200/20 blur-[90px] rounded-full -z-10"></div>

//       {/* --- HERO SECTION --- */}
//       <section className="flex flex-col items-center justify-center text-center space-y-6 mb-20 md:mb-40 animate-in fade-in zoom-in duration-1000">
//         <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter text-gray-900 uppercase leading-none drop-shadow-2xl">
//           {shopName}
//         </h1>
//         <p className="text-[10px] md:text-sm text-gray-600 font-black uppercase tracking-[0.5em] px-4">
//           {tagline}
//         </p>
//         <div className="w-12 h-[2px] bg-black mt-6 opacity-40 rounded-full"></div>
//       </section>

//       {/* --- FEATURED SECTION --- */}
//       <section className="max-w-7xl mx-auto relative z-10">

//         <div className="flex items-end justify-between mb-8 px-2">
//           <div>
//             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900 leading-none">
//               Featured
//             </h2>
//             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-400/40 leading-none">
//               Drops
//             </h2>
//           </div>

//           <Link to="/shop" className="group flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-900 hover:gap-4 transition-all">
//             See All <ArrowRight size={16} />
//           </Link>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <Loader className="animate-spin text-black/20" size={40} />
//           </div>
//         ) : featuredProducts.length === 0 ? (
//           <div className="text-center py-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2.5rem]">
//             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Stay tuned for new drops</p>
//           </div>
//         ) : (
//           /* 👇 GRID FIX: Mobile par 'grid-cols-2' kiya hai */
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </section>

//       <div className="h-20"></div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader, ShoppingBag } from 'lucide-react';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA SHOES";
  const tagline = import.meta.env.VITE_TAGLINE || "Walk the Future";

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time fetching for Featured products
    const q = query(
      collection(db, "products"),
      where("featured", "==", true),
      limit(4)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeaturedProducts(products);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen pt-36 px-4 md:px-8 pb-32 overflow-x-hidden relative">

      {/* --- GRAPHITE CHROME BACKGROUND DECORATION (Subtle & Silver) --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-chrome-700/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-chrome-500/10 blur-[140px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-[30%] right-[10%] w-64 h-64 bg-chrome-400/20 blur-[100px] rounded-full -z-10"></div>

      {/* --- HERO SECTION --- */}
      <section className="flex flex-col items-center justify-center text-center space-y-8 mb-24 md:mb-40 animate-in fade-in zoom-in duration-1000">
        <h1 className="text-[clamp(3.5rem,18vw,5.5rem)] sm:text-8xl md:text-8xl lg:text-[10rem] font-black tracking-normal text-white uppercase leading-none select-none drop-shadow-neon">
          {shopName.split(' ')[0]} <br className="md:hidden" /> <span className="text-chrome-400">{shopName.split(' ')[1] || ""}</span>
        </h1>

        <p className="text-xs md:text-sm text-chrome-300 font-black uppercase tracking-[0.6em] px-4">
          {tagline}
        </p>

        <div className="w-12 h-[2px] bg-chrome-600 mt-4 opacity-60 rounded-full"></div>

        {/* 👇 NEW EXPLORE BUTTON (Chrome Glass Style) */}
        <Link to="/shop" className="mt-8 group relative inline-flex items-center justify-center px-10 py-5 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs transition-all duration-300">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-lg group-hover:bg-white/10 group-hover:shadow-neon group-hover:scale-105 transition-all"></div>
          <span className="relative flex items-center gap-3 text-white group-hover:gap-5 transition-all">
            Explore Collection <ShoppingBag size={18} />
          </span>
        </Link>
      </section>

      {/* --- FEATURED SECTION --- */}
      <section className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-end justify-between mb-12 px-2">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none drop-shadow-sm">
              Featured
            </h2>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-chrome-600/40 leading-none">
              Drops
            </h2>
          </div>

          <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-chrome-300 transition pb-2 border-b-2 border-white/10 hover:border-chrome-600">
            View All <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* FEATURE D RENDER LOGIC */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader className="animate-spin text-white/20" size={48} />
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] shadow-sm">
            <p className="text-chrome-400 font-black uppercase tracking-widest text-xs">
              Waiting for the next drop...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <div className="h-32"></div>
    </div>
  );
};

export default Home;