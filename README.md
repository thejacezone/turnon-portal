# turnon-portal — FASE 3.5

Portal web estático de TurnOn. La FASE 3.5 incluye General English Level Test, Work English Test, Grammar, Vocabulary, Reading, Listening, Writing y Typing como módulos separados.

## Ubicación

`C:\Users\jason\Documents\Codex\turnon-portal`

## Documentos fuente

Ruta actual de documentos y recursos:

`C:\Users\jason\OneDrive\Desktop\recursos para turn on`

La carpeta fue verificada el 11 de julio de 2026. Vocabulary y Typing se importaron nuevamente desde sus Word mediante `scripts/import_phase35_sources.py`. Los cinco audios publicados coinciden byte por byte con los archivos fuente.

Documentos usados:

- `work_english_test_3_general_balanced.docx`: fuente del test general principal.
- `fase_3_5_grammar_practice_questions.docx`: fuente de Grammar Practice.
- `fase_3_5_vocabulary_practice_work_vocabulary.docx`: fuente de los 8 módulos y 200 términos de Vocabulary Practice.
- `fase_3_5_reading_practice_scenarios.docx`: fuente de Reading Practice.
- `fase_3_5_typing_test_reference_texts.docx`: fuente de los 3 textos largos de Typing Test.
- `Audio 1- Flowers order taking.docx` y `Audio 1- Flowers order taking.mp3`: fuente de Listening Practice.
- `Audio 2- sales map nissan car.docx` y `Audio 2- sales map nissan car.mp3`: fuente de Listening Practice.
- `Audio 3 vacuum case.docx` y `Audio 3 vaccum case.m4a`: fuente de Listening Practice.
- `Audio 4-Bad-Call-vs-Good-Call.docx` y `Audio 4-Bad-Call-vs-Good-Call.mp3`: fuente de Listening Practice.
- `Audio 5- ATT customer service.docx` y `Audio 5- ATT customer service.mp3`: fuente de Listening Practice.

Nota: el archivo de audio 3 existe en la carpeta fuente como `.m4a`; por eso se conserva y se referencia como audio MP4/M4A dentro del proyecto.

La carpeta no contiene `fase_3_5_listening_practice_questions.docx`. Listening conserva temporalmente sus 25 preguntas existentes; no se generaron preguntas adicionales sin ese documento.

## Tecnologías

- React
- Vite
- React Router con `HashRouter`
- JavaScript (ES modules)
- CSS responsive
- Git

## Estructura

```text
turnon-portal/
├── src/
│   ├── components/    Componentes reutilizables
│   ├── pages/         Páginas del portal
│   ├── data/          Datos locales reales del sitio
│   ├── utils/         Funciones de cálculo y validación sin persistencia
│   ├── styles/        Estilos globales
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── audio/
│       └── listening/  Audios reales usados por Listening Practice
├── index.html
├── package.json
└── vite.config.js
```

## Datos locales

Los contenidos reutilizables están separados de los componentes en `src/data/`:

- `generalEnglishTestQuestions.js`: test general principal convertido desde `work_english_test_3_general_balanced.docx`.
- `workEnglishTestQuestions.js`: export del test laboral secundario.
- `englishQuestions.js`: banco del test laboral existente.
- `grammarPracticeQuestions.js`: 400 preguntas de Grammar Practice convertidas desde `fase_3_5_grammar_practice_questions.docx`.
- `grammarLessons.js`: 38 lecciones teóricas convertidas desde `fase_3_5_grammar_lessons_theory.docx`.
- `readingPracticeScenarios.js`: escenarios de Reading Practice convertidos desde `fase_3_5_reading_practice_scenarios.docx`.
- `listeningPracticeItems.js`: audios, transcripciones, vocabulario y preguntas de Listening Practice convertidas desde documentos Word y archivos de audio reales.
- `writingPracticePrompts.js`: prompts locales de Writing Practice para entrevistas, customer service, correos profesionales, experiencia laboral y training.
- `features/typing-test/data/typingTexts.js`: textos oficiales Easy, Intermediate y Hard reutilizados del proyecto independiente terminado.
- `workVocabularyModules.js`: ocho módulos y 200 términos importados del Word oficial de Vocabulary Practice.
- `englishPractice.js`: estructura de tests y prácticas dentro de Work English Test.
- `resources.js`: recursos y guías.
- `offers.js`: ofertas.
- `communityLinks.js`: enlaces de comunidad.
- `laborRules.js`: reglas de cálculo laboral en USD.
- `siteContent.js`: navegación y contenido general.

