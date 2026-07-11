# turnon-portal — FASE 3.5

Portal web estático de TurnOn. Esta actualización de FASE 3.5 incorpora Listening Practice con audios reales, Writing Practice con temporizador y Typing Test con métricas de velocidad/precisión, mantiene las prácticas anteriores y retira la práctica oral de la interfaz.

## Ubicación

`C:\Users\jason\Documents\Codex\turnon-portal`

## Documentos fuente

Ruta actual de documentos y recursos:

`C:\Users\jason\OneDrive\Desktop\recursos`

Ruta usada en fases anteriores:

`C:\Users\jason\OneDrive\Desktop\recursos para turn on`

Nota de esta actualización: en esta verificación local la carpeta nueva `C:\Users\jason\OneDrive\Desktop\recursos` no estaba disponible, por lo que no se pudo leer `fase_3_5_typing_test_reference_texts.docx` ni copiar audios nuevos desde esa ubicación. El proyecto conserva los bancos locales versionados en `src/data/`. Si ese documento se agrega después, conviene convertirlo a `.txt`, `.json` o `.js` para integrarlo de forma controlada.

Documentos usados:

- `work_english_test_3_general_balanced.docx`: fuente del test general principal.
- `fase_3_5_grammar_practice_questions.docx`: fuente de Grammar Practice.
- `fase_3_5_reading_practice_scenarios.docx`: fuente de Reading Practice.
- `Audio 1- Flowers order taking.docx` y `Audio 1- Flowers order taking.mp3`: fuente de Listening Practice.
- `Audio 2- sales map nissan car.docx` y `Audio 2- sales map nissan car.mp3`: fuente de Listening Practice.
- `Audio 3 vacuum case.docx` y `Audio 3 vaccum case.m4a`: fuente de Listening Practice.
- `Audio 4-Bad-Call-vs-Good-Call.docx` y `Audio 4-Bad-Call-vs-Good-Call.mp3`: fuente de Listening Practice.
- `Audio 5- ATT customer service.docx` y `Audio 5- ATT customer service.mp3`: fuente de Listening Practice.

Nota: el archivo de audio 3 existe en la carpeta fuente como `.m4a`; por eso se conserva y se referencia como audio MP4/M4A dentro del proyecto.

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
- `grammarPracticeQuestions.js`: 150 preguntas de Grammar Practice convertidas desde `fase_3_5_grammar_practice_questions.docx`.
- `readingPracticeScenarios.js`: escenarios de Reading Practice convertidos desde `fase_3_5_reading_practice_scenarios.docx`.
- `listeningPracticeItems.js`: audios, transcripciones, vocabulario y preguntas de Listening Practice convertidas desde documentos Word y archivos de audio reales.
- `writingPracticePrompts.js`: prompts locales de Writing Practice para entrevistas, customer service, correos profesionales, experiencia laboral y training.
- `typingTestPassages.js`: textos laborales locales para Typing Test en customer service, chat, email, tech support, entrevistas y notas de trabajo.
- `workVocabularyModules.js`: módulos locales de Vocabulary Practice para customer service, tech support, seguros, call center, métricas, ventas, roles, training y entrevistas.
- `englishPractice.js`: estructura de tests y prácticas dentro de Work English Test.
- `resources.js`: recursos y guías.
- `offers.js`: ofertas.
- `communityLinks.js`: enlaces de comunidad.
- `laborRules.js`: reglas de cálculo laboral en USD.
- `siteContent.js`: navegación y contenido general.

La lógica de puntuación está en `src/utils/englishScoring.js`. La validación interna de bancos de preguntas está en `src/utils/questionValidation.js`. La lógica del mini examen de vocabulario está en `src/utils/vocabularyQuiz.js`. La lógica de resultados y filtros de Reading Practice está en `src/utils/readingPractice.js`. La lógica de resultados, filtros y test general de Listening Practice está en `src/utils/listeningPractice.js`. La lógica de conteo, WPM y evaluación orientativa de Writing Practice está en `src/utils/writingPractice.js`. Las métricas de Typing Test están en `src/utils/typingTest.js`. La calculadora laboral y sus validaciones están en `src/utils/laborCalculator.js`; sus multiplicadores orientativos permanecen centralizados en `src/data/laborRules.js`.

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
- Banco: `src/data/workEnglishTestQuestions.js`, que reutiliza el banco laboral existente en `src/data/englishQuestions.js`
- Total: 50 preguntas
- Enfoque: entrevista, customer service, training y ambientes bilingües

Se actualizó Grammar Practice:

- Ruta: `#/work-english-test/grammar-practice`
- Banco: `src/data/grammarPracticeQuestions.js`
- Fuente: `fase_3_5_grammar_practice_questions.docx`
- Total: 150 preguntas
- Temas: Present Simple vs Present Continuous, Past Simple vs Present Perfect, Modals, Conditionals, Passive Voice, Prepositions, Relative Clauses, Reported Speech, Connectors y Advanced Grammar C1.

