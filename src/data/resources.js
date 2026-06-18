export const resourceCategories = ['CV y aplicación', 'Cartas laborales', 'Entrevistas', 'Inglés laboral', 'Vida laboral']

const make = (id, title, category, description, type = 'guía', status = 'disponible') => ({ id, title, category, description, type, status, url: '#' })

const baseResources = [
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

const detailedContent = {
  'cv-guia': {
    content: 'Un CV es un resumen estratégico de tu experiencia, formación y capacidades. Su trabajo no es contar toda tu vida: debe ayudar a una persona reclutadora a entender rápido qué podés aportar.',
    sections: [
      { title: 'Estructura recomendada', items: ['Encabezado con nombre y contacto', 'Perfil profesional breve', 'Experiencia laboral en orden reciente', 'Estudios y formación', 'Habilidades, idiomas y herramientas'] },
      { title: 'Datos personales', items: ['Nombre completo', 'Teléfono y correo profesional', 'Ciudad o zona de residencia', 'LinkedIn si está actualizado'] },
      { title: 'Experiencia laboral', items: ['Puesto, empresa y fechas', 'Funciones principales', 'Resultados concretos cuando sea posible'] },
      { title: 'Estudios, habilidades e idiomas', items: ['Incluí estudios relevantes y cursos útiles', 'Separá habilidades técnicas de habilidades interpersonales', 'Indicá el nivel real de cada idioma'] },
      { title: 'Primer empleo', items: ['Usá proyectos, voluntariado, prácticas o actividades académicas', 'Describí responsabilidades y resultados, no sólo títulos'] },
    ],
    commonErrors: ['Usar un correo poco profesional', 'Incluir información irrelevante o demasiado texto', 'Copiar funciones sin explicar resultados', 'Inventar niveles de inglés o habilidades'],
    recommendation: 'Adaptá el CV a cada vacante y revisalo en PDF antes de enviarlo. Una página clara suele ser suficiente para perfiles iniciales.',
  },
  'cv-es': {
    content: 'Usá esta estructura como punto de partida y reemplazá cada bloque con información concreta y verificable.',
    sections: [{ title: 'Nombre completo', items: ['Teléfono · correo · ciudad · LinkedIn'] }, { title: 'Perfil profesional', items: ['Dos o tres líneas sobre experiencia, fortalezas y objetivo'] }, { title: 'Experiencia', items: ['Puesto — Empresa — Fechas', 'Responsabilidades y resultados'] }, { title: 'Educación', items: ['Título o formación — Institución — Año'] }, { title: 'Habilidades', items: ['Herramientas, servicio al cliente, comunicación u otras capacidades relevantes'] }, { title: 'Idiomas', items: ['Idioma y nivel real'] }, { title: 'Referencias', items: ['Disponibles a solicitud o datos autorizados por la referencia'] }],
    commonErrors: ['Dejar textos de ejemplo sin reemplazar', 'Usar diseños difíciles de leer', 'Agregar referencias sin autorización'],
    recommendation: 'Guardá una versión editable y exportá una copia PDF con un nombre claro: Nombre_Apellido_CV.pdf.',
  },
  'cv-en': {
    content: 'Esta estructura en inglés prioriza claridad, verbos de acción y resultados. Evitá traducir literalmente expresiones que no suenan naturales.',
    sections: [{ title: 'Full Name', items: ['Phone · professional email · location · LinkedIn'] }, { title: 'Professional Summary', items: ['Two or three lines about experience, strengths and goals'] }, { title: 'Work Experience', items: ['Job Title — Company — Dates', 'Action verbs, responsibilities and results'] }, { title: 'Education', items: ['Degree or training — Institution — Year'] }, { title: 'Skills', items: ['Tools, customer service and role-specific skills'] }, { title: 'Languages', items: ['Language and honest proficiency level'] }, { title: 'References', items: ['References available upon request'] }],
    commonErrors: ['Using literal translations', 'Mixing past and present verb forms', 'Writing long paragraphs instead of concise bullets'],
    recommendation: 'Ask someone with strong English to review grammar and consistency before applying.',
  },
  renuncia: {
    content: 'Una carta de renuncia deja constancia formal de tu decisión. Usala cuando necesités comunicar tu salida de forma clara y profesional.',
    sections: [{ title: 'Estructura', items: ['Lugar y fecha', 'Nombre de la empresa o responsable', 'Declaración de renuncia y fecha efectiva', 'Agradecimiento breve', 'Nombre y firma'] }, { title: 'Ejemplo breve', items: ['Por este medio presento mi renuncia al puesto de [puesto], efectiva a partir del [fecha]. Agradezco la oportunidad y quedo disponible para entregar mis pendientes de manera ordenada.'] }, { title: 'Tono recomendado', items: ['Directo, respetuoso y sin acusaciones', 'No es necesario explicar detalles personales'] }],
    commonErrors: ['Renunciar sólo por mensaje informal', 'Usar la carta para discutir conflictos', 'No guardar una copia recibida'],
    recommendation: 'Confirmá el proceso interno y pedí constancia de recepción de tu carta.',
  },
  preguntas: {
    content: 'Preparar respuestas no significa memorizarlas. Elegí ejemplos reales y practicá cómo explicarlos de forma breve.',
    sections: [{ title: 'Preguntas frecuentes', items: ['Tell me about yourself.', 'Why should we hire you?', 'What are your strengths?', 'What are your weaknesses?', 'Why do you want this job?', 'Describe your previous experience.'] }, { title: 'Cómo practicar', items: ['Prepará ejemplos con situación, acción y resultado', 'Grabate y revisá claridad, duración y muletillas', 'Adaptá cada respuesta al puesto'] }],
    commonErrors: ['Responder sin ejemplos', 'Hablar demasiado tiempo', 'Criticar empleos anteriores', 'Usar respuestas genéricas copiadas'],
    recommendation: 'Practicá en voz alta y mantené cada respuesta principal entre 45 y 90 segundos.',
  },
  'tell-me': {
    content: 'Una respuesta simple puede seguir tres pasos: quién sos profesionalmente, qué experiencia o habilidades aportás y por qué te interesa el puesto.',
    sections: [{ title: 'Estructura simple', items: ['Presente: perfil y fortaleza principal', 'Pasado: experiencia o preparación relevante', 'Futuro: conexión con la oportunidad'] }, { title: 'Ejemplo en inglés', items: ["I’m a customer service professional with two years of experience assisting clients. I’ve developed strong communication and problem-solving skills, and I’m interested in this role because I want to grow in a bilingual team."] }, { title: 'Con experiencia', items: ['Mencioná el área, años relevantes, un logro y el siguiente paso que buscás'] }, { title: 'Primer empleo', items: ['Usá estudios, proyectos, voluntariado, inglés y disposición para aprender'] }],
    commonErrors: ['Contar información personal irrelevante', 'Repetir todo el CV', 'No conectar la respuesta con la vacante'],
    recommendation: 'Prepará una versión de 60 segundos y otra más corta para entrevistas telefónicas.',
  },
  'why-hire': {
    content: 'La respuesta debe unir tres cosas: lo que el puesto necesita, evidencia de que podés hacerlo y la actitud con la que vas a contribuir.',
    sections: [{ title: 'Estructura recomendada', items: ['Nombrá dos capacidades relevantes', 'Respaldalas con un ejemplo', 'Cerrá mostrando interés por aportar y aprender'] }, { title: 'Ejemplo en inglés', items: ["You should hire me because I communicate clearly, learn processes quickly and stay calm when solving problems. In my previous role, I handled customer requests and followed up until each case was resolved."] }, { title: 'Versión customer service', items: ['Destacá escucha, empatía, documentación, resolución y seguimiento'] }],
    commonErrors: ['Decir sólo “porque necesito el trabajo”', 'Prometer habilidades que no podés demostrar', 'Compararte negativamente con otras personas'],
    recommendation: 'Usá palabras de la vacante y prepará una evidencia breve para cada fortaleza.',
  },
  'customer-service': {
    content: 'Estas frases sirven como base. El tono, la escucha y la claridad importan tanto como pronunciar cada palabra perfectamente.',
    sections: [{ title: 'Abrir y comprender', items: ['Thank you for calling.', 'How can I help you today?', 'Could you please tell me more about the issue?'] }, { title: 'Revisar y mostrar empatía', items: ['Let me check that for you.', 'I understand your concern.', 'Please allow me a moment.'] }, { title: 'Cerrar', items: ['Is there anything else I can help you with?', 'Thank you for your patience.', 'Have a great day.'] }],
    commonErrors: ['Interrumpir al cliente', 'Usar frases amables sin resolver el problema', 'Prometer algo fuera del proceso'],
    recommendation: 'Practicá las frases en voz alta y adaptalas al proceso real de la cuenta donde trabajés.',
  },
  renunciar: {
    content: 'Renunciar correctamente protege tu reputación profesional y facilita recibir documentos o referencias después.',
    sections: [{ title: 'Pasos recomendados', items: ['Avisá con el tiempo indicado por contrato o política', 'Mantené un tono profesional', 'Entregá pendientes, accesos y equipo', 'Pedí constancia laboral si aplica', 'Guardá copias de comunicaciones y documentos'] }, { title: 'Cierre profesional', items: ['Acordá quién recibirá tus tareas', 'Confirmá último día y pagos pendientes', 'Evitá discusiones innecesarias'] }],
    commonErrors: ['Dejar de presentarse sin informar', 'Publicar conflictos en redes', 'No devolver equipo', 'Firmar documentos sin leerlos'],
    recommendation: 'Si existe un conflicto laboral sensible, buscá orientación oficial antes de firmar acuerdos o renuncias.',
  },
}

export const resources = baseResources.map((resource) => ({
  ...resource,
  content: detailedContent[resource.id]?.content || `${resource.description} Este recurso tendrá una versión ampliada en una actualización próxima.`,
  sections: detailedContent[resource.id]?.sections || [{ title: 'Resumen', items: [resource.description] }],
  commonErrors: detailedContent[resource.id]?.commonErrors || [],
  recommendation: detailedContent[resource.id]?.recommendation || 'Revisá este material junto con los requisitos específicos de tu situación o vacante.',
}))
