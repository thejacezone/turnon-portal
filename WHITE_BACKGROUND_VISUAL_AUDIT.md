# Auditoría visual de fondos blancos

## Alcance

Auditoría realizada sobre el proyecto existente `turnon-portal`. La corrección se limitó a fondos estructurales y al menú de navegación de las lecciones. No se modificaron rutas, contenido, lógica de tests, bancos de preguntas, cálculos, resultados ni el componente del footer.

La variable estructural central es:

```css
--page-background: #ffffff;
```

`--color-background` ahora referencia esa variable. Las superficies funcionales conservan sus variables y colores propios.

## Valores estructurales anteriores encontrados

- `#F5F2E9` en el fondo raíz y en `--color-background`.
- Un degradado radial verde sobre el fondo global del `body`.
- Degradados decorativos sobre blanco, verde suave y `#F8FAF4` en Home, encabezados generales y Lessons.
- `#EEF3FF` detrás de las dos cards principales de Work English Test.
- `#BEFF35` como fondo de la sección completa “Entrená por habilidad”.
- `--color-surface-soft` (`#FAF8F1`) en el antiguo índice lateral y móvil de las lecciones.

## Páginas revisadas

| Página / ruta | Fondo anterior | Fondo final | Secciones corregidas | Colores funcionales conservados |
|---|---|---|---|---|
| Inicio `/` | `body` crema con degradado; Hero y Objectives con gradientes; Objectives crema | Blanco | `body`, shell, main, Hero, Objectives y Featured Tests | MadTogo, plumas, cards verdes, cards lima, botones, texto de fondo y CTA final oscuro |
| Work English Test `/work-english-test` | `body` crema; Hero con halo azul; zona de cards `#EEF3FF`; práctica por habilidad lima | Blanco | Hero, zona de selección de tests y fondo de “Entrená por habilidad” | Cards azul/blanca, cards de habilidad, hover naranja, badges, plumas y botones |
| General English Level Test `/work-english-test/general-test` | Lienzo global crema alrededor del componente | Blanco | `body`, shell, main y wrapper del test | Intro, opciones, progreso, resultados, revisión y estados correcto/incorrecto |
| Work English Test especializado `/work-english-test/work-test` | Lienzo global crema alrededor del componente | Blanco | `body`, shell, main y wrapper del test | Intro, opciones, progreso, resultados, revisión y estados |
| Grammar Practice `/work-english-test/grammar-practice` | Reglas contextuales blancas sobre una base global antigua | Blanco | Base global y wrapper de práctica | Filtros azules, runner azul, respuestas, feedback y resultados |
| Vocabulary Practice `/work-english-test/vocabulary-practice` | Reglas contextuales blancas sobre una base global antigua | Blanco | Base global y wrapper de práctica | Cards, filtros, flashcards, quiz y resultados |
| Reading Practice `/work-english-test/reading-practice` | Reglas contextuales blancas sobre una base global antigua | Blanco | Base global y wrapper de práctica | Cards, pasajes, preguntas, vocabulario, feedback y resultados |
| Listening Practice `/work-english-test/listening-practice` | Reglas contextuales blancas sobre una base global antigua | Blanco | Base global y wrapper de práctica | Cards, reproductor, preguntas, transcripciones y resultados |
| Writing Practice `/work-english-test/writing-practice` | Reglas contextuales blancas sobre una base global antigua | Blanco | Base global y wrapper de práctica | Cards, textarea, tips, métricas y resultados |
| Typing Test `/work-english-test/typing-test` | El feature conservaba una variable `--paper` crema, aunque la página ya tenía override parcial | Blanco estructural | Base global, wrapper y superficie externa del feature | Paneles azules, textarea, referencia, métricas, resultados y estados de caracteres |
| Lessons `/lessons` | `body` crema; Hero con gradientes; espacio de accordions crema | Blanco | Hero del mapa y fondo alrededor de accordions | Cards Foundation/Intermediate/Advanced, paneles desplegados, links azules, badges y hovers |
| Lección `/lessons/basic-sentence-structure` | `body` crema; header con gradiente hacia `#F8FAF4`; índice claro | Blanco | Header, página, layout detrás del contenido | Tablas, ejemplos, reglas, errores, recap, navegación anterior/siguiente y badges |
| Recursos `/recursos` | Base global crema; Hero con halo azul | Blanco | Base global, wrapper y Hero | Filtros azules, cards, badges, hover naranja y CTAs |
| Detalle de recurso `/recursos/cv-guia` | Base global crema | Blanco | `body`, shell, main y wrapper de detalle | Cards de contenido, errores, recomendación y estado |
| Calculadoras `/calculadoras` | Base global crema; Hero con halo azul | Blanco | Base global, wrapper y Hero | Calculadora azul, campos, resumen, total lima y alerta |
| Comunidad `/comunidad` | Base global crema; Hero con halo azul | Blanco | Base global, wrapper y Hero | Cards, iconos, links y bloque azul de reglas |
| Ofertas `/ofertas` | Base global crema; Hero con halo azul | Blanco | Base global, wrapper y Hero | Cards, badges, botones y estados |
| Detalle de oferta `/ofertas/liberty-mutual-upl` | Base global crema | Blanco | `body`, shell, main y wrapper de detalle | Facts, cards de requisitos/beneficios, CTA y disclaimer |
| Sobre TurnOn `/sobre-turnon` | Base global crema; Hero con halo azul | Blanco | Base global, wrapper y Hero | Panel azul, lista de valores, botón lima y cards |
| 404 `*` | Base global crema con degradado | Blanco | `body`, shell, main y wrapper 404 | CTA y tipografía |

