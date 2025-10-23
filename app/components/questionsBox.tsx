"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../data/rules";

export default function QuestionBox() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const router = useRouter();

  const handleAnswer = (value: boolean) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      // Encode data agar tidak forbidden
      const encoded = btoa(JSON.stringify(newAnswers));
      router.push(`/result?data=${encoded}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        Pertanyaan {index + 1} dari {questions.length}
      </h2>
      <p className="text-gray-700 text-lg">{questions[index]}</p>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Iya
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Tidak
        </button>
      </div>
    </div>
  );
}
