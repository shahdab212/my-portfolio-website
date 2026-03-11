import { useState } from "react";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Set to true when deploying to Fly.io or your own server
const USE_SELF_HOSTED_API = false;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "rathirayhan888@gmail.com",
    href: "mailto:rathirayhan888@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jamdani Bisic, Rupganj, Narayanganj",
    href: null,
  },
];


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (USE_SELF_HOSTED_API) {
        // Use self-hosted API (Fly.io, VPS, etc.)
        const response = await fetch('/api/send-contact-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
      } else {
        // Use Lovable Cloud (Supabase Edge Function)
        const { error } = await supabase.functions.invoke('send-contact-email', {
          body: formData,
        });
        if (error) throw error;
      }

      toast.success("Message sent successfully! Check your email for confirmation.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-3 block animate-fade-up">
            Contact
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary animate-fade-up animation-delay-100">
            Get in Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="animate-slide-in-left">
            <h3 className="font-heading text-2xl text-primary mb-4">
              Let's Connect
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you need help with mathematics, want to discuss books, or just 
              wish to say hello — feel free to reach out.
            </p>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border overflow-hidden"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="block text-foreground font-medium hover:text-primary transition-colors text-sm sm:text-base break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium text-sm sm:text-base">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Contact Form */}
          <div className="animate-slide-in-right">
            <div className="mb-6">
              <h3 className="font-heading text-2xl text-primary mb-2">
                Just Say Hello!
              </h3>
              <p className="text-muted-foreground text-sm">
                Drop me a message and I'll get back to you soon.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 border border-border space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus:border-primary h-11"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus:border-primary h-11"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Subject
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-primary h-11"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider mb-2 block">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-primary min-h-[140px] resize-none"
                  placeholder="Your message..."
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-medium"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