La lógica de puntuación está en `src/utils/englishScoring.js`. La validación interna de bancos de preguntas está en `src/utils/questionValidation.js`. La lógica del mini examen de vocabulario está en `src/utils/vocabularyQuiz.js`. La lógica de resultados y filtros de Reading Practice está en `src/utils/readingPractice.js`. La lógica de resultados, filtros y test general de Listening Practice está en `src/utils/listeningPractice.js`. La lógica de conteo, WPM y evaluación orientativa de Writing Practice está en `src/utils/writingPractice.js`. Typing Test está aislado completamente en `src/features/typing-test/`. La calculadora laboral y sus validaciones están en `src/utils/laborCalculator.js`; sus multiplicadores orientativos permanecen centralizados en `src/data/laborRules.js`.

## Actualización Fase 3.5 — Test general y Grammar Practice desde documentos Word

Se agregó el test general como opción principal:

- Ruta: `#/work-english-test/general-test`
- Nombre en interfaz: `General English Level Test`
- Banco: `src/data/generalEnglishTestQuestions.js`
- Fuente: `work_english_test_3_general_balanced.docx`
- Total: 50 preguntas
- Distribución: 20 grammar, 15 vocabulary, 15 reading

Se mantuvo el test laboral como opción secundaria:

- Ruta: `#/work-english-test/work-test`
- Nombre en interfaz: `Work English Test`
- Banco: `src/data/workEnglishTestQuestions.js`
- Fuente: `work_specialized_full_test.docx`
- Banco total: 100 preguntas
- Intento: 50 preguntas, con 30 grammar, 10 vocabulary y 10 reading
- Enfoque: entrevista, customer service, training y ambientes bilingües

## Work English Test question bank

El documento `work_specialized_full_test.docx` se procesa únicamente durante desarrollo mediante `scripts/import_work_english_test.ps1`. React utiliza los datos estáticos generados en `src/data/workEnglishTestQuestions.js`; el navegador no lee el Word ni necesita una ruta local de Windows.

Cada intento del Work English Test selecciona aleatoriamente 50 preguntas desde el banco completo:

- 30 Grammar: 10 B1, 12 B2 y 8 C1;
- 10 Vocabulary: 3 B1, 4 B2 y 3 C1;
- 10 Reading: dos pasajes completos de cinco preguntas, una lectura B1 y una lectura avanzada B2 o C1.

La selección usa Fisher-Yates por sección, conserva Grammar, Vocabulary y Reading en ese orden, no mezcla las opciones de respuesta y evita repetir exactamente el mismo conjunto de pasajes de Reading en intentos consecutivos cuando existen alternativas. El intento anterior vive únicamente en estado de React durante la sesión: no se usa `localStorage`, `sessionStorage`, backend, Supabase ni Firebase.

Esta actualización es exclusiva del Work English Test. El General English Level Test conserva su banco, selección y lógica independientes.

### Grammar Practice question bank

- Ruta: `#/work-english-test/grammar-practice`
- Banco: `src/data/grammarPracticeQuestions.js`
- Fuente: `fase_3_5_grammar_practice_questions.docx`
- Total: 400 preguntas
- Temas: 10
- Preguntas por tema: 40
- Temas: Present Simple vs Present Continuous, Past Simple vs Present Perfect, Modals, Conditionals, Passive Voice, Prepositions, Relative Clauses, Reported Speech, Connectors y Advanced Grammar C1.

El documento se procesa únicamente durante desarrollo con `scripts/import_grammar_practice_questions.py`. React utiliza el banco estático almacenado dentro del proyecto y no consulta el Word durante cada intento. La práctica permite elegir un tema, responder sus preguntas en orden aleatorio, revisar cada respuesta, ver explicaciones y consultar el resultado final. Grammar Level Check continúa generando intentos de 20 preguntas desde el banco ampliado.

Grammar Practice no usa `localStorage`; todo el estado del intento vive únicamente en memoria de React. Esta actualización no modifica el banco ni el funcionamiento del General English Level Test.

### Grammar Lessons

Lessons es una página principal independiente del portal y aparece en el navbar entre Work English Test y Recursos:

- Lesson Map: `#/lessons`
- Ruta individual: `#/lessons/:lessonSlug`
- Fuente: `fase_3_5_grammar_lessons_theory.docx`
- Datos locales: `src/data/grammarLessons.js`
- Foundation: 12 lecciones, A2–B1
- Intermediate: 14 lecciones, B1–B2
- Advanced: 12 lecciones, B2–C1
- Total: 38 lecciones

