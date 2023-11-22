interface MenuItemProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function MenuItem({ children, onClick }: MenuItemProps) {
  return (
    <div className="px-4 py-3 hover:bg-secondary rounded-md cursor-pointer transition"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
