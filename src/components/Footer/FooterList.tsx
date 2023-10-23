interface FooterListProps {
  children: React.ReactNode
}

export default function FooterList({ children }: FooterListProps) {
  return (
    <div className="w-full flex flex-col gap-2 sm:w-1/2 md:w-1/6">
      {children}
    </div>
  )
}
