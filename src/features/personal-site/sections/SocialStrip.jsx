import { GithubLogo, LinkedinLogo } from 'phosphor-react';
import { SiX } from 'react-icons/si';

// 小红书文字图标，采用与现有图标一致的线性风格
function XiaohongshuIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <text x="12" y="15" fontSize="8" fontWeight="500" textAnchor="middle" fill="currentColor" fontFamily="Arial, sans-serif">
        小红书
      </text>
    </svg>
  );
}

const socials = [
  { label: 'GitHub', href: 'https://github.com/lebolinandun9', icon: GithubLogo }, // 保持原有的 GitHub 链接
  { label: '小红书', href: 'https://xhslink.com/m/4CbCdIfUUCA', icon: XiaohongshuIcon }, // 已更新为小红书链接和图标
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: LinkedinLogo },
];

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