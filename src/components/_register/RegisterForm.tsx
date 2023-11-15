'use client'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'

import { Input, Button } from '@/components'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    console.log(data)
    setIsLoading(false)
  }

  return (<>
    <h2 className="text-accent">Registro</h2>

    <div className='flex gap-2 max-[350px]:flex-row max-[630px]:flex-col'>
    <button className='flex items-center justify-center gap-2 bg-[#b0343b] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#c74040] z-10'
      // onClick={() => handleSignIn('google')}
    >
      <AiFillGoogleCircle size={24} /> <span className='max-[350px]:hidden'>Registrate con Google</span>
    </button>

    <button className='flex items-center justify-center gap-2 bg-[#333] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#555] z-10'
      // onClick={() => handleSignIn('github')}
    >
      <AiFillGithub size={24} /> <span className='max-[350px]:hidden'>Registrate con Github</span>
    </button>
  </div>

    <hr className="bg-slate-300 w-full h-px" />

    <Input
      id="name"
      label="Nombre"
      type="text"
      required
      disabled={isLoading}
      register={register}
      errors={errors}
    />

    <Input
      id="email"
      label="Correo"
      type="text"
      required
      disabled={isLoading}
      register={register}
      errors={errors}
    />

    <Input
      id="password"
      label="Contraseña"
      type="password"
      required
      disabled={isLoading}
      register={register}
      errors={errors}
    />

    <hr className="bg-slate-300 w-full h-px" />

    <div className='w-full flex justify-between max-[630px]:flex-col gap-2 mt-2 z-10'>
      <Button
        accent
        label={!isLoading ? 'Registrarse' : 'Cargando'}
        onClick={handleSubmit(onSubmit)}
      />

      <p className='text-sm text-muted'>
        ¿Estás registrado? &nbsp;
        <Link className='font-bold underline' href='/login'>Inicia sesión</Link>
      </p>
    </div>
  </>)
}
