import { useEffect, useRef, useState } from 'react'
import PersonalSitePage from './features/personal-site/PersonalSitePage'

function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []
    let meteors = []

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 粒子类
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 2 + 1
        this.alpha = Math.random() * 0.4 + 0.5
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // 边界检测
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(40, 122, 17, ${this.alpha})`
        ctx.fill()
      }
    }

    // 流星类
    class Meteor {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = -100
        this.vx = (Math.random() - 0.3) * 2
        this.vy = Math.random() * 2 + 1
        this.length = Math.random() * 120 + 60
        this.alpha = 0
        this.maxAlpha = Math.random() * 0.4 + 0.7
        this.fadeOut = false
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // 淡入
        if (!this.fadeOut && this.alpha < this.maxAlpha) {
          this.alpha += 0.01
        } else {
          this.fadeOut = true
        }

        // 淡出
        if (this.fadeOut) {
          this.alpha -= 0.005
        }

        // 重置
        if (this.alpha <= 0 || this.y > canvas.height + 100 || this.x > canvas.width + 100) {
          this.reset()
        }
      }

      draw() {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.vx * this.length, this.y - this.vy * this.length)
        gradient.addColorStop(0, `rgba(40, 122, 17, ${this.alpha})`)
        gradient.addColorStop(1, `rgba(40, 122, 17, 0)`)
        
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - this.vx * this.length, this.y - this.vy * this.length)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    // 初始化粒子
    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // 初始化流星
    const initMeteors = () => {
      meteors = []
      const meteorCount = 7
      for (let i = 0; i < meteorCount; i++) {
        const meteor = new Meteor()
        meteor.y = Math.random() * canvas.height
        meteors.push(meteor)
      }
    }

    // 绘制粒子连接线
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(40, 122, 17, ${0.25 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // 动画循环
    const animate = () => {
      // 清空画布
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制粒子
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // 绘制连接线
      drawConnections()

      // 更新和绘制流星
      meteors.forEach(meteor => {
        meteor.update()
        meteor.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    initParticles()
    initMeteors()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // 自定义曙光三角光标逻辑
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    // 检测是否在内容区域
    const isInContentArea = (x, y) => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return false
      const rect = mainContent.getBoundingClientRect()
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }

    // 检测是否在可交互元素上
    const isInteractiveElement = (target) => {
      return target.closest('a, button, [role="button"], input, textarea, select, .social-icons a, .portfolio-card a, .contact-form button, .avatar-img') ||
             target.closest('.portfolio-card') ||
             target.closest('.contact-form') ||
             target.closest('.social-icons') ||
             target.tagName.toLowerCase() === 'img'
    }

    // 鼠标移动
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      const target = e.target

      if (isInContentArea(mouseX, mouseY)) {
        cursor.style.opacity = '1'
        document.body.style.cursor = 'none'
        
        // 检测是否在可交互元素上
        if (isInteractiveElement(target)) {
          setIsHovering(true)
          cursor.classList.add('hover')
        } else {
          setIsHovering(false)
          cursor.classList.remove('hover')
        }
      } else {
        cursor.style.opacity = '0'
        document.body.style.cursor = 'auto'
        setIsHovering(false)
      }
    }

    // 光标跟随动画
    const animateCursor = () => {
      const dx = mouseX - cursorX
      const dy = mouseY - cursorY
      cursorX += dx * 0.15
      cursorY += dy * 0.15

      cursor.style.left = `${cursorX - 16}px`
      cursor.style.top = `${cursorY - 16}px`

      requestAnimationFrame(animateCursor)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateCursor()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* 科技感动态背景 Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[-1] bg-black"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* 曙光三角科技光标 */}
      <div
        ref={cursorRef}
        className="fixed z-[9999] pointer-events-none opacity-0"
        style={{
          width: '32px',
          height: '32px',
          transition: 'opacity 0.2s ease-out'
        }}
      >
        {/* 三角形主体 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '0',
            height: '0',




            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '24px solid rgba(40, 122, 17, 0.8)',  // 增加底部高度，延长尾部
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            filter: 'drop-shadow(0 0 4px rgba(40, 122, 17, 0.6))',
            transition: 'all 0.2s ease-out'
          }}
        />
        
        {/* 中心光点 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(40, 122, 17, 1)',
            boxShadow: '0 0 6px rgba(40, 122, 17, 0.8)',
            animation: 'cursorPulse 2s ease-in-out infinite',
            transition: 'all 0.2s ease-out'
          }}
        />
        
        {/* 柔和外光晕 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '20px',
            height: '20px',
            background: 'radial-gradient(circle, rgba(40, 122, 17, 0.15) 0%, transparent 70%)',
            animation: 'cursorGlow 3s ease-in-out infinite',
            transition: 'all 0.2s ease-out'
          }}
        />
      </div>

      {/* 光标样式 */}
      <style>{`
        @keyframes cursorPulse {
          0%, 100% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes cursorGlow {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        .hover {
          cursor: none !important;
        }

        .hover > div:nth-child(1) {
          border-bottom-color: rgba(20, 60, 10, 0.9) !important;
          transform: translate(-50%, -50%) rotate(-45deg) scale(1.2) !important;
        }

        .hover > div:nth-child(2) {
          width: 6px !important;
          height: 6px !important;
          background-color: rgba(20, 60, 10, 1) !important;
          box-shadow: 0 0 8px rgba(20, 60, 10, 1) !important;
        }

        .hover > div:nth-child(3) {
          width: 24px !important;
          height: 24px !important;
          background: radial-gradient(circle, rgba(20, 60, 10, 0.25) 0%, transparent 70%) !important;
        }

        @media (max-width: 768px) {
          .fixed.z-\\[9999\\] {
            display: none !important;
          }
        }
      `}</style>
      
      <PersonalSitePage />
    </>
  )
}

export default App