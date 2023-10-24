interface FooterListProps {
  children: React.ReactNode
}

export default function FooterList({ children }: FooterListProps) {
  return (
    <div className="w-full flex flex-col gap-2 min-[350px]:w-[80%] md:w-[15%]">
      {children}
    </div>
  )
}
