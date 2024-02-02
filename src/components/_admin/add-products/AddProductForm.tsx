'use client'

import { useState } from 'react'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'

import { CategoryInput, Input, TextArea } from '@/components'
import { categories } from '@/utils/categories'

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      // necesito un id explicito o el de mongo me vale?
      name: '',
      brand: '',
      category: '',
      shortDescription: '',
      descriptionTitle: '',
      descriptionContent: '',
      specificationsGroup: '',
      specificationsTitle: '',
      specificationsContent: '',
      productVariantId: '',
      productVariantPrice: '',
      productVariantInStock: '',
      productVariantQuantity: '',
      productVariantColor: '',
      productVariantColorCode: '',
      productVariantCapacity: '',
      productVariantImages: []
    }
  })

  return (
    <>
      <h2 className="text-accent">Agregar producto</h2>

      <Input
        id='name'
        label="Nombre del producto"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='brand'
        label="Marca"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <section className='w-full font-medium border'>
        <span className='mb-2 font-semibold'>
          Selecciona una Categoria
        </span>

        <div className='grid grid-cols-2 md:grid-cols-3 max-h-[30vh] overflow-y-auto'>
          {categories.map((category, index) => {
            if (category.label === 'Todos') return null

            return (
              <div key={category.label}>
                {category.label}
              </div>
            )
          })
          }
        </div>
      </section>

      <TextArea
        id='shortDescription'
        label="Descripción corta"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='descriptionTitle'
        label="Título de descripción"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <TextArea
        id='descriptionContent'
        label="Contenido de descripción"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='specificationsGroup'
        label="Grupo de especificaciones"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='specificationsTitle'
        label="Título de especificaciones"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <TextArea
        id='specificationsContent'
        label="Contenido de especificaciones"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantId'
        label="ID de variante"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantPrice'
        label="Precio de variante"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantInStock'
        label="En stock"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantQuantity'
        label="Cantidad"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantColor'
        label="Color"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantColorCode'
        label="Código de color"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantCapacity'
        label="Capacidad"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id='productVariantImages'
        label="Imágenes"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

    </>
  )
}
