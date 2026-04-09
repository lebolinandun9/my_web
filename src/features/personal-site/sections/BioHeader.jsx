import { typography } from '../../../../design-system'

function BioHeader() {
  return (
    <header className="BioHeader text-center">
      <h1
        className="display-name text-[#287A11]"
        style={{
          fontFamily: typography.heading.h2.fontFamily,
          fontSize: typography.heading.h2.fontSize,
          fontWeight: typography.heading.h2.fontWeight,
          lineHeight: typography.heading.h2.lineHeight,
          letterSpacing: typography.heading.h2.letterSpacing,
        }}
      >
        Lin
      </h1>
      <p
        className="tagline mt-3 text-[#C8C8C8]"
        style={{
          fontFamily: typography.body.md.fontFamily,
          fontSize: typography.body.md.fontSize,
          fontWeight: typography.body.md.fontWeight,
          lineHeight: typography.body.md.lineHeight,
        }}
      >
        设计驱动的前端开发者，专注简洁、可靠、可复用的产品体验。
      </p>
    </header>
  )
}

export default BioHeader
