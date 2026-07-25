# TurnOn Complete Audit Report

## Alcance y estado inicial

- Proyecto auditado: `C:\Users\jason\Documents\Codex\turnon-portal`.
- Arquitectura conservada: React, Vite, `HashRouter`, datos locales y build estático.
- Estado Git inicial: limpio; HEAD inicial `12af284bc13ab00033bb8e91ca954ba877f2e2a9`.
- `node_modules` ya existía, por lo que no se ejecutó `npm install`.
- Build inicial: correcto con Vite 8.0.16.
- Advertencia inicial: chunk JavaScript principal mayor de 500 kB.
- Bundle inicial:
  - `dist`: 13 archivos, 24,810,251 bytes (23.661 MiB).
  - CSS principal: 117.32 kB, gzip 21.00 kB.
  - JavaScript principal: 867.10 kB, gzip 210.47 kB.
- No existían scripts de lint ni pruebas. Se agregó una validación de datos y simulaciones sin dependencias nuevas.
- Commit de respaldo: `8c1afc138b6113347875c270a67bdcaa40505317`.

## Inventario real

### Páginas activas

- Inicio: `src/pages/Home.jsx`.
- Work English Test: `src/pages/WorkEnglishTest.jsx`.
- General English Level Test: `src/pages/GeneralEnglishTest.jsx`.
- Work English Test especializado: `src/pages/WorkEnglishTestExam.jsx`.
- Grammar, Vocabulary, Reading, Listening y Writing: archivos equivalentes en `src/pages/`.
- Typing Test: `src/pages/TypingTestPage.jsx` y `src/features/typing-test/`.
- Recursos y detalle: `src/pages/Resources.jsx`, `src/pages/ResourceDetail.jsx`.
- Calculadoras: `src/pages/Calculators.jsx`.
- Comunidad: `src/pages/Community.jsx`.
- Ofertas y detalle: `src/pages/Offers.jsx`, `src/pages/OfferDetail.jsx`.
- Sobre TurnOn: `src/pages/About.jsx`.
- 404: `src/pages/NotFound.jsx`.

### Componentes compartidos

- Navegación y layout: `Navbar.jsx`, `Footer.jsx`, `PageHeader.jsx`, `PracticeTestHero.jsx`.
- Cards y acciones: `Card.jsx`, `Button.jsx`, `ResourceCard.jsx`, `OfferCard.jsx`, `CalculatorCard.jsx`.
- Tests: `TestIntro.jsx`, `TestProgress.jsx`, `TestQuestion.jsx`, `TestResults.jsx`, `AnswerReview.jsx`, `SectionGeneralTest.jsx`.
- Práctica y formularios: `GrammarPracticeCard.jsx`, `ResourceFilters.jsx`, `LaborCalculatorRows.jsx`.
- UI: `src/components/ui/EmptyState.jsx`, `src/components/ui/SkillIcon.jsx`.

### Datos, utilidades y recursos

- Datos: 14 archivos activos en `src/data/`.
- Utilidades: 10 archivos en `src/utils/`.
- Typing Test: datos, hook, métricas, componentes y CSS aislados en `src/features/typing-test/`.
- Estilos generales: `src/styles/global.css` y `src/styles/design-system.css`.
- Recursos públicos: una imagen de MadTogo, cuatro plumas y cinco audios.
- No se encontraron hashes de contenido duplicados en `public/`.
- Todos los assets públicos están referenciados; no se eliminó ninguno.

### Dependencias

- `react`, `react-dom`, `react-router-dom`, `lucide-react`, `vite` y `@vitejs/plugin-react`.
- Todas tienen un uso comprobado en código o configuración.
- No se agregó, actualizó ni eliminó ninguna dependencia.

## Rutas revisadas

