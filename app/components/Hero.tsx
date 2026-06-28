import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Variants, easeOut } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: easeOut }
  })
};
  return (
    <section
      id="home"
      className="relative pt-20 overflow-hidden bg-(--hat-navy)"
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <Image
          src="/images/factory.png"
          width={900}
          height={600}
          alt="factory"
          className="w-full h-full object-cover opacity-25"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-(--hat-navy) via-(--hat-navy)/95 to-(--hat-navy)/40"></div>
      <div className="hero-ring w-175 h-175 -right-40 -top-40"></div>
      <div className="hero-ring w-225 h-225 -right-60 -top-80"></div>
      <div className="hero-ring w-275 h-275 -right-80 -top-120"></div>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-white"
        >
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
          >
            ENGINEERING
            <br />
            PREMIUM AUTOMOTIVE &amp;
            <br />
            <span className="text-(--hat-gold)">
              UPHOLSTERY SOLUTIONS
            </span>
          </motion.h1>
          <motion.div
            variants={fadeUp}
            custom={1}
            className="mt-5 text-[15px] font-semibold tracking-widest text-white/90"
          >
            HOSUR AUTO TRIMS PVT. LTD.
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-5 max-w-lg text-white/80 leading-relaxed"
          >
            Manufacturer of Automotive Seat Covers, Two &amp; Four Wheeler
            Seats, Bus Seat Covers, Furniture Upholstery &amp; Industrial
            Textile Products.
          </motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#about"
              className="relative overflow-hidden shine inline-flex items-center gap-3 bg-transparent border-2 border-white/30 text-white px-7 py-3.5 rounded-md text-[12px] font-bold tracking-[0.18em] hover:border-(--hat-gold) hover:text-(--hat-gold) transition"
            >
              COMPANY PROFILE <Download className="w-4 h-4" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-3 bg-(--hat-gold) text-(--hat-navy) px-7 py-3.5 rounded-md text-[12px] font-extrabold tracking-[0.18em] hover:bg-white transition"
            >
              CONTACT US <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative h-105 lg:h-130"
        >
          <motion.img
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            src="/images/car-seat.png"
            width={700}
            height={560}
            alt="premium seat"
            className="absolute right-6 top-6 w-[58%] rounded-2xl shadow-2xl object-cover h-[80%]"
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 bottom-2 w-[50%] aspect-5/4 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20"
          >
            <Image
              src="/images/sewing.png"
              width={700}
              height={560}
              alt="sewing"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-2 right-0 bg-white text-(--hat-navy) px-4 py-2 rounded-full shadow-xl text-xs font-bold tracking-wider"
          >
            ISO Certified
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
