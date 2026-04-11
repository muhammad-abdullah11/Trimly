import { FaTwitter, FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const features = [
  { label: "URL Shortening", href: "#" },
  { label: "Custom Links", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "QR Codes", href: "#" },
];

const company = [
  { label: "About Us", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Press", href: "#" },
];

const support = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "API Docs", href: "#" },
  { label: "Status", href: "#" },
];

const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "GDPR", href: "#" },
];

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaGithub, href: "#", label: "GitHub" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">Trimly</div>
            <p className="text-sm mb-4">
              Shorten links, track clicks, and grow your brand with the most reliable URL shortening service.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-400 text-xl"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              {features.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2026 Trimly. All rights reserved.</p>
            <p className="text-sm flex items-center gap-1">
              Made with <FaHeart className="text-red-500 text-xs" /> by M Abdullah
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
