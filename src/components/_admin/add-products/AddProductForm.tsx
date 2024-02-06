'use client'

import { useState } from 'react'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'

import { Button, CategoriesSection, DescriptionsSection, Input, SpecificationsSection, TextArea, VariantsSection } from '@/components'
import { categories } from '@/utils/categories'

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register, handleSubmit, setValue, watch, reset, formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      descriptions: [{
        title: '',
        content: ''
      }],
      specifications: [{
        group: '',
        content: [{
          title: '',
          details: ''
        }]
      }],
      productVariants: [{
        id: '',
        price: '',
        inStock: '',
        quantity: '',
        color: '',
        colorCode: '',
        capacity: '',
        images: []
      }]
    }
  })

  const setCustomValue = (id: string, value: string) => {
    setValue(
      id,
      value,
      { shouldValidate: true, shouldDirty: true, shouldTouch: true }
    )
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)
    // almacena en db
    console.log(data)
    setIsLoading(false)
  }

  return (
    <form className='w-full z-10 flex flex-col gap-4'>
      <h2 className="text-accent text-center mb-6">Agregar producto</h2>

      {/* Datos globales del producto */}
      <section className='bg-stone-700 p-4 rounded-lg mb-4'>
        <h4 className='text-accent text-center font-bold text-lg mb-4'>Datos globales del producto</h4>

        <div className='flex flex-col gap-2'>
          <Input
            id='id'
            label="ID general"
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
        </div>

        <hr className='my-6' />

        {/* Categorias */}
        <CategoriesSection
          categories={categories}
          selectedCategory={watch('category')}
          onSelectCategory={(category) => { setCustomValue('category', category) }}
        />

        <hr className='my-6' />

        {/* Descripciones */}
        <DescriptionsSection
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isLoading={isLoading}
        />

        <hr className='my-6' />

        {/* Especificaciones */}
        <SpecificationsSection
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isLoading={isLoading}
        />
      </section>

      {/* Datos de variantes del producto */}
      <section className='bg-stone-700 p-4 rounded-lg flex flex-col gap-2'>
        <VariantsSection
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          isLoading={isLoading}
        />
      </section>

      <Button
        label={isLoading ? 'Guardando...' : 'Agregar producto'}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  )
}
