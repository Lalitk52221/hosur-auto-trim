import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
export default function WhatsAppFloat() {
  return (
    <motion.a href="https://wa.me/919818075809" target="_blank" rel="noreferrer"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl">
      <MessageCircle className="w-7 h-7" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40"></span>
    </motion.a>
  )
}
