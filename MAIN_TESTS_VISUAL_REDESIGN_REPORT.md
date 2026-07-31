# Main English Tests Visual Redesign

## Alcance

Se unificó la experiencia visual de:

- `/work-english-test/general-test`
- `/work-english-test/work-test`

El cambio se limitó a la presentación de introducción, preguntas, Reading, resultados, revisión y acciones posteriores. No se modificaron bancos, respuestas correctas, puntuación, selección aleatoria ni distribución por sección.

Commit de respaldo: `10d3620d9d9471cdf5ad2b8f19d5ec34b5059aad` (`Backup before redesigning main English tests`).

## Páginas modificadas

- `src/pages/GeneralEnglishTest.jsx`
- `src/pages/WorkEnglishTestExam.jsx`

Ambas páginas recibieron una clase de alcance exclusiva, diferenciada por test y fase. Sus funciones de inicio, selección, navegación, puntuación y repetición permanecen sin cambios.

## Componentes reutilizados

- `TestIntro`: hero compartido para los dos tests.
- `TestProgress`: progreso accesible con el total real de 50.
- `TestQuestion`: pregunta, opciones y presentación de Reading.
- `TestResults`: resultado principal, puntuaciones secundarias y acciones.
- `AnswerReview`: accordion nativo de revisión.

Estos componentes de preguntas/resultados son utilizados por los dos tests principales. Los estilos nuevos se aplican únicamente cuando están dentro de `.main-english-test-page`, por lo que Grammar Practice y las demás prácticas no reciben cambios visuales globales.

## Componentes creados

No se crearon componentes nuevos. Se amplió la API visual de los componentes compartidos existentes:

- `TestIntro` acepta un eyebrow específico.
- `TestResults` acepta acciones reales por ruta y etiqueta de repetición.
- `TestQuestion` separa visualmente pasaje y pregunta cuando la skill es Reading, sin modificar el objeto original.

## Heroes

### General English Level Test

- Eyebrow: `GENERAL ENGLISH LEVEL TEST`
- Título: `Medí tu nivel de inglés`
- Información: 50 preguntas, distribución 20/15/15, duración y resultado orientativo.
- CTA: `Comenzar test`

### Work English Test

- Eyebrow: `WORK ENGLISH TEST`
- Título: `Inglés para trabajar`
- Información: 50 preguntas, distribución 30/10/10, aleatoriedad y duración.
- CTA: `Hacer test de inglés para trabajo`

Los dos heroes usan:

- fondo `#155CFF`;
- texto blanco;
- título Anton;
- CTA `#BEFF35`;
- hover `#EE7C32`;
- foco blanco visible;
- fondo estructural blanco alrededor.

## Preguntas y opciones

- Runner azul `#155CFF`.
- Indicadores de sección y progreso verde neón.
- Pregunta blanca, grande y legible.
- Opciones blancas completas y clickeables.
- Hover y seleccionada en `#BEFF35`.
- Seleccionada con borde `#07152F` y `aria-pressed="true"`.
- Foco visible naranja.
- Navegación anterior/siguiente con estados diferenciados y disabled visible.

## Reading

La capa de presentación identifica preguntas de skill `reading`.

- Cuando existen `passage`, `passageTitle` y `passageId`, reutiliza esos campos sin alterarlos.
- Cuando el General Test contiene título, pasaje y pregunta dentro del texto, separa los bloques solo para renderizarlos.
- Escritorio: pasaje y pregunta en dos columnas.
- Desde 900 px: pasaje arriba y pregunta debajo.
- Pasaje blanco con texto oscuro, buena altura de línea y sin scroll horizontal.

Se comprobó en el navegador que los títulos y prompts correspondían al mismo pasaje en ambos tests.

## Resultados

