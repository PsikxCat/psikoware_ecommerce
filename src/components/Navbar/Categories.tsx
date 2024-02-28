'use client'

import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

import { categories } from '@/utils/categories'
import { Category } from '@/components'

interface CategoriesProps {
  category: string
}

export default function Categories({ category }: CategoriesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <section className='container fixed top-[calc(30px+2vw)] bg-[#050505be] z-40 h-[55px]'>
      {/* navbar >1200px */}
      <nav className="flex_center flex-row text-muted overflow-x-auto uppercase font-bold max-[1200px]:hidden">
        {categories.map((item) => (
          <Category
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={ category === item.label || (!category && item.label === 'Todos') }
          />
        ))}
      </nav>

      {/* navbar desplegable <1200px */}
      <button onClick={() => { setIsOpen((prev) => !prev) }}
        className='flex items-center uppercase font-bold transition duration-150 cursor-pointer text-secondary hover:text-accent'
      >
        Categorias
        {isOpen ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
      </button>

      {isOpen && (
        <nav className="absolute z-50 top-[55px] flex_center flex-col py-4 text-muted gap-6 uppercase font-bold min-[1200px]:hidden">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={ category === item.label || (!category && item.label === 'Todos') }
              onClick={() => { setIsOpen(false) }}
            />
          ))}
        </nav>
      )}

      {isOpen
        ? <div className="z-20 fixed top-[calc(30px+2vw+55px)] left-0 w-full h-full bg-black/70 min-[1200px]:hidden" onClick={() => { setIsOpen(false) }}/>
        : null}
    </section>
  )
}
