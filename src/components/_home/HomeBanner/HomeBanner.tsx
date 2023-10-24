import Image from 'next/image'
import Link from 'next/link'

export default function HomeBanner() {
  return (
    <section className="w-[80%] relative mx-6 mb-8 rounded-md">
      <div className="mx-auto px-8 py-12 flex_center_column justify-evenly md:flex-row gap-x-5 gap-y-3 rounded-lg">
        {/* texto */}
        <div className="text-center md:w-[50%]">
          <h1>
            Potencia tu PC
          </h1>
          <p className='p max-md:w-[90%] mx-auto'>
            Optimiza tu rendimiento con nuestros componentes de alta calidad&nbsp;
            <span className='max-md:hidden'>y lleva tu equipo al siguiente nivel.</span>
          </p>

          <Link href='#' className='max-md:hidden'>
            <button className="m-4 px-4 py-2 text-white rounded-md bg-sushi-700 hover:bg-sushi-600 transition-all duration-200">
              Ver Productos
            </button>
          </Link>
        </div>

        {/* imagen */}
        <div className="flex_center">
          <Image src="/images/banner.webp" alt="Banner" width={300} height={300} priority/>
        </div>

        {/* link */}
        <Link href='#' className='md:hidden'>
          <button className="m-4 px-4 py-2 text-white rounded-md bg-sushi-700 hover:bg-sushi-600 transition-all duration-200">
            Ver Productos
          </button>
        </Link>
      </div>
    </section>
  )
}
