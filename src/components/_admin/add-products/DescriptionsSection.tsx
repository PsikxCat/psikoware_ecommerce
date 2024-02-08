import { Input, TextArea } from '@/components'

interface DescriptionSectionProps {
  register: any
  setValue: any
  watch: any
  errors: any
  isLoading: boolean
}

export default function DescriptionsSection({ register, setValue, watch, errors, isLoading }: DescriptionSectionProps) {
  return (
    <section className='w-full flex flex-col gap-3 mb-3'>
      <span className='text-xl font-semibold text-secondary'>
        Agrega la(s) descripción(es) del producto
      </span>

      {/* Inputs */}
      {watch('descriptions')?.map((_: any, index: any) => (
        <div key={index} className='flex flex-col gap-2'>
          <Input
            id={`descriptions[${index}].title`}
            label={`Título de descripción #${index + 1}`}
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />

          <TextArea
            id={`descriptions[${index}].content`}
            label={`Contenido de descripción #${index + 1}`}
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />
        </div>
      ))}

      {/* Botones Agregar/Eliminar Descripciones */}
      <div className='flex justify-around'>
        {/* Agregar */}
        <button
          type="button"
          onClick={() => {
            setValue('descriptions', [
              ...watch('descriptions'),
              { title: '', content: '' }
            ])
          }}
        >
          Agregar Descripción
        </button>

        {/* Eliminar */}
        {watch('descriptions') && watch('descriptions').length > 1 && (
          <button
            className='text-red-500'
            type="button"
            onClick={() => {
              const updatedDescriptions = [...watch('descriptions')]
              updatedDescriptions.pop()
              setValue('descriptions', updatedDescriptions)
            }}
          >
            Eliminar Descripción
          </button>
        )}
      </div>
    </section>
  )
}
