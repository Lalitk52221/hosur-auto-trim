import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700','800','900'] })

export const metadata = {
  title: 'Hosur Auto Trims Pvt. Ltd. — Premium Automotive & Upholstery Solutions',
  description: 'Manufacturer of Automotive Seat Covers, Two & Four Wheeler Seats, Bus Seat Covers, Furniture Upholstery & Industrial Textile Products.',
}

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}