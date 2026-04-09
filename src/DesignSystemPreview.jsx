import { motion } from 'framer-motion'
import { EnvelopeSimple, GithubLogo, MapPinLine } from 'phosphor-react'
import { SiBilibili, SiX, SiZhihu } from 'react-icons/si'
import { Button, Card, Input, colors, spacing, typography, useMediaQuery } from '../design-system'

const contactLinks = [
  { icon: MapPinLine, text: 'Victoria, BC, Canada' },
  { icon: EnvelopeSimple, text: 'reachout@timbaker.me' },
  { icon: GithubLogo, text: 'tbakerx' },
]

const socialLinks = [
  { icon: SiX, text: 'TimBakerx' },
  { icon: SiZhihu, text: 'tbakerx' },
  { icon: SiBilibili, text: 'tbakerx' },
]

function PreviewBlock({ children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] p-6"
    >
      {children}
    </motion.section>
  )
}

export default function DesignSystemPreview() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-8 text-[#C8C8C8] md:px-8">
      <div className="mx-auto flex w-full max-w-[1214px] flex-col gap-6">
        <PreviewBlock>
          <h1 className="mb-2 text-[30px] font-extrabold leading-[1.2] tracking-[-0.025em] text-[#287A11]">
            Design System Preview
          </h1>
          <p className="text-base leading-6 text-[#C8C8C8]">
            基于 Figma 稿抽取了颜色、排版、阴影、圆角和核心组件，用于页面快速搭建。
          </p>
        </PreviewBlock>

        <div className="grid gap-6 md:grid-cols-2">
          <PreviewBlock delay={0.05}>
            <h2 className="mb-4 text-xl font-semibold text-white">Core Components</h2>
            <div className="space-y-4">
              <Input id="name" label="Name" placeholder="Name" />
              <Input id="email" label="Email" placeholder="Email" />
              <Input id="message" label="Message" multiline placeholder="Message" />
              <Button icon={EnvelopeSimple}>Send Message</Button>
            </div>
          </PreviewBlock>

          <PreviewBlock delay={0.1}>
            <h2 className="mb-4 text-xl font-semibold text-white">Contact Card</h2>
            <Card
              title="Get in touch"
              description="Have a project for me? Any questions about something I have built? I would love to hear from you."
            >
              <ul className="space-y-2">
                {contactLinks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 text-base">
                    <Icon size={18} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </PreviewBlock>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <PreviewBlock delay={0.15}>
            <h2 className="mb-4 text-xl font-semibold text-white">Social</h2>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ icon: Icon, text }) => (
                <Button key={text} variant="ghost" icon={Icon}>
                  {text}
                </Button>
              ))}
            </div>
          </PreviewBlock>

          <PreviewBlock delay={0.2}>
            <h2 className="mb-4 text-xl font-semibold text-white">Tokens Snapshot</h2>
            <pre className="overflow-auto rounded-md bg-[#111111] p-4 text-xs leading-5 text-[#C8C8C8]">
{JSON.stringify(
  {
    colors: {
      primary: colors.brand.primary,
      base: colors.surface.base,
      mutedText: colors.surface.textMuted,
    },
    spacing: {
      sm: spacing[2],
      md: spacing[4],
      lg: spacing[6],
    },
    typography: {
      h2: typography.heading.h2,
      body: typography.body.md,
      button: typography.button.md,
    },
    layout: { mode: isDesktop ? 'desktop' : 'mobile' },
  },
  null,
  2,
)}
            </pre>
          </PreviewBlock>
        </div>
      </div>
    </main>
  )
}
