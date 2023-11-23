'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import { Input, Button } from '@/components'

export default function LoginForm() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    try {
      setIsLoading(true)

      signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      }).then((callback) => {
        if (callback?.error) toast.error(callback?.error)
        else if (callback?.ok) {
          toast.success('Inicio de sesión correcto')

          pathname === '/auth/login'
            ? router.push('/')
            : router.refresh()
        }
      }).catch((error) => {
        console.error(error)
        toast.error('Error al iniciar sesión')
      }).finally(() => {
        setIsLoading(false)
      })
    } catch (error) {
      toast.error('Error al iniciar sesión')
      console.error(error)
    }
  }

  return (<>
    <h2 className="text-accent">Inicio de sesión</h2>

    <div className='flex gap-2 max-[350px]:flex-row max-[630px]:flex-col'>
      <button className='flex items-center justify-center gap-2 bg-[#b0343b] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#c74040]'
        // onClick={() => handleSignIn('google')}
      >
        <AiFillGoogleCircle size={24} /> <span className='max-[350px]:hidden'>Inicia sesión con Google</span>
      </button>

      <button className='flex items-center justify-center gap-2 bg-[#333] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#555]'
        // onClick={() => handleSignIn('github')}
      >
        <AiFillGithub size={24} /> <span className='max-[350px]:hidden'>Inicia sesión con Github</span>
      </button>
    </div>

    <hr className="bg-slate-300 w-full h-px" />

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

    <div className='w-full flex justify-between max-[630px]:flex-col gap-2 mt-2'>
      <Button
        accent
        label={!isLoading ? 'Ingresa' : 'Cargando'}
        onClick={handleSubmit(onSubmit)}
      />

      <p className='text-sm text-muted'>
        ¿No estás registrado? &nbsp;
        <Link className='font-bold underline' href='/auth/register'>Registrate</Link>
      </p>
    </div>
  </>)
}
