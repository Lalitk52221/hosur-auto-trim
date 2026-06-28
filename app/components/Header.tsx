import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import Image from "next/image";
import Logo from "./Logo";

const NAV = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "PRODUCTS", href: "#products" },
  { label: "INFRASTRUCTURE", href: "#infrastructure" },
  { label: "CUSTOMERS", href: "#customers" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  


  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white/80 backdrop-blur"}`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-4">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[12px] font-semibold tracking-[0.15em] text-slate-700 hover:text-(--hat-gold) transition-colors relative group"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--hat-gold) group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:inline-flex items-center gap-2 bg-(--hat-navy) text-white px-5 py-3 rounded-md text-[11px] font-bold tracking-[0.18em] hover:bg-(--hat-navy-dark) transition-colors shadow-lg shadow-blue-900/20"
        >
          COMPANY PROFILE <Download className="w-4 h-4" />
        </motion.a>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-(--hat-navy)"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-3">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  onClick={() => setOpen(false)}
                  href={n.href}
                  className="text-sm font-semibold tracking-wider text-slate-700"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