El documento Word se procesa únicamente durante desarrollo. La aplicación publicada no consulta el DOCX ni contiene su ruta local; React utiliza el archivo estático `src/data/grammarLessons.js`.

Cada lección conserva la explicación, estructuras, listas, ejemplos, comparaciones, errores comunes y recapitulación del documento. Las relaciones con Grammar Practice usan IDs normalizados derivados de los diez temas activos, no textos visuales sueltos.

El Lesson Map presenta tres accordions accesibles con enlaces a cada slug. Una sola plantilla dinámica renderiza la lección abierta, su índice lateral, el índice móvil desplegable, las secciones reales del documento y la navegación anterior/siguiente. Al final también permite regresar al Lesson Map o ir a `#/work-english-test`.

Grammar Practice volvió a su estructura original sin tabs ni teoría integrada. Vocabulary Practice conserva sus módulos, lista de estudio, flashcards y mini examen, y no incluye Lessons.

El estado abierto de los accordions y la sección activa vive únicamente en memoria de React. Lessons no usa `localStorage`, `sessionStorage`, cookies, backend, Supabase ni Firebase.

## FASE 3.5 — Vocabulary Practice: Work Vocabulary Modules

Se agregó una sección funcional de práctica de vocabulario laboral:

- Ruta principal: `#/work-english-test/vocabulary-practice`
- Ruta de módulo: `#/work-english-test/vocabulary-practice/:moduleSlug`
- Banco local: `src/data/workVocabularyModules.js`
- Utilidades del mini examen: `src/utils/vocabularyQuiz.js`

Vocabulary Practice permite:

- buscar módulos o términos;
- filtrar por categoría y nivel;
- abrir un módulo;
- estudiar lista con término, traducción, definición, ejemplo, traducción del ejemplo, dificultad y contexto;
- mostrar u ocultar traducciones;
- practicar con flashcards;
- hacer mini exámenes de 5, 10 o 15 preguntas;
- repetir el mini examen con preguntas mezcladas;
- ver resultado, términos correctos, términos fallados y recomendación breve.

Módulos disponibles:

- Customer Service Core
- Tech Support
- Auto and Home Insurance
- Health Insurance
- Call Center Operations
- Metrics and QA
- Roles and Departments
- Sales Account Vocabulary

Vocabulary Practice no guarda progreso todavía. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`.

## FASE 3.5 — Reading Practice

Se agregó una sección funcional de práctica de lectura laboral:

- Ruta principal: `#/work-english-test/reading-practice`
- Ruta de escenario: `#/work-english-test/reading-practice/:scenarioSlug`
- Documento fuente registrado: `fase_3_5_reading_practice_scenarios.docx`
- Banco local: `src/data/readingPracticeScenarios.js`
- Utilidades: `src/utils/readingPractice.js`

Reading Practice permite:

- ver escenarios de lectura laboral;
- buscar por texto;
- filtrar por nivel, categoría, contexto y tipo de texto;
- abrir un escenario;
- leer el texto completo;
- revisar vocabulario clave cuando existe;
- responder preguntas de comprensión;
- ver resultado con correctas, porcentaje, tipos a reforzar y recomendación;
- revisar cada respuesta con explicación;
- repetir el escenario.

Tipos de escenarios disponibles:

- emails;
- chats o mensajes;
- anuncios;
- instrucciones;
- conversaciones de servicio;
- artículos informativos;
- resúmenes de políticas.

Tipos de preguntas disponibles:

- main idea;
- detail;
- inference;
- vocabulary in context;
- purpose;
- best response.

Reading Practice no guarda progreso todavía. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`.

## FASE 3.5 — Listening Practice

Se agregó una sección funcional de práctica auditiva laboral:

- Ruta principal: `#/work-english-test/listening-practice`
- Ruta de audio: `#/work-english-test/listening-practice/:listeningSlug`
- Carpeta de audios: `public/audio/listening/`
- Banco local: `src/data/listeningPracticeItems.js`
- Utilidades: `src/utils/listeningPractice.js`

Listening Practice permite:

- ver audios reales de contextos laborales;
- filtrar por nivel, categoría y contexto;
- abrir una práctica específica;
- reproducir el audio desde el navegador;
- responder preguntas de comprensión auditiva;
- ver resultado con correctas, porcentaje, habilidades a reforzar y recomendación;
- revisar cada respuesta con explicación;
- consultar vocabulario clave;
- ver la transcripción después de responder.

Audios disponibles:

- Flowers order taking
- Nissan map update sales call
- Vacuum support case
- Bad Call vs Good Call
- AT&T customer service bill

