import { type IconType } from 'react-icons'
import Link from 'next/link'

interface CategoryProps {
  label: string
  icon: IconType
  selected?: boolean
  onClick?: () => void
}

export default function Category({ label, icon: Icon, selected, onClick }: CategoryProps) {
  return (
    <Link
      href={`/products?category=${label}`}
      className={`flex_center text-center gap-1 p-4 transition duration-150 cursor-pointer rounded-t-md max-[1200px]:rounded-b-md
      ${selected ? 'bg-secondary text-dark' : 'text-secondary hover:text-accent'}`}
      onClick={onClick}
    >
      <Icon size={20} />
      <h4 className='text-md'>{label}</h4>
    </Link>
  )
}
