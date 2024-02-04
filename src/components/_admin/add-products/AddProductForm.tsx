'use client'

import { useState } from 'react'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'

import { CategoriesSection, CategoryInput, DescriptionsSection, Input, SpecificationsSection, TextArea } from '@/components'
import { categories } from '@/utils/categories'

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      brand: '',
      category: '',
      shortDescription: '',
      descriptions: [{ title: '', content: '' }],
      specifications: [{ group: '', types: [{ type: '', details: '' }] }],
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

  const setCustomValue = (id: string, value: string) => {
    setValue(
      id,
      value,
      { shouldValidate: true, shouldDirty: true, shouldTouch: true }
    )
  }

  return (
    <>
      <h2 className="text-accent">Agregar producto a base de datos</h2>

      <Input
        id='id'
        label="ID general del producto"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

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

      <TextArea
        id='shortDescription'
        label="Descripción corta"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      {/* Categorias */}
      {/* <section className='w-full flex flex-col gap-3 mb-3'>
        <span className='text-xl font-semibold text-secondary'>
          Selecciona una Categoria
        </span>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[30vh] overflow-y-auto'>
          {categories.map((item) => {
            if (item.label === 'Todos') return null

            return (
              <div key={item.label}>
                <CategoryInput
                  onClick={(category) => { setCustomValue('category', category) }}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            )
          })
          }
        </div>
      </section> */}
      <CategoriesSection
        categories={categories}
        selectedCategory={watch('category')}
        onSelectCategory={(category) => { setCustomValue('category', category) }}
      />

      {/* Descripciones */}
      <DescriptionsSection
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
        isLoading={isLoading}
      />

      {/* Especificaciones */}
      <SpecificationsSection
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
        isLoading={isLoading}
      />

      <h2 className="text-accent">Variantes de producto</h2>

      <Input
        id='productVariantId'
        label="ID de variante"
        required
        disabled={isLoading}
        register={register}
        errors={errors} />

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
        label="Cantidad en stock"
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
