# Grammar Lessons Import Report

## Fuente

- Documento procesado: `C:\Users\jason\OneDrive\Desktop\recursos para turn on\fase_3_5_grammar_lessons_theory.docx`
- Fecha de modificación: 30 de julio de 2026, 18:12:10 (`America/Guatemala`)
- Tamaño: 80,035 bytes
- Estructura detectada: 921 párrafos, 237 tablas y una sección de Word
- Comentarios, notas al pie y notas al final: no detectados

El DOCX se procesó solamente durante desarrollo. La ruta local no está incluida en el código de producción.

## Resultado de importación

- Lecciones detectadas e importadas: 38
- Foundation (`A2-B1`): 12
- Intermediate (`B1-B2`): 14
- Advanced (`B2-C1`): 12
- Ejemplos detectados: 133
- Errores comunes detectados: 115
- Elementos de recapitulación: 114
- Listas teóricas: 38 listas con 123 elementos
- Bloques teóricos importados: 118 párrafos, 114 tablas y 40 comparaciones/callouts
- Lecciones con relación a Grammar Practice: 38
- Lecciones sin relación: 0
- Contenido incompleto detectado: ninguno

Las siete tablas de portada, mapa e instrucciones de implementación se conservaron como información de auditoría, pero no se publicaron como teoría. Las 230 estructuras tabulares pertenecientes a las lecciones —incluyendo `The key idea`, tablas teóricas, ejemplos, comparaciones, errores comunes y `Quick recap`— se trasladaron al archivo de datos.

## Lecciones y relaciones

Todas las lecciones contienen `The key idea`, introducción, cinco secciones (`How it works`, `When to use it`, `Examples`, `Compare the difference` y `Common mistakes`) y `Quick recap`.

| # | Lección | Nivel | Ejemplos | Errores | Tema(s) de práctica |
|---:|---|---|---:|---:|---|
| 01 | Basic Sentence Structure | A2-B1 | 3 | 3 | Advanced Grammar C1 |
| 02 | Present Simple | A2-B1 | 3 | 3 | Present Simple vs Present Continuous |
| 03 | Present Continuous | A2-B1 | 3 | 3 | Present Simple vs Present Continuous |
| 04 | Present Simple vs Present Continuous | A2-B1 | 3 | 3 | Present Simple vs Present Continuous |
| 05 | Past Simple | A2-B1 | 3 | 3 | Past Simple vs Present Perfect |
| 06 | Present Perfect: The Basics | A2-B1 | 3 | 3 | Past Simple vs Present Perfect |
| 07 | Past Simple vs Present Perfect | A2-B1 | 4 | 3 | Past Simple vs Present Perfect |
| 08 | Questions and Negative Sentences | A2-B1 | 4 | 3 | Present Simple vs Present Continuous |
| 09 | Articles: A, An, and The | A2-B1 | 3 | 3 | Advanced Grammar C1 |
| 10 | Countable and Uncountable Nouns | A2-B1 | 3 | 3 | Advanced Grammar C1 |
| 11 | Basic Modals | A2-B1 | 4 | 3 | Modals |
| 12 | Prepositions of Time and Place | A2-B1 | 3 | 3 | Prepositions |
| 13 | Future Forms | B1-B2 | 4 | 3 | Advanced Grammar C1 |
| 14 | Present Perfect Continuous | B1-B2 | 3 | 3 | Past Simple vs Present Perfect; Advanced Grammar C1 |
| 15 | Advanced Modals | B1-B2 | 4 | 3 | Modals |
| 16 | First Conditional | B1-B2 | 3 | 3 | Conditionals |
| 17 | Second Conditional | B1-B2 | 3 | 3 | Conditionals |
| 18 | Third Conditional | B1-B2 | 3 | 3 | Conditionals |
| 19 | Passive Voice | B1-B2 | 3 | 3 | Passive Voice |
| 20 | Relative Clauses | B1-B2 | 4 | 3 | Relative Clauses |
| 21 | Reported Speech | B1-B2 | 3 | 3 | Reported Speech |
| 22 | Gerunds and Infinitives | B1-B2 | 4 | 3 | Advanced Grammar C1 |
| 23 | Comparatives and Modifiers | B1-B2 | 3 | 3 | Advanced Grammar C1 |
| 24 | Prepositions in Context | B1-B2 | 4 | 3 | Prepositions |
| 25 | Connectors and Complex Sentences | B1-B2 | 4 | 3 | Connectors |
| 26 | Common Grammar Confusions | B1-B2 | 4 | 4 | Prepositions; Connectors; Modals |
| 27 | Mixed Conditionals | B2-C1 | 3 | 3 | Conditionals; Advanced Grammar C1 |
| 28 | Modal Deduction | B2-C1 | 4 | 3 | Modals; Advanced Grammar C1 |
| 29 | Advanced Passive Structures | B2-C1 | 4 | 3 | Passive Voice; Advanced Grammar C1 |
| 30 | Inversion for Emphasis | B2-C1 | 4 | 3 | Advanced Grammar C1 |
| 31 | Cleft Sentences | B2-C1 | 4 | 3 | Advanced Grammar C1 |
| 32 | Reduced Relative Clauses | B2-C1 | 3 | 3 | Relative Clauses; Advanced Grammar C1 |
| 33 | Participle Clauses | B2-C1 | 4 | 3 | Advanced Grammar C1 |
| 34 | Formal Subjunctive Structures | B2-C1 | 3 | 3 | Advanced Grammar C1 |
| 35 | Hedging and Cautious Language | B2-C1 | 4 | 3 | Advanced Grammar C1; Connectors |
| 36 | Nominalisation | B2-C1 | 4 | 3 | Advanced Grammar C1 |
| 37 | Advanced Connectors | B2-C1 | 4 | 3 | Connectors; Advanced Grammar C1 |
| 38 | Fronting and Emphasis | B2-C1 | 4 | 3 | Advanced Grammar C1 |

## Archivos y componentes

- Datos creados: `src/data/grammarLessons.js`
- Utilidad creada: `src/utils/grammarTopics.js`
- Componentes reutilizables:
  - `src/components/lessons/LessonGroupAccordion.jsx`
  - `src/components/lessons/LessonSidebar.jsx`
  - `src/components/lessons/LessonContent.jsx`
  - `src/components/lessons/LessonNavigation.jsx`
- Lesson Map: `src/pages/Lessons.jsx`
- Plantilla dinámica: `src/pages/LessonDetail.jsx`
- Rutas: `#/lessons` y `#/lessons/:lessonSlug`
- Estilos aislados: `src/styles/grammar-lessons.css`

Grammar Practice fue restaurado a su versión anterior a la integración de Lessons. `SectionGeneralTest` también recuperó su interfaz original y no conserva props exclusivas de la implementación con tabs.

## Validaciones realizadas

- 38 IDs únicos
- 38 slugs únicos
- títulos presentes
- contenido teórico no vacío
- cinco secciones válidas por lección
- 38 recapitulaciones presentes
- ausencia de contenido completo duplicado
- los diez IDs de temas activos se derivan con una normalización estable
- las 38 lecciones tienen al menos un tema relacionado existente
- no se guardó la ruta local del Word en `src/`
- no se agregó `localStorage`, `sessionStorage`, backend ni dependencia de Word en producción

## Limitación de revisión del documento

El renderizador DOCX no pudo generar las imágenes de página porque LibreOffice/`soffice` no está instalado en el entorno. La importación se validó estructuralmente mediante `python-docx` y el XML interno: orden de bloques, estilos, párrafos, listas, tablas, títulos, comentarios y notas. No se atribuye al documento una validación visual por páginas.
