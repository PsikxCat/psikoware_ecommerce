'use client'

import React, { useState } from 'react'

import { type ProductType } from '@/types'
import { ReviewList } from '@/components'

interface TabsProps {
  product: ProductType
}

export default function Tabs({ product }: TabsProps) {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <section className='bg-stone-900 rounded-md p-2 w-full md:w-[80%] max-w-[1400px] z-10'>
      {/* pestanas */}
      <div className=' flex gap-2 md:gap-5 bg-stone-950 rounded-t-md border border-stone-700 p-3 text-[clamp(13px,2px_+_2vw,18px)]'>
        <h3 className={`uppercase cursor-pointer ml-2 ${activeTab === 'description' ? 'text-accent font-bold' : 'text-muted'}`}
          onClick={() => { setActiveTab('description') }}>detalles</h3>

        <h3 className={`uppercase cursor-pointer ${activeTab === 'specifications' ? 'text-accent font-bold' : 'text-muted'}`}
          onClick={() => { setActiveTab('specifications') }}>especificaciones</h3>

        <h3 className={`uppercase cursor-pointer ${activeTab === 'reviews' ? 'text-accent font-bold' : 'text-muted'}`}
          onClick={() => { setActiveTab('reviews') }}>reseñas</h3>
      </div>

      {/* contenido */}
      <div className='flex_center_column border-b border-x border-stone-700 rounded-b-md w-full gap-5'>
        {/* detalles */}
        {activeTab === 'description' && (
          <div className='flex flex-col gap-5 w-full px-[5%] pb-4 pt-6'>
            {product.description.map((item: { title: string, content: string }) => (
              <div key={item.title}>
                <h3 className='text-secondary font-bold text-xl'>{item.title}</h3>
                <p className='text-muted text-base p-2'>
                  {item.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* especificaciones */}
        {activeTab === 'specifications' && (
          <div className='flex_center_column gap-5 w-full'>
            {product.specifications.map((item: { group: string, content: Array<{ title: string, details: string }> }) => (
              <div key={item.group} className='flex_center_column w-full gap-5 md:px-4 mb-4 pt-6'>
                {/* titulo grupo */}
                <div className='border-b border-secondary w-[90%] flex_center'>
                  <h3 className='text-secondary place-items-start font-bold text-xl'>{item.group}</h3>
                </div>

                {/* contenido grupo */}
                {item.content.map((item) => (
                  <div key={item.title} className='flex flex-col md:flex-row w-full mb-3 overflow-hidden'>
                    {/* titulo */}
                    <h4 className='text-primary font-bold text-lg md:w-[35%] px-[9%] leading-[20px]'>
                      {item.title}
                    </h4>
                    {/* contenido */}
                    <p className='text-muted text-base md:w-[65%] px-[9%]'>
                      {item.details.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* reviews */}
        {activeTab === 'reviews' && (
          <div className='flex flex-col justify-start w-full gap-4 p-4'>
            <ReviewList product={product} />
          </div>
        )}
      </div>
    </section>
  )
}
