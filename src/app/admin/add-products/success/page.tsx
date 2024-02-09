import Link from 'next/link'

export default function AddProductSuccessPage() {
  return (
    <section className="w-full flex flex-col gap-4 h-[50vh] flex_center">
      <p className="font-bold text-xl md:text-2xl">Tu producto fue creado satisfactoriamente</p>
      <Link className='text-accent' href="/admin/add-products">Agregar otro producto</Link>
    </section>
  )
}
