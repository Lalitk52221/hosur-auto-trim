
import React from 'react'
import Logo from './Logo'
import { motion } from 'framer-motion'
import { FaFacebook } from 'react-icons/fa'
import { LiaLinkedin } from 'react-icons/lia'
import { BsInstagram, BsYoutube } from 'react-icons/bs'

export default function Footer() {
  return (
    <footer className="bg-(--hat-navy-dark) text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <Logo light={true} />
          <p className="mt-4 text-sm text-white/70 max-w-sm leading-relaxed">Engineering premium automotive &amp; upholstery solutions with quality, innovation and trust.</p>
          <p className="mt-4 text-xs text-white/40">© 2024 Hosur Auto Trims Pvt. Ltd. All Rights Reserved.</p>
        </div>
        <div>
          <div className="text-sm font-bold tracking-widest mb-4">QUICK LINKS</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#home" className="hover:text-(--hat-gold)">Home</a></li>
            <li><a href="#about" className="hover:text-(--hat-gold)">About Us</a></li>
            <li><a href="#products" className="hover:text-(--hat-gold)">Products</a></li>
            <li><a href="#infrastructure" className="hover:text-(--hat-gold)">Infrastructure</a></li>
            <li><a href="#contact" className="hover:text-(--hat-gold)">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-bold tracking-widest mb-4">PRODUCTS</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Bike Seat Covers</li>
            <li>Car Seat Covers</li>
            <li>Bus Seat Covers</li>
            <li>Sofa Covers</li>
            <li>Mattress Covers</li>
            <li>Office Chair Covers</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-bold tracking-widest mb-4">FOLLOW US</div>
          <div className="flex gap-3">
            {[FaFacebook, LiaLinkedin, BsInstagram, BsYoutube].map((Ic, i) => (
              <motion.a key={i} whileHover={{ y: -4, backgroundColor: '#e9a23b' }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" href="#">
                <Ic className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/40">Designed with <span className="text-(--hat-gold)">♥</span> for Quality &amp; Excellence</div>
        </div>
      </div>
    </footer>
  )
}