También se agregó `Listening Level Check` al inicio de la sección para una evaluación general rápida basada en los audios disponibles.

Corrección de flujo:

- Listening Practice funciona por bloques de audio.
- Cada audio conserva sus propias preguntas y el reproductor usa el `audioUrl` del bloque actual.
- El test general de listening selecciona audios completos, no preguntas sueltas.
- Al avanzar con `Siguiente audio`, cambian juntos el título, el reproductor y las preguntas.
- La revisión final se agrupa por audio.

Listening Practice no guarda progreso todavía. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`. La transcripción y las preguntas viven en archivos reales dentro de `src/data/`; los audios viven en `public/audio/listening/`.

## FASE 3.5 — Writing Practice

Se agregó una sección funcional de práctica de escritura laboral:

- Ruta principal: `#/work-english-test/writing-practice`
- Ruta de prompt: `#/work-english-test/writing-practice/:promptSlug`
- Banco local: `src/data/writingPracticePrompts.js`
- Utilidades: `src/utils/writingPractice.js`

Writing Practice permite:

- buscar prompts;
- filtrar por nivel y categoría;
- abrir ejercicios por escenario;
- escribir respuestas de entrevista, customer service, correos profesionales, experiencia laboral y training;
- usar temporizador;
- ver conteo de palabras y caracteres;
- medir palabras por minuto;
- comparar contra una meta sugerida de 30 WPM;
- terminar una práctica y ver resultado orientativo.

El cálculo de WPM usa:

`palabras totales / minutos usados`

Si el usuario todavía no empieza a escribir, el WPM es 0. Si el tiempo usado es menor a un minuto, se usan minutos reales en decimales para no inflar ni bloquear el cálculo.

La evaluación es básica y sin IA. Revisa heurísticas simples:

- cantidad de palabras;
- velocidad WPM;
- mínimo y objetivo de palabras;
- cantidad aproximada de oraciones;
- conectores simples como `because`, `also`, `but`, `however`, `first` y `finally`;
- vocabulario laboral según categoría.

También se agregó `Writing Level Check`, que selecciona 3 prompts aleatorios, preferiblemente de categorías diferentes. El resultado general muestra palabras totales, tiempo total, WPM promedio, resultados por prompt, estimación general, categorías fuertes, categorías a reforzar y recomendación final.

La estimación es orientativa y usa heurísticas básicas; no equivale a corrección gramatical real porque no usa IA ni revisión humana.

Writing Practice no guarda progreso todavía. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`.

## Typing Test integrado

El proyecto independiente terminado fue integrado como una funcionalidad nativa y aislada de TurnOn:

- Ruta canónica React Router: `/work-english-test/typing-test`
- URL pública canónica con HashRouter: `#/work-english-test/typing-test`
- Alias conservado por compatibilidad: `#/typing-test`
- Página del portal: `src/pages/TypingTestPage.jsx`
- Componentes: `src/features/typing-test/components/`
- Hook del cronómetro: `src/features/typing-test/hooks/useTypingTest.js`
- Métricas: `src/features/typing-test/utils/calculateMetrics.js`
- Textos oficiales: `src/features/typing-test/data/typingTexts.js`
- CSS aislado: `src/features/typing-test/styles/typingTest.css`

La integración conserva el comportamiento del proyecto original: selector Easy/Intermediate/Hard, duraciones 1/3/5 minutos, inicio del cronómetro con el primer carácter, timestamps reales, WPM/Accuracy/Errors/Incorrect Words en vivo, comparación carácter por carácter, palabra y carácter activos, Backspace, pegado bloqueado, scroll automático, final por tiempo o texto completo y acciones de resultados.

Home y Work English Test enlazan a la ruta canónica `/work-english-test/typing-test`. El alias `/typing-test` permanece activo para no romper enlaces anteriores. La implementación anterior fue retirada para evitar duplicados. El módulo usa el Header y Footer generales de TurnOn; no copia el `package.json`, Vite, `index.html`, `node_modules`, `dist`, Header ni Footer del proyecto independiente.

WPM conserva la fórmula original: `caracteres correctos / 5 / minutos transcurridos`. Typing Test no guarda progreso y no usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`.

## FASE 3.5 — General Tests for Practice Sections

Se agregaron tests generales al inicio de tres secciones de práctica:

- `Grammar Level Check` en `#/work-english-test/grammar-practice`
- `Work Vocabulary Check` en `#/work-english-test/vocabulary-practice`
- `Reading Level Check` en `#/work-english-test/reading-practice`
- `Listening Level Check` en `#/work-english-test/listening-practice`
- `Writing Level Check` en `#/work-english-test/writing-practice`
- `Typing Test` en `#/work-english-test/typing-test`

