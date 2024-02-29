'use client'

import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { type FieldValues, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import type { ProductType, OrderType, ReviewType } from '@/types'
import { GlobalContext, type GlobalContextType } from '@/context/globalContext'
import { Rating } from '@mui/material'
import { Button, TextArea } from '@/components'
import { createReview } from '@/libs/actions/updateDataFromDB'

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

    const reviewData: ReviewType = {
      comment: data.comment,
      rating: data.rating,
      productId: product.id,
      userId: currentUser!.id
    }

    const reviewCreated = await createReview(reviewData)
    if (reviewCreated.ok) toast.success(reviewCreated.message)
    else { toast.error(reviewCreated.message) }

    reset()
    router.refresh()
    setIsLoading(false)
  }

  const isProductPurchased = () =>
    safeUser.orders.some(order => order.products.some(prod => product.productVariants.some((pvar) => pvar.id === prod.id)))

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
