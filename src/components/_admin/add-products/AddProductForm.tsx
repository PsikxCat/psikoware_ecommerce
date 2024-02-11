'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'

import { categories } from '@/utils/categories'
import { Button, CategoriesSection, DescriptionSection, Input, SpecificationsSection, TextArea, VariantsSection } from '@/components'
import handleImagesUpload from '@/libs/actions/handleImagesUpload'

export default function AddProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      brand: '',
      shortDescription: '',
      category: '',
      description: [{
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

  useEffect(() => {
    if (isProductCreated) {
      reset() // irrelavante despues de redireccionar :/
      setIsProductCreated(false)
      router.push('/admin/add-products/success')
    }
  }, [isProductCreated])

  const setCustomValue = (id: string, value: string) => {
    setValue(
      id,
      value,
      { shouldValidate: true, shouldDirty: true, shouldTouch: true }
    )
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    // Manejo de errores con notificaciones
    if (!data.category) {
      setIsLoading(false)
      return toast.error('Debes seleccionar una categoría')
    }
    for (const [index, variant] of data.productVariants.entries()) {
      // cada variante debe tener al menos una imagen
      if (!variant.images || variant.images.length === 0) {
        setIsLoading(false)
        toast.error(`La variante #${index + 1} debe tener al menos una imagen`)
        return
      }
      // precio y cantidad en stock deben ser números
      if (isNaN(Number(variant.price)) || isNaN(Number(variant.inStock))) {
        setIsLoading(false)
        return toast.error(`El precio y la cantidad en stock de la variante #${index + 1} deben ser números`)
      }
      // si se ingresa un color, se debe ingresar un código de color y viceversa
      if (variant.color && !variant.colorCode) {
        setIsLoading(false)
        return toast.error(`Si se ingresa un color para la variante #${index + 1}, se debe ingresar un código de color`)
      }
      if (variant.colorCode && !variant.color) {
        setIsLoading(false)
        return toast.error(`Si se ingresa un código de color para la variante #${index + 1}, se debe ingresar un color`)
      }
      // si se ingresa un codigo de color, debe ser un color hexadecimal valido
      if (variant.colorCode && !/^#[0-9A-F]{6}$/i.test(variant.colorCode)) {
        setIsLoading(false)
        return toast.error(`El código de color para la variante #${index + 1} debe ser un color hexadecimal válido => #000000`)
      }
    }

    // Array de string[], en donde cada string[] contiene los links de las imagenes de una variante
    const updateImages: string[][] = []
    // Subir las imagenes a Firebase y obtener los links
    await handleImagesUpload(data, updateImages)
    // Si no se subieron imagenes, no continuar con el proceso
    if (updateImages[0].length === 0) {
      setIsLoading(false)
      return
    }

    // Crear la data del producto con sus variantes y los links de las imagenes de estas
    const productData = {
      ...data,
      productVariants: data.productVariants.map((variant: any, index: number) => {
        return {
          ...variant,
          images: updateImages[index]
        }
      })
    }

    // Enviar la data a la API para agregar el producto a la base de datos
    axios.post('/api/create-product', productData).then(() => {
      toast.success('Producto agregado a la base de datos con éxito')
      setIsProductCreated(true)
      setIsLoading(false)
    }).catch((error) => {
      toast.error('Hubo un error al agregar el producto a la base de datos')
      console.error('Error', error)
      setIsLoading(false)
    })
  }

  return (
    <form className='w-full z-10 flex flex-col gap-4'>
      <h2 className="text-accent text-center mb-6">Agregar producto</h2>

      {/* Datos globales del producto */}
      <section className='bg-stone-700 p-4 rounded-lg mb-4'>
        <h4 className='text-accent text-center font-bold text-lg mb-4'>Datos globales del producto</h4>

        <div className='flex flex-col gap-2'>
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
        <DescriptionSection
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

      <div className='w-full flex justify-center m-3'>
        <Button
          label={isLoading ? 'Guardando...' : 'Agregar producto'}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  )
}
