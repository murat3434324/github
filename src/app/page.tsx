"use client";

import { useState, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleButtonClick = async () => {
    if (!executeRecaptcha) {
      alert('reCAPTCHA henüz yüklenmedi. Lütfen tekrar deneyin.');
      return;
    }

    setLoading(true);
    const token = await executeRecaptcha('submit');

    try {
      const res = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (data.success && data.score && data.score > 0.5) {
        const redirectUrl = isMobile ? 'https://t.ly/itopyaataozel' : 'https://t.ly/itopyaataozel';
        window.location.href = redirectUrl;
      } else {
        alert('Bot davranışı tespit edildi veya düşük skor. Tekrar deneyin.');
      }
    } catch (error) {
      console.error(error);
      alert('Doğrulama sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      <Image
        src="/back.jpg"
        alt="Background"
        fill
        className="object-cover opacity-80"
        priority
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="absolute top-4 right-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={80}
            className="object-contain"
          />
        </div>

        <motion.div
          className="text-5xl font-extrabold mb-4 text-center uppercase"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            WebkitTextStroke: "2px white",
            color: "transparent",
            textShadow: `
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3)
            `,
          }}
        >
          250 FREE SPIN
        </motion.div>

        <motion.div
          className="w-full relative"
          animate={{
            boxShadow: [
              "0 0 25px rgba(255, 0, 0, 0.5)",
              "0 0 50px rgba(255, 0, 0, 0.8)",
              "0 0 25px rgba(255, 0, 0, 0.5)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/cark.webp"
            alt="250 FREE SPIN KAZAN"
            width={1920}
            height={200}
            className="w-full h-auto"
            priority
          />

          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          className="text-5xl font-extrabold mt-4 mb-8 text-center uppercase"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            WebkitTextStroke: "2px white",
            color: "transparent",
            textShadow: `
               0 0 10px rgba(255, 255, 255, 0.5),
               0 0 20px rgba(255, 255, 255, 0.3)
            `,
          }}
        >
          250 FREE SPIN
        </motion.div>

        <button
          onClick={handleButtonClick}
          disabled={loading}
          className="inline-flex text-3xl h-14 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#800000,45%,#A52A2A,55%,#800000)] bg-[length:200%_100%] px-10 font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          {loading ? "Kontrol Ediliyor..." : "KAYIT OL"}
        </button>
      </div>
    </main>
  );
}