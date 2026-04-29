import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = 'https://germanyproguide.com/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// إعداد "Interceptor" لإضافة التوكن تلقائياً في حال وجوده (مهم جداً للمستقبل)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token'); // إذا كان لديك نظام تسجيل دخول
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- الخدمات (Services) ---
export const getServices = (publishedOnly: boolean = true, perPage: number = 50) => 
  apiClient.get(`/services`, {
    params: {
      per_page: perPage,
      published_only: publishedOnly ? '1' : '0'
    }
  });
 
export const getServiceBySlug = (slug: string) => 
  apiClient.get(`/services/${slug}`);

// --- المواعيد والحجز (Booking) ---
// تم إضافة خيار لجلب المواعيد ليوم معين
export const getAvailability = (date: string) => 
  apiClient.get(`/availability`, { params: { date } });

// تم التأكد من نوع البيانات المرسلة للـ Booking
export const createBooking = (bookingData: {
  appointment_slot_id: string; // غالباً ما يحتاج الـ API لـ ID الموعد وليس التاريخ والوقت فقط
  full_name: string;
  email: string;
  phone: string;
  notes?: string; // إضافة اختيارية للملاحظات
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
export const getHomepageData = () => apiClient.get('/homepage');
export const getSettings = () => apiClient.get('/settings');
export const getStats = () => apiClient.get('/stats');

// دالة مساعده لالتقاط الأخطاء بشكل موحد
export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error("API Error Data:", error.response.data);
    return error.response.data;
  }
  return { message: "حدث خطأ غير متوقع" };
};

export default apiClient;