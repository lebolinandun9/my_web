import { clsx } from 'clsx'

const baseWrapper =
  'rounded-[6px] bg-[#2C2C2C] px-3 py-2 shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.3),0px_20px_25px_-5px_rgba(0,0,0,0.3)]'

function Input({
  label,
  id,
  multiline = false,
  className,
  inputClassName,
  ...props
}) {
  const shared = clsx(
    'w-full border-none bg-transparent p-0 text-sm leading-[1.4285714286] text-[#C8C8C8] placeholder:text-[#818181] focus:outline-none',
    inputClassName,
  )

  return (
    <label htmlFor={id} className={clsx('block', className)}>
      <span className="sr-only">{label}</span>
      <div className={baseWrapper}>
        {multiline ? (
          <textarea id={id} className={clsx(shared, 'min-h-28 resize-y')} {...props} />
        ) : (
          <input id={id} className={shared} {...props} />
        )}
      </div>
    </label>
  )
}

export default Input
