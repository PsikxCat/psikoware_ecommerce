import { CategoryInput } from '@/components'
import { type IconType } from 'react-icons'

interface CategoriesSectionProps {
  categories: Array<{ label: string, icon?: IconType | React.ReactNode }>
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export default function CategoriesSection({ categories, selectedCategory, onSelectCategory }: CategoriesSectionProps) {
  return (
    <section className='w-full flex flex-col gap-3 mb-3'>
      <span className='text-xl font-semibold text-secondary'>
        Selecciona una Categoria
      </span>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[30vh] overflow-y-auto'>
        {categories.map((item) => {
          if (item.label === 'Todos') return null

          return (
            <div key={item.label}>
              <CategoryInput
                onClick={() => { onSelectCategory(item.label) }}
                selected={selectedCategory === item.label}
                label={item.label}
                icon={item.icon as IconType}
              />
            </div>
          )
        })
        }
      </div>
    </section>
  )
}

// ! falta validar que al menos una categoria este seleccionada antes de enviar el formulario !!!!!!!!!!!
