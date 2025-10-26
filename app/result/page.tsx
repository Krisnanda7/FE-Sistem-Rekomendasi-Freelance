"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { rules } from "../data/rules";
import Navbar from "../components/navbar"; // ✅ Tambahkan ini

export default function ResultPage({ onNavigateHome }: any) {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [showCongrats, setShowCongrats] = useState(false);

  let answers: boolean[] = [];
  try {
    if (data) answers = JSON.parse(atob(data));
  } catch (err) {
    console.error("Error decoding data:", err);
  }

  // Cari rule terbaik
  let bestMatch: any = null;
  let bestScore = 0;
  rules.forEach((rule) => {
    let score = 0;
    rule.conditions.forEach((cond: boolean, i: number) => {
      if (answers[i] === cond) score++;
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  });

  // Delay animasi selamat
  useEffect(() => {
    const timer = setTimeout(() => setShowCongrats(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ✅ Tambahkan navbar */}
      <Navbar onNavigateHome={() => window.location.href = "/"} />

      <main className="flex min-h-screen items-center justify-center bg-blue-100 relative overflow-hidden pt-20">
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {showCongrats && (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.5, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <h1 className="text-3xl font-extrabold text-green-600 animate-bounce">
                🎉 Selamat! 🎉
              </h1>
            </motion.div>
          )}

          {bestMatch && bestScore >= 6 ? (
            <>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Anda Direkomendasikan Menjadi
              </h2>
              <h3 className="text-black text-xl font-semibold">
                "{bestMatch.name}"
              </h3>
              <p className="text-gray-700 mt-2">{bestMatch.description}</p>
              <p className="text-gray-500 mt-4 text-sm">
                (Tingkat kecocokan: {bestScore}/10)
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Tidak Ada Rekomendasi yang Tepat 😢
              </h2>
              <p className="text-gray-700">
                Coba ulangi pertanyaan dengan jawaban berbeda.
              </p>
            </>
          )}
        </motion.div>

        {/* Dekorasi latar belakang */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-blue-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-16 right-12 w-24 h-24 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </main>
    </>
  );
}
