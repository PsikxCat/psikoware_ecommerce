import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components'

export default function HomeBanner() {
  return (
    <section className="w-[80%] relative mx-6">
      <div className="mx-auto min-[300px]:px-8 py-12 flex_center_column justify-evenly md:flex-row gap-x-5 gap-y-3 rounded-lg">
        {/* texto */}
        <div className="text-center md:w-[50%]">
          <h1>
            Potencia tu PC
          </h1>
          <p className='p max-md:w-[90%] mx-auto py-2'>
            Optimiza tu rendimiento con nuestros componentes de alta calidad&nbsp;
            <span className='max-md:hidden'>y lleva tu equipo al siguiente nivel.</span>
          </p>

          <Link href='/products' className='max-md:hidden w-full flex_center mt-3'>
            <Button accent label='VER PRODUCTOS'/>
          </Link>
        </div>

        {/* imagen */}
        <div className="flex_center">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/psikoware.appspot.com/o/psikoware%2Fbanner.webp?alt=media&token=8448e92f-5f5c-4466-bdd4-7db65825ebac"
            alt="Banner"
            width={330}
            height={330}
            priority
          />
        </div>

        {/* link */}
        <Link href='/products' className='md:hidden'>
          <Button accent label='VER PRODUCTOS'/>
        </Link>
      </div>
    </section>
  )
}
