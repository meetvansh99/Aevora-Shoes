

// import React, { useState } from 'react';
// import { auth } from '../firebase/firebase';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

// import AdminCategories from '../components/AdminCategories';
// import AdminProducts from '../components/AdminProducts';
// import AdminFeatured from '../components/AdminFeatured';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('products');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     if (window.confirm("Bhai, logout karna hai?")) {
//       try {
//         await signOut(auth);
//         navigate('/'); // 👈 Fixed: Ab Home Page par jayega
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   const menuItems = [
//     { id: 'products', label: 'Products', icon: ShoppingBag },
//     { id: 'categories', label: 'Categories', icon: LayoutDashboard },
//     { id: 'featured', label: 'Featured', icon: Star },
//   ];

//   return (
//     <div className="min-h-screen bg-[#E5E5E5] flex flex-col md:flex-row relative overflow-x-hidden">
//        {/* Background Decor */}
//        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/5 blur-[100px] rounded-full"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/5 blur-[100px] rounded-full"></div>
//       </div>

//       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transition-transform duration-500 ease-in-out 
//         ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
//         <div className="p-8 border-b border-gray-900/50">
//           <h2 className="text-2xl font-black uppercase tracking-tighter italic">AEVORA ADMIN</h2>
//         </div>
//         <nav className="p-4 flex-grow space-y-2">
//           {menuItems.map((item) => (
//             <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} 
//               className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}>
//               <item.icon size={18} /> {item.label}
//             </button>
//           ))}
//         </nav>
//         <div className="p-4 border-t border-gray-900/50">
//           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-950/20 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-600 hover:text-white transition-all">
//             <LogOut size={16} /> Logout
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1 flex flex-col min-h-screen md:ml-64">
//         <header className="md:hidden bg-white/40 backdrop-blur-xl p-4 flex justify-between items-center sticky top-0 z-40 border-b border-white/20">
//           <h2 className="text-xs font-black uppercase italic tracking-widest">Admin Hub</h2>
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-black text-white rounded-xl">
//             {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </header>

//         <div className="p-4 md:p-16">
//           <div className="max-w-5xl mx-auto">
//             <div className="mb-12">
//               <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-none">
//                 {menuItems.find(i => i.id === activeTab)?.label} <span className="text-gray-300">Hub</span>
//               </h1>
//             </div>
//             <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] p-4 md:p-10 border border-white/60 min-h-[500px]">
//               {activeTab === 'categories' && <AdminCategories />}
//               {activeTab === 'products' && <AdminProducts />}
//               {activeTab === 'featured' && <AdminFeatured />}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Star, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

import AdminCategories from '../components/AdminCategories';
import AdminProducts from '../components/AdminProducts';
import AdminFeatured from '../components/AdminFeatured';
import AdminFilters from '../components/AdminFilters';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to exit the Admin Panel?")) {
      try {
        await signOut(auth);
        // Auth Guard (App.jsx) will handle redirect
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  };

  const menuItems = [
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: LayoutDashboard },
    { id: 'filters', label: 'Filters', icon: ShieldCheck },
    { id: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row relative">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-chrome-950/80 backdrop-blur-xl border-r border-white/10 text-white transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white leading-none">
            AEVORA <span className="text-chrome-400 not-italic block text-sm tracking-widest mt-1">ADMIN</span>
          </h2>
        </div>
        <nav className="p-4 flex-grow space-y-2">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-white/10 text-white shadow-neon border border-white/5' : 'text-chrome-300 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-900/20 text-red-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-red-500/20 hover:bg-red-800 hover:text-white transition-all shadow-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen md:ml-64">
        <header className="md:hidden bg-chrome-950/80 backdrop-blur-xl p-4 flex justify-between items-center sticky top-0 z-40 border-b border-white/10">
          <h2 className="text-xs font-black uppercase italic text-white">Admin Hub</h2>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-white/5 text-white rounded-xl border border-white/10">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        <div className="p-4 md:p-16">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">
                {menuItems.find(i => i.id === activeTab)?.label} <span className="text-chrome-400/50">Hub</span>
              </h1>
            </div>
            <div className="bg-white/5 backdrop-blur-2xl rounded-[2rem] md:rounded-[3.5rem] p-4 md:p-10 border border-white/10 min-h-[500px] shadow-glass relative overflow-hidden">
              {/* Content Area */}
              {activeTab === 'categories' && <AdminCategories />}
              {activeTab === 'products' && <AdminProducts />}
              {activeTab === 'filters' && <AdminFilters />}
              {activeTab === 'featured' && <AdminFeatured />}
            </div>
          </div>
        </div>
      </main>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default AdminDashboard;