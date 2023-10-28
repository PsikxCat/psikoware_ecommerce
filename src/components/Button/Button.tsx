'use client'

import type { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  disabled?: boolean
  outlined?: boolean
  small?: boolean
  customClass?: string
  icon?: IconType
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({ label, disabled, outlined, small, customClass, icon: Icon, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:opacity-70 disabled:cursor-not-allowed mt-6 rounded-md text-stone-800 brightness-90 hover:brightness-100 transition-all duration-200 w-full max-w-[300px] flex_center gap-2
        ${outlined ? 'bg-accent border border-stone-950' : 'bg-secondary'}
        ${small ? 'py-1 px-2 text-sm font-light' : 'py-3 px-4 font-bold text-[clamp(12px,0.5rem_+_1vw,1.5rem)]'}
        ${customClass ?? ''}
      `}
    >
      {Icon ? <Icon size={24} /> : null}
      {label}
    </button>
  )
}
