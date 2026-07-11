# Reporte de limpieza técnica — FASE 3.5

Fecha de auditoría: 2026-07-10

Proyecto auditado: `C:\Users\jason\Documents\Codex\turnon-portal`

## Respaldo y estado inicial

- El árbol de trabajo estaba limpio al iniciar.
- El build inicial terminó correctamente.
- Se creó el commit de respaldo `ebd0d32` con el mensaje `Backup before phase 3.5 cleanup` antes de modificar archivos.

## Conflictos encontrados y decisiones

- Existía la ruta duplicada `/work-english-test/test` para el banco laboral. Se eliminó; la ruta canónica es `/work-english-test/work-test`.
- El selector de Typing mostraba `Dificultad`; se corrigió a `Difficulty` y conserva exclusivamente `Easy`, `Intermediate` y `Hard`.
- Vocabulary ofrecía tamaños 5, 10 y 15. Se corrigió a 10, 15 y 20; cuando se solicitan 20 términos, el generador complementa el módulo activo con términos únicos de otros módulos.
- Vocabulary no mostraba revisión pregunta por pregunta. Se añadió revisión con respuesta elegida y respuesta correcta.
- Listening Level Check avanzaba directamente al siguiente audio. Ahora exige enviar el bloque actual, muestra correcciones y habilita la transcripción antes de avanzar.
- Los metadatos de General, Grammar y Reading contenían rutas absolutas de Windows. Se sustituyeron por nombres de documento portables.
- Los validadores existentes no cubrían términos de Vocabulary, IDs ausentes, transcripciones ni IDs de preguntas duplicados entre audios. Se amplió `questionValidation.js` y las advertencias se ejecutan solamente en desarrollo.
- Typing no mostraba el fragmento actual explícitamente. Se añadió `Palabra actual` y se mantuvo el scroll proporcional dentro del contenedor de referencia.
- Había referencias editoriales visibles a una función retirada en README y mensajes de Writing. Se eliminaron sin crear rutas o componentes nuevos.

## Rutas auditadas

Rutas canónicas funcionales:

- `/work-english-test`
- `/work-english-test/general-test`
- `/work-english-test/work-test`
- `/work-english-test/grammar-practice`
- `/work-english-test/vocabulary-practice`
- `/work-english-test/reading-practice`
- `/work-english-test/listening-practice`
- `/work-english-test/writing-practice`
- `/work-english-test/typing-test`
- `/recursos`, `/calculadoras`, `/comunidad`, `/ofertas` y `/sobre-turnon`

El proyecto conserva `HashRouter`. No se encontró `BrowserRouter`.

## Datos auditados

- General English Test: 50 preguntas válidas en `src/data/generalEnglishTestQuestions.js`.
- Work English Test: 50 preguntas válidas expuestas por `src/data/workEnglishTestQuestions.js`.
- Grammar: 150 preguntas, 15 por cada uno de 10 temas.
- Vocabulary: 9 módulos y 135 términos.
- Reading: 30 escenarios y 150 preguntas.
- Listening: 5 audios y 25 preguntas.
- Writing: 22 prompts.
- Typing: 18 textos clasificados en Easy, Intermediate y Hard.

Todos los bancos pasaron las validaciones de IDs, opciones/respuestas, explicaciones y estructura aplicables.

## Archivos afectados

Archivos creados:

- `CLEANUP_REPORT.md`

Archivos modificados:

- `README.md`
- `src/App.jsx`
- `src/data/generalEnglishTestQuestions.js`
- `src/data/grammarPracticeQuestions.js`
- `src/data/readingPracticeScenarios.js`
- `src/pages/EnglishTest.jsx`
- `src/pages/GrammarPractice.jsx`
- `src/pages/ListeningPractice.jsx`
- `src/pages/ReadingPractice.jsx`
- `src/pages/TypingTest.jsx`
- `src/pages/VocabularyPractice.jsx`
- `src/pages/WritingPractice.jsx`
- `src/utils/questionValidation.js`
- `src/utils/vocabularyQuiz.js`
- `src/utils/writingPractice.js`

Archivos eliminados:

- Ninguno. `src/data/englishQuestions.js` parece antiguo por nombre, pero sigue siendo una dependencia activa de `workEnglishTestQuestions.js`; se conservó porque no cumple las reglas de eliminación segura.

## Recursos fuente y contenido no reconstruido

La carpeta solicitada `C:\Users\jason\OneDrive\Desktop\recursos` no existe en el entorno durante esta auditoría. Por ello:

- documentos Word leídos en esta ejecución: 0;
- preguntas importadas desde Word en esta ejecución: 0;
- audios copiados en esta ejecución: 0;
- se conservaron los cinco audios ya versionados en `public/audio/listening/`;
- se conservaron los bancos locales existentes en `src/data/`;
- Listening permanece con 25 preguntas, no con las 42 esperadas;
- Typing conserva 18 textos existentes y no puede confirmarse como reconstruido exclusivamente desde `fase_3_5_typing_test_reference_texts.docx`.

No se inventó contenido para cubrir archivos fuente ausentes.

## Persistencia y compatibilidad

- No se encontró uso de `localStorage` ni `sessionStorage` en `src/`.
- No se añadieron backend, Supabase, Firebase, login, panel admin ni IA.
- No hay rutas absolutas de Windows en el código de producción de `src/`.
- La aplicación sigue siendo React + Vite estática y compatible con despliegue de `dist/` en Hostinger o BanaHosting.

## Verificación funcional

- Las rutas canónicas cargaron con contenido principal mediante `HashRouter`.
- General English Level Test inició, aceptó respuestas, produjo resultado y mostró revisión de 50 preguntas.
- Work Test, Grammar Level Check, Work Vocabulary Check y Reading Level Check iniciaron con cuatro opciones por pregunta.
- Vocabulary completó un mini examen de 20 preguntas y mostró 20 elementos de revisión.
- Listening mantuvo cinco preguntas bajo un solo audio, bloqueó el avance hasta enviar, mostró cinco correcciones y la transcripción, y cambió realmente el `audioUrl` al avanzar.
- Writing inició un prompt, contó palabras, actualizó temporizador y calculó WPM.
- Typing mostró sólo las tres dificultades y duraciones 1, 3 y 5; aceptó escritura, mostró la palabra actual, calculó métricas, bloqueó el textarea al terminar y mostró resultado orientativo.
- La consola del navegador no registró errores ni advertencias durante las comprobaciones realizadas.

## Problemas pendientes

- Para completar la importación documental exigida deben volver a estar disponibles los seis `.docx` y las fuentes de Listening en `C:\Users\jason\OneDrive\Desktop\recursos`.
- Sin `fase_3_5_listening_practice_questions.docx` no es posible reconstruir las 42 preguntas esperadas de Listening.
- Sin `fase_3_5_typing_test_reference_texts.docx` no es posible reemplazar ni certificar los textos actuales como contenido completo del documento fuente; algunos son demasiado cortos para provocar scroll visible aunque el contenedor y la lógica de auto-scroll estén implementados.
