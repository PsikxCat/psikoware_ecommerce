interface NullDataProps {
  title: string
}

export default function NullData({ title }: NullDataProps) {
  return (
    <section className="w-full h-[50vh] flex_center text-xl md:text-2xl">
      <p className="font-medium">{title}</p>
    </section>
  )
}
