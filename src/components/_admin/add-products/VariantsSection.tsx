import { Input } from '@/components'
import ImageInput from './ImageInput'

interface VariantsSectionProps {
  register: any
  setValue: any
  watch: any
  errors: any
  isLoading: boolean
}

export default function VariantsSection({ register, setValue, watch, errors, isLoading }: VariantsSectionProps) {
  const onImagesSelected = (index: number, images: File[]) => {
    setValue(
      `productVariants[${index}].images`,
      images,
      { shouldValidate: true, shouldDirty: true, shouldTouch: true }
    )
  }

  return (
    <section className='w-full flex flex-col gap-3 mb-3'>
      <h4 className="text-accent text-center font-bold text-lg mb-2">Datos de variante(s) del producto</h4>

      {/* Inputs */}
      {watch('productVariants')?.map((_: any, index: any) => (
        <div key={index} className='flex flex-col gap-2'>
          <Input
            id={`productVariants[${index}].price`}
            label={`Precio de variante #${index + 1}`}
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <Input
            id={`productVariants[${index}].inStock`}
            label={`Cantidad en stock de variante #${index + 1}`}
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <Input
            id={`productVariants[${index}].color`}
            label="Color"
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <Input
            id={`productVariants[${index}].colorCode`}
            label="Código de color"
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <Input
            id={`productVariants[${index}].capacity`}
            label="Capacidad"
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          {/* Imágenes */}
          <ImageInput
            onImagesSelected={(images: File[]) => { onImagesSelected(index, images) }}
            existingImages={watch(`productVariants[${index}].images`)}
            variantIndex={index}
            disabled={isLoading}
          />

          <hr className='mt-6 mb-4' />
        </div>
      ))}

      {/* Botones Agregar/Eliminar Variantes */}
      <div className='flex justify-around'>
      <button
        type="button"
        onClick={() => {
          setValue('productVariants', [
            ...watch('productVariants'),
            { id: '', price: '', inStock: '' }
          ])
        }}
      >
        Agregar Variante
      </button>

      {watch('productVariants') && watch('productVariants').length > 1 && (
        <button
          type="button"
          className='text-red-500'
          onClick={() => {
            const updatedVariants = [...watch('productVariants')]
            updatedVariants.pop()
            setValue('productVariants', updatedVariants)
          }}
        >
          Eliminar Variante
        </button>
      )}
      </div>
    </section>
  )
}
