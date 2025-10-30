"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { rules } from "../data/rules";
import Navbar from "../components/navbar";

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
      <Navbar onNavigateHome={() => (window.location.href = "/")} />

      <main className="flex min-h-screen items-center justify-center bg-white relative overflow-hidden pt-20 px-6">
        <motion.div
          className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 border border-gray-100"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Gambar ilustrasi */}
          <motion.div
            className="flex justify-center w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/final.png"
              alt="Freelance Expert Illustration"
              width={320}
              height={320}
              className="rounded-xl"
            />
          </motion.div>

          {/* Hasil rekomendasi */}
          <div className="flex-1 text-center md:text-left space-y-6">
            {showCongrats && (
              <motion.div
                className="mb-2"
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <h1 className="text-3xl font-extrabold text-[#2f526b]">
                  Selamat!!
                </h1>
              </motion.div>
            )}

            {bestMatch && bestScore >= 6 ? (
              <>
                <h2 className="text-2xl font-bold text-[#2f526b]">
                  Anda Direkomendasikan Menjadi
                </h2>
                <h3 className="text-2xl font-semibold text-[#5cc9cb]">
                  "{bestMatch.name}"
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {bestMatch.description}
                </p>
                <p className="text-gray-500 mt-4 text-sm">
                  (Tingkat kecocokan: {bestScore}/10)
                </p>

                <motion.button
                  onClick={() => (window.location.href = "/")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-3 bg-[#5cc9cb] hover:bg-[#49b4b6] text-white rounded-full font-semibold shadow-md transition"
                >
                  Kembali ke Home
                </motion.button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                  Tidak Ada Rekomendasi yang Tepat 😢
                </h2>
                <p className="text-gray-700">
                  Coba ulangi pertanyaan dengan jawaban berbeda.
                </p>
                <motion.button
                  onClick={() => (window.location.href = "/")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold shadow-md transition"
                >
                  Ulangi Pertanyaan
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
        

        {/* Dekorasi latar belakang */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-blue-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-16 right-12 w-24 h-24 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        
      </main>
      {/* Footer / Contact Section */}
        <motion.footer
        id="contact"
          className="w-full bg-[#2f526b] text-white text-center py-10 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-base">
            {/* Nomor WhatsApp */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5cc9cb] transition"
            >
              📞 +62 823-653-6783
            </a>

            {/* Email */}
            <a
              href="mailto:freelanceexpert@gmail.com"
              className="hover:text-[#5cc9cb] transition"
            >
              ✉️ freelanceexpert@gmail.com
            </a>

            {/* Alamat */}
            <a
              href="google.com/maps?sca_esv=f1b1fe1a0ad9e49d&output=search&q=primakara&source=lnms&fbs=AIIjpHwYn5PYZFUMfY6GOBRRFeKwIhsYlvQ8TQO08Ar3Kuk2WjsVNYrp-OGcZSb_GqBizAZR6vKROFNLhETxb1icv9rAZn9NXXC92s2m8gcP3-KSMwSL9mo-y09oBLD_9QXVgad_FsrR4cJWft1u7Rpc3qVXxFGexoVoU4UEXm1GrTsYJHVMMlHssEP0tbH5Ssm32YHt1CWgWBuuavo7Sj1_6Hd6GCbgBA&entry=mc&ved=1t:200715&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5cc9cb] transition"
            >
              📍 Jl. Merdeka No.10, Denpasar, Bali
            </a>
          </div>

          <p className="text-sm text-gray-300 mt-6">
            © 2025 FreelanceExpert
          </p>
        </motion.footer>

    </>
  );
}
