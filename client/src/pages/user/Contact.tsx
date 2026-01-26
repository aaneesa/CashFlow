import React, { useState } from "react";
import type {ChangeEvent, FormEvent} from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import toast from "react-hot-toast";

// --- Interfaces ---

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  // --- Handlers ---

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API Call
      console.log("Form Data Submitted:", formData);
      
      // Example of actual API call:
      // await api.post("/contact", formData);
      
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-6 md:px-12 bg-linear-to-br from-[#F5F5F5] via-[#F0F8F5] to-[#E9DCC9]">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#00FF7C]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#007755]/10 rounded-full blur-3xl -z-10"></div>

      {/* Heading */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight m-16">
        <span className="bg-linear-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
          Contact Us
        </span>
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Info */}
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-[#00FF7C]/30">
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6">Get in Touch</h2>
          <p className="text-[#2F3E46]/80 mb-6">
            Have questions, feedback, or need support? We’re here to help you. 
            Reach out to us through any of the following ways:
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="text-[#007755]" />
              <span className="text-[#2F3E46]/80">support@cashflow.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-[#007755]" />
              <span className="text-[#2F3E46]/80">+91 1122345690</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-[#007755]" />
              <span className="text-[#2F3E46]/80">Mumbai, India</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mt-8">
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Facebook className="w-5 h-5 text-[#007755]" />
            </a>
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Twitter className="w-5 h-5 text-[#007755]" />
            </a>
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Linkedin className="w-5 h-5 text-[#007755]" />
            </a>
            <a href="#" className="p-3 bg-[#00FF7C]/10 rounded-xl hover:bg-[#00FF7C]/20 transition">
              <Instagram className="w-5 h-5 text-[#007755]" />
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-[#00FF7C]/30">
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Name</label>
              <input 
                required
                name="name"
                type="text" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Email</label>
              <input 
                required
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Subject</label>
              <input 
                required
                name="subject"
                type="text" 
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#2F3E46] mb-2">Message</label>
              <textarea 
                required
                name="message"
                rows={5} 
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-[#00FF7C]/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FF7C] text-[#2F3E46]" 
              />
            </div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full py-3 rounded-xl bg-linaer-to-r from-[#00FF7C] to-[#007755] text-white font-bold tracking-wide shadow-md hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;