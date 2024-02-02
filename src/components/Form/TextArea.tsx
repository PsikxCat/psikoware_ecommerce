'use client'

import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextAreaProps {
  id: string
  label: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

export default function TextArea(
  { id, label, disabled = false, required = false, register, errors }: TextAreaProps
) {
  return (
    <div className='w-full relative z-10'>
      <textarea className={`peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none bg-stone-800 font-light border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-red-700' : 'border-muted'} ${errors[id] ? 'focus:border-red-700' : 'focus:border-accent'}`}
        id={id}
        disabled={disabled}
        placeholder=''
        {...register(id, { required })}
      />

      <label className={`absolute cursor-text text-md transition duration-200 transform -translate-y-3 top-5 left-4 z-20 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-red-700' : 'text-secondary'}`}
        htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
