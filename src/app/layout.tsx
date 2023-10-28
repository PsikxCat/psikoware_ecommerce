import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

import './globals.css'
import { Navbar, Footer, ScreenShadow } from '@/components'

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700']
})

export const metadata: Metadata = {
  title: 'PsikoWare',
  description: 'En PsikoWare, te ofrecemos una amplia gama de componentes de alta calidad para tu PC. Descubre tarjetas gráficas, procesadores, placas base, torres, refrigeración líquida, fuentes de alimentación, memorias RAM, discos duros, SSDs y muchos más. Con productos de calidad y un servicio de atención al cliente excepcional, ¡PsikoWare es tu tienda de componentes online!'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${space.className} bg-dark text-primary`}>
        <div className='flex_center_column min-h-[100svh] w-full'>
          <Navbar />

          <div className='flex_center flex-1 w-full'>
            {children}
          </div>

          <Footer />
          <ScreenShadow />
        </div>
      </body>
    </html>
  )
}
