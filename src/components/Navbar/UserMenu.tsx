'use client'

import { useState, useContext } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

import { GlobalContext, type GlobalContextType } from '@/context/globalContext'
import { Avatar, MenuItem } from '@/components'

export default function UserMenu() {
  const { currentUser } = useContext(GlobalContext as React.Context<GlobalContextType>)
  const [isOpen, setIsOpen] = useState(false)

  const toogleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSignOut = async () => {
    toogleOpen()
    await signOut()
  }

  return (<>
    <div className="relative z-30 h-full flex_center">
      {/* avatar */}
      <div className='flex_center text-[12px] text-accent gap-1 rounded-full cursor-pointer transition'
        onClick={toogleOpen}
      >
        <Avatar
          src={currentUser?.image === null
            ? 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Samantha'
            : currentUser?.image }
        />
        <AiFillCaretDown />
      </div>

      {/* menu */}
      {isOpen && (
        <div className='absolute w-[200px] top-[calc(30px+2vw)] right-0 z-30 bg-dark border-b border-x border-secondary rounded-b-md py-2 px-4 shadow-md shadow-white/10 text-sm'>
          {currentUser
            ? (<>
            <Link href={'/orders'}>
              <MenuItem onClick={toogleOpen}>
                Tus Pedidos
              </MenuItem>
            </Link>

            <Link href={'/admin'}>
              <MenuItem onClick={toogleOpen}>
                Admin Dashboard
              </MenuItem>
            </Link>

            <MenuItem onClick={handleSignOut}>
              Cerrar Sesión
            </MenuItem>
          </>)
            : (<>
            <Link href={'/auth/login'}>
              <MenuItem onClick={toogleOpen}>
                Ingresa
              </MenuItem>
            </Link>

            <Link href={'/auth/register'}>
              <MenuItem onClick={toogleOpen}>
                Registrate
              </MenuItem>
            </Link>
          </>)
            }
        </div>
      )}

      {/* backdrop */}
      {isOpen
        ? <div className="z-20 fixed top-0 left-0 w-full h-full bg-black/50" onClick={toogleOpen}/>
        : null}
    </div>
  </>)
}
