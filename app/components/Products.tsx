import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const PRODUCTS = [
  { name: 'BIKE SEAT COVERS', img: 'https://images.unsplash.com/photo-1764093456972-96a8d2eacf1d?auto=format&fit=crop&w=900&q=80' },
  { name: 'CAR SEAT COVERS', img: 'https://images.unsplash.com/photo-1691157415383-9e85455a0f9e?auto=format&fit=crop&w=900&q=80' },
  { name: 'BUS SEAT COVERS', img: 'https://images.unsplash.com/photo-1624901713275-bbc0b448bb38?auto=format&fit=crop&w=900&q=80' },
  { name: 'SOFA COVERS', img: 'https://images.pexels.com/photos/13086783/pexels-photo-13086783.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { name: 'MATTRESS COVERS', img: 'https://images.pexels.com/photos/10600087/pexels-photo-10600087.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { name: 'OFFICE CHAIR COVERS', img: 'https://images.pexels.com/photos/5824550/pexels-photo-5824550.jpeg?auto=compress&cs=tinysrgb&w=900' },
]

export default function Products() {
  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center">
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} className="text-(--hat-gold) font-bold tracking-[0.3em] text-sm">OUR PRODUCTS</motion.div>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="mt-2 text-3xl md:text-4xl font-extrabold text-(--hat-navy)">
            PREMIUM RANGE OF PRODUCTS
          </motion.h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-(--hat-gold) rounded-full"></div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.08, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <motion.img src={p.img} alt={p.name} className="w-full h-full object-cover" whileHover={{ scale: 1.12 }} transition={{ duration: 0.6 }} />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="text-[11px] font-extrabold tracking-widest text-(--hat-navy)">{p.name}</div>
                <motion.div whileHover={{ x: 4 }} className="w-7 h-7 rounded-full bg-(--hat-gold)/10 text-(--hat-gold) flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
