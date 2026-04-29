import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { getAvailability } from '@/lib/api';

export default function Booking() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [view, setView] = useState<'time' | 'date'>('time');
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!date) return;
      setIsLoading(true);
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await getAvailability(formattedDate);
        setTimeSlots(response.data.data || []);
      } catch (err) {
        console.error("خطأ في جلب المواعيد:", err);
        setTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlots();
  }, [date]);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* الهيدر */}
      <div className="relative h-[35vh] flex flex-col items-center justify-center mb-10 overflow-hidden rounded-b-[40px] bg-[#0359E8] px-4 text-center text-white">
        <h1 className="text-[32px] font-bold mb-3">احجز الميعاد المناسب لك الآن</h1>
        <p className="text-sm text-blue-50 opacity-90 max-w-lg">
          ابدأ الآن في التخطيط لمستقبلك في ألمانيا! احجز استشارة شخصية مع خبرائنا.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        {/* أزرار التبديل */}
        <div className="flex items-center justify-end gap-2 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-1 flex shadow-sm">
            <button 
              onClick={() => setView('date')} 
              className={cn("px-4 py-2 text-xs rounded-md font-medium transition-all", view === 'date' ? "bg-[#0359E8] text-white" : "text-gray-500 hover:bg-gray-50")}
            >
              <CalendarIcon className="w-3.5 h-3.5 inline mr-1" /> {t('booking.date')}
            </button>
            <button 
              onClick={() => setView('time')} 
              className={cn("px-4 py-2 text-xs rounded-md font-medium transition-all", view === 'time' ? "bg-[#0359E8] text-white" : "text-gray-500 hover:bg-gray-50")}
            >
              <Clock className="w-3.5 h-3.5 inline mr-1" /> {t('booking.time')}
            </button>
          </div>
        </div>

        {/* عرض التقويم أو المواعيد */}
        {view === 'date' ? (
          <Card className="max-w-sm mx-auto rounded-[18px] border-gray-200 shadow-lg">
            <CardContent className="p-4 flex justify-center">
              <Calendar mode="single" selected={date} onSelect={(d) => { setDate(d); setView('time'); }} />
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {isLoading ? (
              <p className="col-span-full text-center text-gray-500">جاري تحميل المواعيد...</p>
            ) : timeSlots.length > 0 ? (
              timeSlots.map((slot) => (
                <motion.div key={slot.id} whileHover={!slot.is_booked ? { scale: 1.02 } : {}}>
                  <button
                    disabled={slot.is_booked}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={cn(
                      "relative w-full p-3 rounded-[5px] border-[1px] text-center transition-all flex flex-col items-center",
                      slot.is_booked 
                        ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed" 
                        : selectedSlot === slot.id 
                        ? "bg-[#0359E8] text-white border-[#B1CCF8]" 
                        : "bg-[#ECF3FF] border-[#B1CCF8] text-gray-700 hover:border-[#0359E8]"
                    )}
                  >
                    <div className="text-[10px] opacity-80 mb-1">
                      {new Date(slot.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                    <div className="text-[12px] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {slot.time?.substring(0, 5)}
                    </div>
                    <div className="text-[13px] font-bold mt-1">
                      {slot.price_cents != null ? (slot.price_cents / 100).toFixed(0) : "0"}€
                    </div>
                    <div className="text-[9px] opacity-70 mt-0.5">
                      لمدة {slot.duration_minutes} دقيقة
                    </div>
                    
                    {slot.is_booked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] font-bold rotate-[-10deg]">
                        BOOKED
                      </div>
                    )}
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">لا توجد مواعيد متاحة لهذا التاريخ.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}