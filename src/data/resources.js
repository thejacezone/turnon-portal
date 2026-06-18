export const resourceCategories = ['CV y aplicación', 'Cartas laborales', 'Entrevistas', 'Inglés laboral', 'Vida laboral']

const make = (id, title, category, description, type = 'guía', status = 'disponible') => ({ id, title, category, description, type, status, url: '#' })

export const resources = [
  make('cv-guia', 'Guía para hacer CV', 'CV y aplicación', 'Organizá tu experiencia y presentá la información que una persona reclutadora necesita encontrar.'),
  make('cv-es', 'Plantilla de CV en español', 'CV y aplicación', 'Una estructura limpia para editar con tus datos y logros.', 'plantilla'),
  make('cv-en', 'Plantilla de CV en inglés', 'CV y aplicación', 'Base práctica para presentar tu perfil en procesos bilingües.', 'plantilla'),
  make('aplicar-checklist', 'Checklist antes de aplicar', 'CV y aplicación', 'Revisá vacante, CV, contacto y documentos antes de enviar.', 'checklist'),
  make('renuncia', 'Carta de renuncia', 'Cartas laborales', 'Modelo claro y respetuoso para comunicar tu salida.', 'plantilla'),
  make('presentacion', 'Carta de presentación', 'Cartas laborales', 'Guía para conectar tu experiencia con una vacante concreta.', 'guía'),
  make('recomendacion', 'Carta de recomendación', 'Cartas laborales', 'Formato base para describir aportes y fortalezas profesionales.', 'plantilla'),
  make('constancia', 'Carta para pedir constancia laboral', 'Cartas laborales', 'Solicitud breve para gestionar tu constancia con recursos humanos.', 'plantilla'),
  make('preguntas', 'Preguntas frecuentes de entrevista', 'Entrevistas', 'Prepará ejemplos concretos para las preguntas más habituales.'),
  make('tell-me', 'Cómo responder “Tell me about yourself”', 'Entrevistas', 'Construí una respuesta breve, ordenada y relevante para el puesto.'),
  make('why-hire', 'Cómo responder “Why should we hire you?”', 'Entrevistas', 'Conectá tus capacidades con lo que el equipo necesita.'),
  make('fortalezas', 'Fortalezas y debilidades en entrevista', 'Entrevistas', 'Respondé con honestidad, contexto y evidencia de aprendizaje.'),
  make('entrevista-en', 'Guía para entrevista en inglés', 'Entrevistas', 'Frases y estructuras para comprender y responder con más seguridad.'),
  make('customer-service', 'Frases básicas para customer service', 'Inglés laboral', 'Expresiones útiles para saludar, aclarar y resolver solicitudes.'),
  make('call-center', 'Vocabulario de call center', 'Inglés laboral', 'Términos frecuentes en llamadas, métricas, procesos y soporte.'),
  make('training', 'Frases para training', 'Inglés laboral', 'Cómo pedir repetición, confirmar instrucciones y tomar participación.'),
  make('emails', 'Correos básicos en inglés', 'Inglés laboral', 'Estructuras breves para solicitudes, seguimiento y confirmaciones.', 'guía', 'proximamente'),
  make('pedir-ayuda', 'Frases para pedir ayuda en el trabajo', 'Inglés laboral', 'Pedí contexto o apoyo con claridad y profesionalismo.'),
  make('contrato', 'Qué revisar antes de firmar contrato', 'Vida laboral', 'Identificá salario, horario, beneficios, funciones y condiciones importantes.'),
  make('boleta', 'Cómo leer una boleta de pago', 'Vida laboral', 'Ubicá ingresos, descuentos y total recibido en tu comprobante.'),
  make('descuentos', 'ISSS, AFP y renta básico', 'Vida laboral', 'Introducción orientativa a descuentos laborales frecuentes.', 'artículo'),
  make('renunciar', 'Cómo renunciar correctamente', 'Vida laboral', 'Pasos para comunicar, documentar y cerrar tu relación laboral.'),
  make('alertas', 'Señales de alerta en una oferta laboral', 'Vida laboral', 'Detectá solicitudes, promesas o condiciones que merecen una revisión adicional.', 'checklist'),
]
