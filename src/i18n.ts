import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      nav: {
        about: 'من نحن',
        services: 'خدماتنا',
        consultations: 'استشارات',
        contact: 'تواصل معنا',
      },
      hero: {
        title: 'هل تفكر في السفر إلى ألمانيا؟',
        description: 'نقدم استشارات شاملة تهدف إلى تعزيز نجاحاتك وتوجيه المشرفين. نحن هنا لمساعدتك في الحصول على فرص عمل مميزة في ألمانيا، حيث نعمل على توفير الدعم والإرشاد اللازمين لتحقيق أهدافك المهنية.',
        cta: 'احجز استشارة الآن!',
      },
      about: {
        title: 'طريقك إلى ألمانيا يبدأ معنا',
        description: 'نحن شركة متخصصة في الاستشارات والتنفيذ الكامل لملفات السفر إلى ألمانيا. نرافقك خطوة بخطوة في رحلتك نحو العمل، الدراسة، أو التدريب المهني. بدءاً من تقييم ملفك الشخصي بدقة، وصولاً إلى تقديم طلب الفيزا ومتابعته حتى صدور القرار. نعتمد على فهم عميق للأنظمة والإجراءات الألمانية، ونقدم لكل عميل خطة مخصصة تناسب مؤهلاته، خبرته، ومستوى اللغة، بعيداً عن الحلول الجاهزة أو الوعود غير الواقعية.',
        mission: 'هدفنا هو تحويل حلم السفر إلى ألمانيا إلى مسار واضح، قانوني، وآمن. وتقليل المخاطر والأخطاء التي قد تكلفك الوقت والمال. نحن لا نقدم خدمة فقط، بل نكون شريكك الحقيقي في كل خطوة، لأن نجاحك في الوصول إلى ألمانيا هو مقياس نجاحنا.',
        cta: 'احجز استشارة الآن!',
      },
      services: {
        title: 'خدماتنا - السفر إلى ألمانيا 🇩🇪',
        subtitle: 'نقدم استشارات وتنفيذاً كاملاً لكل من يرغب بالسفر إلى ألمانيا للعمل، الدراسة، أو التدريب المهني، مع متابعة دقيقة خطوة بخطوة.',
        work: {
          title: 'العمل في ألمانيا',
          items: [
            'البحث عن فرص عمل مناسبة حسب الخبرة',
            'تجهيز وتعديل السيرة الذاتية (CV)',
            'كتابة Cover Letter احترافية',
            'مراجعة عقود العمل والتأكد من قانونيتها',
            'التحقق من مصداقية الشركات',
          ],
        },
        training: {
          title: 'التدريب المهني في ألمانيا',
          items: [
            'المساعدة في إيجاد فرص تدريب مهني مناسبة',
            'التوجيه حسب المؤهل ومستوى اللغة',
            'تجهيز أوراق التقديم كاملة',
            'مراجعة عقود التدريب',
            'المتابعة مع جهة التدريب',
          ],
        },
        study: {
          title: 'الدراسة في ألمانيا',
          items: [
            'استشارات دراسية مختصة',
            'اختيار التخصص والجامعة المناسبة',
            'تجهيز أوراق التقديم للجامعات',
            'معادلة الشهادات',
            'التوجيه لتعلم اللغة الألمانية',
          ],
        },
        visa: {
          title: 'الفيزا',
          items: [
            'تجهيز ملف الفيزا بشكل كامل',
            'مراجعة جميع المستندات المطلوبة',
            'تجهيز التأمين الصحي',
          ],
        },
        planning: {
          title: 'الاستشارات والتخطيط',
          items: [
            'فحص وتقييم الملف الشخصي',
            'تقييم المؤهل والخبرة العملية',
            'تحديد أنسب مسار (عمل - دراسة - تدريب)',
            'وضع خطة تقديم واضحة',
            'تقديم إرشادات مخصصة لكل حالة',
          ],
        },
        docs: {
          title: 'تجهيز ومراجعة الأوراق',
          items: [
            'مراجعة جميع الأوراق المطلوبة',
            'تعديل وتجهيز السيرة الذاتية (CV)',
            'كتابة أو تحسين Cover Letter',
            'مراجعة عقود العمل أو التدريب',
            'التأكد من توافق الأوراق مع متطلبات السفارة',
          ],
        },
      },
      stats: {
        success: '10%',
        successDesc: 'بقدر عملائنا خدمتنا المتخصصة والتغطية المصممة خصيصاً، والاستجابات السريعة التي مكنتهم من السفر بنجاح إلى ألمانيا.',
        clients: '1',
        clientsDesc: 'عميل تمكن من السفر إلى ألمانيا بفضل مساعدتنا في تسهيل إجراءات التأشيرة وتوفير الدعم اللازم.',
        experience: '1',
        experienceDesc: 'من خلال خبرتنا الواسعة في قطاع التأمين، تُمكّن عملائنا من السفر بثقة إلى ألمانيا.',
      },
      contact: {
        title: 'تواصل معنا',
        subtitle: 'إذا كانت لديك أي أسئلة أو استفسارات حول خدماتنا، فلا تتردد في التواصل معنا. فريق الدعم الفني لدينا جاهز لمساعدتك في كل خطوة.',
        firstName: 'الاسم الأول',
        lastName: 'الاسم الأخير',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        message: 'اكتب استفسارك هنا',
        submit: 'إرسال',
      },
      booking: {
        title: 'احجز الميعاد المناسب لك الآن',
        subtitle: 'ابدأ الآن في التخطيط لمستقبلك في ألمانيا! احجز استشارة شخصية مع خبرائنا لتقييم فرصك وتحديد الخطوات اللازمة لتحقيق حلمك بالسفر والعيش في ألمانيا بنجاح.',
        availableSlots: 'المواعيد المتاحة',
        date: 'التاريخ',
        time: 'الوقت',
        booked: 'BOOKED',
        price: '30€',
        duration: 'لمدة 30 دقيقة',
        confirmTitle: 'تأكيد الموعد',
        confirmDesc: 'لقد اخترت موعداً بتاريخ {{date}} في تمام الساعة {{time}}',
        confirmBtn: 'تأكيد الحجز',
      },
      footer: {
        rights: '© تُعالج جميع البيانات وفقاً لقانون حماية البيانات الألماني (DSGVO)، ولا يُعد المحتوى استشارة قانونية.',
      }
    },
  },
  en: {
    translation: {
      nav: {
        about: 'About Us',
        services: 'Services',
        consultations: 'Consultations',
        contact: 'Contact Us',
      },
      hero: {
        title: 'Thinking of traveling to Germany?',
        description: 'We provide comprehensive consultations aimed at enhancing your success and guiding supervisors. We are here to help you get distinguished job opportunities in Germany, where we work to provide the necessary support and guidance to achieve your professional goals.',
        cta: 'Book a consultation now!',
      },
      about: {
        title: 'Your path to Germany starts with us',
        description: 'We are a company specialized in consulting and full implementation of travel files to Germany. We accompany you step by step on your journey towards work, study, or vocational training. Starting from accurately evaluating your personal profile, up to submitting the visa application and following it up until the decision is issued. We rely on a deep understanding of German systems and procedures, and we provide each client with a customized plan that suits their qualifications, experience, and language level, away from ready-made solutions or unrealistic promises.',
        mission: 'Our goal is to turn the dream of traveling to Germany into a clear, legal, and safe path. And to reduce the risks and errors that may cost you time and money. We don\'t just provide a service, we are your real partner in every step, because your success in reaching Germany is the measure of our success.',
        cta: 'Book a consultation now!',
      },
      services: {
        title: 'Our Services - Traveling to Germany 🇩🇪',
        subtitle: 'We provide consultations and full implementation for anyone wishing to travel to Germany for work, study, or vocational training, with precise step-by-step follow-up.',
        work: {
          title: 'Work in Germany',
          items: [
            'Search for suitable job opportunities according to experience',
            'Preparation and modification of CV',
            'Writing a professional Cover Letter',
            'Reviewing employment contracts and ensuring their legality',
            'Verifying the credibility of companies',
          ],
        },
        training: {
          title: 'Vocational Training in Germany',
          items: [
            'Assistance in finding suitable vocational training opportunities',
            'Guidance according to qualification and language level',
            'Preparation of full application papers',
            'Reviewing training contracts',
            'Follow-up with the training entity',
          ],
        },
        study: {
          title: 'Study in Germany',
          items: [
            'Specialized educational consultations',
            'Choosing the appropriate specialization and university',
            'Preparation of application papers for universities',
            'Equivalency of certificates',
            'Guidance for learning the German language',
          ],
        },
        visa: {
          title: 'Visa',
          items: [
            'Full preparation of the visa file',
            'Reviewing all required documents',
            'Preparation of health insurance',
          ],
        },
        planning: {
          title: 'Consultation and Planning',
          items: [
            'Examination and evaluation of the personal profile',
            'Evaluation of qualification and practical experience',
            'Determining the most suitable path (work - study - training)',
            'Setting a clear application plan',
            'Providing customized guidance for each case',
          ],
        },
        docs: {
          title: 'Preparation and Review of Documents',
          items: [
            'Reviewing all required documents',
            'Modifying and preparing the CV',
            'Writing or improving the Cover Letter',
            'Reviewing employment or training contracts',
            'Ensuring compliance of documents with embassy requirements',
          ],
        },
      },
      stats: {
        success: '10%',
        successDesc: 'Our clients value our specialized service, tailored coverage, and fast responses that enabled them to travel successfully to Germany.',
        clients: '1',
        clientsDesc: 'Client was able to travel to Germany thanks to our assistance in facilitating visa procedures and providing the necessary support.',
        experience: '1',
        experienceDesc: 'Through our extensive experience in the insurance sector, we enable our clients to travel with confidence to Germany.',
      },
      contact: {
        title: 'Contact Us',
        subtitle: 'If you have any questions or inquiries about our services, please feel free to contact us. Our technical support team is ready to help you at every step.',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        message: 'Write your inquiry here',
        submit: 'Send',
      },
      booking: {
        title: 'Book the right appointment for you now',
        subtitle: 'Start planning your future in Germany now! Book a personal consultation with our experts to evaluate your opportunities and determine the steps necessary to achieve your dream of traveling and living in Germany successfully.',
        availableSlots: 'Available Slots',
        date: 'Date',
        time: 'Time',
        booked: 'BOOKED',
        price: '30€',
        duration: 'For 30 minutes',
        confirmTitle: 'Confirm Appointment',
        confirmDesc: 'You have selected an appointment on {{date}} at {{time}}',
        confirmBtn: 'Confirm Booking',
      },
      footer: {
        rights: '© All data is processed in accordance with the German Data Protection Act (DSGVO), and the content is not legal advice.',
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
