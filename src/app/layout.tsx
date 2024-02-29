import type { Metadata } from 'next'

import { Space_Grotesk } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import { Navbar, Footer, ScreenShadow } from '@/components'
import { GlobalState } from '@/context/globalContext'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-grotesque',
  display: 'swap',
  adjustFontFallback: false
})

export const metadata: Metadata = {
  title: 'PsikoWare',
  description: 'En PsikoWare, te ofrecemos una amplia gama de componentes de alta calidad para tu PC. Descubre tarjetas gráficas, procesadores, placas base, torres, refrigeración líquida, fuentes de alimentación, memorias RAM, discos duros, SSDs y muchos más. Con productos de calidad y un servicio de atención al cliente excepcional, ¡PsikoWare es tu tienda de componentes online!'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="es">
      <body className={`${space.className} bg-dark text-primary`}>
        <GlobalState currentUser={currentUser}>
          <div className='flex_center_column min-h-[100svh] w-full'>
            <Navbar />

            <div className='flex_center flex-1 w-full container'>
              {children}
            </div>

            <Footer />
            <ScreenShadow />
          </div>
        </GlobalState>

        <Toaster toastOptions={{
          style: {
            background: 'var(--clr-dark)',
            border: '1px solid var(--clr-accent)',
            color: '#fff'
          }
        }} />
      </body>
    </html>
  )
}