- `#/`
- `#/work-english-test`
- `#/work-english-test/general-test`
- `#/work-english-test/work-test`
- `#/work-english-test/grammar-practice`
- `#/work-english-test/vocabulary-practice`
- `#/work-english-test/vocabulary-practice/:moduleSlug`
- `#/work-english-test/reading-practice`
- `#/work-english-test/reading-practice/:scenarioSlug`
- `#/work-english-test/listening-practice`
- `#/work-english-test/listening-practice/:listeningSlug`
- `#/work-english-test/writing-practice`
- `#/work-english-test/writing-practice/:promptSlug`
- `#/work-english-test/typing-test`
- Alias compatible: `#/typing-test`
- `#/recursos` y `#/recursos/:id`
- `#/calculadoras`
- `#/comunidad`
- `#/ofertas` y `#/ofertas/:id`
- `#/sobre-turnon`
- Cualquier ruta inválida ahora muestra una página 404 controlada.

## Problemas encontrados y correcciones

### Funcionales

1. La ruta comodín mostraba Inicio y ocultaba errores de navegación.
   - Se creó una 404 real con regreso accesible a Inicio.
2. Faltaba la ruta canónica `work-english-test/typing-test`.
   - Se agregó y se conservaron los enlaces antiguos mediante el alias `typing-test`.
3. Comunidad y Ofertas usaban `#` como destino.
   - Los destinos no suministrados ahora son `null` y se muestran desactivados, sin navegación rota.
4. Recursos guardaba un `url: '#'` que no utilizaba.
   - Se eliminó ese campo obsoleto.
5. Un audio fallido no tenía estado comprensible.
   - Listening ahora muestra un error controlado y usa `preload="metadata"`.
6. Al volver en Grammar Practice, una respuesta ya guardada podía no restaurarse visualmente al avanzar de nuevo.
   - La navegación ahora restaura respuesta y estado revisado por ID.
7. `Button` y `Card` podían generar un enlace sin destino si se invocaban mal.
   - Ahora solo renderizan enlaces cuando existe un destino real.

### Navegación y accesibilidad

1. El menú móvil no respondía a Escape.
   - Ahora cierra con Escape y al cambiar de ruta.
2. Los errores de salario y horas no estaban asociados programáticamente a sus inputs.
   - Se agregaron `aria-describedby` e IDs estables.
3. La barra de progreso de test no exponía semántica de progreso.
   - Se agregaron `role="progressbar"` y valores ARIA.
4. `TestQuestion` podía crear badges vacíos.
   - Solo renderiza metadatos existentes.
5. La página 404 y la carga diferida tienen estados semánticos.
6. Se conservaron foco visible, targets táctiles y `prefers-reduced-motion` existentes.

### Consistencia visual

1. Los tokens de habilidades tenían variaciones accidentales.
   - Se alinearon con Grammar `#2F9E68`, Vocabulary `#4C76E8`, Reading `#EE7C32`, Listening `#8B63D6`, Writing `#35BFAE` y Typing `#7FCB17`.
2. `global.css` cargaba DM Sans aunque el sistema activo usa Inter/Manrope.
   - Se eliminó esa importación duplicada y se alinearon aliases con el sistema central.
3. Se agregaron estilos coherentes para loading, 404, audio fallido y disponibilidad pendiente.

### Rendimiento

1. Todas las páginas y bancos grandes entraban en el chunk inicial.
   - Se agregó `React.lazy` + `Suspense` por página.
2. Resultado:
   - JavaScript inicial: 867.10 kB → 241.00 kB, reducción aproximada de 72.2%.
   - Gzip inicial: 210.47 kB → 77.33 kB, reducción aproximada de 63.2%.
   - Ya no aparece la advertencia de chunk mayor a 500 kB.
3. Los audios solo se renderizan para el audio actual y usan precarga de metadatos, no reproducción automática.

## Limpieza

### Archivos eliminados

- `src/pages/EnglishTest.jsx`: página antigua sin ruta ni import.
- `src/data/englishQuestions.js`: banco antiguo utilizado únicamente por la página anterior.
- `src/components/PracticeFilters.jsx`: componente sin referencias.
- `src/components/PracticeResults.jsx`: componente sin referencias.

