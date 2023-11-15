interface FormWrapProps {
  children: React.ReactNode
}

export default function FormWrap({ children }: FormWrapProps) {
  return (
    <div className="min-h-fit h-full w-full flex_center py-4">
      <div className="max-w-[650px] w-full flex flex_center_column gap-6 rounded-md p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}
