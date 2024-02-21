import Image from 'next/image'
import Link from 'next/link'

import { CartCount, UserMenu } from '@/components'

export default function Navbar() {
  return (
    <section className="sticky top-0 w-full h-[calc(30px+2vw)] z-50 bg-[#050505be] shadow-md">
      <div className='container flex_center_column h-full'>
        <nav className='flex items-center justify-between w-full gap-3 md:gap-0 border-b border-b-secondary'>
          {/* logo */}
          <Link href="/">
            <Image
              className="cursor-pointer object-cover"
              style={{ width: 'auto', height: '100%' }}
              src="/images/logo.webp"
              alt="psikoware logo"
              width={200}
              height={100}
              priority
            />
          </Link>

          { /* // ! TODO search bar <================================ */ }
          <section className='max-md:hidden'>Search</section>

          <section className='flex_center gap-4 min-[400px]:gap-8 md:gap-12 pr-4 h-[calc(30px+2vw)]'>
            <CartCount />
            <UserMenu />
          </section>
        </nav>
      </div>
    </section>
  )
}