Se verificaron imports, referencias de texto y rutas antes de eliminarlos. No estaban cargados dinámicamente.

### Archivos conservados por precaución

- Todos los reportes anteriores y scripts de importación: documentan el origen de los bancos y permiten auditorías futuras.
- Los cinco audios, MadTogo y las cuatro plumas: todos están activos.
- Términos de vocabulario repetidos entre módulos: tienen IDs y contextos distintos.
- Cuatro preguntas de Reading con el texto genérico “What can be inferred from the text?”: pertenecen a escenarios distintos, con IDs y pasajes distintos.

### Dependencias y assets eliminados

- Dependencias eliminadas: ninguna.
- Assets eliminados: ninguno.

## Validaciones de datos y simulaciones

Se agregó `npm run validate:data`. Resultado final: **84/84 comprobaciones correctas**.

### General English Level Test

- Banco: 50.
- Distribución: 20 Grammar, 15 Vocabulary, 15 Reading.
- IDs y textos únicos; opciones, respuestas y explicaciones válidas.
- Tres intentos simulados con 50 IDs únicos.
- Posiciones 1–20, 21–35 y 36–50 correctas.
- Orden distinto entre intentos.
- Pasajes de Reading protegidos por el randomizer.
- Puntuación con todas las respuestas correctas: 100%.

### Work English Test

- Banco activo: 100; 60 Grammar, 20 Vocabulary y 20 Reading.
- Tres intentos simulados: 30/10/10, 50 IDs únicos y orden distinto.
- Pasajes de Reading completos y contiguos.
- Comparación de desarrollo contra `work_specialized_full_test.docx`: metadata y las 100 preguntas coinciden exactamente con el banco activo.

### Grammar Practice

- Comparación dry-run contra `fase_3_5_grammar_practice_questions.docx`.
- Word: 400 preguntas, 10 temas.
- Banco activo: 400 preguntas, 40 por tema.
- Nuevas: 0; modificadas: 0; ausentes: 0; duplicadas: 0; pendientes: 0.
- IDs únicos y respuestas dentro de opciones.

### Vocabulary Practice

- Documento fuente: 8 módulos y 200 términos.
- Banco activo: 8 módulos y 200 términos, IDs únicos y campos completos.
- Mini examen simulado: 10 términos únicos.
- Work Vocabulary Check simulado: 25 términos únicos.
- Pendiente de contenido: el módulo esperado “Interview and Training” no existe en el Word fuente ni en el banco activo. No se inventó.

### Reading Practice

- 30 escenarios, 150 preguntas.
- Slugs e IDs únicos; pasajes, opciones, respuestas y explicaciones válidas.
- Reading Level Check conserva `scenarioId` y pasaje por pregunta.

### Listening Practice

- 5 items, 25 preguntas.
- Los cinco archivos de audio existen en `public/audio/listening/`.
- Cada bloque mantiene audio, preguntas y transcripción asociados.
- La transcripción se muestra después de enviar en el flujo activo.
- No hay rutas locales de Windows en datos de producción.

### Writing Practice

- 22 prompts con IDs/slugs únicos y campos requeridos.
- Generación simulada de tres prompts únicos.
- Métricas y recomendaciones heurísticas válidas.
- El código declara que no equivale a corrección gramatical real.

### Typing Test

- Tres textos: Easy, Intermediate y Hard.
- Duraciones: 60, 180 y 300 segundos.
- Comparación exacta contra `fase_3_5_typing_test_reference_texts.docx`:
  - Easy: 3,879 caracteres, 655 palabras.
  - Intermediate: 4,412 caracteres, 696 palabras.
  - Hard: 6,663 caracteres, 1,005 palabras.
  - Los tres textos coinciden exactamente.
- Métricas simuladas con texto exacto: 100% de precisión, cero errores y WPM positivo.
- El scroll automático, reinicio del panel y bloqueo al finalizar permanecen en el código activo.

### Calculadora

- USD y nota orientativa conservados.
- Simulación: salario 240 USD, hora base 1 USD, dos horas extra diurnas a 2× = 4 USD.
- Agregar, eliminar, limpiar y validar filas permanecen conectados por estado React.

