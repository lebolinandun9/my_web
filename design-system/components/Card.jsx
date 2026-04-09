import { clsx } from 'clsx'

function Card({ title, description, className, children }) {
  return (
    <section className={clsx('rounded-md bg-[#1A1A1A] p-6 text-left text-[#C8C8C8]', className)}>
      {title ? (
        <h3 className="mb-2 text-xl font-bold leading-tight tracking-[-0.02em] text-[#287A11]">{title}</h3>
      ) : null}
      {description ? <p className="mb-4 text-base leading-6">{description}</p> : null}
      {children}
    </section>
  )
}

export default Card
