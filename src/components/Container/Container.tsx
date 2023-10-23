interface ContainerProps {
  children: React.ReactNode
}
export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-3xl px-2 md:px-4 xl:px-20">
      {children}
    </div>
  )
}
