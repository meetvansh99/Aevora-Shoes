// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
// import { auth } from './firebase/firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// // --- COMPONENTS ---
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import LockModal from './components/LockModal';

// // --- PAGES ---
// import Home from './pages/Home';
// import Collection from './pages/Collection';
// import ProductDetails from './pages/ProductDetails';
// import Contact from './pages/Contact'; // 👈 FIX: Glassy Contact Page Import Kiya
// import AdminLogin from './pages/AdminLogin';
// import AdminDashboard from './pages/AdminDashboard';

// // 🔒 AUTH GUARD: Route protection logic
// const ProtectedRoute = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) return (
//     <div className="h-screen flex items-center justify-center bg-[#E5E5E5]">
//       <div className="flex flex-col items-center gap-4">
//         <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
//         <p className="font-black uppercase tracking-[0.3em] text-[10px]">Verifying Admin</p>
//       </div>
//     </div>
//   );

//   if (!user) {
//     return <Navigate to="/admin" replace />;
//   }

//   return children;
// };

// const Layout = () => {
//   const location = useLocation();
//   const [isLockModalOpen, setIsLockModalOpen] = useState(false);

//   // Check if current route is admin related
//   const isAdminPage = location.pathname.startsWith('/admin');

//   return (
//     <div className="min-h-screen bg-[#E5E5E5] text-gray-900 font-sans selection:bg-black selection:text-white overflow-x-hidden flex flex-col relative">

//       {/* --- GLOBAL GLASS BACKGROUND DECOR --- */}
//       <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
//       <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/10 blur-[140px] rounded-full -z-10 pointer-events-none"></div>
//       <div className="fixed top-[30%] right-[5%] w-64 h-64 bg-yellow-200/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

//       {/* 1. Navbar: Admin pages par hide rahega */}
//       {!isAdminPage && <Navbar />}

//       <main className="flex-grow">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/shop" element={<Collection />} />
//           <Route path="/product/:id" element={<ProductDetails />} />

//           {/* 👇 FIX: Asli Glassy Contact Page yahan connect kiya */}
//           <Route path="/contact" element={<Contact />} />

//           {/* --- ADMIN ROUTES --- */}
//           <Route path="/admin" element={<AdminLogin />} />

//           {/* DASHBOARD SECURED */}
//           <Route 
//             path="/admin/dashboard" 
//             element={
//               <ProtectedRoute>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             } 
//           />

//           {/* Fallback for 404 - Optional */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>

//       {/* 2. Footer: Admin pages par hide rahega */}
//       {!isAdminPage && (
//         <Footer onOpenAdmin={() => setIsLockModalOpen(true)} />
//       )}

//       {/* 3. Global Admin Lock Modal */}
//       <LockModal 
//         isOpen={isLockModalOpen} 
//         onClose={() => setIsLockModalOpen(false)} 
//       />
//     </div>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LockModal from './components/LockModal';

// --- PAGES ---
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// 🔒 AUTH GUARD: Fixed logic to redirect to HOME on logout
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-chrome-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black uppercase tracking-[0.3em] text-[10px] text-white">Verifying Admin</p>
      </div>
    </div>
  );

  // 👇 FIX: Logout hote hi seedha Home (/) par bhejega
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const Layout = () => {
  const location = useLocation();
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-chrome-500 selection:text-white overflow-x-hidden flex flex-col relative">

      {/* GLOBAL GLASS DECOR - Updated for Dark Theme */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-chrome-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-chrome-700/10 blur-[140px] rounded-full -z-10 pointer-events-none"></div>

      {!isAdminPage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPage && (
        <Footer onOpenAdmin={() => setIsLockModalOpen(true)} />
      )}

      <LockModal
        isOpen={isLockModalOpen}
        onClose={() => setIsLockModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;