import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react'; // تأكدي من وجود المكتبة
import logo from '../assets/logo.png';

export default function Header({ onPageChange }: { onPageChange: (page: 'home' | 'booking') => void }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAr = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const rightNav = [
    { label: t('nav.about', 'من نحن'), action: () => scrollToSection('about') },
    { label: t('nav.services', 'خدماتنا'), action: () => scrollToSection('services') },
  ];

  const leftNav = [
    { label: t('nav.consultations', 'استشارات'), action: () => onPageChange('booking') },
    { label: t('nav.contact', 'تواصل معنا'), action: () => scrollToSection('contact') },
  ];

  const allNavItems = [...rightNav, ...leftNav];

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-[100px]">
      <div className="h-[100px] flex items-center justify-between px-6 md:px-12 text-white bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4),rgba(0,0,0,0))] backdrop-blur-[42px] border-b border-[#0359E8]/40">
        
        {/* RIGHT SIDE (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-end items-center gap-10 text-[15px] font-medium">
          {rightNav.map((item, i) => (
            <button key={i} onClick={item.action} className="hover:text-[#3B82F6] transition">
              {item.label}
            </button>
          ))}
        </nav>

        {/* LOGO */}
        <div className="flex justify-center items-center px-6 cursor-pointer" onClick={() => onPageChange('home')}>
          <img src={logo} alt="logo" className="h-[50px]" />
        </div>

        {/* LEFT SIDE (Desktop) */}
        <nav className="hidden md:flex flex-1 justify-start items-center gap-10 text-[15px] font-medium">
          {leftNav.map((item, i) => (
            <button key={i} onClick={item.action} className="hover:text-[#3B82F6] transition">
              {item.label}
            </button>
          ))}
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-white">
            <Globe className="w-5 h-5" />
          </Button>
        </nav>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-white"><Globe /></Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-[60]">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* NEW MOBILE MENU STYLE */}
    {/* MOBILE MENU STYLE - Updated Colors */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* الخلفية المظلمة الشفافة (Backdrop) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#020817]/60 backdrop-blur-md z-40"
            />

            {/* الدرج الجانبي بألوان الموقع */}
            <motion.div
              initial={{ x: isAr ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 ${isAr ? 'right-0' : 'left-0'} w-[80%] max-w-[300px] h-full z-50 shadow-2xl border-x border-[#0359E8]/20 p-8 pt-24 flex flex-col gap-6
                /* هنا استخدمنا تدرج لوني بين الكحلي الغامق والأزرق الخاص بالموقع */
                bg-gradient-to-b from-[#020817] via-[#010b24] to-[#0359E8]/10 backdrop-blur-2xl`}
            >
              {allNavItems.map((item, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={item.action}
                  className="flex items-center justify-between w-full text-right text-[18px] font-semibold text-white/90 border-b border-[#0359E8]/10 pb-4 hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-all group"
                >
                  <span className="group-hover:translate-x-[-5px] transition-transform duration-300">
                    {item.label}
                  </span>
                  {isAr ? (
                    <ChevronLeft size={20} className="text-[#0359E8] opacity-70" />
                  ) : (
                    <ChevronRight size={20} className="text-[#0359E8] opacity-70" />
                  )}
                </motion.button>
              ))}
              
              {/* لمسة جمالية في أسفل القائمة */}
              <div className="mt-auto pb-10 text-center">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#0359E8]/40 to-transparent mb-6"></div>
                <img src={logo} alt="logo" className="h-10 mx-auto opacity-80" />
                <p className="text-[10px] text-white/30 mt-4 tracking-widest uppercase">
                  Germany Pro Guide
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}