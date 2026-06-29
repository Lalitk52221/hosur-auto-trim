import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
      setForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
      setTimeout(() => setSent(false), 3500);
    } catch (e) {
      console.error(e);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <div className="text-(--hat-gold) font-bold tracking-[0.3em] text-xs">
            GET IN TOUCH
          </div>
          <h3 className="mt-2 text-2xl font-extrabold text-(--hat-navy) leading-tight">
            LET&apos;S BUILD SOMETHING GREAT TOGETHER
          </h3>
          <div className="mt-6 space-y-4 text-sm text-slate-700">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-(--hat-navy) shrink-0" />
              <span>
                No. 12/1, SIPCOT Industrial Complex,
                <br />
                Hosur – 635 126, Tamil Nadu, India.
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <Phone className="w-5 h-5 text-(--hat-navy) shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex gap-3 items-center">
              <Mail className="w-5 h-5 text-(--hat-navy) shrink-0" />
              <span>info@hosurautotrims.com</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={submit}
          className="lg:col-span-5 space-y-4"
        >
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="px-4 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-(--hat-navy)"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="px-4 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-(--hat-navy)"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Your Phone"
              className="px-4 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-(--hat-navy)"
            />
          </div>
          <select
            value={form.inquiryType}
            onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
            className="w-full px-4 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-(--hat-navy) bg-white"
          >
            <option value="">Select Inquiry Type</option>
            <option>Automotive Seat Covers</option>
            <option>Furniture Upholstery</option>
            <option>Industrial Textile</option>
            <option>Bulk Order</option>
            <option>Other</option>
          </select>
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your Message"
            rows={5}
            className="w-full px-4 py-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:border-(--hat-navy)"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-3 bg-(--hat-navy) text-white px-7 py-3.5 rounded-md text-[12px] font-extrabold tracking-[0.18em] hover:bg-(--hat-navy-dark) transition disabled:opacity-60"
          >
            {loading ? "SENDING..." : sent ? "SENT!" : "SEND MESSAGE"}{" "}
            <Send className="w-4 h-4" />
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <div className="relative rounded-xl overflow-hidden h-72 shadow-lg border border-slate-200">
            <iframe
              title="map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=77.78%2C12.71%2C77.86%2C12.78&amp;layer=mapnik&amp;marker=12.7409%2C77.8253"
              className="w-full h-full"
            ></iframe>
            <div className="absolute top-3 left-3 bg-white px-3 py-2 rounded-md shadow-md text-xs font-bold text-(--hat-navy) flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <a
                href="https://maps.app.goo.gl/ycAF8NNr2RiNeANi8"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Hosur Auto Trims Pvt. Ltd.
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
