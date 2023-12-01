'use client'

import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import { GlobalContext, type GlobalContextType } from '@/context'
import { Input, Button } from '@/components'

export default function RegisterForm() {
  const { currentUser } = useContext(GlobalContext as React.Context<GlobalContextType>)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  // si hay un usuario logueado, redirecciona a la home
  useEffect(() => {
    if (currentUser) {
      router.push('/')
      router.refresh()
    }
  }, [])

  if (currentUser) {
    return (
      <div className='flex flex-col items-center justify-center gap-2'>
        <h2 className='text-accent'>Ya estás registrado</h2>
        <p>Redireccionando...</p>
      </div>
    )
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      // console.log(res)

      const json = await res.json()
      console.log(json)

      if (!json.ok) toast.error(json.message)
      else if (json.ok) {
        toast.success('Usuario registrado correctamente')
        router.push('/auth/login')
        router.refresh()
      }
    } catch (error) {
      toast.error('Error al registrar el usuario')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (provider: string) => {
    const res = await signIn(provider)
    console.log('respuesta signIn Google', res)
  }

  return (<>
    <h2 className="text-accent">Registro</h2>

    <div className='flex gap-2 max-[350px]:flex-row max-[630px]:flex-col'>
      <button className='flex items-center justify-center gap-2 bg-[#b0343b] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#c74040] z-10'
        onClick={async () => { await handleSignIn('google') }}
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
        <Link className='font-bold underline' href='/auth/login'>Inicia sesión</Link>
      </p>
    </div>
  </>)
}
