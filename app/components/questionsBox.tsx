"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../data/rules";

export default function QuestionBox({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnswer = (value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value; // simpan jawaban di index saat ini
    setAnswers(newAnswers);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setIsLoading(true);
      const encoded = btoa(JSON.stringify(newAnswers));

      setTimeout(() => {
        router.push(`/result?data=${encoded}`);
      }, 2500);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white p-10 rounded-2xl shadow-lg max-w-xl w-full text-center space-y-8 border border-gray-100"
          >
            <motion.h2
              className="text-2xl font-extrabold text-blue-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Pertanyaan {index + 1} dari {questions.length}
            </motion.h2>

            <motion.p
              className="text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {questions[index]}
            </motion.p>

            <motion.div
              className="flex justify-center gap-6 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Tombol Iya */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAnswer(true)}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition shadow-sm ${
                  answers[index] === true
                    ? "bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Iya
              </motion.button>

              {/* Tombol Tidak */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAnswer(false)}
                className={`px-8 py-3 rounded-full font-semibold text-lg transition shadow-sm ${
                  answers[index] === false
                    ? "bg-purple-700 text-white"
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                Tidak
              </motion.button>
            </motion.div>

            {/* Tombol navigasi bawah */}
            <div className="flex justify-between mt-6">
              {/* Sebelumnya */}
              <motion.button
                onClick={handlePrevious}
                disabled={index === 0}
                className={`px-6 py-2 rounded-full font-medium shadow transition ${
                  index === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-teal-400 hover:bg-teal-500 text-white"
                }`}
                whileHover={{ scale: index === 0 ? 1 : 1.05 }}
                whileTap={{ scale: index === 0 ? 1 : 0.95 }}
              >
                Sebelumnya
              </motion.button>

              {/* Kembali ke Home */}
              <motion.button
                onClick={onBack}
                className="px-6 py-2 rounded-full font-medium shadow bg-pink-400 hover:bg-pink-500 text-white transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Kembali ke Home
              </motion.button>
            </div>

            {/* Progress bar */}
            <motion.div
              className="mt-6 w-full bg-gray-200 rounded-full h-3 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="bg-blue-600 h-3 rounded-full"
                animate={{
                  width: `${((index + 1) / questions.length) * 100}%`,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center space-y-6"
          >
            <motion.div
              className="relative w-20 h-20"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-transparent shadow-md"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
              ></motion.div>
            </motion.div>

            <motion.p
              className="text-lg font-semibold text-blue-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.2,
              }}
            >
              Mencocokkan pilihan kamu...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
