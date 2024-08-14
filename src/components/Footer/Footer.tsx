import Link from 'next/link'
import { FaGithub, FaXTwitter, FaLinkedinIn, FaGlobe } from 'react-icons/fa6'

import { FooterList } from '@/components'

export default function Footer() {
  return (
    <section className="bg-[#050505] w-full flex_center py-4 z-10">
      <div className='container flex_center'>
        <footer className="flex_center_column md:flex-row md:items-start text-[13px] gap-x-3 gap-y-5 py-8">
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Categorías</h3>
            <Link href="https://psikoware-ecommerce.vercel.app/products?category=Procesadores">Procesadores</Link>
            <Link href="https://psikoware-ecommerce.vercel.app/products?category=Placas%20madre">Boards</Link>
            <Link href="https://psikoware-ecommerce.vercel.app/products?category=Tarjetas%20de%20video">Tarjetas de Video</Link>
            <Link href="https://psikoware-ecommerce.vercel.app/products?category=Memorias%20RAM">Memorias RAM</Link>
            <Link href="https://psikoware-ecommerce.vercel.app/products?category=Memorias%20RAM">Almacenamiento</Link>
            <Link href="https://psikoware-ecommerce.vercel.app/products?category=Accesorios">Monitores</Link>
          </FooterList>

          <FooterList>
            <h3 className='text-base font-bold mb-2'>Atención al Cliente</h3>
            <Link href="#">Contacto</Link>
            <Link href="#">Política de Envíos</Link>
            <Link href="#">Devoluciones & Cambios</Link>
            <Link href="#">Preguntas Frecuentes (FAQ&apos;s)</Link>
          </FooterList>

          <div className='w-full min-[350px]:w-[80%] md:w-[30%] md:px-8'>
            <h3 className='text-base font-bold mb-4'>Sobre Nosotros</h3>

            <p>En nuestra tienda, nos especializamos en proporcionar los últimos y mejores componentes a nuestros clientes, siempre ofreciendo la mejor relación calidad-precio del mercado.</p>
            <br />
            <p>
              <span className='inline-block rotate-180'>&nbsp;&copy;</span>
              {new Date().getFullYear()} Psikocat. Ningún derecho reservado.</p>
          </div>

          <div className='w-full min-[350px]:w-[80%] md:w-[10%]'>
            <h3 className='text-base font-bold mb-4'>Siguenos</h3>
            <div className='flex gap-2'>
              <Link href="https://github.com/psikxcat" target="_blank" rel="noopener noreferrer"><FaGithub size={20} /></Link>
              <Link href="https://x.com/psiko_cat" target="_blank" rel="noopener noreferrer"><FaXTwitter size={20} /></Link>
              <Link href="https://www.linkedin.com/in/arevalorichard/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={20} /></Link>
              <Link href="https://psikocat.vercel.app/" target="_blank" rel="noopener noreferrer"><FaGlobe size={20} /></Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}
