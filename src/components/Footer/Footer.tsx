import Link from 'next/link'
import { FaGithub, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'

import { FooterList } from '@/components'

export default function Footer() {
  return (
    <section className="bg-black w-full max-w-[1500px] flex_center py-4">
      <div className='container flex_center'>
        <footer className="flex flex-col justify-center md:flex-row text-sm gap-x-3 gap-y-5 py-8">
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Categorías</h3>
            <Link href="#">Procesadores</Link>
            <Link href="#">Boards</Link>
            <Link href="#">Tarjetas de Video</Link>
            <Link href="#">Memorias RAM</Link>
            <Link href="#">Almacenamiento</Link>
            <Link href="#">Monitores</Link>
          </FooterList>

          <FooterList>
            <h3 className='text-base font-bold mb-2'>Atención al Cliente</h3>
            <Link href="#">Contacto</Link>
            <Link href="#">Política de Envíos</Link>
            <Link href="#">Devoluciones & Cambios</Link>
            <Link href="#">Preguntas Frecuentes (FAQ&apos;s)</Link>
          </FooterList>

          <div className='w-full sm:w-1/2 md:w-1/4 pr-3'>
            <h3 className='text-base font-bold mb-2'>Sobre Nosotros</h3>

            <p>En nuestra tienda, nos especializamos en proporcionar los últimos y mejores componentes a nuestros clientes, siempre ofreciendo la mejor relación calidad-precio del mercado.</p>
            <br />
            <p>🄯 {new Date().getFullYear()} PsikoWare. Creado por Psikocat.</p>
          </div>

          <FooterList>
            <h3 className='text-base font-bold mb-2'>Siguenos</h3>
            <div className='flex gap-2'>
              <Link href="#"><FaGithub size={20} /></Link>
              <Link href="#"><FaXTwitter size={20} /></Link>
              <Link href="#"><FaInstagram size={20} /></Link>
              <Link href="#"><FaLinkedinIn size={20} /></Link>
            </div>
          </FooterList>
        </footer>
      </div>
    </section>
  )
}
