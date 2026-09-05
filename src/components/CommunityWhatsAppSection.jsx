import { communityWhatsAppUrl } from '../data/communityLinks.js'

const communityFeathers = [1, 2, 3, 4]

export default function CommunityWhatsAppSection() {
  return (
    <section className="community-whatsapp-section page-section" aria-labelledby="community-whatsapp-title">
      {communityFeathers.map((featherNumber) => (
        <img
          className={`community-whatsapp-feather community-whatsapp-feather--${featherNumber}`}
          src={`/assets/feathers/feather${featherNumber}.png`}
          alt=""
          aria-hidden="true"
          key={featherNumber}
        />
      ))}

      <div className="community-whatsapp-content">
        <span className="community-whatsapp-eyebrow">Comunidad TurnOn</span>
        <h2 className="community-whatsapp-title" id="community-whatsapp-title">Practicá speaking con más personas</h2>
        <p className="community-whatsapp-description">
          Podés estudiar grammar, vocabulary, reading y listening por tu cuenta. Pero la forma más real de mejorar tu speaking es hablando con otras personas, equivocándote, repitiendo y ganando confianza poco a poco.
        </p>
        <p className="community-whatsapp-note">
          Grupo pensado para practicar inglés laboral, entrevistas, vocabulario de trabajo y conversación básica sin presión.
        </p>
        <a
          className="community-whatsapp-button"
          href={communityWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Unirme al grupo de práctica de inglés de TurnOn en WhatsApp"
        >
          Quiero estar en el grupo
        </a>
      </div>

      <div className="community-whatsapp-visual">
        <img
          className="community-whatsapp-character"
          src="/assets/characters/madtogo-joven.png"
          alt="MadTogo, personaje guía de TurnOn"
        />
      </div>
    </section>
  )
}
