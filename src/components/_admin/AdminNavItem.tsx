import { type IconType } from 'react-icons'

interface AdminNavItemProps {
  selected?: boolean
  icon: IconType
  label: string
}

export default function AdminNavItem({ selected, icon: Icon, label }: AdminNavItemProps) {
  return (
    <div className={`flex_center gap-1 p-2 border-b-2 hover:text-dark transition cursor-pointer
      ${selected ? 'border-dark text-dark' : 'border-transparent text-stone-700'}`}>
        <Icon size={20} />

        <span className={`text-sm text-center break-normal ${selected ? 'font-bold' : 'font-medium'}`}>
          {label}
        </span>
    </div>
  )
}
