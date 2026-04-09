import { GithubLogo, LinkedinLogo } from 'phosphor-react'
import { SiX } from 'react-icons/si'

const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: GithubLogo },
  { label: 'X', href: 'https://x.com/', icon: SiX },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: LinkedinLogo },
]

function SocialStrip() {
  return (
    <section className="SocialStrip">
      <ul className="social-icons flex flex-wrap items-center justify-center gap-2">
        {socials.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-[#2C2C2C] bg-[#1A1A1A] px-4 py-2 text-sm text-[#C8C8C8] transition hover:border-[#246113]"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon size={16} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SocialStrip
