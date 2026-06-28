import React from 'react'
import { motion } from 'framer-motion'
import { BadgeCheck, Car, Factory, Lightbulb, Sofa } from 'lucide-react'

const CATS = [
  { icon: Car, t: 'AUTOMOTIVE', s: 'Seat Covers' },
  { icon: Sofa, t: 'FURNITURE', s: 'Upholstery' },
  { icon: Factory, t: 'INDUSTRIAL', s: 'Textile Solutions' },
  { icon: BadgeCheck, t: 'QUALITY', s: 'Our Commitment' },
  { icon: Lightbulb, t: 'INNOVATION', s: 'Our Strength' },
]
export default function Categories() {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {CATS.map((c, i) => (
          <motion.div key={c.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*0.08, duration: 0.5 }}
            className="flex items-center gap-4 group">
            <motion.div whileHover={{ rotate: -8, scale: 1.1 }} className="w-12 h-12 flex items-center justify-center text-(--hat-navy)">
              <c.icon className="w-9 h-9" strokeWidth={1.4} />
            </motion.div>
            <div>
              <div className="text-[14px] font-extrabold tracking-wide text-(--hat-navy)">{c.t}</div>
              <div className="text-xs text-slate-500">{c.s}</div>
            </div>
            {i < CATS.length - 1 && <div className="hidden lg:block h-10 w-px bg-slate-300 ml-auto"></div>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
