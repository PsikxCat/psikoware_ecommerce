import { type IconType } from 'react-icons'

interface CategoryInputProps {
  selected?: boolean
  label: string
  icon: IconType
  onClick: (label: string) => void
}

export default function CategoryInput({ selected, label, icon: Icon, onClick }: CategoryInputProps) {
  return (
    <div onClick={() => { onClick(label) }} className={`rounded-xl border-2 p-4 flex_center_column gap-2 hover:border-slate-500 transition cursor-pointer ${selected ? 'border-slate-500' : 'border-e-slate-200'} `}>
      <Icon size={30} />
      <span className='font-medium'>{label}</span>
    </div>
  )
}
