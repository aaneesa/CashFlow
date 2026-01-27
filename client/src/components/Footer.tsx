// src/components/Footer.tsx

import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* SAME background as hero */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-white via-[#F3FCF8] to-[#E9F9F2]">
        <div className="absolute w-72 h-72 bg-[#00FF7C]/15 blur-3xl rounded-full top-16 left-10" />
        <div className="absolute w-96 h-96 bg-[#007755]/15 blur-3xl rounded-full bottom-10 right-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4 text-[#1d2b28]">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight 
                  bg-linear-to-r from-[#00FF7C] via-[#1d814d] to-[#0b3d2e]
                  bg-clip-text text-transparent">
            CashFlow
          </h2>
          <p className="mt-3 text-sm text-[#5f7f73] leading-relaxed">
            Learn finance the right way — simple, practical, and built for real
            life decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1d814d] mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Knowledge", "Roadmap", "Calculators"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-[#2f5f4e] hover:text-[#00AA6C] transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1d814d] mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            {["About", "Contact", "FAQs", "Advertise"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-[#2f5f4e] hover:text-[#00AA6C] transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1d814d] mb-4">
            Connect
          </h3>

          <p className="text-sm text-[#5f7f73]">support@cashflow.com</p>
          <p className="text-sm text-[#5f7f73] mt-1">+91 1122345690</p>

          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full border border-[#00FF7C]/30
                             text-[#1d814d]
                             hover:bg-[#00FF7C]/10
                             hover:shadow-[0_0_10px_rgba(0,255,124,0.35)]
                             transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="relative text-center px-6">
        <p className="text-sm italic text-[#5f7f73]">
          “CashFlow — Learn with clarity, live with prosperity.”
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-8 border-t border-[#00FF7C]/20 py-6 text-center text-xs text-[#6b8f84]">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#1d814d] font-semibold">CashFlow</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
