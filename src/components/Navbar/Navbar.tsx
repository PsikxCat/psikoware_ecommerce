import Link from 'next/link'

export default function Navbar() {
  return (
    <section className="sticky top-0 w-full z-50 flex_center bg-stone-500 shadow-md py-4 border-b-[1px]">
      <div className='container flex_center bg-green-500/20'>
        <nav className='flex items-center justify-between w-full gap-3 md:gap-0 bg-red-600/20'>
          {/* // # pendiente logo  <-------------------- */}
          <Link href="/">
            logo
          </Link>

          <div className='max-md:hidden'>Search</div>

          <div className='flex_center gap-8 md:gap-12'>
            <div>CartCount</div>
            <div>UserMenu</div>
          </div>
        </nav>
      </div>
    </section>
  )
}
