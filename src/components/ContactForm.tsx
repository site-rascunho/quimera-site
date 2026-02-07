import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(50),
  jobTitle: z.string().trim().min(1, "Job title is required").max(100),
  industry: z.string().trim().min(1, "Industry is required"),
  preferredChannel: z.enum(["whatsapp", "email"]),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    industry: "",
    preferredChannel: "email",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, industry: value });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, preferredChannel: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: t.contact.form.success,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        industry: "",
        preferredChannel: "email",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: t.contact.form.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            {t.contact.form.name}
          </Label>
          <Input
            id="name"
            name="name"
            placeholder={t.contact.form.name}
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              {t.contact.form.email}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t.contact.form.email}
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              {t.contact.form.phone}
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder={t.contact.form.phone}
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
            />
          </div>
        </div>

        {/* Job Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-foreground font-medium">
              {t.contact.form.jobTitle}
            </Label>
            <Input
              id="jobTitle"
              name="jobTitle"
              placeholder={t.contact.form.jobTitle}
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" className="text-foreground font-medium">
              {t.contact.form.company}
            </Label>
            <Input
              id="company"
              name="company"
              placeholder={t.contact.form.company}
              value={formData.company}
              onChange={handleChange}
              className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
            />
          </div>
        </div>

        {/* Industry Select */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-foreground font-medium">
            {t.contact.form.industryLabel}
          </Label>
          <Select onValueChange={handleSelectChange} value={formData.industry}>
            <SelectTrigger id="industry" className="bg-transparent border-foreground/20 focus:border-foreground text-foreground">
              <SelectValue placeholder={t.contact.form.industryLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="logistics">{t.industries.logistics.title}</SelectItem>
              <SelectItem value="finance">{t.industries.finance.title}</SelectItem>
              <SelectItem value="energy">{t.industries.energy.title}</SelectItem>
              <SelectItem value="manufacturing">{t.industries.manufacturing.title}</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Preferred Channel */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t.contact.form.preferredChannelLabel}
          </Label>
          <RadioGroup
            defaultValue="email"
            value={formData.preferredChannel}
            onValueChange={handleRadioChange}
            className="flex space-x-4 pt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="channel-email" className="border-foreground/20 text-primary" />
              <Label htmlFor="channel-email" className="text-foreground/80 cursor-pointer font-normal">
                {t.contact.form.channelEmail}
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="whatsapp" id="channel-whatsapp" className="border-foreground/20 text-primary" />
              <Label htmlFor="channel-whatsapp" className="text-foreground/80 cursor-pointer font-normal">
                {t.contact.form.channelWhatsapp}
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground font-medium">
            {t.contact.form.message}
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder={t.contact.form.message}
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40 resize-none"
          />
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 bg-foreground text-background font-display text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;