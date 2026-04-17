function AvatarHero() {
  return (
    <section className="AvatarHero">
      <img
        src="/src/assets/gougou.png" // 请替换为你的实际头像文件名
        alt="个人头像"
        className="avatar-img h-36 w-36 rounded-full border border-[#2C2C2C] bg-[#C8C8C8]/20 shadow-[0px_8px_10px_-6px_rgba(0,0,0,0.3)] object-cover md:h-44 md:w-44"
      />
    </section>
  )
}

export default AvatarHero