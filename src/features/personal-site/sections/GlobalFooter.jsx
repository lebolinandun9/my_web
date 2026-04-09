function GlobalFooter() {
  return (
    <footer className="GlobalFooter border-t border-[#2C2C2C] pt-6 text-center text-sm text-[#818181]">
      <p>© {new Date().getFullYear()} Lin. All rights reserved.</p>
      <p className="footer-meta mt-1">备案信息：粤 ICP 备 2026000000 号（示例）</p>
    </footer>
  )
}

export default GlobalFooter
