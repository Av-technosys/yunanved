import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import {
  EMAIL_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MOBILE_NUMBER_URL,
  TWITTER_URL,
  WHATSAPP_URL,
} from "@/const";

import {IconBrandWhatsapp } from "@tabler/icons-react";
export const Footer = () => {
  return (
    <>
      <footer className="w-full border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] lg:gap-16">
            <div>
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/mainlogo.png"
                  alt="YUNANVED"
                  width={150}
                  height={42}
                  className="h-9 w-auto object-contain"
                />
              </Link>

              <p className="mt-6 max-w-sm text-md leading-relaxed text-slate-950">
                Your destination for premium fashion and lifestyle. Curated
                collections for the modern individual.
              </p>

              <div className="mt-6 flex items-center gap-4 text-slate-950">
                <Link href={FACEBOOK_URL} aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href={TWITTER_URL} aria-label="X">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href={INSTAGRAM_URL} aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href={EMAIL_URL} aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                Quick Links
              </h3>
              <ul className="mt-6 space-y-4 text-md text-slate-950">
                {[
                  { name: "About Us", link: "/about-us" },
                  { name: "Contact Us", link: "/contact-us" },
                  { name: "Privacy Policy", link: "/privacy-policy" },
                  { name: "Terms & Conditions", link: "/terms-condition" },
                  { name: "Shipping Policy", link: "/shipping" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.link} className="hover:text-[#02A9E5]">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                Categories
              </h3>
              <ul className="mt-6 space-y-4 text-md text-slate-950">
                {[
                  "Fashion",
                  "Perfumes",
                  "Electronics",
                  "Beauty",
                  "Groceries",
                  
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/category?cat=${item.toLowerCase()}`}
                      className="hover:text-[#02A9E5]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-950">
                Contact
              </h3>

              <ul className="mt-6 space-y-5 text-md text-slate-950">
                <li className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#02A9E5]" />
                  <span>
                    456 Fashion Avenue, Style District,
                    <br />
                    New York, NY 10013
                  </span>
                </li>

                <li className="flex items-center gap-4">
                  <Phone className="h-5 w-5 shrink-0 text-[#02A9E5]" />
                  <Link href={MOBILE_NUMBER_URL}>+1 (555) 987-6543</Link>
                </li>

                <li className="flex items-center gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-[#02A9E5]" />
                  <Link href={EMAIL_URL}>hello@yunanved.com</Link>
                </li>

                <li className="flex items-center gap-4">
                  <Clock className="h-5 w-5 shrink-0 text-[#02A9E5]" />
                  <span>Mon - Sun: 10:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 text-sm text-slate-950">
            © 2026 Yunanved. All rights reserved.
          </div>
        </div>
      </footer>

      <Link
        href={WHATSAPP_URL}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#35C759] text-white shadow-lg transition-transform hover:scale-105"
      >
        <IconBrandWhatsapp className="h-6 w-6" />
      </Link>
    </>
  );
};
