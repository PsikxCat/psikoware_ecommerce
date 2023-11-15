'use client'

import { type FieldErrors, type FieldValues, type UseFormRegister } from 'react-hook-form'

interface InputProps {
  id: string
  label: string
  type?: string // number, text, email, password, etc.
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}

export default function Input(
  { id, label, type = 'text', disabled = false, required = false, register, errors }: InputProps
) {
  return (
    <div className='w-full relative z-10'>
      <input className={`peer w-full p-4 pt-6 outline-none bg-stone-800 font-light border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-red-700' : 'border-muted'} ${errors[id] ? 'focus:border-red-700' : 'focus:border-accent'}`}
        id={id}
        type={type}
        disabled={disabled}
        autoComplete='off'
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
