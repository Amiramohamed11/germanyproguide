import { useTranslation } from 'react-i18next';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import logo from '../assets/logo.png';

export default function Header({ onPageChange }: { onPageChange: (page: 'home' | 'booking') => void }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  // دالة التنقل الذكية
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // إغلاق القائمة في الموبايل
  };

  const rightNav = [
    { label: t('nav.about', 'من نحن'), action: () => scrollToSection('about') },
    { label: t('nav.services', 'خدماتنا'), action: () => scrollToSection('services') },
  ];

  const leftNav = [
    { label: t('nav.consultations', 'استشارات'), action: () => onPageChange('booking') },
    { label: t('nav.contact', 'تواصل معنا'), action: () => scrollToSection('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-[100px]">
      <div className="h-[100px] flex items-center justify-between px-6 md:px-12 text-white bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4),rgba(0,0,0,0))] backdrop-blur-[42px] border-b border-[#0359E8]/40">
        
        {/* RIGHT SIDE */}
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

        {/* LEFT SIDE */}
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

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-white"><Globe /></Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg text-white p-6 space-y-4 border-b border-[#0359E8]/40">
          {[...rightNav, ...leftNav].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="block w-full text-right border-b border-white/10 pb-2 cursor-pointer hover:text-[#3B82F6] transition"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}