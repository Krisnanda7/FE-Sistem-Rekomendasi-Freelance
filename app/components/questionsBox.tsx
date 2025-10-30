"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { questions } from "../data/rules";

export default function QuestionBox({ onBack }: { onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnswer = (value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
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
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!isLoading ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-4xl w-full border border-gray-100 flex flex-col md:flex-row items-center gap-10"
          >
            {/* Gambar ilustrasi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center w-full md:w-1/2"
            >
              <Image
                src="/images/question.png" // pastikan file ini di folder /public
                alt="Freelance Illustration"
                width={300}
                height={300}
                className="rounded-xl"
              />
            </motion.div>

            {/* Konten pertanyaan */}
            <div className="flex-1 text-center md:text-left space-y-8">
              <motion.h2
                className="text-2xl font-extrabold text-[#2f526b]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
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

              {/* Tombol Jawaban */}
              <motion.div
                className="flex justify-center md:justify-start gap-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleAnswer(true)}
                  className={`px-8 py-3 rounded-full font-semibold text-lg shadow-md transition ${
                    answers[index] === true
                      ? "bg-[#2f526b] text-white"
                      : "bg-[#5cc9cb] hover:bg-[#49b4b6] text-white"
                  }`}
                >
                  Iya
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleAnswer(false)}
                  className={`px-8 py-3 rounded-full font-semibold text-lg shadow-md transition ${
                    answers[index] === false
                      ? "bg-[#2f526b] text-white"
                      : "bg-[#5cc9cb] hover:bg-[#49b4b6] text-white"
                  }`}
                >
                  Tidak
                </motion.button>
              </motion.div>

              {/* Tombol navigasi bawah */}
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={handlePrevious}
                  disabled={index === 0}
                  className={`px-6 py-2 rounded-full font-medium shadow transition ${
                    index === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#5cc9cb] hover:bg-[#49b4b6] text-white"
                  }`}
                  whileHover={{ scale: index === 0 ? 1 : 1.05 }}
                  whileTap={{ scale: index === 0 ? 1 : 0.95 }}
                >
                  Sebelumnya
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
                  className="bg-[#2f526b] h-3 rounded-full"
                  animate={{
                    width: `${((index + 1) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Animasi Loading
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
              <div className="absolute inset-0 rounded-full border-4 border-[#5cc9cb]/30"></div>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-t-[#2f526b] border-transparent shadow-md"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
              ></motion.div>
            </motion.div>

            <motion.p
              className="text-lg font-semibold text-[#2f526b]"
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
