'use client'

import { categories } from '@/utils/categories'
import { Category } from '@/components'

interface CategoriesProps {
  category: string
}

export default function Categories({ category }: CategoriesProps) {
  return (
    <section className='container'>
      <div className="flex_center flex-row text-muted overflow-x-auto uppercase font-bold">
        {categories.map((item) => (
          <Category
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={ category === item.label || (!category && item.label === 'Todos') }
          />
        ))}
      </div>
    </section>
  )
}
