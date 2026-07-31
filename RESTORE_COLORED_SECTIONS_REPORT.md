# TurnOn — Restore Colored Sections Report

## Alcance y referencias de Git

- Proyecto auditado: `C:\Users\jason\Documents\Codex\turnon-portal`
- Commit funcional anterior usado como referencia visual: `e30ed50`
- Respaldo previo a la limpieza de fondos: `81a7e4c`
- Commit de la limpieza revisada: `51c84db` (`Unify page backgrounds and restyle lesson navigation`)
- Respaldo creado antes de esta corrección: `22620c2` (`Backup before restoring colored TurnOn sections`)
- Método: comparación selectiva del historial. No se revirtió ningún commit ni se restauraron archivos completos.

## Paleta confirmada

| Uso | Valor |
| --- | --- |
| Fondo estructural | `#FFFFFF` |
| Verde oscuro | `#0D211B` |
| Verde neón principal | `#BEFF35` |
| Verde neón de Typing | `#C8FF3D` |
| Azul TurnOn | `#155CFF` |
| Naranja de interacción | `#EE7C32` |
| Texto secundario | `#5E6964` / variante existente `#5D6678` |
| Bordes | `#D9DDD5` |

Se centralizaron `--turnon-blue: #155cff` y `--turnon-orange: #ee7c32` en `:root`. Se reutilizaron `--color-accent` y las variables locales ya existentes en lugar de crear nuevas variantes de marca.

## Cambios restaurados

### Superficies verdes

- `/work-english-test`: la sección completa **Entrená por habilidad** volvió a `#BEFF35`; las seis cards internas siguen blancas.
- `/work-english-test/typing-test`: la card inicial volvió a `#C8FF3D`, con texto `#07152F`, eyebrow azul y aviso interior blanco translúcido.
- `/`: se recuperó el acento radial verde del Hero y de la sección de objetivos sobre una base blanca.
- `/lessons`: se recuperó el acento radial verde del encabezado sobre una base blanca.
- `/lessons/:lessonSlug`: se recuperó el acento radial verde del encabezado sobre una base blanca.

Las superficies verdes que no habían sido anuladas se conservaron: cards principales del Home, lista destacada de pruebas, nivel abierto del mapa de Lessons, estado activo del Lesson index, badges y totales.

### Superficies azules

- `/work-english-test`: se recuperó el acento radial azul del encabezado sobre una base blanca.
- Páginas principales que usan `.page-hero`: se recuperó el acento radial azul compartido sobre una base blanca.
- `/lessons`: se recuperó el acento radial azul del encabezado, combinado con el acento verde y una base blanca.

Se verificaron y preservaron las superficies azules ya correctas: card de Work English Test, filtros y runners de prácticas, resultados, formularios de calculadoras, filtros de Recursos, reglas de Comunidad, panel de Sobre TurnOn, listas desplegadas de Lessons y Lesson index.

## Fondos blancos conservados

Permanecen en `#FFFFFF`:

- `body`, `main`, `.app-shell` y wrappers generales;
- fondo completo de cada página;
- espacios entre secciones;
- `.skills-tests-section`;
- área alrededor de las dos cards principales de `/work-english-test`;
- contenido teórico y layout de Lessons;
- cards de habilidades de `/work-english-test`;
- áreas estructurales de Typing;
- fondos generales de Inicio, tests, prácticas, Recursos, Calculadoras, Comunidad, Ofertas, Sobre TurnOn y 404.

No se restauraron los antiguos fondos generales crema, beige o gris. Los gradientes recuperados terminan siempre en `var(--page-background)`, cuyo valor es blanco.

## Revisión página por página

