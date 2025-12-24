"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]{3}[)])?([-]?[\s]?[0-9])?$/
);

const formSchema = z.object({
  // Step 1: Contact Details
  name: z.string().min(2, "Name is required"),
  businessName: z.string().min(2, "Business name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().regex(phoneRegex, "Invalid phone number").or(z.string().length(0)),
  
  // Step 2: Digital Presence
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  googleProfile: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  facebookPage: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  
  // Step 3: Business Context
  struggle: z.enum(["Traffic", "Conversions", "Both", "Not Sure"]),
  hasRunAds: z.enum(["Yes", "No", "Not Sure"]),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AuditForm({ onSuccess }: { onSuccess?: () => void }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      struggle: "Not Sure",
      hasRunAds: "Not Sure",
    }
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    if (step === 1) fieldsToValidate = ["name", "businessName", "email", "phone"];
    if (step === 2) fieldsToValidate = ["website", "googleProfile", "facebookPage"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...data,
        status: "New",
        createdAt: serverTimestamp(),
        source: "Audit Form",
      });
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="inline-flex p-4 bg-secondary/10 rounded-full mb-6">
          <CheckCircle className="w-12 h-12 text-secondary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Audit Request Received!</h3>
        <p className="text-muted">
          Our team is already scanning your digital footprint. You will receive your audit within 24 hours to your email.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <div className="mb-8 flex justify-between items-center px-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step >= i ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-white/5 text-muted border border-white/10"
            }`}>
              {i}
            </div>
            {i < 3 && <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${step > i ? "bg-primary" : "bg-white/5"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">Step 1 - Your Contact Details</h3>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Full Name</label>
                <input
                  {...register("name")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Business Name</label>
                <input
                  {...register("businessName")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="Doe Plumbing"
                />
                {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Phone Number (Optional)</label>
                <input
                  {...register("phone")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                Next Step
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">Step 2 - Your Business Digital Presence</h3>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Website URL</label>
                <input
                  {...register("website")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="https://yourbusiness.com"
                />
                <p className="text-[10px] text-muted mt-1 italic">Leave empty if none.</p>
                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Google Business Profile URL</label>
                <input
                  {...register("googleProfile")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="https://g.page/yourbusiness"
                />
                {errors.googleProfile && <p className="text-red-500 text-xs mt-1">{errors.googleProfile.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Facebook Page URL</label>
                <input
                  {...register("facebookPage")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                  placeholder="https://facebook.com/yourbusiness"
                />
                {errors.facebookPage && <p className="text-red-500 text-xs mt-1">{errors.facebookPage.message}</p>}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 glass text-white rounded-xl font-bold flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">Step 3 - Tell us more about the business</h3>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Where are you struggling most?</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Traffic", "Conversions", "Both", "Not Sure"].map((option) => (
                    <label key={option} className="cursor-pointer group">
                      <input type="radio" value={option} {...register("struggle")} className="hidden peer" />
                      <div className="w-full py-3 px-2 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-center peer-checked:bg-primary/20 peer-checked:border-primary transition-all group-hover:bg-white/10">
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Have you run digital ads before?</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Yes", "No", "Not Sure"].map((option) => (
                    <label key={option} className="cursor-pointer group">
                      <input type="radio" value={option} {...register("hasRunAds")} className="hidden peer" />
                      <div className="w-full py-3 px-2 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-center peer-checked:bg-primary/20 peer-checked:border-primary transition-all group-hover:bg-white/10">
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-2 text-muted uppercase tracking-wider">Additional Message (Optional)</label>
                <textarea
                  {...register("message")}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all min-h-[100px]"
                  placeholder="Tell us more about your goals..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-4 glass text-white rounded-xl font-bold flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <span className="flex items-center">
                      Get My Free Audit
                      <Sparkles className="ml-2 w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
