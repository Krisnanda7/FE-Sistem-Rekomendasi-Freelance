"use client";
import { useSearchParams } from "next/navigation";
import { rules } from "./data/rules";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  let answers: boolean[] = [];
  try {
    if (data) answers = JSON.parse(atob(data));
  } catch (err) {
    console.error("Error decoding data:", err);
  }

  
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

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
        {bestMatch && bestScore >= 6 ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Rekomendasi Anda 🎯
            </h2>
            <h3 className="text-xl font-semibold">{bestMatch.name}</h3>
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
      </div>
    </main>
  );
}
