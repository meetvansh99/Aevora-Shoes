// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '../firebase/firebase';
// import { Loader, ArrowLeft, MessageCircle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImg, setActiveImg] = useState(0);

//   const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docRef = doc(db, "products", id);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() });
//         }
//       } catch (error) { console.error(error); } finally { setLoading(false); }
//     };
//     fetchProduct();
//   }, [id]);

//   if (loading) return <div className="min-h-screen flex justify-center items-center bg-[#E5E5E5]"><Loader className="animate-spin" /></div>;
//   if (!product) return <div className="min-h-screen flex justify-center items-center">Product Not Found</div>;

//   const images = product.imageUrls || [product.imageUrl];

//   const nextImg = () => setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   const prevImg = () => setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

//   const message = `*NEW ORDER INQUIRY* 🔥\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}\n*Image:* ${images[0]}\n\nHello Aevora! Is this available?`;
//   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#E5E5E5]">
//       <div className="max-w-6xl mx-auto relative z-10">
//         <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black mb-10 transition-all">
//           <ArrowLeft size={16} /> Back to Collection
//         </button>

//         <div className="grid md:grid-cols-2 gap-10 bg-white/30 backdrop-blur-xl border border-white/40 p-5 md:p-12 rounded-[3.5rem] shadow-2xl">

//           {/* LUXURY IMAGE SLIDER */}
//           <div className="flex flex-col gap-4">
//             <div className="aspect-square rounded-[2.5rem] bg-white/20 overflow-hidden relative border border-white/20 shadow-inner group">
//               <img src={images[activeImg]} className="w-full h-full object-cover transition-all duration-700" alt="" />

//               {images.length > 1 && (
//                 <>
//                   <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
//                     <ChevronLeft size={20} />
//                   </button>
//                   <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all">
//                     <ChevronRight size={20} />
//                   </button>
//                   {/* Dots */}
//                   <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
//                     {images.map((_, i) => (
//                       <div key={i} className={`h-1 transition-all rounded-full ${activeImg === i ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* Thumbnails */}
//             <div className="flex gap-3 justify-center">
//               {images.map((img, i) => (
//                 <img key={i} src={img} onClick={() => setActiveImg(i)} className={`w-16 h-16 rounded-2xl object-cover cursor-pointer border-2 transition-all ${activeImg === i ? 'border-black scale-110' : 'border-transparent opacity-50'}`} />
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col justify-center space-y-8">
//             <div>
//               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-3 block">{product.category}</span>
//               <h1 className="text-4xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-4">{product.name}</h1>
//               <p className="text-2xl md:text-4xl font-black text-gray-800 italic">₹{product.price}</p>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed opacity-80">{product.description}</p>
//             <div className="pt-6">
//               <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full py-6 rounded-[2rem] bg-black text-white text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
//                 <MessageCircle size={22} /> Buy on WhatsApp
//               </a>
//               <p className="mt-4 flex items-center justify-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">
//                 <ShieldCheck size={12} /> Secure Transaction via WhatsApp
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Loader, ArrowLeft, MessageCircle, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  const phoneNumber = import.meta.env.VITE_WHATSAPP_NO || "917046570870";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-transparent"><Loader className="animate-spin text-white" /></div>;
  if (!product) return <div className="min-h-screen flex justify-center items-center font-black uppercase text-white">Product Not Found</div>;

  // 👇 Multi-image fallback
  const images = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl];

  const nextImg = () => setActiveImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImg = () => setActiveImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const message = `*ORDER INQUIRY* 🔥\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}\n*Category:* ${product.category}\n*Image:* ${images[0]}\n\nHello Aevora! Is this item available?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-chrome-300 hover:text-white mb-10 transition-all">
          <ArrowLeft size={16} /> Back to Collection
        </button>

        <div className="grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-12 rounded-[3.5rem] shadow-glass">
          <div className="flex flex-col gap-4">
            <div className="aspect-square rounded-[2.5rem] bg-white/5 overflow-hidden relative border border-white/10 group">
              <img src={images[activeImg]} className="w-full h-full object-cover" alt="" />
              {images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all shadow-sm"><ChevronLeft size={20} /></button>
                  <button onClick={nextImg} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all shadow-sm"><ChevronRight size={20} /></button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <div key={i} className={`h-1 transition-all rounded-full ${activeImg === i ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-3 justify-center py-2 overflow-x-auto">
              {images.map((img, i) => (
                <img key={i} src={img} onClick={() => setActiveImg(i)} className={`w-14 h-14 md:w-16 md:h-16 rounded-xl object-cover cursor-pointer border-2 transition-all ${activeImg === i ? 'border-white scale-110' : 'border-transparent opacity-50'}`} />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-chrome-400 mb-3 block">{product.category}</span>
              <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">{product.name}</h1>
              <p className="text-2xl md:text-4xl font-black text-chrome-300 italic">₹{product.price}</p>
            </div>
            <p className="text-chrome-200 text-sm font-medium leading-relaxed opacity-80">{product.description}</p>
            <div className="pt-6">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 w-full py-6 rounded-[2rem] bg-chrome-600/80 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-chrome-500 active:scale-95 transition-all border border-white/10">
                <MessageCircle size={22} /> Buy on WhatsApp
              </a>
              <p className="mt-4 flex items-center justify-center gap-2 text-[9px] font-black text-chrome-500 uppercase tracking-widest"><ShieldCheck size={12} /> Secure Ordering</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;