Cada test aparece arriba de la práctica específica y no reemplaza el contenido existente. Debajo se mantienen:

- Grammar Practice por tema y filtros;
- Vocabulary Practice por módulos, flashcards y mini examen;
- Reading Practice por escenarios, filtros y revisión de respuestas.
- Listening Practice por audios, filtros, preguntas, revisión y transcripción.
- Writing Practice por prompts, filtros, temporizador, WPM y revisión orientativa.
- Typing Test por textos laborales, duración, dificultad, WPM, precisión y errores.

Datos usados:

- Grammar: `src/data/grammarPracticeQuestions.js`
- Vocabulary: `src/data/workVocabularyModules.js`
- Reading: `src/data/readingPracticeScenarios.js`
- Listening: `src/data/listeningPracticeItems.js`
- Writing: `src/data/writingPracticePrompts.js`
- Typing: `src/features/typing-test/data/typingTexts.js`

Archivos agregados:

- `src/components/SectionGeneralTest.jsx`
- `src/utils/sectionGeneralTests.js`

Los tests son aleatorios, no guardan progreso y no usan `localStorage` ni `sessionStorage`. Tampoco usan backend, Supabase, Firebase, login, panel admin ni IA. Los resultados son orientativos y no constituyen certificación oficial.

## Sistema visual global

El portal usa un sistema visual centralizado en `src/styles/design-system.css`, aplicado sobre todas las páginas sin cambiar la lógica, las rutas ni los bancos de datos.

- Paleta principal: verde oscuro `#0D211B`, lima `#BEFF35`, fondo marfil `#F5F2E9` y superficies blancas.
- Tipografía: Manrope para títulos e Inter para lectura e interfaz.
- Componentes reutilizables: cards, botones, filtros, formularios, estados vacíos, iconos de habilidad, cabeceras, resultados, navegación y footer.
- Iconografía: `lucide-react`, usada como apoyo semántico y nunca como reemplazo único de una etiqueta.
- Responsive: navegación compacta y cuadrículas adaptadas para móvil, tablet, laptop y escritorio; verificado desde 360 px hasta 1440 px.
- Accesibilidad: jerarquía semántica, estados activos, etiquetas accesibles en el menú, foco visible, controles con tamaño táctil y soporte para `prefers-reduced-motion`.
- SEO básico: título, descripción, color de tema y metadatos Open Graph en `index.html`.

Los componentes visuales compartidos viven en `src/components/` y `src/components/ui/`. Los estilos específicos del Typing Test permanecen aislados en `src/features/typing-test/styles/typingTest.css`.

## Estado de la limpieza técnica

La auditoría completa y sus limitaciones están documentadas en `CLEANUP_REPORT.md`. La ruta fuente confirmada es `C:\Users\jason\OneDrive\Desktop\recursos para turn on`. El documento separado `fase_3_5_listening_practice_questions.docx` no está en esa carpeta, por lo que Listening conserva sus 25 preguntas existentes basadas en los cinco audios y transcripciones reales.

## Desarrollo local

```bash
npm install
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

## Generar el build

```bash
npm run build
```

El sitio listo para publicar se genera en `dist/`.

Para validar bancos, audios, rutas de datos y simulaciones funcionales:

```bash
npm run validate:data
```

## Publicar en Hostinger o BanaHosting

1. Ejecutá `npm run build`.
2. Abrí el administrador de archivos o conectate por FTP/SFTP al hosting.
3. Entrá en el directorio público del dominio, normalmente `public_html/`.
4. Subí **el contenido** de `dist/`.
5. No subás `node_modules/`.
6. No subás toda la carpeta del proyecto: sólo los archivos generados dentro de `dist/`.
7. Comprobá que `index.html` esté directamente dentro de `public_html/`.
8. El portal usa `HashRouter`, por eso las rutas públicas incluyen `#/` y funcionan sin reglas especiales del servidor.

## Alcance actual

Esta fase no utiliza backend, Supabase, Firebase, login, IA, `localStorage`, `sessionStorage` ni panel administrativo. Los datos viven en archivos reales versionados dentro de `src/data/`. La calculadora usa USD y mantiene entradas transitorias sólo en memoria.

Si una fase futura permite crear, editar o eliminar contenido, debe incorporarse Supabase, un backend propio o un sistema formal de exportación/importación; el almacenamiento del navegador no será la fuente principal.
