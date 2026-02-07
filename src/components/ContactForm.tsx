import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
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
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      setFormData({ name: "", email: "", company: "", message: "" });
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
        <Input
          name="name"
          placeholder={t.contact.form.name}
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
        />
        <Input
          name="email"
          type="email"
          placeholder={t.contact.form.email}
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
        />
        <Input
          name="company"
          placeholder={t.contact.form.company}
          value={formData.company}
          onChange={handleChange}
          className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40"
        />
        <Textarea
          name="message"
          placeholder={t.contact.form.message}
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="bg-transparent border-foreground/20 focus:border-foreground text-foreground placeholder:text-foreground/40 resize-none"
        />
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
