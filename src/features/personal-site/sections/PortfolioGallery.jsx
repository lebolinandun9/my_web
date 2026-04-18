import { Card } from '../../../../design-system'

const works = [
  { 
    name: '洛克王国', 
    type: '个人网站重构',
    image: '/images/luoke.png', // 可选：项目截图
    link: 'https://your-portfolio-link.com' // 项目链接
  },
  { 
    name: '小猫咪', 
    type: '组件系统',
    image: '/images/maomi.PNG',
    link: 'https://your-portfolio-link.com'
  },
  { 
    name: '卡西欧手表', 
    type: '效率工具',
    image: 'images/whatch.JPG',
    link: 'https://your-portfolio-link.com'
  },
  { 
    name: '绿色小路', 
    type: '动效实验',
    image: 'images/xiaolu.JPG',
    link: 'https://your-portfolio-link.com'
  },
]

function PortfolioGallery() {
  return (
    <section className="PortfolioGallery">
      <h2 className="mb-4 text-xl font-semibold text-white">作品展示</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {works.map((work) => (
          <a 
            key={work.name} 
            href={work.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block portfolio-card" // 外层链接包裹整个卡片
          >
            <Card>
              {/* 图片区域 - 现在点击图片可跳转 */}
              {work.image ? (
                <img 
                  src={work.image} 
                  alt={work.name}
                  className="mb-3 h-28 w-full rounded-md object-cover" 
                />
              ) : (
                <div className="mb-3 h-28 rounded-md bg-[#C8C8C8]/20" />
              )}
              {/* 项目名称 - 现在点击标题可跳转 */}
              <p className="text-base font-semibold text-[#287A11]">{work.name}</p>
              <p className="mt-1 text-sm text-[#C8C8C8]">{work.type}</p>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}

export default PortfolioGallery