| Página | Fondo general | Verde intencional | Azul intencional | Blanco conservado |
| --- | --- | --- | --- | --- |
| Inicio | `#FFFFFF` | Acentos radiales, cards de objetivos y pruebas existentes | CTAs/iconos existentes | Hero, Objectives y Skills Tests tienen base blanca |
| Work English Test | `#FFFFFF` | Entrená por habilidad `#BEFF35` | Card Work Test `#155CFF` y acento del Hero | Área de cards y seis cards de habilidad |
| General English Level Test | `#FFFFFF` | Facts/progreso/resultados existentes `#BEFF35` | Superficies existentes del sistema de test | Fondo y espacio exterior |
| Work English Test especializado | `#FFFFFF` | Facts/progreso/resultados existentes `#BEFF35` | Superficies existentes del sistema de test | Fondo y espacio exterior |
| Grammar Practice | `#FFFFFF` | Controles/estados activos `#C8FF3D` | Filtros, runner y resumen por tema `#155CFF` | Página y resultado principal donde corresponde |
| Vocabulary Practice | `#FFFFFF` | Estados de flashcards `#C8FF3D` | Filtros, módulos, runner y resultados `#155CFF` | Página y campos internos |
| Reading Practice | `#FFFFFF` | Foco/estados `#C8FF3D` | Filtros, pasajes, preguntas y resultados `#155CFF` | Página y campos internos |
| Listening Practice | `#FFFFFF` | Acentos `#C8FF3D` | Player/runner y paneles `#155CFF` | Página y controles internos |
| Writing Practice | `#FFFFFF` | Foco/estados `#C8FF3D` | Workspace, tips y resultados `#155CFF` | Página y editor |
| Typing Test | `#FFFFFF` | Intro `#C8FF3D` | Formulario `#155CFF` | Página y espacio exterior |
| Lessons | `#FFFFFF` | Nivel abierto `#BEFF35` y acento del Hero | Links desplegados `#155CFF` | Página, sección y espacio alrededor |
| Lesson individual | `#FFFFFF` | Activo `#BEFF35` y acento de encabezado | Sidebar/índice móvil `#155CFF` | Contenido teórico |
| Recursos | `#FFFFFF` | Badges/CTAs existentes | Filtros `#155CFF` | Grid, cards y lectura |
| Detalle de recurso | `#FFFFFF` | Acentos existentes | Acentos existentes | Contenido principal |
| Calculadoras | `#FFFFFF` | Total `#BEFF35` | Formulario `#155CFF` | Card exterior y entorno |
| Comunidad | `#FFFFFF` | Acentos/hover existentes | Reglas `#155CFF` | Grid y espacios |
| Ofertas | `#FFFFFF` | CTAs `#C8FF3D` | Bordes/hover/CTAs `#155CFF` | Cards y entorno |
| Sobre TurnOn | `#FFFFFF` | Eyebrow/CTA `#C8FF3D` | Panel destacado `#155CFF` | Grid y entorno |
| 404 | `#FFFFFF` | Acentos globales | Acentos globales | Fondo y contenedor |

No existen rutas legales independientes registradas actualmente en `App.jsx`; por tanto no hubo una página legal adicional que modificar.

## Lessons

- El nivel abierto usa verde neón.
- Las listas desplegadas usan fondo `#155CFF`, texto blanco, flecha verde, hover azul más oscuro y foco verde visible.
- El Lesson index usa fondo `#155CFF`, texto blanco, activo `#BEFF35` con texto `#0D211B` y hover `#EE7C32`.
- En móvil, el índice adaptable conserva la misma jerarquía cromática.

## Typing Test

- Hay una sola card inicial; no se agregó ni restauró un header duplicado.
- Título confirmado: `Typing test laboral`.
- La explicación de WPM permanece presente.
- El botón existente `Start Test` se conserva como acción para iniciar.
- Intro: `#C8FF3D`; formulario: `#155CFF`; fondo general: `#FFFFFF`.

## Reglas corregidas

- `.skills-practice-section` había quedado anulada a blanco; se restauró a `var(--color-accent)`.
- Los acentos visuales de `.madtogo-hero`, `.objectives-section`, `.work-test-page-hero`, `.page-hero`, `.lessons-map-hero` y `.lesson-detail-header` se recuperaron con el color histórico, conservando blanco como capa base.
- No se agregó ningún `!important`.
- No existe una regla global nueva que fuerce `.section`, `.card` o `.panel` a blanco.

## Verificación

- `npm run build`: correcto.
- HashRouter: las 19 rutas auditadas cargaron correctamente.
- Responsive: 19 rutas por 5 viewports (`1440`, `1024`, `768`, `390` y `360`), 95 combinaciones sin scroll horizontal.
- Consola del navegador: sin errores.
- Footer: fondo `#0D211B`, texto blanco; archivo y estilos sin cambios.
- Datos, bancos, rutas, navegación, cálculos y lógica: sin cambios.

## Archivos modificados

- `src/styles/design-system.css`
- `src/styles/grammar-lessons.css`
- `src/features/typing-test/styles/typingTest.css`
- `src/features/typing-test/components/SetupScreen.jsx`
- `RESTORE_COLORED_SECTIONS_REPORT.md`

## Problemas pendientes

Ninguno relacionado con esta restauración visual.
