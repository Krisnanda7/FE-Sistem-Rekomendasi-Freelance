"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onNavigateHome }: { onNavigateHome: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (target: string) => {
    setIsOpen(false);
    onNavigateHome(); // kembali ke home mode
    setTimeout(() => {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.h1
          className="text-xl font-bold text-blue-700 cursor-pointer"
          onClick={() => handleNavigate("#home")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          FreelanceExpert
        </motion.h1>

        {/* Menu Desktop */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <button
              onClick={() => handleNavigate("#home")}
              className="hover:text-blue-600"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("#about")}
              className="hover:text-blue-600"
            >
              Tentang
            </button>
          </li>
        </ul>

        {/* Burger Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>
      </div>

      {/* Menu Burger (mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-white shadow-lg border-t border-gray-100"
          >
            <ul className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
              <li>
                <button
                  onClick={() => handleNavigate("#home")}
                  className="hover:text-blue-600 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("#about")}
                  className="hover:text-blue-600 transition"
                >
                  About
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
