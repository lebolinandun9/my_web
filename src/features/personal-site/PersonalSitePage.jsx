import { motion } from 'framer-motion'
import { colors, spacing } from '../../../design-system'
import AvatarHero from './sections/AvatarHero'
import BioHeader from './sections/BioHeader'
import SocialStrip from './sections/SocialStrip'
import ResumeTimeline from './sections/ResumeTimeline'
import PortfolioGallery from './sections/PortfolioGallery'
import ContactSection from './sections/ContactSection'
import GlobalFooter from './sections/GlobalFooter'
import './personal-site.css'

function SectionContainer({ children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-xl border border-[#2C2C2C] bg-[#1A1A1A] p-6"
    >
      {children}
    </motion.section>
  )
}

function PersonalSitePage() {
  return (
    <main
      className="mx-auto min-h-screen w-full max-w-[980px] px-4 py-8 md:px-6"
      style={{ backgroundColor: '#111111', color: colors.surface.textMuted }}
    >
      <div className="space-y-4 md:space-y-5" style={{ gap: spacing[4] }}>
        <SectionContainer>
          <AvatarHero />
          <BioHeader />
          <div className="mt-5">
            <SocialStrip />
          </div>
        </SectionContainer>

        <SectionContainer delay={0.05}>
          <ResumeTimeline />
        </SectionContainer>

        <SectionContainer delay={0.1}>
          <PortfolioGallery />
        </SectionContainer>

        <SectionContainer delay={0.15}>
          <ContactSection />
        </SectionContainer>

        <GlobalFooter />
      </div>
    </main>
  )
}

export default PersonalSitePage
