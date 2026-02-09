import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">YUNANVED</h2>
            <p className="text-sm leading-relaxed text-slate-600 max-w-xs">
              Your destination for premium fashion and lifestyle. Curated collections for the modern individual.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-slate-500 transition-colors"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-slate-500 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-slate-500 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-slate-500 transition-colors"><Mail size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-slate-900">Quick Links</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/policies" className="hover:underline">Policies</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-slate-900">Categories</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {['Fashion', 'Perfumes', 'Electronics', 'Beauty', 'Groceries', 'Household', 'Eyewear', 'Kitchen'].map((item) => (
                <li key={item}><Link href={`/category/${item.toLowerCase()}`} className="hover:underline">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-slate-900">Contact</h3>
            <ul className="space-y-5 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>456 Fashion Avenue, Fashion District,<br />New York, NY 10013</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <span>+1 (555) 987-6543</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <span>hello@yunanved.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="shrink-0" />
                <span>Mon - Sun: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Yunanved. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
            <span className="text-gray-300">|</span>
            <Link href="/shipping" className="hover:underline">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;