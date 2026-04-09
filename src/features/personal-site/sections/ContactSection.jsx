import { Button, Input } from '../../../../design-system'
import { EnvelopeSimple } from 'phosphor-react'

function ContactSection() {
  return (
    <section className="ContactSection">
      <h2 className="mb-4 text-xl font-semibold text-white">Contact</h2>
      <form className="contact-form space-y-3">
        <Input id="contact-name" label="Name" placeholder="Name" />
        <Input id="contact-email" label="Email" placeholder="Email" />
        <Input id="contact-message" label="Message" multiline placeholder="Message" />
        <Button type="submit" icon={EnvelopeSimple}>
          Send Message
        </Button>
      </form>
    </section>
  )
}

export default ContactSection
