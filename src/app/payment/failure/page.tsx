import Link from 'next/link'

export default function PaymentFailurePage() {
  return (
    <section className="section">
      <section className='flex_center_column lg:w-[90%] mx-auto'>
        {/* titulo */}
        <h2 className='text-red-600 text-center px-2 w-full'>Ocurrio un problema con el pago</h2>

        {/* mensaje */}
        <p className='text-center mt-6 text-xl'>
          Parece que tenemos problemas al gestionar tu pago,&nbsp;
          <Link href='/cart' className='text-accent'>intenta de nuevo</Link>
          &nbsp;o&nbsp;
          <Link href='#' className='text-accent'>comunicate con nosotros</Link>
          .
        </p>

      </section>
    </section>
  )
}
