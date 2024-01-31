import { ShoppedItems, TotalSection } from '@/components'

export default async function PaymentSuccessPage() {
  return (
    <div className="container bg-dark">
    <section className="section">
      <section className='flex_center_column lg:w-[90%] mx-auto'>
        {/* titulo */}
        <h2 className='text-secondary px-2 w-full'>Tu pago se ha generado con exito.</h2>

        <div className='flex flex-col gap-2 w-full mt-6'>
          {/* titulos */}
          <section className='grid grid-cols-5 max-[450px]:grid-cols-3 max-[700px]:grid-cols-4 text-xs uppercase px-3 border-b border-secondary pb-1'>
            <span className='justify-self-start col-span-2 max-[450px]:col-span-1'>Producto</span>
            {/* <span className='justify-self-center'>Variante</span> */}
            <span className='justify-self-center max-[700px]:hidden'>Precio</span>
            <span className='justify-self-center'>Cantidad</span>
            <span className='justify-self-end'>Total</span>
          </section>

          {/* productos */}
          <ShoppedItems />
          {/* total */}
          <section className='flex justify-end p-4'>
            <TotalSection />
          </section>
        </div>
      </section>
    </section>
  </div>
  )
}
