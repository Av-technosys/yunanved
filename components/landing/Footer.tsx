import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4  lg:px-8 pt-12 sm:pt-16 pb-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Section */}
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              YUNANVED
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Your destination for premium fashion and lifestyle. Curated
              collections for the modern individual.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Mail].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-slate-200 
                         hover:bg-slate-100 transition"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-slate-900">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                { name: "About Us", link: "/about" },
                { name: "Contact Us", link: "/contact" },
                { name: "Policies", link: "/policies" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className="hover:text-black transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-slate-900">
              Categories
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-slate-600 sm:block sm:space-y-3">
              {[
                "Fashion",
                "Perfumes",
                "Electronics",
                "Beauty",
                "Groceries",
                "Household",
                "Eyewear",
                "Kitchen",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/category/${item.toLowerCase()}`}
                    className="hover:text-black transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-slate-900">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>
                  456 Fashion Avenue, Fashion District,
                  <br />
                  New York, NY 10013
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" />
                <span>+1 (555) 987-6543</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" />
                <span>hello@yunanved.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Clock size={16} className="shrink-0" />
                <span>Mon - Sun: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© 2024 Yunanved. All rights reserved.</p>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <Link href="/privacy" className="hover:text-black transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-black transition">
              Terms & Conditions
            </Link>
            <Link href="/shipping" className="hover:text-black transition">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