No existen rutas de términos, privacidad o reporte de problemas en `src/App.jsx`; por lo tanto no hubo páginas adicionales de ese tipo que corregir.

## Lesson index

- Contenedor desktop: azul TurnOn `#155CFF`, texto blanco, borde translúcido y sombra sutil.
- Posición desktop: conserva `position: sticky` y `top: 92px`.
- Estado normal: fondo transparente y texto blanco.
- Hover: naranja `#EE7C32` con texto verde oscuro `#0D211B`.
- Activo: verde neón `#BEFF35`, texto `#0D211B` e indicador azul.
- Foco: outline verde neón, visible y separado del control.
- Móvil: se conserva el `<details>` colapsable “Contenido de la lección”; ocupa el ancho disponible, usa fondo azul y replica los estados normal, hover, activo y foco.
- Las opciones se generan desde las secciones realmente existentes en cada lección.

## Componentes de color preservados

- Cards verdes, azules, lima y naranjas.
- Cards del Lesson map y listas desplegadas.
- Botones, badges, filtros y barras de progreso.
- Resultados, alertas y feedback correcto/incorrecto.
- Paneles internos azules de tests y prácticas.
- Inputs, textareas, cards de ejemplo, reglas, errores y recap.
- CTA final oscuro de Home.
- Footer completo.

## Footer

`src/components/Footer.jsx` no fue modificado. Tampoco se editaron sus selectores CSS. En las verificaciones responsive mantuvo fondo `#0D211B`, texto blanco, estructura, links, tipografía y espaciado existentes.

## Verificación responsive

Se revisaron las 20 rutas anteriores en:

- 1440 px
- 1024 px
- 768 px
- 390 px
- 360 px

Resultado de 100 comprobaciones:

- `body`, `.app-shell` y `main` muestran un lienzo blanco.
- No se detectó scroll horizontal.
- Las cards de color permanecen visibles.
- La sidebar de Lessons aparece en escritorio.
- El índice móvil reemplaza la sidebar por debajo de 860 px.
- El footer mantuvo su paleta original.

## Archivos modificados

- `src/styles/global.css`
- `src/styles/design-system.css`
- `src/styles/grammar-lessons.css`
- `WHITE_BACKGROUND_VISUAL_AUDIT.md`

## Problemas pendientes

No se detectaron problemas funcionales o visuales pendientes dentro del alcance. Las rutas legales y de reporte mencionadas en la solicitud no existen actualmente en el router.
