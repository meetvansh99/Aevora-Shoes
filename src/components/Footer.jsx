// import React from 'react';
// import { Instagram, Phone, MapPin, Lock, MessageCircle } from 'lucide-react';

// const Footer = ({ onOpenAdmin }) => {
//   const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA SHOES";
//   const instagram = import.meta.env.VITE_INSTAGRAM;
//   const whatsapp = import.meta.env.VITE_WHATSAPP_NO;
//   const phone = import.meta.env.VITE_PHONE;
//   const location = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";

//   return (
//     <footer className="mt-auto px-4 md:px-8 pb-8 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto bg-white/30 backdrop-blur-xl border border-white/40 rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-10">
//           <div className="text-center md:text-left">
//             <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 leading-none">
//               {shopName.split(' ')[0]} <span className="text-gray-400/40">{shopName.split(' ')[1] || ""}</span>
//             </h2>
//             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400 mt-2 italic">Walk the future</p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-4">
//             {instagram && (
//               <a href={instagram} target="_blank" rel="noreferrer" className="p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all shadow-lg border border-white/40 group active:scale-90">
//                 <Instagram size={20} className="group-hover:rotate-12 transition-transform"/>
//               </a>
//             )}
//             {whatsapp && (
//               <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all shadow-lg border border-white/40 group active:scale-90">
//                 <MessageCircle size={20} className="group-hover:-rotate-12 transition-transform"/>
//               </a>
//             )}
//             {phone && (
//               <a href={`tel:${phone}`} className="p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all shadow-lg border border-white/40 group active:scale-90">
//                 <Phone size={20} className="group-hover:scale-110 transition-transform"/>
//               </a>
//             )}
//             <div className="relative group">
//               <div className="p-4 bg-white/40 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-all shadow-lg border border-white/40 active:scale-90 cursor-pointer">
//                 <MapPin size={20} />
//               </div>
//               <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
//                 {location}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12 pt-8 border-t border-black/5 flex justify-between items-center">
//           <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
//             © {new Date().getFullYear()} {shopName}.
//           </p>

//           <button onClick={onOpenAdmin} className="p-3 bg-white/10 backdrop-blur-md rounded-full text-gray-300 hover:text-black hover:bg-white/60 transition-all border border-white/10 active:scale-90">
//             <Lock size={12} />
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Instagram, Phone, MapPin, Lock, MessageCircle } from 'lucide-react';

const Footer = ({ onOpenAdmin }) => {
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA SHOES";
  const instagram = import.meta.env.VITE_INSTAGRAM;
  const whatsapp = import.meta.env.VITE_WHATSAPP_NO;
  const phone = import.meta.env.VITE_PHONE;
  const locationName = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";
  const mapLink = import.meta.env.VITE_MAP_LINK || "#";

  return (
    <footer className="mt-auto px-4 md:px-8 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-glass relative">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
              {shopName.split(' ')[0]} <span className="text-chrome-400">{shopName.split(' ')[1] || ""}</span>
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-chrome-300 mt-2 italic">Walk the future</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {instagram && (
              <a href={instagram} target="_blank" rel="noreferrer" className="p-4 bg-white/5 backdrop-blur-md rounded-full hover:bg-chrome-600 hover:text-white transition-all shadow-sm border border-white/10 group active:scale-90">
                <Instagram size={20} className="group-hover:rotate-12 transition-transform text-chrome-200 group-hover:text-white" />
              </a>
            )}
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="p-4 bg-white/5 backdrop-blur-md rounded-full hover:bg-chrome-600 hover:text-white transition-all shadow-sm border border-white/10 group active:scale-90">
                <MessageCircle size={20} className="group-hover:-rotate-12 transition-transform text-chrome-200 group-hover:text-white" />
              </a>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="p-4 bg-white/5 backdrop-blur-md rounded-full hover:bg-chrome-600 hover:text-white transition-all shadow-sm border border-white/10 group active:scale-90">
                <Phone size={20} className="group-hover:scale-110 transition-transform text-chrome-200 group-hover:text-white" />
              </a>
            )}

            <div className="relative group">
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="p-4 bg-white/5 backdrop-blur-md rounded-full hover:bg-chrome-600 hover:text-white transition-all shadow-sm border border-white/10 active:scale-90 cursor-pointer block"
              >
                <MapPin size={20} className="text-chrome-200 group-hover:text-white" />
              </a>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 bg-chrome-950 text-white text-[8px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
                {locationName}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-chrome-400">
            © {new Date().getFullYear()} {shopName}.
          </p>

          <button onClick={onOpenAdmin} className="p-3 bg-white/5 backdrop-blur-md rounded-full text-chrome-400 hover:text-white hover:bg-white/10 transition-all border border-white/10 active:scale-90">
            <Lock size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;