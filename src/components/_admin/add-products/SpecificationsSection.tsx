import { Input, TextArea } from '@/components'

interface SpecificationsSectionProps {
  register: any
  setValue: any
  watch: any
  errors: any
  isLoading: boolean
}
export default function SpecificationsSection({
  register, setValue, watch, errors, isLoading
}: SpecificationsSectionProps) {
  return (
    <section className='w-full flex flex-col gap-3 mb-3'>
      <span className='text-xl font-semibold text-secondary'>
        Agrega la(s) especificacion(es) del producto
      </span>

      {/* Inputs Grupo */}
      {watch('specifications')?.map((specGroup: any, groupIndex: any) => (
        <div key={groupIndex} className='flex flex-col gap-2'>
          <Input
            id={`specifications[${groupIndex}].group`}
            label={`Grupo de Especificaciones #${groupIndex + 1}`}
            required
            disabled={isLoading}
            register={register}
            errors={errors}
          />
          {/* Inputs Especificaciones */}
          {specGroup.content.map((specTyp: any, typeIndex: any) => (
            <div key={typeIndex} className='flex flex-col gap-2'>
              <Input
                id={`specifications[${groupIndex}].content[${typeIndex}].title`}
                label={`Título de Especificación #${typeIndex + 1}`}
                required
                disabled={isLoading}
                register={register}
                errors={errors}
              />

              <TextArea
                id={`specifications[${groupIndex}].content[${typeIndex}].details`}
                label={`Detalles de Especificación #${typeIndex + 1}`}
                required
                disabled={isLoading}
                register={register}
                errors={errors}
              />
            </div>
          ))}

          {/* Botones Agregar/Eliminar Especificaciones */}
          <div className='flex justify-around items-center mb-2'>
            <button
              type="button"
              onClick={() => {
                const updatedSpecs = [...watch('specifications')]
                updatedSpecs[groupIndex].content.push({ title: '', details: '' })
                setValue('specifications', updatedSpecs)
              }}
            >
              Agregar Especificación
            </button>

            {watch('specifications') && watch('specifications')[groupIndex].content.length > 1 && (
              <button
                className='text-red-500'
                type="button"
                onClick={() => {
                  const updatedSpecs = [...watch('specifications')]
                  updatedSpecs[groupIndex].content.pop()
                  setValue('specifications', updatedSpecs)
                }}
              >
                Eliminar Especificación
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Botones Agregar/Eliminar Grupo */}
      <div className='flex justify-around items-center mb-2'>
        <button
          type="button"
          onClick={() => {
            setValue('specifications', [
              ...watch('specifications'),
              { group: '', content: [{ title: '', details: '' }] }
            ])
          }}
        >
          Agregar Grupo de Especificaciones
        </button>

        {watch('specifications') && watch('specifications').length > 1 && (
          <button
            className='text-red-500'
            type="button"
            onClick={() => {
              const updatedDescriptions = [...watch('specifications')]
              updatedDescriptions.pop()
              setValue('specifications', updatedDescriptions)
            }}
          >
            Eliminar Grupo de Especificaciones
          </button>
        )}
      </div>
    </section>
  )
}
