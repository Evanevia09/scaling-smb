"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  businessName: z.string().min(2, "Business name is required"),
});

type BookingData = z.infer<typeof bookingSchema>;

export default function CalendarModal({ onSuccess }: { onSuccess?: () => void }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
  });

  const slots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const onSubmit = async (data: BookingData) => {
    if (!date || !timeSlot) return;
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        ...data,
        appointmentDate: date,
        appointmentTime: timeSlot,
        createdAt: serverTimestamp(),
        status: "Confirmed",
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-2">Consultation Booked!</h3>
        <p className="text-muted">You will receive a calendar invite shortly.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 custom-calendar">
                <Calendar 
                  onChange={(val) => setDate(val as Date)} 
                  value={date}
                  minDate={new Date()}
                  className="bg-transparent border-none p-0 text-white"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h4 className="text-sm font-bold text-muted uppercase tracking-widest flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Select Time
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${
                        timeSlot === slot 
                        ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                        : "bg-white/5 border-white/10 text-muted hover:bg-white/10"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              disabled={!date || !timeSlot}
              onClick={() => setStep(2)}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50 shadow-lg shadow-primary/20"
            >
              Confirm Time
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-bold">{date ? format(date, "PPP") : ""}</p>
                  <p className="text-xs text-muted">{timeSlot}</p>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="text-xs text-primary hover:underline">Change</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-2 text-muted uppercase">Full Name</label>
                  <input {...register("name")} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all" placeholder="John Doe" />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 text-muted uppercase">Email</label>
                  <input {...register("email")} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all" placeholder="john@example.com" />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase">Business Name</label>
                <input {...register("businessName")} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all" placeholder="Doe Marketing" />
                {errors.businessName && <p className="text-red-500 text-[10px] mt-1">{errors.businessName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase">Phone Number</label>
                <input {...register("phone")} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone.message}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 glass text-white rounded-xl font-bold flex items-center justify-center hover:bg-white/10 transition-all">
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center shadow-lg shadow-primary/20">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Booking"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-calendar .react-calendar {
          background: transparent;
          border: none;
          font-family: inherit;
          width: 100%;
        }
        .custom-calendar .react-calendar__navigation button {
          color: white;
          min-width: 44px;
          background: none;
          font-size: 16px;
        }
        .custom-calendar .react-calendar__navigation button:disabled {
          background: transparent;
          opacity: 0.3;
        }
        .custom-calendar .react-calendar__month-view__weekdays {
          color: #a1a1aa;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 0.1em;
        }
        .custom-calendar .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.15 !important;
        }
        .custom-calendar .react-calendar__month-view__days__day--weekend {
          color: #3B82F6;
        }
        .custom-calendar .react-calendar__tile {
          color: white;
          padding: 12px 0;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          background: transparent;
        }
        .custom-calendar .react-calendar__tile:disabled {
          background: transparent !important;
          color: rgba(255, 255, 255, 0.1) !important;
          text-decoration: none;
        }
        .custom-calendar .react-calendar__tile:enabled:hover,
        .custom-calendar .react-calendar__tile:enabled:focus {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-calendar .react-calendar__tile--now {
          background: rgba(59, 130, 246, 0.1);
        }
        .custom-calendar .react-calendar__tile--active {
          background: #3B82F6 !important;
          color: white;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
        /* Remove the weird white background/border on some versions */
        .react-calendar__month-view__days {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}
