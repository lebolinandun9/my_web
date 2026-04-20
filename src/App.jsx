import { useEffect, useRef, useState } from 'react'
import PersonalSitePage from './features/personal-site/PersonalSitePage'

function App() {
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)

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

    let cursorX = 0
    let cursorY = 0
    let lastHoverState = false
    let lastInputState = false

    // 检测是否在内容区域
    const isInContentArea = (x, y) => {
      const mainContent = document.querySelector('main')
      if (!mainContent) return false
      const rect = mainContent.getBoundingClientRect()
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }

    // 检测是否在输入框上（最高优先级检测）
    const isInputElement = (target) => {
      const tagName = target.tagName.toLowerCase()
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return true
      }
      if (target.closest('input, textarea, select')) {
        return true
      }
      if (target.closest('.contact-form input, .contact-form textarea, input[type="text"], input[type="email"], input[type="tel"], textarea')) {
        return true
      }
      return false
    }

    // 检测是否在可交互元素上（排除输入框）
    const isInteractiveElement = (target) => {
      const tagName = target.tagName.toLowerCase()
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
        return false
      }
      return target.closest('a, button, [role="button"], .social-icons a, .portfolio-card a, .avatar-img') ||
             target.closest('.portfolio-card') ||
             target.closest('.social-icons') ||
             tagName === 'img'
    }

    // 鼠标移动 - 无节流，即时响应
    const handleMouseMove = (e) => {
      mouseXRef.current = e.clientX
      mouseYRef.current = e.clientY
      const target = e.target

      if (isInContentArea(mouseXRef.current, mouseYRef.current)) {
        // 最高优先级：检测是否在输入框上
        if (isInputElement(target)) {
          if (!lastInputState) {
            cursor.style.opacity = '0'
            document.body.style.cursor = 'text'
            lastInputState = true
            lastHoverState = false
          }
        } else {
          if (lastInputState) {
            cursor.style.opacity = '1'
            lastInputState = false
          }
          
          cursor.style.opacity = '1'
          document.body.style.cursor = 'none'
          
          // 检测是否在可交互元素上
          const isHover = isInteractiveElement(target)
          if (isHover !== lastHoverState) {
            if (isHover) {
              cursor.classList.add('hover')
            } else {
              cursor.classList.remove('hover')
            }
            lastHoverState = isHover
            setIsHovering(isHover)
          }
        }
      } else {
        if (lastHoverState || lastInputState) {
          cursor.style.opacity = '0'
          document.body.style.cursor = 'auto'
          lastHoverState = false
          lastInputState = false
          setIsHovering(false)
        }
      }
    }

    // 光标跟随动画 - 提高跟随速度
    const animateCursor = () => {
      const dx = mouseXRef.current - cursorX
      const dy = mouseYRef.current - cursorY
      cursorX += dx * 0.25
      cursorY += dy * 0.25

      cursor.style.left = `${cursorX - 16}px`
      cursor.style.top = `${cursorY - 16}px`

      requestAnimationFrame(animateCursor)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animateCursor()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // 处理输入框焦点事件
  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || 
          e.target.tagName.toLowerCase() === 'textarea' ||
          e.target.tagName.toLowerCase() === 'select') {
        setIsInputFocused(true)
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0'
        }
        document.body.style.cursor = 'text'
      }
    }

    const handleBlur = (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || 
          e.target.tagName.toLowerCase() === 'textarea' ||
          e.target.tagName.toLowerCase() === 'select') {
        setIsInputFocused(false)
        const mainContent = document.querySelector('main')
        if (mainContent) {
          const rect = mainContent.getBoundingClientRect()
          if (rect.left <= mouseXRef.current && mouseXRef.current <= rect.right && 
              rect.top <= mouseYRef.current && mouseYRef.current <= rect.bottom) {
            cursorRef.current.style.opacity = '1'
            document.body.style.cursor = 'none'
          }
        }
      }
    }

    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
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
          transition: 'opacity 0.05s ease-out'
        }}
      >
        {/* 三角主体 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '0',
            height: '0',
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: '14px solid rgba(40, 122, 17, 0.9)',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            filter: 'drop-shadow(0 0 4px rgba(40, 122, 17, 0.6))',
            transition: 'all 0.06s ease-out'
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
            transition: 'all 0.06s ease-out'
          }}
        />
      </div>

      {/* 光标样式 */}
      <style>{`
        /* 输入框全局最高优先级例外规则 - 始终使用原生光标 */
        input,
        textarea,
        select {
          cursor: text !important;
        }
        
        input:focus,
        textarea:focus,
        select:focus {
          cursor: text !important;
        }

        /* 确保内容区域其他元素隐藏系统光标 */
        main *:not(input):not(textarea):not(select) {
          cursor: none !important;
        }

        .hover {
          cursor: none !important;
        }

        .hover > div:first-child {
          border-left-width: 10px !important;
          border-right-width: 10px !important;
          border-bottom-width: 18px !important;
          border-bottom-color: rgba(60, 180, 25, 1) !important;
          transform: translate(-50%, -50%) rotate(-45deg) scale(1.2) !important;
          filter: drop-shadow(0 0 6px rgba(60, 180, 25, 0.8)) !important;
          transition: all 0.05s ease-out !important;
        }

        .hover > div:nth-child(2) {
          width: 6px !important;
          height: 6px !important;
          background-color: rgba(60, 180, 25, 1) !important;
          box-shadow: 0 0 10px rgba(60, 180, 25, 1) !important;
          transition: all 0.05s ease-out !important;
        }
        
        /* 输入框选中样式 - 移除默认模糊外框 */
        input:focus,
        textarea:focus,
        select:focus {
          outline: none !important;
          outline-offset: 0 !important;
          box-shadow: none !important;
        }
        
        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        textarea:focus {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #000 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        
        input:-webkit-autofill {
          -webkit-transition: background-color 5000s ease-in-out 0s;
          transition: background-color 5000s ease-in-out 0s;
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