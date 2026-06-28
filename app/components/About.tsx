import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function About() {

  const items1 = ['Automotive Seat Covers', 'Two Wheeler Seats', 'Four Wheeler Seat Covers', 'Bus Seat Covers']
  const items2 = ['Furniture Upholstery', 'Mattress Covers', 'Office Chair Covers', 'Industrial Sewing & Packing Products']
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-3 gap-3">
          <motion.img initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            src="https://images.pexels.com/photos/36006588/pexels-photo-36006588.jpeg?auto=compress&cs=tinysrgb&w=900" alt="factory" className="col-span-3 rounded-xl h-64 object-cover shadow-lg" />
          {[
            'https://images.pexels.com/photos/31199588/pexels-photo-31199588.jpeg?auto=compress&cs=tinysrgb&w=500',
            'https://images.unsplash.com/photo-1742203098540-cbdb278b0732?auto=format&fit=crop&w=500&q=80',
            'https://images.pexels.com/photos/31019572/pexels-photo-31019572.jpeg?auto=compress&cs=tinysrgb&w=500'
          ].map((src, i) => (
            <motion.img key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.1+i*0.1, duration: 0.6 }}
              src={src} alt="worker" className="rounded-lg h-32 w-full object-cover shadow" />
          ))}
        </div>
        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <div className="text-(--hat-gold) font-bold tracking-[0.3em] text-sm">ABOUT</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-(--hat-navy) leading-tight">HOSUR AUTO TRIMS PVT. LTD.</h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Established with a vision to deliver superior quality and unmatched craftsmanship, Hosur Auto Trims Pvt. Ltd. is a leading manufacturer of automotive and upholstery solutions. With state-of-the-art infrastructure, skilled workforce, and a commitment to excellence, we serve diverse industries with premium products.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
            {[...items1, ...items2].map((t, i) => (
              <motion.div key={t} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ delay: i*0.05 }} className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-(--hat-navy) shrink-0" />
                <span className="text-sm">{t}</span>
              </motion.div>
            ))}
          </div>
          <motion.a whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.97 }} href="#contact"
            className="mt-8 inline-flex items-center gap-3 bg-(--hat-navy) text-white px-7 py-3.5 rounded-md text-[12px] font-extrabold tracking-[0.18em] hover:bg-(--hat-navy-dark) transition">
            KNOW MORE ABOUT US <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  
  )
}
