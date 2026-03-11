import { useState } from "react";
import { Mail, MapPin, Send, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Web3Forms access key – stored in .env as VITE_WEB3FORMS_KEY
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string;

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
    value: "Rupganj, Narayanganj",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/rathirayhan",
    href: "https://www.linkedin.com/in/rathirayhan",
  },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.1 });

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
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: formData.subject,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send message.");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-accent text-sm tracking-[0.3em] uppercase font-medium mb-3 block">
            Contact
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-primary">
            Get in Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
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
          <div className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
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
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 font-medium"
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
