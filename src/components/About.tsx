import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react'; // أضفنا AnimatePresence للتبديل الناعم
import aboutImageSrc from '../assets/about.png';
import { getHomepageData } from '@/lib/api';

export default function About({ onCtaClick }: { onCtaClick: () => void }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    // نقوم بإعادة جلب البيانات عند تغير اللغة لضمان تزامن الـ API مع اللغة المختارة
    getHomepageData()
      .then((res) => {
        const sections = res.data?.data?.sections || [];

        const section = sections.find(
          (s: any) => s.key?.toLowerCase() === 'about'
        );

        setAboutData(section || null);
      })
      .catch((err) =>
        console.error("Error fetching about data:", err)
      );
  }, [i18n.language]); // التحديث عند تغيير اللغة

  return (
    <section id="about" className="py-24 bg-white overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-20">
          
          {/* 🖼️ الصورة */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 w-full max-w-3xl"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
              <img
                src={aboutData?.image_url || aboutImageSrc}
                alt="About"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* 📝 النص */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex-1 space-y-12"
          >
            {/* استخدام AnimatePresence لجعل انتقال النص ناعماً عند تبديل اللغة */}
            <AnimatePresence mode="wait">
              <motion.div
                key={i18n.language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <h2 className="text-4xl md:text-4xl font-bold leading-tight text-center lg:text-start bg-gradient-to-r from-black to-[#0359E8] bg-clip-text text-transparent">
                  {/* نعطي الأولوية لملف الترجمة لضمان دقة اللغتين */}
                  {t('about.title')}
                </h2>
                
                <div className="space-y-8 text-[#414141] leading-relaxed text-lg text-justify lg:text-start">
                  <p>
                    {t('about.description')}
                  </p>

                  <p>
                    {t('about.mission')}
                  </p>
                </div>
                
                <div className="flex justify-center lg:justify-start">
                  <Button
                    size="lg"
                    onClick={onCtaClick}
                    className="bg-[#0359E8] hover:bg-blue-700 text-white px-10 py-7 rounded-xl shadow-lg transition-all text-xl font-medium"
                  >
                    {t('about.cta')}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}