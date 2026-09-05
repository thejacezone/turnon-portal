export const resourceCategories = ['CV y aplicación', 'Cartas laborales', 'Entrevistas', 'Inglés laboral', 'Vida laboral']

const make = (id, title, category, description, type = 'guía', status = 'disponible') => ({ id, title, category, description, type, status })

const baseResources = [
  make('cv-guia', 'Guía para hacer CV', 'CV y aplicación', 'Organizá tu experiencia y presentá la información que una persona reclutadora necesita encontrar.'),
  make('cv-es', 'Plantilla de CV en español', 'CV y aplicación', 'Una estructura limpia para editar con tus datos y logros.', 'plantilla'),
  make('cv-en', 'Plantilla de CV en inglés', 'CV y aplicación', 'Base práctica para presentar tu perfil en procesos bilingües.', 'plantilla'),
  make('checklist-antes-de-aplicar', 'Checklist antes de aplicar', 'CV y aplicación', 'Revisá vacante, CV, contacto y documentos antes de enviar.', 'checklist'),
  make('tell-me', 'Cómo responder “Tell me about yourself”', 'Entrevistas', 'Construí una respuesta breve, ordenada y relevante para el puesto.'),
  make('fortalezas', 'Fortalezas y habilidades en entrevista', 'Entrevistas', 'Presentá tus capacidades con ejemplos claros y conectalas con lo que necesita el puesto.'),
  { ...make('preguntas-entrevista-sin-experiencia', 'Preguntas de entrevista sin experiencia', 'Entrevistas', 'Respuestas modelo en inglés para entrevistas cuando todavía no tenés experiencia laboral formal.'), actionLabel: 'Leer artículo' },
  { ...make('preguntas-entrevista-con-experiencia', 'Preguntas de entrevista con experiencia', 'Entrevistas', 'Respuestas modelo en inglés para explicar tu experiencia, logros, errores, presión, clientes difíciles y crecimiento profesional.'), actionLabel: 'Leer artículo' },
  { ...make('caja-de-herramientas-ingles', 'Caja de herramientas para hablar inglés', 'Inglés laboral', 'Técnicas prácticas para responder, aclarar, corregirte y continuar hablando aunque no tengas inglés perfecto.'), actionLabel: 'Leer artículo' },
  make('boleta', 'Cómo leer una boleta de pago', 'Vida laboral', 'Ubicá ingresos, descuentos y total recibido en tu comprobante.', 'guía', 'proximamente'),
  make('renunciar', 'Cómo renunciar correctamente', 'Vida laboral', 'Pasos para comunicar, documentar y cerrar tu relación laboral.', 'guía', 'proximamente'),
  make('alertas', 'Señales de alerta en una oferta laboral', 'Vida laboral', 'Detectá solicitudes, promesas o condiciones que merecen una revisión adicional.', 'checklist', 'proximamente'),
  make('contrato', 'Qué revisar antes de firmar un contrato', 'Vida laboral', 'Identificá salario, horario, beneficios, funciones y condiciones importantes.', 'guía', 'proximamente'),
  make('entrevista-en', 'Guía para entrevista en inglés', 'Entrevistas', 'Frases y estructuras para comprender y responder con más seguridad.', 'guía', 'proximamente'),
  make('renuncia', 'Carta de renuncia', 'Cartas laborales', 'Modelo claro y respetuoso para comunicar tu salida.', 'plantilla', 'proximamente'),
]

const templateDownloadUrl = 'https://drive.google.com/drive/folders/11a2EwQ9WG2SHynV0hmNHSf_hli4MzbFa?usp=sharing'

const cvTemplateArticles = {
  'cv-es': {
    articleType: 'cv-template',
    introduction: 'Lo prometido es deuda. Acá tenés una plantilla de CV lista para editar y adaptar con tu información.',
    paragraphs: [
      'La estructura ya está preparada para que podás organizar tu experiencia, estudios, habilidades y datos de contacto sin comenzar desde cero.',
      'Eso sí: es una plantilla, no un CV terminado. No la llenés solo por llenar espacios. Adaptá el contenido al puesto al que querés aplicar, eliminá lo que no necesités y procurá que cada sección aporte información útil sobre vos.',
    ],
    guideParagraph: {
      before: 'Si tenés dudas sobre qué escribir, qué información quitar o cómo organizar mejor tu experiencia, revisá primero nuestra ',
      linkLabel: 'Guía para hacer tu CV',
      after: '. Ahí explicamos paso a paso cómo aprovechar esta plantilla y evitar varios de los errores más comunes.',
    },
    callout: {
      title: 'Es una plantilla, no un CV terminado.',
      text: 'Usala como punto de partida. Cambiá los textos, eliminá lo que no te sirva y adaptala al trabajo al que vas a aplicar.',
    },
    beforeSending: [
      'Reemplazá todos los textos de ejemplo.',
      'Revisá ortografía, fechas y datos de contacto.',
      'Adaptá tu experiencia al puesto.',
      'Mantené el documento claro y fácil de leer.',
      'Guardá una versión final en PDF.',
    ],
    downloadLabel: 'Descargar plantilla',
    downloadUrl: templateDownloadUrl,
    downloadEnabled: true,
    guidePath: '/recursos/cv-guia',
  },
  'cv-en': {
    articleType: 'cv-template',
    introduction: 'Lo prometido es deuda. También preparamos una plantilla para que podás construir tu CV en inglés sin tener que empezar desde una página en blanco.',
    paragraphs: [
      'Está pensada como una base sencilla para organizar tu experiencia, educación, skills y perfil profesional cuando vas a aplicar a posiciones bilingües o procesos donde te solicitan el CV en inglés.',
      'Pero recordá: esto sigue siendo una plantilla. No significa que debás mantener todas las secciones ni traducir literalmente tu CV en español. Adaptá cada parte a tu experiencia real y al tipo de trabajo que estás buscando.',
    ],
    guideParagraph: {
      before: 'Si no sabés qué información incluir, primero revisá nuestra ',
      linkLabel: 'Guía para hacer tu CV',
      after: '. La estructura y los consejos de esa guía también te sirven para preparar esta versión.',
    },
    callout: {
      title: 'Es una plantilla, no un CV terminado.',
      text: 'Adaptá cada sección a tu experiencia y evitá traducir palabra por palabra frases que no suenen naturales en inglés.',
    },
    beforeSending: [
      'Cambiá completamente los textos de ejemplo.',
      'No traduzcás frases palabra por palabra si suenan poco naturales.',
      'Utilizá términos laborales claros y sencillos.',
      'Revisá nombres de puestos, fechas y datos personales.',
      'Exportá la versión terminada en PDF.',
    ],
    downloadLabel: 'Descargar plantilla',
    downloadUrl: templateDownloadUrl,
    downloadEnabled: true,
    guidePath: '/recursos/cv-guia',
  },
}

const specializedArticles = {
  'checklist-antes-de-aplicar': {
    articleType: 'application-checklist',
  },
  'tell-me': {
    articleType: 'interview-guide',
  },
  fortalezas: {
    articleType: 'interview-guide',
  },
  'preguntas-entrevista-sin-experiencia': {
    articleType: 'interview-no-experience',
  },
  'preguntas-entrevista-con-experiencia': {
    articleType: 'interview-with-experience',
  },
  'caja-de-herramientas-ingles': {
    articleType: 'speaking-toolkit',
  },
}

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
  ...cvTemplateArticles[resource.id],
  ...specializedArticles[resource.id],
}))
