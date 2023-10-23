import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import { Navbar, Footer } from '@/components'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'Aplicacion de E-Commerce'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className='bg-[#000]'>
      <body className={`${poppins.className} bg-[#111] text-[#eee]`}>
        <div className='flex_center_column min-h-[100svh]'>
          <Navbar />

          <main className='flex_center flex-1 bg-white/10 w-full'>
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  )
}
