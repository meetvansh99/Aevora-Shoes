// import React from 'react';
// import { Instagram, Phone, MapPin, MessageCircle, Clock, Send, ShieldCheck } from 'lucide-react';

// const Contact = () => {
//   const instagram = import.meta.env.VITE_INSTAGRAM || "#"; 
//   const phone = import.meta.env.VITE_PHONE || "+91 70465 70870";
//   const whatsapp = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
//   const locationName = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";
//   const mapLink = import.meta.env.VITE_MAP_LINK || "#";

//   const contactMethods = [
//     { icon: <Phone size={24} />, title: "Call Us", value: phone, link: `tel:${phone}` },
//     { icon: <MessageCircle size={24} />, title: "WhatsApp", value: "Chat with us", link: `https://wa.me/${whatsapp}` },
//     { icon: <Instagram size={24} />, title: "Instagram", value: "@aevorashoes", link: instagram },
//     { icon: <Clock size={24} />, title: "Working Hours", value: "10 AM - 8 PM", link: null }
//   ];

//   return (
//     <div className="min-h-screen pt-40 pb-20 px-4 md:px-8 relative overflow-hidden bg-[#E5E5E5]">
//       {/* Background Decor */}
//       <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/5 blur-[120px] rounded-full -z-10"></div>
//       <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/5 blur-[140px] rounded-full -z-10"></div>

//       <div className="max-w-5xl mx-auto relative z-10">
//         <div className="text-center mb-16">
//           <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-4">Get In Touch</p>
//           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 leading-none">
//             Contact <span className="text-gray-400/30">Studio</span>
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {contactMethods.map((method, index) => (
//             <div key={index} className="group p-8 rounded-[2.5rem] bg-white/30 backdrop-blur-xl border border-white/40 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/50 flex items-center gap-6">
//               <div className="p-5 rounded-2xl bg-black text-white shadow-lg group-hover:scale-110 transition-transform">
//                 {method.icon}
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{method.title}</p>
//                 {method.link ? (
//                   <a href={method.link} target="_blank" rel="noreferrer" className="text-xl font-black uppercase tracking-tighter text-gray-900 hover:opacity-60 transition-opacity">
//                     {method.value}
//                   </a>
//                 ) : (
//                   <p className="text-xl font-black uppercase tracking-tighter text-gray-900">{method.value}</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Location Bar with Button */}
//         <div className="mt-8 p-8 md:p-10 rounded-[3rem] bg-white/30 backdrop-blur-xl border border-white/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
//               <MapPin size={24} />
//             </div>
//             <div className="text-left">
//               <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Our Studio Location</p>
//               <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{locationName}</h2>
//             </div>
//           </div>
//           <a 
//             href={mapLink} 
//             target="_blank" 
//             rel="noreferrer" 
//             className="w-full md:w-auto px-10 py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-800 transition-all active:scale-95 shadow-2xl"
//           >
//             <Send size={16} /> Get Directions
//           </a>
//         </div>

//         <div className="mt-16 text-center">
//           <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
//             <ShieldCheck size={14} className="opacity-50" />
//             Aevora Premium Support Active
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React from 'react';
import { Instagram, Phone, MapPin, MessageCircle, Clock, Send, ShieldCheck } from 'lucide-react';

const Contact = () => {
  const instagram = import.meta.env.VITE_INSTAGRAM || "#";
  const phone = import.meta.env.VITE_PHONE || "+91 70465 70870";
  const whatsapp = import.meta.env.VITE_WHATSAPP_NO || "917046570870";
  const locationName = import.meta.env.VITE_LOCATION || "Ahmedabad, Gujarat";
  const mapLink = import.meta.env.VITE_MAP_LINK || "#";

  const contactMethods = [
    { icon: <Phone size={24} />, title: "Call Us", value: phone, link: `tel:${phone}` },
    { icon: <MessageCircle size={24} />, title: "WhatsApp", value: "Chat with us", link: `https://wa.me/${whatsapp}` },
    { icon: <Instagram size={24} />, title: "Instagram", value: "@aevorashoes", link: instagram },
    { icon: <Clock size={24} />, title: "Working Hours", value: "10 AM - 8 PM", link: null }
  ];

  return (
    <div className="min-h-screen pt-40 pb-20 px-4 md:px-8 relative overflow-hidden bg-transparent">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-chrome-700/20 blur-[120px] rounded-full -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-chrome-500/10 blur-[140px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-chrome-500 mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
            Contact <span className="text-chrome-400/50">Studio</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="group p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 flex items-center gap-6">
              <div className="p-5 rounded-2xl bg-chrome-900 text-white shadow-lg group-hover:scale-110 transition-transform border border-white/5">
                {method.icon}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-widest text-chrome-300 mb-1">{method.title}</p>
                {method.link ? (
                  <a href={method.link} target="_blank" rel="noopener noreferrer" className="text-xl font-black uppercase tracking-tighter text-white hover:opacity-60 transition-opacity">
                    {method.value}
                  </a>
                ) : (
                  <p className="text-xl font-black uppercase tracking-tighter text-white">{method.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Location Bar with Fixed Map Link */}
        <div className="mt-8 p-8 md:p-10 rounded-[3rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-glass flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-chrome-200">
              <MapPin size={24} />
            </div>
            <div className="text-left">
              <p className="text-[9px] font-black uppercase tracking-widest text-chrome-300">Our Studio Location</p>
              <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{locationName}</h2>
            </div>
          </div>

          {/* 👇 TARGET BLANK + REL IS MUST FOR EXTERNAL LINKS */}
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-10 py-5 bg-chrome-900/80 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-chrome-800 transition-all active:scale-95 shadow-xl border border-white/10"
          >
            <Send size={16} /> Get Directions
          </a>
        </div>

        <div className="mt-16 text-center">
          <p className="text-[9px] font-black text-chrome-400 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
            <ShieldCheck size={14} className="opacity-50" />
            Aevora Premium Support Active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;