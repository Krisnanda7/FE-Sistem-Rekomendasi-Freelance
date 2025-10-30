"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/navbar";
import QuestionBox from "./components/questionsBox";
import Image from "next/image";

export default function Home() {
  const [start, setStart] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center bg-white text-center overflow-x-hidden scroll-smooth">
      <Navbar onNavigateHome={() => setStart(false)} />

      <div className="flex flex-col items-center justify-center w-full px-6 pt-20 pb-0">
        {!start ? (
          <>
            {/* === HERO SECTION === */}
            <motion.section
              id="home"
              className="min-h-[80vh] w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Left Content */}
              <div className="flex-1 text-center md:text-left">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                  style={{ color: "#2f526b" }}
                >
                  Smart Freelance Expert System
                </h1>

                <p className="max-w-xl text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
                  Temukan{" "}
                  <span className="font-semibold text-[#2f526b]">
                    pekerjaan freelance terbaik
                  </span>{" "}
                  untukmu berdasarkan kemampuan, minat, dan pengalaman dengan
                  sistem pakar berbasis{" "}
                  <span className="font-semibold text-[#2f526b]">Rule-Based</span>.
                </p>

                <motion.button
                  onClick={() => setStart(true)}
                  className=" hover:bg-[#2f526b] text-[#2f526b] hover:text-white px-8 py-4 border-2 border-[#2f526b] rounded-full text-lg font-semibold shadow-lg transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mulai Konsultasi
                </motion.button>
              </div>

              {/* Right Image */}
              <motion.div
                className="flex-1 w-full max-w-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="/images/gambar2.png"
                  alt="Hero"
                  width={500}
                  height={400}
                  priority
                />
              </motion.div>
            </motion.section>

            {/* === ABOUT SECTION === */}
            <motion.section
              id="about"
              className="mt-16 max-w-6xl mx-auto px-6 pb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-extrabold text-[#2f526b] mb-10 text-center">
                Tentang Sistem Ini
              </h2>

              <div className="flex flex-col md:flex-row items-center gap-10">
                {/* === Left Image === */}
                <motion.div
                  className="flex-1 w-full max-w-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                    src="/images/aboutlogo.png"
                    alt="Tentang Sistem"
                    width={500}
                    height={400}
                    className="rounded-lg "
                    priority
                  />
                </motion.div>

                {/* === Right Text === */}
                  <div className="flex-1 text-gray-700 leading-relaxed">
                    <p className="mb-6 text-lg">
                      <span className="font-semibold text-[#2f526b]">FreelanceExpert</span> adalah sebuah sistem rekomendasi berbasis web yang dirancang untuk membantu individu menemukan bidang kerja freelance yang paling sesuai dengan kemampuan, pengalaman, dan minat pribadi. Platform ini hadir sebagai solusi bagi siapa pun yang ingin memulai karier di dunia freelance namun masih bingung menentukan arah dan bidang yang tepat.
                    </p>

                    <p className="mb-6 text-lg">
                      Logo <span className="font-semibold text-[#2f526b]">FreelanceExpert</span> terinspirasi dari inisial “FE” yang merepresentasikan kecepatan, ketepatan, dan profesionalitas seorang freelancer. Desainnya dibuat dengan gaya modern dan tegas untuk mencerminkan semangat kerja fleksibel namun tetap berorientasi pada hasil yang berkualitas tinggi.
                    </p>

                    <p className="text-lg">
                      Berdiri sejak tahun <span className="font-semibold text-[#2f526b]">2020</span>, <span className="font-semibold text-[#2f526b]">FreelanceExpert</span> telah berkembang menjadi sistem yang terus disempurnakan untuk menghadirkan pengalaman pengguna yang lebih baik. Dengan inovasi berkelanjutan, sistem ini berkomitmen membantu para freelancer menemukan peluang terbaik di dunia kerja digital yang terus berkembang.
                    </p>
                  </div>

              </div>
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

    </main>
  );
}
