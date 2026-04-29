import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import i18n from 'i18next'; // استيراد i18n للحصول على اللغة الحالية

const API_BASE_URL = 'https://germanyproguide.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * إعداد "Interceptor" (المراقب):
 * هذا الجزء يعمل قبل كل طلب يخرج من الموقع للسيرفر.
 */
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 1. إضافة التوكن تلقائياً (للمستقبل)
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 2. إرسال اللغة الحالية للسيرفر (مهم جداً للترجمة)
  // سيقوم بإرسال 'ar' أو 'de' بناءً على لغة الموقع الحالية
  const currentLanguage = i18n.language || 'de'; 
  config.headers['Accept-Language'] = currentLanguage;

  return config;
});

// --- الخدمات (Services) ---
// تم تعديلها لتمرير بارامتر اللغة إذا كان الـ API يفضل استقبالها في الـ URL
export const getServices = (publishedOnly: boolean = true, perPage: number = 50) => 
  apiClient.get(`/services`, {
    params: {
      per_page: perPage,
      published_only: publishedOnly ? '1' : '0',
      lang: i18n.language // بعض الـ APIs تفضل استقبال اللغة هنا أيضاً
    }
  });
 
export const getServiceBySlug = (slug: string) => 
  apiClient.get(`/services/${slug}`, {
    params: { lang: i18n.language }
  });

// --- المواعيد والحجز (Booking) ---
export const getAvailability = (date: string) => 
  apiClient.get(`/availability`, { 
    params: { date, lang: i18n.language } 
  });

export const createBooking = (bookingData: {
  appointment_slot_id: string;
  full_name: string;
  email: string;
  phone: string;
  notes?: string;
}) => apiClient.post('/bookings', bookingData);

// --- الاتصال (Contact) ---
export const sendContactMessage = (messageData: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}) => apiClient.post('/contact', messageData);

// --- إعدادات الموقع والبيانات العامة ---
export const getHomepageData = () => apiClient.get('/homepage', {
  params: { lang: i18n.language }
});

export const getSettings = () => apiClient.get('/settings', {
  params: { lang: i18n.language }
});

export const getStats = () => apiClient.get('/stats');

// دالة مساعدة لالتقاط الأخطاء
export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error("API Error Data:", error.response.data);
    return error.response.data;
  }
  return { message: "حدث خطأ غير متوقع" };
};

export default apiClient;