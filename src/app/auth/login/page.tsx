import { FormWrap, LoginForm } from '@/components'

export default function LoginPage() {
  return (
    <div className="container bgdark">
      <section className="section flex_center">
        <FormWrap>
          <LoginForm />
        </FormWrap>
      </section>
    </div>
  )
}
