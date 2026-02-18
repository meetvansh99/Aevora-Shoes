// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowUpRight } from 'lucide-react';

// const ProductCard = ({ product }) => {
//   const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
//   const message = `Hello Aevora! I'm interested in: ${product.name} (₹${product.price})`;
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//   return (
//     <div className="group relative block h-full p-[2px]"> 
//       {/* 👇 Real Glass Effect Card */}
//       <div className="h-full p-4 md:p-5 rounded-[2.5rem] transition-all duration-500 ease-out 
//                       bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl
//                       group-hover:-translate-y-3 group-hover:bg-white/60 group-hover:shadow-2xl 
//                       flex flex-col relative overflow-hidden">

//         {/* Glow Decorator (Glass ke peeche chamak) */}
//         <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-200/50 blur-3xl rounded-full group-hover:bg-gray-300/60 transition-colors"></div>

//         <Link to={`/product/${product.id}`}>
//           <div className="aspect-square rounded-3xl bg-white/20 overflow-hidden mb-5 relative border border-white/20 shadow-inner">
//             <img 
//               src={product.imageUrl} 
//               alt={product.name} 
//               className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" 
//             />

//             {/* Price Tag - Glass Style */}
//             <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-wider border border-white/10">
//               ₹{Number(product.price).toLocaleString('en-IN')}
//             </div>
//           </div>
//         </Link>

//         {/* Info */}
//         <div className="mt-auto px-1 z-10">
//           <p className="text-[9px] md:text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">
//             {product.category}
//           </p>
//           <h3 className="text-sm md:text-xl font-black text-gray-900 uppercase tracking-tighter leading-tight truncate mb-4">
//             {product.name}
//           </h3>

//           <a 
//             href={whatsappUrl}
//             target="_blank"
//             className="block w-full py-3 rounded-2xl bg-black/90 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-black transition-all text-center shadow-lg active:scale-95 border border-white/10"
//           >
//             Get it now
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";

  // 👇 FIX: Check if imageUrls array exists, else fallback to imageUrl
  const displayImage = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls[0]
    : product.imageUrl;

  const message = `Hello Aevora! I'm interested in: ${product.name} (Price: ₹${product.price})`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="group relative block h-full p-[2px]">
      {/* Real Glass Effect Card - GRAPHITE CHROME */}
      <div className="h-full p-4 md:p-5 rounded-[2.5rem] transition-all duration-500 ease-out 
                      bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass
                      group-hover:-translate-y-3 group-hover:bg-white/10 group-hover:shadow-neon 
                      flex flex-col relative overflow-hidden">

        {/* Glow Decorator */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-chrome-400/20 blur-3xl rounded-full group-hover:bg-chrome-300/30 transition-colors"></div>

        <Link to={`/product/${product.id}`}>
          <div className="aspect-square rounded-3xl bg-white/5 overflow-hidden mb-5 relative border border-white/10 shadow-inner">
            <img
              src={displayImage} // 👈 Fixed source
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" // Removed mix-blend-multiply for dark mode clarity
            />

            {/* Price Tag - Glass Style */}
            <div className="absolute top-3 right-3 bg-chrome-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-wider border border-white/10">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </div>
          </div>
        </Link>

        {/* Info */}
        <div className="mt-auto px-1 z-10">
          <p className="text-[9px] md:text-[10px] text-chrome-300 font-black uppercase tracking-[0.2em] mb-1">
            {product.category}
          </p>
          <h3 className="text-sm md:text-xl font-black text-white uppercase tracking-tighter leading-tight truncate mb-4">
            {product.name}
          </h3>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-2xl bg-chrome-600/20 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-[0.15em] hover:bg-chrome-600 transition-all text-center shadow-sm active:scale-95 border border-white/10"
          >
            Get it now
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;