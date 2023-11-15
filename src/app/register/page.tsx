import { FormWrap, RegisterForm } from '@/components'

export default function RegisterPage() {
  return (
    <div className="container bgdark">
      <section className="section flex_center">
        <FormWrap>
          <RegisterForm />
        </FormWrap>
      </section>
    </div>
  )
}

// server component que obtendra los datos del usuario
