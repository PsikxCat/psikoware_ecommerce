interface FormWrapProps {
  children: React.ReactNode
  wider?: boolean
}

export default function FormWrap({ children, wider }: FormWrapProps) {
  return (
    <div className="min-h-fit h-full w-full flex_center py-4">
      <div className={`${wider ? 'max-w-[900px]' : 'max-w-[650px]'} w-full flex flex_center_column gap-6 rounded-md p-4 md:p-8`}>
        {children}
      </div>
    </div>
  )
}
