import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

  if (loading) return <div className="h-screen flex items-center justify-center bg-chrome-950 text-white font-bold tracking-widest uppercase text-xs">Checking Auth...</div>;

  // Agar user logged in nahi hai, toh login page par bhej do
  if (!user) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;