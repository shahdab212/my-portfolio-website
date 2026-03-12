import { Facebook, Send, BookOpen, Linkedin } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/rathirayhan",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://facebook.com/rathi021",
    icon: Facebook,
    label: "Facebook",
  },
  {
    href: "https://t.me/rayhanrathi",
    icon: Send,
    label: "Telegram",
  },
  {
    href: "https://www.goodreads.com/rathirayhan",
    icon: BookOpen,
    label: "Goodreads",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a 
            href="#home" 
            className="font-heading text-2xl text-primary hover:text-accent transition-colors duration-300"
          >
            Rathi
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} Abu Rayhan Rathi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
