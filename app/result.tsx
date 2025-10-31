// "use client";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Navbar from "../components/navbar";

// export default function ResultPage() {
//   const searchParams = useSearchParams();
//   const data = searchParams.get("data");

//   const [rules, setRules] = useState<any[]>([]);
//   const [result, setResult] = useState<any>(null);
//   const [showCongrats, setShowCongrats] = useState(false);

//   // Decode jawaban user dari query param
//   let answers: boolean[] = [];
//   try {
//     if (data) answers = JSON.parse(atob(data));
//   } catch (err) {
//     console.error("❌ Error decoding data:", err);
//   }

//   // Ambil rules dari backend Laravel
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/rules")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("✅ Rules dari backend:", data);
//         setRules(data);
//       })
//       .catch((err) => console.error("❌ Error fetching rules:", err));
//   }, []);

//   // Proses hasil rekomendasi begitu rules di-load
//   useEffect(() => {
//     if (rules.length === 0 || answers.length === 0) return;

//     let bestMatch: any = null;
//     let bestScore = 0;

//     rules.forEach((rule) => {
//       const conditions = rule.conditions; // sudah array
//       if (!Array.isArray(conditions)) {
//         console.warn("⚠️ Kondisi bukan array:", conditions);
//         return;
//       }

//       let score = 0;
//       conditions.forEach((cond: boolean, i: number) => {
//         if (answers[i] === cond) score++;
//       });

//       if (score > bestScore) {
//         bestScore = score;
//         bestMatch = rule;
//       }
//     });

//     if (bestMatch) {
//       setResult({
//         recommendation: bestMatch.name,
//         description: bestMatch.description,
//         score: bestScore,
//       });

//       // Kirim hasil ke backend (opsional)
//       fetch("http://127.0.0.1:8000/api/results", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           answers,
//           recommendation: bestMatch.name,
//         }),
//       }).catch((err) => console.error("❌ Error saving result:", err));
//     }
//   }, [rules, answers]);

//   // Animasi teks "Selamat!!"
//   useEffect(() => {
//     const timer = setTimeout(() => setShowCongrats(true), 400);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <Navbar onNavigateHome={() => (window.location.href = "/")} />

//       <main className="flex min-h-screen items-center justify-center bg-white relative overflow-hidden pt-20 px-6">
//         <motion.div
//           className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 border border-gray-100"
//           initial={{ opacity: 0, y: 30, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           {/* Gambar ilustrasi */}
//           <motion.div
//             className="flex justify-center w-full md:w-1/2"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7 }}
//           >
//             <Image
//               src="/images/final.png"
//               alt="Freelance Expert Illustration"
//               width={320}
//               height={320}
//               className="rounded-xl"
//             />
//           </motion.div>

//           {/* Hasil rekomendasi */}
//           <div className="flex-1 text-center md:text-left space-y-6">
//             {showCongrats && (
//               <motion.div
//                 className="mb-2"
//                 initial={{ opacity: 0, scale: 0.5, y: -20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 transition={{ duration: 0.8, type: "spring" }}
//               >
//                 <h1 className="text-3xl font-extrabold text-[#2f526b]">
//                   Selamat!!
//                 </h1>
//               </motion.div>
//             )}

//             {result ? (
//               result.score >= 6 ? (
//                 <>
//                   <h2 className="text-2xl font-bold text-[#2f526b]">
//                     Anda Direkomendasikan Menjadi :
//                   </h2>
//                   <h3 className="text-2xl font-semibold text-[#5cc9cb]">
//                     "{result.recommendation}"
//                   </h3>
//                   <p className="text-gray-700 leading-relaxed">
//                     {result.description}
//                   </p>
//                   <p className="text-gray-500 mt-4 text-sm">
//                     (Tingkat kecocokan: {result.score}/10)
//                   </p>

//                   <motion.button
//                     onClick={() => (window.location.href = "/")}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="mt-6 px-8 py-3 bg-[#5cc9cb] hover:bg-[#49b4b6] text-white rounded-full font-semibold shadow-md transition"
//                   >
//                     Kembali ke Home
//                   </motion.button>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-2xl font-bold text-red-600 mb-4">
//                     Tidak Ada Rekomendasi yang Tepat 😢
//                   </h2>
//                   <p className="text-gray-700">
//                     Coba ulangi pertanyaan dengan jawaban berbeda.
//                   </p>
//                   <motion.button
//                     onClick={() => (window.location.href = "/")}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="mt-6 px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white rounded-full font-semibold shadow-md transition"
//                   >
//                     Ulangi Pertanyaan
//                   </motion.button>
//                 </>
//               )
//             ) : (
//               <p className="text-gray-500">Memuat hasil rekomendasi...</p>
//             )}
//           </div>
//         </motion.div>

//         {/* Efek latar */}
//         <div className="absolute top-10 left-10 w-16 h-16 bg-blue-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
//         <div className="absolute bottom-16 right-12 w-24 h-24 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
//       </main>

//       {/* Footer */}
//       <motion.footer
//         id="contact"
//         className="w-full bg-[#2f526b] text-white text-center py-10 px-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.6, duration: 0.8 }}
//       >
//         <h2 className="text-2xl font-semibold mb-4">Hubungi Kami</h2>
//         <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-base">
//           <a
//             href="https://wa.me/6281234567890"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-[#5cc9cb] transition"
//           >
//             📞 +62 823-653-6783
//           </a>
//           <a
//             href="mailto:freelanceexpert@gmail.com"
//             className="hover:text-[#5cc9cb] transition"
//           >
//             ✉️ freelanceexpert@gmail.com
//           </a>
//           <a
//             href="https://www.google.com/maps?q=primakara"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-[#5cc9cb] transition"
//           >
//             📍 Jl. Merdeka No.10, Denpasar, Bali
//           </a>
//         </div>
//         <p className="text-sm text-gray-300 mt-6">© 2025 FreelanceExpert</p>
//       </motion.footer>
//     </>
//   );
// }
