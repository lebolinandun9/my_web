import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { tv } from 'tailwind-variants'

const buttonStyles = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-full border-2 px-[18px] py-[10px] text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  variants: {
    variant: {
      primary: 'border-[#246113] bg-[#1A1A1A] text-white focus-visible:ring-[#287A11]',
      ghost: 'border-transparent bg-transparent text-[#C8C8C8] hover:border-[#246113]/40',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

function Button({
  children,
  className,
  variant,
  fullWidth,
  icon: Icon,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      className={clsx(buttonStyles({ variant, fullWidth }), className)}
      {...props}
    >
      {Icon ? <Icon size={16} aria-hidden="true" /> : null}
      <span>{children}</span>
    </motion.button>
  )
}

export default Button
