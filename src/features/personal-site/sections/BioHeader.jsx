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
        安宁薄饼
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
        每天进步一点点，成为更好的自己
      </p>
    </header>
  )
}

export default BioHeader
