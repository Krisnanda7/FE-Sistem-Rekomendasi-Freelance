"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
    <nav className="w-full bg-[#2f526b] shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-8xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* === Logo + Judul === */}
        <motion.div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => handleNavigate("#home")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <h1 className="text-xl font-bold text-white">
            FreelanceExpert
          </h1>
        </motion.div>

        {/* === Menu Desktop === */}
        <ul className="hidden md:flex gap-6 text-white font-bold">
          <li>
            <motion.button
              onClick={() => handleNavigate("#home")}
              className="hover:text-[#2f526b] hover:bg-white border-2 border-white rounded-md px-2 py-1 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
          </li>
          <li>
            <motion.button
              onClick={() => handleNavigate("#about")}
              className="hover:text-[#2f526b] hover:bg-white border-2 border-white rounded-md px-2 py-1 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              
            >
              Tentang
            </motion.button>
          </li>
          <li>
            <motion.button
              onClick={() => handleNavigate("#contact")}
              className="hover:text-[#2f526b] hover:bg-white border-2 border-white rounded-md px-2 py-1 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kontak
            </motion.button>
          </li>
        </ul>

        {/* === Burger Button (Mobile) === */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>
      </div>

      {/* === Menu Burger (Mobile) === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden bg-[#2f526b] shadow-lg"
          >
            <ul className="flex flex-col items-center gap-4 py-4 text-white font-medium">
              <li>
                <button
                  onClick={() => handleNavigate("#home")}
                  className="hover:text-[#5cc9cb] transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("#about")}
                  className="hover:text-[#5cc9cb] transition"
                >
                  Tentang
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("#contact")}
                  className="hover:text-[#5cc9cb] transition"
                >
                  Kontak
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
