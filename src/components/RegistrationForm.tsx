"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Check, CircleX, ShieldCheck } from "lucide-react";
import { GOOGLE_SCRIPT_URL, WHATSAPP_CHANNEL_URL } from "@/config/constants";
import { submitToGoogleSheets, FormData as GoogleSheetsFormData } from "@/lib/googleSheets";

interface FormData {
  fullName: string;
  collegeName: string;
  branch: string;
  yearOfGraduation: string;
  email: string;
  phoneNumber: string;
  agreePrivacy: boolean;
}

interface FormErrors {
  fullName?: string;
  collegeName?: string;
  branch?: string;
  yearOfGraduation?: string;
  email?: string;
  phoneNumber?: string;
  agreePrivacy?: string;
}

const currentYear = new Date().getFullYear();
const graduationYears = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

const commonBranches = [
  "Computer Science Engineering",
  "Electronics & Communication Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Information Technology",
  "Chemical Engineering",
  "Biotechnology",
  "Aerospace Engineering",
  "Other"
];

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    collegeName: "",
    branch: "",
    yearOfGraduation: "",
    email: "",
    phoneNumber: "",
    agreePrivacy: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const validateField = (name: keyof FormData, value: string | boolean): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value || (value as string).trim().length < 2) {
          return "Full name must be at least 2 characters long";
        }
        break;
      case "collegeName":
        if (!value || (value as string).trim().length < 2) {
          return "College name must be at least 2 characters long";
        }
        break;
      case "branch":
        if (!value || (value as string).trim().length === 0) {
          return "Branch/Department is required";
        }
        break;
      case "yearOfGraduation":
        const year = parseInt(value as string);
        if (!value || isNaN(year) || year < currentYear - 10 || year > currentYear + 10) {
          return `Graduation year must be between ${currentYear - 10} and ${currentYear + 10}`;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value as string)) {
          return "Please enter a valid email address";
        }
        break;
      case "phoneNumber":
        const phoneRegex = /^(\+\d{1,3}[-.\s]?)?\d{10,}$/;
        if (!value || !phoneRegex.test((value as string).replace(/\s/g, ""))) {
          return "Please enter a valid phone number (10+ digits, country code optional)";
        }
        break;
      case "agreePrivacy":
        if (!value) {
          return "You must agree to the Privacy Policy to continue";
        }
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (name: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Debug: Log field changes in real-time
    console.log(`Field changed: ${name} = ${value}`);
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFieldBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debounce double-submits
    const now = Date.now();
    if (now - lastSubmitTime < 2000) {
      return;
    }
    setLastSubmitTime(now);

    if (!validateForm() || isSubmitting || isSubmitted) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if online
      if (!navigator.onLine) {
        throw new Error("You appear to be offline. Please check your internet connection and try again.");
      }

      // Prepare data for Google Sheets - ensure all fields are included
      const formDataForSheets: GoogleSheetsFormData = {
        fullName: formData.fullName.trim(),
        collegeName: formData.collegeName.trim(),
        branch: formData.branch.trim(),
        yearOfGraduation: formData.yearOfGraduation,
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        agreePrivacy: formData.agreePrivacy,
        timestamp: new Date().toISOString(),
        source: "Webinar Landing Page"
      };

      // Debug: Log the exact data being sent
      console.log("=== SUBMISSION DEBUG ===");
      console.log("Raw form data:", formData);
      console.log("Form data after trimming:", {
        fullName: formData.fullName.trim(),
        collegeName: formData.collegeName.trim(),
        branch: formData.branch.trim(),
        yearOfGraduation: formData.yearOfGraduation,
        email: formData.email.trim().toLowerCase(),
        phoneNumber: formData.phoneNumber.trim(),
        agreePrivacy: formData.agreePrivacy,
      });
      console.log("Consent value (raw):", formData.agreePrivacy);
      console.log("Consent value (type):", typeof formData.agreePrivacy);
      console.log("Consent value (stringified):", JSON.stringify(formData.agreePrivacy));
      console.log("Formatted data for Google Sheets:", formDataForSheets);
      console.log("=== END SUBMISSION DEBUG ===");
      
      // Validate that all required fields have values
      const requiredFields = ['fullName', 'collegeName', 'branch', 'yearOfGraduation', 'email', 'phoneNumber', 'agreePrivacy'];
      const missingFields = requiredFields.filter(field => !formDataForSheets[field as keyof GoogleSheetsFormData]);
      
      if (missingFields.length > 0) {
        console.error("Missing required fields:", missingFields);
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Submit to Google Sheets using the working approach from your previous model
      console.log("About to submit to Google Sheets...");
      console.log("Google Script URL:", GOOGLE_SCRIPT_URL);
      
      try {
        await submitToGoogleSheets(formDataForSheets);
        console.log("Google Sheets submission successful!");
      } catch (submitError) {
        console.error("Google Sheets submission failed:", submitError);
        throw submitError;
      }

      // Success - proceed with redirect
      setIsSubmitted(true);
      toast.success("Registration successful! Opening WhatsApp...");

      // Redirect to WhatsApp immediately
      if (WHATSAPP_CHANNEL_URL) {
        try {
          // Open WhatsApp immediately without delay
          window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer");
          toast.success("WhatsApp channel opened! Please join our community.");
        } catch (redirectError) {
          console.error("Redirect failed:", redirectError);
          toast.error("Could not open WhatsApp. Please use the manual button below.");
        }
      }

    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    submitted: { opacity: 0.7, scale: 0.98 }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" },
    shake: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.4 } }
  };

  return (
    <section id="registration" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-orange-500 bg-clip-text text-transparent mb-4">
            Secure Your Spot Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students taking their first step towards career success. Registration takes less than 2 minutes.
          </p>
        </motion.div>

        <motion.div
          variants={formVariants}
          initial="hidden"
          animate={isSubmitted ? "submitted" : "visible"}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Your details have been saved! WhatsApp should have opened automatically. If not, use the button below.
                </p>
                
                {/* Manual WhatsApp redirect button */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Join our WhatsApp community:</p>
                  <Button
                    onClick={() => window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer")}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Join WhatsApp Channel
                  </Button>
                  <p className="text-xs text-gray-400 mt-2">
                    Click the button above to join our WhatsApp community
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange("fullName", e.target.value)}
                      onBlur={() => handleFieldBlur("fullName")}
                      disabled={isSubmitting}
                      className={errors.fullName ? "border-red-500 focus:border-red-500" : ""}
                      placeholder="Enter your full name"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    />
                    <AnimatePresence>
                      {errors.fullName && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate={["visible", "shake"]}
                          exit="hidden"
                          id="fullName-error"
                          className="flex items-center gap-2 text-sm text-red-600"
                          role="alert"
                          aria-live="polite"
                        >
                          <CircleX className="w-4 h-4 flex-shrink-0" />
                          {errors.fullName}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* College Name */}
                  <div className="space-y-2">
                    <Label htmlFor="collegeName" className="text-sm font-medium text-gray-700">
                      College Name *
                    </Label>
                    <Input
                      id="collegeName"
                      type="text"
                      value={formData.collegeName}
                      onChange={(e) => handleFieldChange("collegeName", e.target.value)}
                      onBlur={() => handleFieldBlur("collegeName")}
                      disabled={isSubmitting}
                      className={errors.collegeName ? "border-red-500 focus:border-red-500" : ""}
                      placeholder="Enter your college name"
                      aria-invalid={!!errors.collegeName}
                      aria-describedby={errors.collegeName ? "collegeName-error" : undefined}
                    />
                    <AnimatePresence>
                      {errors.collegeName && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate={["visible", "shake"]}
                          exit="hidden"
                          id="collegeName-error"
                          className="flex items-center gap-2 text-sm text-red-600"
                          role="alert"
                          aria-live="polite"
                        >
                          <CircleX className="w-4 h-4 flex-shrink-0" />
                          {errors.collegeName}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Branch */}
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="text-sm font-medium text-gray-700">
                      Branch / Department *
                    </Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) => handleFieldChange("branch", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger 
                        className={errors.branch ? "border-red-500 focus:border-red-500" : ""}
                        aria-invalid={!!errors.branch}
                        aria-describedby={errors.branch ? "branch-error" : undefined}
                      >
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonBranches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AnimatePresence>
                      {errors.branch && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate={["visible", "shake"]}
                          exit="hidden"
                          id="branch-error"
                          className="flex items-center gap-2 text-sm text-red-600"
                          role="alert"
                          aria-live="polite"
                        >
                          <CircleX className="w-4 h-4 flex-shrink-0" />
                          {errors.branch}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Year of Graduation */}
                  <div className="space-y-2">
                    <Label htmlFor="yearOfGraduation" className="text-sm font-medium text-gray-700">
                      Year of Graduation *
                    </Label>
                    <Select
                      value={formData.yearOfGraduation}
                      onValueChange={(value) => handleFieldChange("yearOfGraduation", value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger 
                        className={errors.yearOfGraduation ? "border-red-500 focus:border-red-500" : ""}
                        aria-invalid={!!errors.yearOfGraduation}
                        aria-describedby={errors.yearOfGraduation ? "yearOfGraduation-error" : undefined}
                      >
                        <SelectValue placeholder="Select graduation year" />
                      </SelectTrigger>
                      <SelectContent>
                        {graduationYears.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <AnimatePresence>
                      {errors.yearOfGraduation && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate={["visible", "shake"]}
                          exit="hidden"
                          id="yearOfGraduation-error"
                          className="flex items-center gap-2 text-sm text-red-600"
                          role="alert"
                          aria-live="polite"
                        >
                          <CircleX className="w-4 h-4 flex-shrink-0" />
                          {errors.yearOfGraduation}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange("email", e.target.value)}
                      onBlur={() => handleFieldBlur("email")}
                      disabled={isSubmitting}
                      className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                      placeholder="your.email@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate={["visible", "shake"]}
                          exit="hidden"
                          id="email-error"
                          className="flex items-center gap-2 text-sm text-red-600"
                          role="alert"
                          aria-live="polite"
                        >
                          <CircleX className="w-4 h-4 flex-shrink-0" />
                          {errors.email}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                      onBlur={() => handleFieldBlur("phoneNumber")}
                      disabled={isSubmitting}
                      className={errors.phoneNumber ? "border-red-500 focus:border-red-500" : ""}
                      placeholder="+1 (555) 123-4567"
                      aria-invalid={!!errors.phoneNumber}
                      aria-describedby={errors.phoneNumber ? "phoneNumber-error phoneNumber-hint" : "phoneNumber-hint"}
                    />
                    <p id="phoneNumber-hint" className="text-xs text-gray-500">
                      Include country code for international numbers
                    </p>
                    <AnimatePresence>
                      {errors.phoneNumber && (
                        <motion.div
                          variants={errorVariants}
                          initial="hidden"
                          animate={["visible", "shake"]}
                          exit="hidden"
                          id="phoneNumber-error"
                          className="flex items-center gap-2 text-sm text-red-600"
                          role="alert"
                          aria-live="polite"
                        >
                          <CircleX className="w-4 h-4 flex-shrink-0" />
                          {errors.phoneNumber}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Privacy Policy Consent */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreePrivacy"
                      checked={formData.agreePrivacy}
                      onCheckedChange={(checked) => handleFieldChange("agreePrivacy", !!checked)}
                      disabled={isSubmitting}
                      className={errors.agreePrivacy ? "border-red-500" : ""}
                      aria-invalid={!!errors.agreePrivacy}
                      aria-describedby={errors.agreePrivacy ? "agreePrivacy-error" : undefined}
                    />
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="agreePrivacy" className="text-sm leading-relaxed cursor-pointer text-gray-700">
                        I agree to the{" "}
                        <a 
                          href="/privacy-policy" 
                          className="text-cyan-600 underline hover:no-underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>{" "}
                        and consent to the collection and use of my information. *
                      </Label>
                      <AnimatePresence>
                        {errors.agreePrivacy && (
                          <motion.div
                            variants={errorVariants}
                            initial="hidden"
                            animate={["visible", "shake"]}
                            exit="hidden"
                            id="agreePrivacy-error"
                            className="flex items-center gap-2 text-sm text-red-600"
                            role="alert"
                            aria-live="polite"
                          >
                            <CircleX className="w-4 h-4 flex-shrink-0" />
                            {errors.agreePrivacy}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.agreePrivacy}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    role="button"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        Submit Registration
                      </div>
                    )}
                  </Button>
                </div>

                {/* Loading/Status indicator */}
                {isSubmitting && (
                  <div 
                    role="status" 
                    aria-live="polite" 
                    className="text-center text-sm text-gray-500"
                  >
                    Submitting your registration...
                  </div>
                )}
              </form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}