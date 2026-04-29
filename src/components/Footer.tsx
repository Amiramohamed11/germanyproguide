import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Youtube, Globe } from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();

  return (
    <footer 
      className="text-white py-12"
      style={{
        background: 'linear-gradient(to bottom, #03C0EC, #0359E8)'
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl flex flex-col items-center gap-8">
        
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-8 md:gap-12 text-lg">
          <a href="#about" className="hover:text-white/70 transition-colors">{t('nav.about')}</a>
          <a href="#services" className="hover:text-white/70 transition-colors">{t('nav.services')}</a>
          <a href="#booking" className="hover:text-white/70 transition-colors">{t('nav.consultations')}</a>
          <a href="#contact" className="hover:text-white/70 transition-colors">{t('nav.contact')}</a>
          <button 
            onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')} 
            className="flex items-center gap-2 hover:text-white/70 transition-colors"
          >
            <Globe className="w-5 h-5" />
          </button>
        </nav>

        {/* Social Media Icons */}
        <div className="flex gap-6">
          <a href="#" className="hover:opacity-70 transition-opacity"><Facebook className="w-6 h-6" /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><Twitter className="w-6 h-6" /></a>
          <a href="#" className="hover:opacity-70 transition-opacity"><Youtube className="w-6 h-6" /></a>
        </div>

        {/* Legal Disclaimer */}
        <div className="text-center text-white/70 text-sm md:text-base max-w-3xl">
          <p>{t('footer.rights')}</p>
        </div>

      </div>
    </footer>
  );
}