Grammar Practice permite filtrar por nivel y tema, responder preguntas, revisar respuesta, ver explicación, avanzar y ver resultado final. No guarda progreso todavía; todo el estado vive sólo en memoria mientras la página está abierta.

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
- Interview and Training Vocabulary

Vocabulary Practice no guarda progreso todavía. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`.

## FASE 3.5 — Reading Practice

Se agregó una sección funcional de práctica de lectura laboral:

- Ruta principal: `#/work-english-test/reading-practice`
- Ruta de escenario: `#/work-english-test/reading-practice/:scenarioSlug`
- Documento fuente: `C:\Users\jason\OneDrive\Desktop\recursos para turn on\fase_3_5_reading_practice_scenarios.docx`
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

La estimación de nivel es orientativa. No evalúa pronunciación, gramática avanzada ni calidad profesional definitiva porque no usa IA ni revisión humana.

Writing Practice no guarda progreso todavía. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`. La práctica oral sigue fuera del alcance de esta fase.

## FASE 3.5 — Typing Test

Se agregó y reestructuró un módulo funcional de typing para práctica laboral:

- Ruta: `#/work-english-test/typing-test`
- Banco local: `src/data/typingTestPassages.js`
- Utilidades: `src/utils/typingTest.js`

Typing Test permite:

- elegir duración de 1, 3 o 5 minutos;
- elegir categoría o usar todas;
- seleccionar un texto laboral aleatorio;
- copiar el texto en un área de escritura;
- ver caracteres correctos e incorrectos;
- medir tiempo restante, palabras, caracteres, errores, progreso, WPM y precisión básica;
- terminar el test antes de tiempo;
- repetir o elegir otro texto.

La pantalla inicial de Typing Test ahora inicia directamente con la card verde principal `Typing test laboral`. Ya no muestra un header superior separado y se enfoca primero en WPM, errores y precisión básica.

WPM significa `Words Per Minute`, es decir, palabras por minuto. Sirve para medir qué tan rápido escribís. Como meta práctica inicial, 30 WPM o más puede considerarse aceptable para practicar, aunque cada empresa puede pedir requisitos diferentes.

Métricas usadas:

- Gross WPM: `(caracteres escritos / 5) / minutos usados`
- Net WPM: `Gross WPM - (errores / minutos usados)`, con mínimo 0
- Accuracy: `(caracteres correctos / caracteres escritos) * 100`
- CPM: `caracteres escritos / minutos usados`

30 WPM o más es una meta práctica sugerida para este ejercicio, pero cada empresa puede tener requisitos diferentes. El resultado es orientativo y mide velocidad/precisión de escritura. No mide por sí solo el nivel de inglés ni funciona como certificación.

Typing Test no guarda progreso. No usa Supabase, backend, login, IA, `localStorage` ni `sessionStorage`.

## FASE 3.5 — General Tests for Practice Sections

Se agregaron tests generales al inicio de tres secciones de práctica:

- `Grammar Level Check` en `#/work-english-test/grammar-practice`
- `Work Vocabulary Check` en `#/work-english-test/vocabulary-practice`
- `Reading Level Check` en `#/work-english-test/reading-practice`
- `Listening Level Check` en `#/work-english-test/listening-practice`
- `Writing Level Check` en `#/work-english-test/writing-practice`
- `Typing Speed Check` en `#/work-english-test/typing-test`

Cada test aparece arriba de la práctica específica y no reemplaza el contenido existente. Debajo se mantienen:

- Grammar Practice por tema y filtros;
- Vocabulary Practice por módulos, flashcards y mini examen;
- Reading Practice por escenarios, filtros y revisión de respuestas.
- Listening Practice por audios, filtros, preguntas, revisión y transcripción.
- Writing Practice por prompts, filtros, temporizador, WPM y revisión orientativa.
- Typing Test por textos laborales, duración, categoría, WPM, accuracy, CPM y errores.

Datos usados:

- Grammar: `src/data/grammarPracticeQuestions.js`
- Vocabulary: `src/data/workVocabularyModules.js`
- Reading: `src/data/readingPracticeScenarios.js`
- Listening: `src/data/listeningPracticeItems.js`
- Writing: `src/data/writingPracticePrompts.js`
- Typing: `src/data/typingTestPassages.js`

Archivos agregados:

- `src/components/SectionGeneralTest.jsx`
- `src/utils/sectionGeneralTests.js`

Los tests son aleatorios, no guardan progreso y no usan `localStorage` ni `sessionStorage`. Tampoco usan backend, Supabase, Firebase, login, panel admin ni IA. Los resultados son orientativos y no constituyen certificación oficial.

## Práctica oral

La práctica oral fue retirada de esta fase. No existe ruta activa, tarjeta visible ni panel de práctica oral. Si en una fase futura se implementa práctica oral con grabación, evaluación o persistencia, deberá plantearse con backend, Supabase o un sistema formal de exportación/importación; no se debe usar almacenamiento del navegador como fuente principal.

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
