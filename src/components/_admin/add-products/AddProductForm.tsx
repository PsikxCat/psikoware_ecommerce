'use client'

import { useEffect, useState } from 'react'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

// import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/categories'
import { Button, CategoriesSection, DescriptionsSection, Input, SpecificationsSection, TextArea, VariantsSection } from '@/components'
import handleImagesUpload from '@/libs/actions/handleImagesUpload'

export default function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
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
  }) // ! PENDIENTE DE REVISAR LOS VALORES POR DEFECTO

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const setCustomValue = (id: string, value: string) => {
    setValue(
      id,
      value,
      { shouldValidate: true, shouldDirty: true, shouldTouch: true }
    )
  } // ? esta funcion necesita estar aqui o se puede pasar a la seccion de categorias?

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    const updateImages: string[][] = []

    // Manejo de errores con notificaciones
    if (!data.category) {
      setIsLoading(false)
      return toast.error('Debes seleccionar una categoría')
    }
    if (!data.productVariants || data.productVariants.length === 0) {
      setIsLoading(false)
      return toast.error('Debes agregar al menos una variante del producto')
    }
    data.productVariants.forEach((variant: any, index: number) => {
      if (!variant.images || variant.images.length === 0) {
        setIsLoading(false)
        return toast.error(`La variante de producto ${index + 1} debe tener al menos una imagen`)
      }
    })

    // const handleImagesUpload = async () => {
    //   toast('Creando producto, por favor espere...', { icon: '📦' })

    //   try {
    //     for (const [index, variant] of data.productVariants.entries()) {
    //       updateImages[index] = []

    //       for (const item of variant.images) {
    //         if (item.name) {
    //           const fileName = `${variant.id}-${index}-${item.name}`
    //           const storage = getStorage(firebaseApp)
    //           const storageRef = ref(storage, `products/${data.id}/${fileName}`)
    //           const uploadTask = uploadBytesResumable(storageRef, item)

    //           // crea una nueva Promesa que se resuelve cuando la tarea de subida de imagen se completa y retorna la URL de descarga, que se almacena en el array updateImages
    //           await new Promise<void>((resolve, reject) => {
    //             uploadTask.on(
    //               'state_changed',
    //               (snapshot) => {
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //                 console.log('Upload is ' + progress + '% done')

    //                 switch (snapshot.state) {
    //                   case 'paused':
    //                     console.log('Upload is paused')
    //                     break
    //                   case 'running':
    //                     console.log('Upload is running')
    //                     break
    //                 }
    //               },
    //               (error) => {
    //                 console.error('Error subiendo imagenes', error)
    //                 toast.error('Error subiendo imagenes')
    //                 reject(error)
    //               },
    //               () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                   updateImages[index] = [...updateImages[index], downloadURL]
    //                   console.log('Imagen disponible en', downloadURL)
    //                   resolve()
    //                 }).catch((error) => {
    //                   console.error('Error obteniendo URL de descarga', error)
    //                   toast.error('Error obteniendo URL de descarga')
    //                   reject(error)
    //                 })
    //               }
    //             )
    //           })
    //         }
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error subiendo imagenes', error)
    //     // setIsLoading(false)
    //     return toast.error('Error subiendo imagenes')
    //   }
    // }
    await handleImagesUpload(data, updateImages)

    const productData = {
      ...data,
      productVariants: data.productVariants.map((variant: any, index: number) => {
        return {
          ...variant,
          images: updateImages[index]
        }
      })
    }

    console.log('productData =>', productData)

    setIsProductCreated(true)
    setIsLoading(false)

    // ! PENDIENTE DE REVISAR
    // generar un refresh en caso de todo bien
    // window.location.reload()
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

      <div className='w-full flex justify-center m-3'>
        <Button
          label={isLoading ? 'Guardando...' : 'Agregar producto'}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  )
}
