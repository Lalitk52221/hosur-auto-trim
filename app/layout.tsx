import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] })

export const metadata = {
  title: 'Hosur Auto Trims Pvt. Ltd. | Premium Automotive Seat Cover Manufacturer India',
  description: 'Hosur Auto Trims Pvt. Ltd. manufactures premium automotive seat covers, bike seat covers, bus seat covers, furniture upholstery and industrial textile products with OEM quality.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}