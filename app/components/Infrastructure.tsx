import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function MachineIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="14" width="42" height="22" rx="3" />
      <path d="M50 22h8M50 28h8" />
      <circle cx="18" cy="42" r="5" />
      <path d="M22 42h22M38 42v8H20v-8" />
      <path d="M14 14V8h12v6" />
    </svg>
  )
}
const INFRA = [
  { n: 35, suf: '+', l1: 'WALKING FOOT', l2: 'MACHINES' },
  { n: 3, suf: '', l1: 'CUTTING', l2: 'MACHINES' },
  { n: 2, suf: '', l1: 'EMBOSSING', l2: 'MACHINES' },
  { n: 20, suf: '+', l1: 'TWIN NEEDLE', l2: 'MACHINES' },
  { n: 15, suf: '+', l1: 'OVERLOCK', l2: 'MACHINES' },
  { n: 5000, suf: '+', l1: 'SQ. FT.', l2: 'PRODUCTION AREA' },
]
function useCounter(target:number, inView:boolean, duration=1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    let raf:number
    const tick = (now:number) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return val
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const v = useCounter(value, inView)
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>
}
export default function Infrastructure() {
  return (
    <section id="infrastructure" className="relative py-16 bg-(--hat-navy) text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.2"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)" /></svg>
      </div>
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <motion.h3 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center text-sm font-bold tracking-[0.3em] mb-10">OUR INFRASTRUCTURE</motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8">
          {INFRA.map((it, i) => (
            <motion.div key={i} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1, duration:0.6 }}
              className="flex items-center gap-4 justify-center">
              <div className="text-(--hat-gold)"><MachineIcon /></div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-(--hat-gold) counter-glow">
                  <Counter value={it.n} suffix={it.suf} />
                </div>
                <div className="text-[11px] font-bold tracking-wider leading-tight">{it.l1}<br/>{it.l2}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
