# Main Test Results Visual Update

## Alcance

Se rediseñó únicamente la presentación final de resultados de:

- `/work-english-test/general-test`
- `/work-english-test/work-test`

No se modificaron introducciones, preguntas activas, opciones, bancos, respuestas correctas, explicaciones, puntuación, niveles, thresholds funcionales, aleatoriedad ni distribución.

Commit de respaldo:

`722d033fb28dd21ae6f0d206044f8892ddde3a82` — `Backup before main test result redesign`

## Componentes modificados

- `src/components/TestResults.jsx`
- `src/components/AnswerReview.jsx`
- `src/pages/GeneralEnglishTest.jsx`
- `src/pages/WorkEnglishTestExam.jsx`
- `src/styles/design-system.css`

## Componentes reutilizados

- `TestResults`
- `AnswerReview`
- `Link` de React Router para acciones reales
- Sistema visual scoped de `.main-english-test-page`

## Componentes internos creados

Dentro de `TestResults.jsx`:

- `ResultStat`: presenta Correctas, Incorrectas y Total.
- `ScoreBreakdown`: presenta puntuaciones por skill o nivel con cantidad, porcentaje derivado y barra accesible.

No se creó un sistema duplicado por test. General y Work reutilizan la misma presentación mediante la prop `variant`.

## Resultado principal

La cabecera final se presenta sobre fondo blanco:

- eyebrow azul;
- nivel real devuelto por `scoreEnglishTest`;
- tipografía Anton;
- título de tamaño editorial;
- porcentaje destacado;
- etiqueta textual de contexto;
- descripción real devuelta por la lógica.

Eyebrows:

- General: `RESULTADO ORIENTATIVO`
- Work: `RESULTADO DE INGLÉS PARA TRABAJO`

El tono visual se deriva del nivel ya calculado:

- Pre-A1, A1 y A2: naranja con texto `Área a reforzar`;
- B1: azul con texto `Progreso en desarrollo`;
- B2 y C1: verde de marca/neón con texto `Buen desempeño`.

Esta clasificación solo selecciona estilos y una etiqueta visual. No interviene en la puntuación ni modifica el nivel.

## Card azul de estadísticas

La nueva card `result-statistics` utiliza:

- fondo azul `#155CFF`;
- tres columnas en escritorio;
- radio de 30 px;
- padding amplio;
- divisores blancos suaves;
- números Anton grandes.

Estadísticas:

- Correctas: verde neón `#BEFF35`;
- Incorrectas: naranja `#EE7C32`;
- Total: blanco.

`Incorrectas` se obtiene exclusivamente como `total - correct`, sin modificar el resultado original.

## Información secundaria

Se conservan:

- puntaje por Grammar, Vocabulary y Reading;
- puntaje por nivel;
- temas fuertes;
- temas a mejorar;
- recomendación.

Cada breakdown muestra:

- correctas sobre total;
- porcentaje derivado del mismo par correctas/total;
- barra visual con `role="progressbar"` y valores ARIA.

Los temas fuertes mantienen acento verde y los temas a mejorar acento naranja.

## Mensaje orientativo

General:

`Este resultado es una estimación orientativa de tu desempeño en Grammar, Vocabulary y Reading. No funciona como certificación oficial.`

Work:

`Este resultado es una estimación orientativa de tu inglés aplicado al trabajo. No funciona como certificación oficial.`

## Revisión de respuestas

Se conserva el componente compartido `AnswerReview`.

Para los dos tests principales:

- título `REVISAR RESPUESTAS` grande;
- botón circular naranja al cerrar y verde al abrir;
- `aria-expanded="false"` cerrado;
- `aria-expanded="true"` abierto;
- correctas con fondo verde suave, borde verde y badge `Correcta`;
- incorrectas con fondo naranja suave, borde naranja y badge `Incorrecta`;
- pregunta, respuesta del usuario, respuesta correcta y explicación;
- 50 explicaciones por intento.

La prop `exposeExpandedState` limita el nuevo estado ARIA explícito a estos dos tests. Grammar Practice y los demás módulos conservan su comportamiento.

Abrir y cerrar la revisión no modifica resultado, respuestas ni estadísticas.

## Acciones finales

General:

- Repetir test
- Volver a Work English Test
- Practicar Grammar
- Practicar Vocabulary
- Practicar Reading

Work:

- Repetir test
- Volver a Work English Test
- Practicar por habilidad

Los botones secundarios usan azul, texto blanco y hover verde neón. Todas las rutas ya existían.

## Colores

- Fondo general: `#FFFFFF`
- Verde oscuro: `#0D211B`
- Verde neón: `#BEFF35`
- Azul TurnOn: `#155CFF`
- Naranja: `#EE7C32`
- Texto secundario: `#5D6678`
- Bordes azules suaves mediante `rgba(21, 92, 255, …)`

No se agregó una fuente nueva.

## Validación funcional

### General English Level Test

- 50 preguntas y 50 IDs únicos.
- 20 Grammar.
- 15 Vocabulary.
- 15 Reading.
- Resultado probado: 12 correctas, 38 incorrectas, total 50 y 24%.
- Breakdown por skill y nivel consistente.
- 50 cards de revisión y 50 explicaciones.
- Abrir/cerrar mantuvo `[12, 38, 50]`.

### Work English Test

- 50 preguntas y 50 IDs únicos.
- 30 Grammar.
- 10 Vocabulary.
- 10 Reading.
- Resultado probado: 20 correctas, 30 incorrectas, total 50 y 40%.
- Breakdown por skill consistente.
- Cuatro fortalezas y cuatro temas de mejora calculados.
- 50 cards de revisión y 50 explicaciones.
- Abrir/cerrar mantuvo `[20, 30, 50]`.

La selección de la primera opción en cada pregunta se utilizó únicamente para completar intentos de prueba. No se modificaron datos persistentes.

## Responsive

Viewports probados:

- 1440 × 900
- 1024 × 900
- 768 × 900
- 390 × 844
- 360 × 800

Comportamiento:

- 1440/1024: estadísticas en tres columnas y breakdown en dos.
- 768: estadísticas en tres columnas legibles y breakdown apilado.
- 390/360: estadísticas, cards y acciones en una columna.
- Títulos sin corte.
- Badges visibles.
- Revisión dentro del viewport.
- Sin scroll horizontal.

## Accesibilidad

- Headings semánticos.
- Etiquetas textuales además del color.
- `aria-expanded` sincronizado con el accordion.
- Barras con `role="progressbar"`.
- Foco visible existente conservado.
- Botones con áreas táctiles amplias.
- `prefers-reduced-motion` conservado.

## Validaciones técnicas

- Navegación HashRouter confirmada en ambas rutas.
- Consola del navegador sin errores.
- `npm run validate:data`: 91/91.
- Advertencia preexistente: falta el módulo esperado “Interview and Training” en el banco activo de vocabulario. No está relacionada con este cambio.

## Confirmación de lógica

No se modificaron:

- `src/data/`;
- `src/utils/englishScoring.js`;
- randomizers;
- rangos de nivel;
- thresholds funcionales;
- preguntas;
- opciones;
- respuestas correctas;
- explicaciones;
- footer;
- otros tests o prácticas.

## Problemas pendientes

Ninguno relacionado con la presentación o funcionamiento de los resultados.
