import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { getAvailability } from '@/lib/api';

const bgVideo = "/hero.mp4";

export default function Booking() {
  const { i18n } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [view, setView] = useState<'time' | 'date'>('time');
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isAr = i18n.language === 'ar';

  useEffect(() => {
    const fetchSlots = async () => {
      if (!date) return;
      setIsLoading(true);
      try {
        const formattedDate = date.toISOString().split('T')[0];
        const response = await getAvailability(formattedDate);
        const data = response.data?.data || response.data || [];
        setTimeSlots(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlots();
  }, [date, i18n.language]);

  return (
    <div className="min-h-screen bg-[#F8FAFF] pb-20" dir={isAr ? 'rtl' : 'ltr'}>

      {/* ================= HERO ================= */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden rounded-b-[40px] text-white text-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-4"
        >
          <h1 className="text-[34px] md:text-[46px] font-bold leading-tight">
            {isAr ? (
              <>
                احجز <span className="text-[#4EA1FF]">المعاد المناسب</span> لك الآن
              </>
            ) : (
              <>Book Your Perfect Time</>
            )}
          </h1>

          <p className="text-[14px] md:text-base text-white/80 mt-3">
            {isAr
              ? 'ابدأ الآن في التخطيط لمستقبلك في ألمانيا'
              : 'Start planning your future in Germany'}
          </p>
        </motion.div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-6 max-w-6xl -mt-16 space-y-8">

        {/* 🔥 ICON TOGGLE */}
        <div className="flex justify-center gap-6">

          {/* DATE */}
          <button
            onClick={() => setView('date')}
            className={cn(
              "flex flex-col items-center justify-center w-28 h-28 rounded-2xl border transition-all",
              view === 'date'
                ? "bg-[#0359E8] text-white shadow-lg scale-105"
                : "bg-white border-slate-200 text-slate-500 hover:border-[#0359E8] hover:-translate-y-1"
            )}
          >
            <CalendarIcon className={cn(
              "w-7 h-7 mb-2",
              view === 'date' ? "text-white" : "text-[#0359E8]"
            )} />
            <span className="text-sm font-bold">
              {isAr ? 'التاريخ' : 'Date'}
            </span>
          </button>

          {/* TIME */}
          <button
            onClick={() => setView('time')}
            className={cn(
              "flex flex-col items-center justify-center w-28 h-28 rounded-2xl border transition-all",
              view === 'time'
                ? "bg-[#0359E8] text-white shadow-lg scale-105"
                : "bg-white border-slate-200 text-slate-500 hover:border-[#0359E8] hover:-translate-y-1"
            )}
          >
            <Clock className={cn(
              "w-7 h-7 mb-2",
              view === 'time' ? "text-white" : "text-[#0359E8]"
            )} />
            <span className="text-sm font-bold">
              {isAr ? 'المواعيد' : 'Times'}
            </span>
          </button>

        </div>

        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-base font-bold text-slate-600">
            {isAr ? 'المواعيد المتاحة' : 'Available Slots'}
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {view === 'date' ? (
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-sm mx-auto"
            >
              <Card className="rounded-2xl shadow-lg border-none">
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      if (d) {
                        setDate(d);
                        setView('time');
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="time"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {isLoading ? (
                <div className="col-span-full text-center py-10 text-slate-400">
                  جاري التحميل...
                </div>
              ) : timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <motion.button
                    key={slot.id}
                    whileTap={{ scale: 0.95 }}
                    disabled={slot.is_booked}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={cn(
                      "group relative p-3 rounded-xl border text-center transition-all",
                      slot.is_booked
                        ? "bg-[#F5F7FB] border-slate-200 opacity-70 cursor-not-allowed"
                        : selectedSlot === slot.id
                        ? "bg-[#0359E8] text-white border-[#0359E8] shadow-md scale-[1.05]"
                        : "bg-[#FAFBFF] border-[#E6ECF5] hover:border-[#0359E8] hover:shadow-sm hover:-translate-y-1"
                    )}
                  >
                    <div className="flex flex-col gap-1">

                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(slot.date).toLocaleDateString(
                          isAr ? 'ar-EG' : 'en-GB',
                          { day: 'numeric', month: 'short' }
                        )}
                      </span>

                      <span className={cn(
                        "flex items-center justify-center gap-1 text-[16px] font-bold",
                        selectedSlot === slot.id ? "text-white" : "text-[#0359E8]"
                      )}>
                        <Clock className="w-4 h-4" />
                        {slot.time?.substring(0, 5)}
                      </span>

                      <span className={cn(
                        "text-[12px] font-semibold",
                        selectedSlot === slot.id ? "text-white" : "text-[#0359E8]"
                      )}>
                        {slot.price_cents != null
                          ? (slot.price_cents / 100).toFixed(0)
                          : "0"}€
                      </span>
                    </div>

                    {slot.is_booked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-[#0359E8] text-white text-[10px] px-2 py-1 rounded rotate-[-10deg] font-bold">
                          BOOKED
                        </span>
                      </div>
                    )}
                  </motion.button>
                ))
              ) : (
                <div className="col-span-full py-14 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-400 text-sm font-semibold">
                    لا يوجد مواعيد متاحة حالياً
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}