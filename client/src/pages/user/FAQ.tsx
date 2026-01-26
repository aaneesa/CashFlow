import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

// --- Interfaces ---

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  title: string;
  faqs: FAQItem[];
}

const FAQ: React.FC = () => {
  // --- Updated FAQ Content ---
  const categories: FAQCategory[] = [
    {
      title: "Getting Started",
      faqs: [
        { q: "How do I start my financial literacy journey?", a: "Begin by exploring our 'Roadmaps' section. We recommend starting with the 'Personal Finance 101' path to build a strong foundation." },
        { q: "Can I use Fynsd on my mobile phone?", a: "Absolutely! Fynsd is a Progressive Web App (PWA), meaning it works perfectly on all mobile browsers with a smooth, app-like experience." },
        { q: "Is my personal data encrypted?", a: "Yes, we use industry-standard AES-256 encryption for all user data and secure SSL protocols for every interaction on the platform." }
      ]
    },
    {
      title: "Content & Certifications",
      faqs: [
        { q: "Are the certifications industry-recognized?", a: "Our certificates verify your successful completion of course modules and quizzes, making them a great addition to your LinkedIn profile or resume to showcase continuous learning." },
        { q: "How often is the market data updated?", a: "While we aren't a live trading platform, our educational content and market blogs are updated weekly to reflect the latest global financial trends." },
        { q: "Do you offer localized tax learning?", a: "Currently, our tax modules focus on general principles and specific sections for Indian and US tax laws, with more regions being added soon." }
      ]
    },
    {
      title: "Premium & Billing",
      faqs: [
        { q: "What is included in the 'Pro' membership?", a: "Pro members get access to AI-generated summaries, exclusive advanced roadmaps, downloadable PDF guides, and an ad-free experience." },
        { q: "Can I get a refund if I cancel?", a: "We offer a 7-day money-back guarantee for first-time subscribers if you haven't yet generated more than 5 AI summaries." },
        { q: "Do you offer corporate or group discounts?", a: "Yes! For teams of 5 or more, please contact our support team to get access to our corporate learning dashboard." }
      ]
    }
  ];

  // --- State with Strict Types ---
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen py-20 px-6 md:px-12 bg-linear-to-br from-[#F5F5F5] via-[#F0F8F5] to-[#E9DCC9]">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00FF7C]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#007755]/10 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight m-14">
        <span className="bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
          Frequently Asked Questions
        </span>
      </h1>

      {/* Categories */}
      <div className="max-w-4xl mx-auto space-y-6">
        {categories.map((cat, i) => {
          const isCatOpen = openCategory === i;
          return (
            <div key={i} className="border border-[#00FF7C]/30 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-bold text-[#2F3E46] hover:bg-[#00FF7C]/5 transition"
                onClick={() => {
                  setOpenCategory(isCatOpen ? null : i);
                  setOpenFAQ(null);
                }}
              >
                {cat.title}
                <ChevronDown
                  className={`w-6 h-6 text-[#007755] transition-transform duration-300 ${isCatOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* FAQs inside category */}
              <div className={`transition-all duration-300 overflow-hidden ${isCatOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="divide-y divide-[#00FF7C]/20">
                  {cat.faqs.map((faq, j) => {
                    const faqId = `${i}-${j}`;
                    const isFAQOpen = openFAQ === faqId;
                    return (
                      <div key={j} className="px-6">
                        <button
                          className="w-full flex justify-between items-center py-4 text-left text-[#2F3E46] font-medium"
                          onClick={() => setOpenFAQ(isFAQOpen ? null : faqId)}
                        >
                          {faq.q}
                          <ChevronDown
                            className={`w-5 h-5 text-[#007755] transition-transform duration-300 ${isFAQOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          className={`pl-2 pb-4 text-sm md:text-base text-[#2F3E46]/80 leading-relaxed transition-all duration-300 overflow-hidden ${
                            isFAQOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {faq.a}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;