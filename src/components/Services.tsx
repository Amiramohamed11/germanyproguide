import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { getServices } from '@/lib/api';

export default function Services({ onCtaClick }: { onCtaClick: () => void }) {
  const { t } = useTranslation();
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getServices(true, 50)
      .then((res) => {
        console.log("API Response:", res.data.data);
        setServices(res.data.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0359E8] mb-4">{t('services.title')}</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 justify-center">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex justify-center"
            >
              <Card className="w-full max-w-[416px] min-h-[525px] border border-slate-100/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-[20px] overflow-hidden text-start">
              <div className="h-[218px] overflow-hidden rounded-t-[20px]">
  <img
    // هنا نجبر الكود على استخدام الرابط الموجود في image_url مباشرة
    src={service.image_url ? service.image_url : '/placeholder-service.jpg'} 
    alt={service.title}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
  />
</div>

                <CardHeader className="pb-3 pt-8 px-8">
                  <CardTitle className="text-xl md:text-2xl text-[#0359E8] font-bold leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-8 pb-6">
                  <div className="text-sm font-bold text-slate-400 mb-5 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#0359E8] rounded-full inline-block"></span>
                    {t('nav.services')}
                  </div>

                 <ul className="space-y-3.5">
  {service.features?.map((feat: any, i: number) => (
    <li key={i} className="flex items-start gap-3.5 text-slate-700 text-[15px] font-medium leading-relaxed">
      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#0359E8] shrink-0 mt-0.5">
        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
      </span>
      {/* الحل: استخدمي feat مباشرة إذا كان نصاً، أو ابحثي عن أي حقل متاح */}
      {typeof feat === 'string' ? feat : (feat.text || feat.name || feat.content || "ميزة")}
    </li>
  ))}
</ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button size="lg" onClick={onCtaClick} className="bg-[#0359E8] hover:bg-blue-700 text-white px-12 py-7 text-lg rounded-xl shadow-lg transition-all">
            {t('hero.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
}