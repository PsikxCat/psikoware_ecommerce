'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

import type { ProductType, OrderType, ReviewType } from '@/types'
import { GlobalContext, type GlobalContextType } from '@/context/globalContext'
import { Rating } from '@mui/material'
import { Button, TextArea } from '@/components'
// import { createReview } from '@/libs/actions/updateDataFromDB'

interface AddReviewProps {
  product: ProductType
}

interface SafeUser {
  id: string
  name: string
  email: string
  emailVerified: string | null
  image: string | null
  createdAt: string
  updatedAt: string
  role: string
  orders: OrderType[]
}

export default function AddReview({ product }: AddReviewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { currentUser } = useContext(GlobalContext as React.Context<GlobalContextType>)
  const safeUser = currentUser as SafeUser

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0
    }
  })

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
  }

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true)

    if (data.rating === 0) {
      setIsLoading(false)
      return toast.error('Debes calificar el producto.')
    }
    if (!data.comment.trim()) {
      setIsLoading(false)
      return toast.error('Debes escribir un comentario.')
    }

    const reviewData: ReviewType = {
      comment: data.comment,
      rating: data.rating,
      productId: product.id,
      userId: currentUser!.id
    }

    /** Uso de la función createReview. // ! Que es mejor, funciones o API routes?
    try {
      const reviewCreated = await createReview(reviewData)
      if (reviewCreated.ok) toast.success(reviewCreated.message)
      else { toast.error(reviewCreated.message) }
    } catch (error) {
      console.error('Error', error)
      return toast.error('Ocurrió un error al enviar la reseña.')
    } finally {
      setIsLoading(false)
    }
     */

    axios.post('/api/create-review', reviewData).then((res) => {
      if (res.data.ok) {
        toast.success('Reseña creada, gracias por tu opinión.')
        router.refresh()
      } else {
        toast.error(res.data.message)
      }
    }).catch((error) => {
      toast.error('Hubo un error al enviar la reseña.')
      console.error('Error', error)
    }).finally(() => {
      reset()
      setIsLoading(false)
    })
  }

  // order.products contiene las variantes de productos compradas
  const isProductPurchased = () =>
    safeUser.orders.some(order => order.products.some((pVarOrder) => product.productVariants.some((pVar) => {
      return pVar.id === pVarOrder.id
    }))) && safeUser.orders.some(order => order.status === 'approved' && order.deliveryStatus === 'completed') // refactorizar este mierdero

  const productPurchased = safeUser && isProductPurchased()
  const alreadyReviewed = safeUser && product.reviews.some(review => review.userId === safeUser.id)

  return (<>
    {!safeUser && <h4 className='text-muted py-8 m-auto'>Inicia sesión para dejar una reseña.</h4>}

    {productPurchased && !alreadyReviewed && (
      <section className='flex_center_column gap-2 p-4 my-2 max-w-[500px] border rounded-md bg-stone-700'>
        <h2 className='m-0'>Califica este producto</h2>

        <Rating className='p-2 rounded-md bg-stone-600' onChange={(_, newValue) => {
          setCustomValue('rating', newValue)
        }}/>

        <TextArea
          id='comment'
          label='Comentario'
          register={register}
          errors={errors}
          required
        />

        <Button
          label={isLoading ? 'Enviando...' : 'Enviar'}
          onClick={handleSubmit(onSubmit)}
        />
      </section>
    )}

  </>)
}
