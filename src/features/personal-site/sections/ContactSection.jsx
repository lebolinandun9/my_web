import { useState } from 'react';
import { Button, Input } from '../../../../design-system';
import { EnvelopeSimple } from 'phosphor-react';

function ContactSection() {
  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // 提交状态管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('contact-', '')]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证表单数据
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('请填写所有必填字段');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 这里使用 EmailJS 发送邮件
      // 注意：你需要在 emailjs.com 注册账户并配置服务
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_zfervpr', // 需要在emailjs配置
          template_id: 'template_4beipb7', // 需要在emailjs配置
          user_id: 'BEMxZIYUCNTBYqjzv', // 需要在emailjs配置
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'xxxxxx@qq.com' // 你的QQ邮箱
          }
        })
      });

      if (response.ok) {
        setSubmitMessage('消息已发送，感谢留言');
        // 清空表单
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('邮件发送失败');
      }
    } catch (error) {
      setSubmitMessage('发送失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
      // 3秒后清除提示信息
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  return (
    <section className="ContactSection">
      <h2 className="mb-4 text-xl font-semibold text-white">与我联系</h2>
      <form className="contact-form space-y-3" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <Input 
            id="contact-name" 
            label="姓名" 
            placeholder="姓名" 
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="name"
          />
        </div>
        <div className="input-wrapper">
          <Input 
            id="contact-email" 
            label="邮箱号" 
            placeholder="邮箱号" 
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div className="input-wrapper">
          <Input 
            id="contact-message" 
            label="邮件详情" 
            multiline 
            placeholder="邮件详情" 
            value={formData.message}
            onChange={handleInputChange}
            autoComplete="off"
          />
        </div>
        <Button 
          type="submit" 
          icon={EnvelopeSimple}
          className="cursor-pointer hover:scale-[1.02] hover:brightness-110 transition-all duration-200 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? '发送中...' : '发送邮件'}
        </Button>
        
        {/* 提交状态提示 */}
        {submitMessage && (
          <div className={`mt-3 text-center ${submitMessage.includes('失败') ? 'text-red-500' : 'text-green-500'}`}>
            {submitMessage}
          </div>
        )}
      </form>
      
      <style jsx>{`
        .input-wrapper input:-webkit-autofill,
        .input-wrapper input:-webkit-autofill:hover,
        .input-wrapper input:-webkit-autofill:focus,
        .input-wrapper input:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
          -webkit-text-fill-color: #C8C8C8 !important;
          -webkit-box-shadow: 0 0 0 1000px #2C2C2C inset !important;
          box-shadow: 0 0 0 1000px #2C2C2C inset !important;
          border: 1px solid #2C2C2C !important;
        }
        
        .input-wrapper textarea:-webkit-autofill,
        .input-wrapper textarea:-webkit-autofill:hover,
        .input-wrapper textarea:-webkit-autofill:focus,
        .input-wrapper textarea:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
          -webkit-text-fill-color: #C8C8C8 !important;
          -webkit-box-shadow: 0 0 0 1000px #2C2C2C inset !important;
          box-shadow: 0 0 0 1000px #2C2C2C inset !important;
          border: 1px solid #2C2C2C !important;
        }
      `}</style>
    </section>
  );
}

export default ContactSection