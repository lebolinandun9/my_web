import { Card } from '../../../../design-system'

const timeline = [
  {
    period: '2020.9 - 2024.3',
    title: '重庆右邮电大学就读，本科',
    detail: '学习软件工程通用课程，如数据库，数据结构等',
  },
  {
    period: '2024.4 - 2024.6',
    title: '深圳智岩科技有限公司',
    detail: '智能氛围照明app测试',
  },
  {
    period: '2024.4 - 至今',
    title: '深圳市新凯来科技有限公司',
    detail: 'LT设备软件测试',
  },
]

function ResumeTimeline() {
  return (
    <section className="ResumeTimeline">
      <h2 className="mb-4 text-xl font-semibold text-white">时间线</h2>
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
