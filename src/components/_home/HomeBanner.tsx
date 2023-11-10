'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components'

export default function HomeBanner() {
  const handleClick = () => {
    console.log('clicked')
  }

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

          <Link href='#' className='max-md:hidden w-full flex_center mt-3'>
            <Button accent label='VER PRODUCTOS' onClick={handleClick}/>
          </Link>
        </div>

        {/* imagen */}
        <div className="flex_center">
          <Image src="/images/banner.webp" alt="Banner" width={330} height={330} priority/>
        </div>

        {/* link */}
        <Link href='#' className='md:hidden'>
          <Button accent label='VER PRODUCTOS' onClick={handleClick}/>
        </Link>
      </div>
    </section>
  )
}
