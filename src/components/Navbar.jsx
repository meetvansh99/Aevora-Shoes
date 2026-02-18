import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const shopName = import.meta.env.VITE_SHOP_NAME || "AEVORA";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 pt-6">

        {/* ✨ GRAPHITE CHROME VERSION */}
        <div className="rounded-full px-6 md:px-8 py-4 flex justify-between items-center max-w-7xl mx-auto border border-white/10 shadow-glass bg-chrome-900/60 backdrop-blur-xl transition-all duration-300">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-black tracking-normal text-white uppercase"
            onClick={() => setIsOpen(false)}
          >
            {shopName.split(' ')[0]} <span className="text-chrome-400">{shopName.split(' ')[1] || ""}</span>
          </Link>

          {/* DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group ${isActive(link.path) ? "text-white" : "text-chrome-200 hover:text-white"
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-chrome-400 transition-all duration-300 ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            ))}
          </div>

          {/* MOBILE MENU BUTTON (Visible ONLY on Mobile) */}
          <button
            className="md:hidden p-2 text-white bg-chrome-800 rounded-full hover:bg-chrome-700 transition active:scale-90 shadow-sm"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* MOBILE FULL SCREEN MENU (Overlay) */}
      <div
        className={`fixed inset-0 z-[60] bg-chrome-950/95 backdrop-blur-xl flex flex-col items-center justify-center transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 p-3 bg-chrome-800 rounded-full text-white hover:bg-chrome-700 transition active:scale-90 shadow-md"
        >
          <X size={28} />
        </button>

        {/* Links */}
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-4xl font-black uppercase tracking-tight transition-colors ${isActive(link.path) ? "text-white" : "text-chrome-400 hover:text-chrome-200"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Footer Brand */}
        <div className="absolute bottom-10 text-xs font-bold text-chrome-600 tracking-widest uppercase">
          {shopName} Mobile
        </div>
      </div>
    </>
  );
};

export default Navbar;