- Hero principal verde oscuro `#0D211B`.
- Nivel y anillo de puntuación en `#BEFF35`.
- Cards secundarias blancas con borde azul suave.
- Puntaje por skill y por nivel preservado.
- Temas fuertes con acento verde.
- Temas a mejorar con acento naranja.
- Recomendación en panel azul.
- Layout de dos columnas en escritorio y una columna en móvil.

Acciones del General Test:

- Repetir test
- Volver a Work English Test
- Practicar Grammar
- Practicar Vocabulary
- Practicar Reading

Acciones del Work Test:

- Repetir test
- Volver a Work English Test
- Practicar por habilidad

Todas las rutas utilizadas ya existen.

## Revisión de respuestas

- Accordion nativo `<details>/<summary>`.
- Título grande, foco visible e indicador abrir/cerrar.
- 50 cards por intento.
- Correctas: fondo verde suave, borde verde y badge `Correcta`.
- Incorrectas: fondo naranja suave, borde naranja y badge `Incorrecta`.
- Cada card conserva pregunta, respuesta del usuario, respuesta correcta y explicación.
- El estado no depende únicamente del color.

## Estilos anteriores sustituidos

Dentro de `.main-english-test-page` se reemplazó la apariencia crema y compacta por:

- fondo general blanco;
- hero y runner azules;
- resultado principal verde oscuro;
- acciones verde neón;
- atención y errores naranja;
- cards secundarias blancas;
- radios, padding, tipografía y jerarquía equivalentes al sistema actual de Grammar Practice.

No se alteró el footer.

## Validación funcional

### General English Level Test

- Intento completo: 50 preguntas.
- IDs únicos: 50.
- Grammar: 20.
- Vocabulary: 15.
- Reading: 15.
- Navegación hacia delante y atrás correcta.
- Respuesta seleccionada conservada al volver.
- Resultado total, skill y nivel generado.
- Revisión: 50 explicaciones.
- Repetir limpió respuestas y generó un primer ID diferente.

### Work English Test

- Intento completo: 50 preguntas.
- IDs únicos: 50.
- Grammar: 30.
- Vocabulary: 10.
- Reading: 10.
- Resultado total y por skill generado.
- Revisión: 50 cards y 50 explicaciones.
- Repetir limpió respuestas y generó un primer ID diferente.

La validación de datos pasó `91/91`. Se mantiene una advertencia informativa preexistente sobre el módulo de vocabulario “Interview and Training”; no está relacionada con esta tarea.

## Responsive

Viewports probados:

- 1440 × 900
- 1024 × 900
- 768 × 900
- 390 × 844
- 360 × 800

Se realizaron 30 comprobaciones combinadas de estado y viewport:

- heroes de ambos tests;
- pregunta activa;
- Reading;
- resultados;
- revisión abierta.

Resultado:

- sin scroll horizontal;
- títulos sin desbordamiento;
- CTAs de ancho completo en móvil;
- opciones apiladas;
- navegación táctil;
- Reading en una columna;
- resultados y acciones en una columna;
- cards de revisión dentro del viewport.

## Accesibilidad

- Headings semánticos.
- Opciones como botones reales.
- `aria-pressed` en la opción seleccionada.
- Barra con `role="progressbar"` y valores ARIA.
- Reading con article y nombre accesible.
- Accordion nativo con estado expandido.
- Badges textuales `Correcta` / `Incorrecta`.
- Áreas táctiles amplias.
- `focus-visible` en CTAs, opciones, navegación, revisión y acciones.
- `prefers-reduced-motion` global conservado.

## Archivos modificados

- `src/App.jsx`
- `src/components/TestIntro.jsx`
- `src/components/TestQuestion.jsx`
- `src/components/TestResults.jsx`
- `src/pages/GeneralEnglishTest.jsx`
- `src/pages/WorkEnglishTestExam.jsx`
- `src/styles/design-system.css`
- `MAIN_TESTS_VISUAL_REDESIGN_REPORT.md`

## Problemas pendientes

Ninguno relacionado con el rediseño visual o el funcionamiento de los dos tests.
