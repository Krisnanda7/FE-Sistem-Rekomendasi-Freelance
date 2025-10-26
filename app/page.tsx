"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/navbar";
import QuestionBox from "./components/questionsBox";

export default function Home() {
  const [start, setStart] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-50 text-center overflow-x-hidden scroll-smooth">
      <Navbar onNavigateHome={() => setStart(false)} />

      <div className="flex flex-col items-center justify-center w-full px-6 pt-20 pb-12">
        {!start ? (
          <>
            {/* === HERO SECTION === */}
            <motion.section
              id="home"
              className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
                Smart Freelance Expert System
              </h1>

              <p className="max-w-2xl mx-auto text-gray-700 text-lg md:text-xl mb-8">
                Temukan{" "}
                <span className="font-semibold text-blue-600">
                  pekerjaan freelance terbaik
                </span>{" "}
                untukmu berdasarkan kemampuan, minat, dan pengalaman dengan
                sistem pakar berbasis{" "}
                <span className="font-semibold">Rule-Based</span>.
              </p>

              <motion.button
                onClick={() => setStart(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Konsultasi
              </motion.button>
            </motion.section>

            {/* === ABOUT SECTION === */}
            <motion.section
              id="about"
              className="mt-16 max-w-3xl mx-auto px-4 pb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-blue-700 mb-4">
                Tentang Sistem Ini
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sistem ini dirancang untuk membantu calon freelancer menemukan
                bidang kerja paling cocok melalui analisis 10 kondisi penting —
                mulai dari skill, pengalaman, hingga preferensi kerja.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dengan pendekatan sederhana dan hasil instan, pengguna dapat
                memperoleh rekomendasi akurat tanpa harus bingung memilih arah
                karier.
              </p>
            </motion.section>
          </>
        ) : (
          <motion.div
            key="question-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <QuestionBox onBack={() => setStart(false)} />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <motion.footer
        className="text-gray-500 text-sm py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        © 2025 FreelanceExpert — Dibuat dengan ❤️ oleh Tim Sistem Pakar
      </motion.footer>
    </main>
  );
}
