import { Card } from '../../../../design-system'

const timeline = [
  {
    period: '2024 - 至今',
    title: '前端开发工程师',
    detail: '负责设计系统落地、组件库建设与核心页面性能优化。',
  },
  {
    period: '2022 - 2024',
    title: 'UI 工程师',
    detail: '跨设计与开发协作，建立从 Figma 到代码的标准化流程。',
  },
  {
    period: '2019 - 2022',
    title: '独立开发者',
    detail: '完成多个个人作品并持续迭代视觉与交互体验。',
  },
]

function ResumeTimeline() {
  return (
    <section className="ResumeTimeline">
      <h2 className="mb-4 text-xl font-semibold text-white">Resume Timeline</h2>
      <ul className="timeline space-y-3">
        {timeline.map((item) => (
          <li key={item.period} className="timeline-item">
            <Card>
              <p className="text-sm text-[#818181]">{item.period}</p>
              <p className="mt-1 text-base font-semibold text-[#287A11]">{item.title}</p>
              <p className="mt-2 text-sm text-[#C8C8C8]">{item.detail}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ResumeTimeline
