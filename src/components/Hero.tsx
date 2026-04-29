import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { getHomepageData } from '@/lib/api'; 

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const { t } = useTranslation();
  const [heroData, setHeroData] = useState<any>(null);

useEffect(() => {
  getHomepageData()
    .then((res) => {
      console.log("API:", res.data);

      const sections = res.data.data.sections || [];

      console.log("SECTIONS ARRAY:", sections);

      const section = sections.find((s: any) =>
        s.key?.toLowerCase().includes('hero')
      );

      console.log("HERO:", section);

      setHeroData(section || null);
    })
    .catch((err) => console.error("Error fetching homepage data:", err));
}, []);
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 🎥 Video */}
      <div className="absolute inset-0 z-0">
       <video autoPlay loop muted playsInline>
  <source src="/hero.mp4" type="video/mp4" />
</video>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5),rgba(13,96,232,0.3))]" />
      </div>

      {/* ✨ Content */}
      <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[32px] md:text-[56px] font-bold leading-[1.3] mb-6 bg-gradient-to-r from-white via-[#9EC5FF] to-[#3B82F6] bg-clip-text text-transparent"
        >
          {heroData?.title || t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[16px] md:text-[18px] text-white/80 leading-[1.9] mb-10"
        >
          {heroData?.subtitle || t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-[#0359E8] hover:bg-blue-700 text-white px-12 py-6 text-[18px] rounded-xl shadow-lg font-bold"
          >
            {heroData?.payload?.cta_text || t('hero.cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}