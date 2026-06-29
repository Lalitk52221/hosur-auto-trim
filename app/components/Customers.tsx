import React from 'react'

const CUSTOMERS = ['TVS ACCESSORIES','RIVER MOBILITY','FP SEATING SYSTEMS','NILKAMAL','DUROFLEX','GREAVES ELECTRIC MOBILITY','BAJAJ','HERO']
export default function Customers() {
    const items = [...CUSTOMERS, ...CUSTOMERS]
  return (
    <section id="customers" className="py-16 bg-slate-50">
      <div className="text-center">
        <div className="text-(--hat-gold) font-bold tracking-[0.3em] text-sm">OUR VALUED CUSTOMERS</div>
      </div>
      <div className="mt-8 overflow-hidden no-scrollbar">
        <div className="flex gap-16 animate-marquee whitespace-nowrap items-center">
          {items.map((c, i) => (
            <div key={i} className="text-(--hat-navy) font-black text-xl tracking-widest opacity-70 hover:opacity-100 transition">
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
