import Image from 'next/image'
import Link from 'next/link'

import { CartCount } from '@/components'

export default function Navbar() {
  return (
    <section className="sticky top-0 w-full h-[calc(30px+2vw)] z-50 flex_center bg-[#050505be] shadow-md py-4 border-b-[1px] border-secondary">
      <div className='container flex_center'>
        <nav className='flex items-center justify-between w-full gap-3 md:gap-0'>
          {/* logo */}
          <Link href="/">
            <Image
              className="cursor-pointer object-cover"
              style={{ width: 'auto', height: '100%' }}
              src="/images/logo.webp"
              alt="Sushi Logo"
              width={200}
              height={100}
              priority
            />
          </Link>

          {/* // # to-dos... */}
          <div className='max-md:hidden'>Search</div>

          <div className='flex_center gap-8 md:gap-12 pr-4'>
            <CartCount />
            <div>UserMenu</div>
          </div>
        </nav>
      </div>
    </section>
  )
}
