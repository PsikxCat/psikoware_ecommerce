import { UserCart } from '@/components'
// min-h-[calc(80svh_-_calc(30px+2vw))]
export default function CartPage() {
  return (
    <div className="container bg-dark">
      <section className="section">
        <UserCart />
      </section>
    </div>
  )
}