### Recursos, ofertas y comunidad

- Recursos: 13 cards aprobadas; 7 disponibles y 6 próximamente.
- Ofertas: 4 cards sin nuevas ofertas inventadas.
- Comunidad: 7 cards organizadas por grupo.
- No quedan `href="#"`, `url: '#'` ni `applyUrl: '#'` en `src`.

## Responsive y revisión visual

- Se revisaron estáticamente reglas base y media queries que cubren 360/390, 768, 1024 y escritorio/1440.
- Navbar, grids, formularios, tablas de calculadora, tests, pasajes y Typing tienen reglas de una columna o reflujo en móvil.
- No se encontró un navegador automatizado operativo para confirmar visualmente capturas en los cinco anchos. Este reporte no afirma una inspección visual interactiva píxel por píxel.
- El build, la estructura CSS y las simulaciones sí fueron comprobados.

## Seguridad y persistencia

- `localStorage` en `src`: ninguno.
- `sessionStorage` en `src`: ninguno.
- Speaking Practice en `src` o README: ninguna referencia.
- Rutas `C:\Users\` en el bundle (`src`, `public`, `index.html`, configuración): ninguna.
- Archivos `.env` expuestos: ninguno.
- Claves, tokens o service-role keys: no encontrados.
- Las rutas a Word permanecen únicamente en documentación/scripts de desarrollo.

## Estado final

- `npm run validate:data`: correcto, 84/84; una advertencia documental por el módulo Vocabulary faltante.
- `npm run build`: correcto.
- `npm run dev -- --host 127.0.0.1`: Vite listo en 230 ms; el proceso se detuvo después de confirmar el arranque.
- Lint: no existe script de lint; no se afirmó ejecución.
- Pruebas unitarias/E2E: no existían. Se añadió y ejecutó validación de datos/simulaciones.
- `git diff --check`: correcto; únicamente avisos de conversión LF/CRLF propios del entorno Windows.
- `dist` final:
  - 44 archivos.
  - 24,818,896 bytes (23.669 MiB).
  - Cambio total: +8,645 bytes por chunks, 404 y estados; se priorizó la reducción del payload inicial.
  - CSS: 104.06 kB global + 13.76 kB de Typing.
  - JavaScript inicial: 241.00 kB, gzip 77.33 kB.

## Archivos modificados o creados

- `README.md`
- `TURNON_COMPLETE_AUDIT_REPORT.md`
- `package.json`
- `scripts/validate_project_data.mjs`
- `src/App.jsx`
- `src/components/Button.jsx`
- `src/components/Card.jsx`
- `src/components/LaborCalculatorRows.jsx`
- `src/components/Navbar.jsx`
- `src/components/OfferCard.jsx`
- `src/components/TestProgress.jsx`
- `src/components/TestQuestion.jsx`
- `src/data/communityLinks.js`
- `src/data/englishPractice.js`
- `src/data/offers.js`
- `src/data/resources.js`
- `src/data/siteContent.js`
- `src/pages/Calculators.jsx`
- `src/pages/Community.jsx`
- `src/pages/GrammarPractice.jsx`
- `src/pages/ListeningPractice.jsx`
- `src/pages/NotFound.jsx`
- `src/pages/OfferDetail.jsx`
- `src/styles/design-system.css`
- `src/styles/global.css`

## Pendientes conocidos

1. Vocabulary tiene ocho módulos porque el Word fuente tiene ocho. Hace falta contenido aprobado para “Interview and Training”.
2. Comunidad y las aplicaciones de Ofertas no tienen URLs reales suministradas. Se muestran como no disponibles en vez de enlaces rotos.
3. Las imágenes PNG y audios son pesados, pero todos están activos. No se recomprimieron sin originales o una prueba perceptual para evitar degradación.
4. Falta una suite E2E con navegador para verificar interacción y capturas responsive; no se agregó una dependencia grande durante esta estabilización.
