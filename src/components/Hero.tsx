import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { getHomepageData } from '@/lib/api'; 

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const { t, i18n } = useTranslation();
  const [heroData, setHeroData] = useState<any>(null);

  // جلب البيانات عند تحميل الصفحة أو عند تغيير اللغة
  useEffect(() => {
    getHomepageData()
      .then((res) => {
        const sections = res.data?.data?.sections || [];
        const section = sections.find((s: any) =>
          s.key?.toLowerCase().includes('hero')
        );
        setHeroData(section || null);
      })
      .catch((err) => console.error("Error fetching homepage data:", err));
  }, [i18n.language]); // التحديث عند تغيير اللغة

  const isAr = i18n.language === 'ar';

  return (
    <section 
      className={`relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* 🎥 Video Container - ملء الشاشة بالكامل */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* 🌑 Overlay - طبقة تظليل لتحسين وضوح النص */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
      </div>

      {/* ✨ Content Container */}
      <div className="container mx-auto px-6 relative z-20 text-center text-white">
        <div className="max-w-[900px] mx-auto">
          
          {/* AnimatePresence تساعد في عمل انتقال ناعم عند تغيير اللغة */}
          <AnimatePresence mode="wait">
            <motion.div
              key={i18n.language} // مهم جداً لإعادة تشغيل الأنييميشن عند التبديل
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* العنوان - يعتمد على الترجمة المحلية لضمان اللغتين */}
              <h1 className="text-[32px] md:text-[64px] font-bold leading-[1.2] mb-6 bg-gradient-to-r from-white via-[#9EC5FF] to-[#3B82F6] bg-clip-text text-transparent">
                {t('hero.title')}
              </h1>

              {/* الوصف */}
              <p className="text-[17px] md:text-[20px] text-white/90 leading-[1.8] mb-10 max-w-[700px] mx-auto">
                {t('hero.description')}
              </p>

              {/* زر الاتصال */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={onCtaClick}
                  className="bg-[#0359E8] hover:bg-blue-700 text-white px-10 py-7 text-[18px] rounded-xl shadow-xl font-bold transition-transform hover:scale-105 active:scale-95"
                >
                  {t('hero.cta')}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* لمسة إضافية: سهم للأسفل يشير لوجود محتوى (اختياري) */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
      </motion.div>

    </section>
  );
}