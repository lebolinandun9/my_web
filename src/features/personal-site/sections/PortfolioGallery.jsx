import { Card } from '../../../../design-system'

const works = [
  { name: 'Portfolio V3', type: '个人网站重构' },
  { name: 'UI Kit Pro', type: '组件系统' },
  { name: 'FocusBoard', type: '效率工具' },
  { name: 'Motion Notes', type: '动效实验' },
]

function PortfolioGallery() {
  return (
    <section className="PortfolioGallery">
      <h2 className="mb-4 text-xl font-semibold text-white">Portfolio Gallery</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {works.map((work) => (
          <article key={work.name} className="portfolio-card">
            <Card>
              <div className="mb-3 h-28 rounded-md bg-[#C8C8C8]/20" />
              <p className="text-base font-semibold text-[#287A11]">{work.name}</p>
              <p className="mt-1 text-sm text-[#C8C8C8]">{work.type}</p>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PortfolioGallery
