import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
const WHY = [
  { t: 'QUALITY ASSURED', d: 'We maintain the highest quality standards in every stage of production.' },
  { t: 'SKILLED WORKFORCE', d: 'Experienced and trained professionals ensuring precision and perfection.' },
  { t: 'PRECISION STITCHING', d: 'Advanced machines and techniques for superior finishing.' },
  { t: 'TIMELY DELIVERY', d: 'Strong production capacity and planning for on-time deliveries.' },
  { t: 'OEM STANDARDS', d: 'Products manufactured as per OEM specifications and requirements.' },
  { t: 'COMPETITIVE PRICING', d: 'Best quality products at competitive and affordable prices.' },
]
export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center">
          <div className="text-(--hat-gold) font-bold tracking-[0.3em] text-sm">WHY CHOOSE US</div>
          <div className="mt-3 mx-auto w-16 h-1 bg-(--hat-gold) rounded-full"></div>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {WHY.map((w, i) => (
            <motion.div key={w.t} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08, duration:0.6 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(15,44,91,0.2)' }}
              className="p-6 rounded-xl border border-slate-200 bg-white text-center">
              <motion.div whileHover={{ rotate: -8, scale: 1.1 }} className="mx-auto w-12 h-12 rounded-full bg-(--hat-navy)/5 text-(--hat-navy) flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" strokeWidth={1.5} />
              </motion.div>
              <div className="mt-4 text-[12px] font-extrabold tracking-[0.15em] text-(--hat-navy)">{w.t}</div>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">{w.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
