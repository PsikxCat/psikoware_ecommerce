'use client'

import { useState, type ReactNode } from 'react'

import { ReviewList } from '@/components'

interface TabsProps {
  product: any // ! TODO: define product type with Prisma
}

export default function Tabs({ product }: TabsProps) {
  const [activeTab, setActiveTab] = useState('description')

  // Se toma una cadena de texto con saltos de linea (\n) y se renderiza cada parrafo en un <p>
  const renderContentWithLineBreaks = (content: string): ReactNode[] =>
    content.split('\n').map((paragraph: string, index: number) => (
      <p key={index} className='mb-3'>
        {paragraph}
      </p>
    ))

  return (
    <section className='bg-stone-900 rounded-md p-2 w-full md:w-[80%] max-w-[1400px] z-10'>
      {/* pestanas */}
      <div className=' flex gap-2 md:gap-5 bg-stone-950 rounded-t-md border border-stone-700 p-3 text-[clamp(13px,2px_+_2vw,18px)]'>
        {/* detalles */}
        <h3
          className={`uppercase cursor-pointer ml-2 ${activeTab === 'description' ? 'text-accent font-bold' : 'text-muted'}`}
          onClick={() => { setActiveTab('description') }}
        >
          detalles
        </h3>
        {/* especificaciones */}
        <h3
          className={`uppercase cursor-pointer ${activeTab === 'specifications' ? 'text-accent font-bold' : 'text-muted'}`}
          onClick={() => { setActiveTab('specifications') }}
        >
          especificaciones
        </h3>
        {/* reviews */}
        <h3
          className={`uppercase cursor-pointer ${activeTab === 'reviews' ? 'text-accent font-bold' : 'text-muted'}`}
          onClick={() => { setActiveTab('reviews') }}
        >
          reviews
        </h3>

      </div>

      {/* contenido */}
      <div className='flex_center_column border-b border-x border-stone-700 rounded-b-md w-full gap-5'>
        {/* detalles */}
        {activeTab === 'description' && (
          <div className='flex_center_column gap-5 px-[5%] pb-4 pt-6'>
            {product.description.map((item: { title: string, content: string }) => (
              <div key={item.title}>
                <h3 className='text-secondary font-bold text-xl'>{item.title}</h3>
                <p className='text-muted text-base p-2'>{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* especificaciones */}
        {activeTab === 'specifications' && (
          <div className='flex_center_column gap-5'>
            {product.specifications.map((item: { group: string, items: Array<{ title: string, content: string }> }) => (
              <div key={item.group} className='flex_center_column gap-5 md:px-4 pb-4 pt-6'>
                <h3 className='text-secondary place-items-start font-bold text-xl border-b'>{item.group}</h3>

                {item.items.map((item) => (
                  <div key={item.title} className='flex flex-col md:flex-row w-full mb-3 overflow-hidden'>
                    <h4 className='text-primary font-bold text-lg md:w-[30%] px-[9%]'>{item.title}</h4>
                    <div className='text-muted text-base md:w-[70%] px-[9%]'>
                      {renderContentWithLineBreaks(item.content)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* reviews */}
        {activeTab === 'reviews' && (
          <div className='flex flex-col justify-start w-full gap-4 p-4'>
            {/* // ! pendiente seccion de agregar review */ }
            {/* <div className='bg-red-600/30'>add review | PENDIENTE solo habilitado si usuario ha comprado producto</div> */}

            <ReviewList product={product} />
          </div>
        )}
      </div>
    </section>
  )
}
