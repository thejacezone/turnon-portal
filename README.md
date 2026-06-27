# turnon-portal — FASE 3.5 beta

Portal web estático de TurnOn. La FASE 3.5 agrega Grammar Practice funcional dentro de Work English Test e integra el banco principal como “Test 3 balanceado revisado”, manteniendo recursos, calculadora, ofertas y comunidad como sitio estático compatible con Hostinger/BanaHosting.

## Ubicación

`C:\Users\jason\Documents\Codex\turnon-portal`

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
├── index.html
├── package.json
└── vite.config.js
```

## Datos locales

Los contenidos reutilizables están separados de los componentes en `src/data/`:

- `resources.js`: recursos y guías;
- `offers.js`: ofertas;
- `communityLinks.js`: enlaces de comunidad;
- `laborRules.js`: reglas de cálculo laboral en USD;
- `englishPractice.js`: estructura de Work English Test y prácticas;
- `englishQuestions.js`: banco principal “Test 3 balanceado revisado” con 50 preguntas locales;
- `grammarPracticeQuestions.js`: preguntas de Grammar Practice por nivel, tema y contexto;
- `siteContent.js`: navegación y contenido general.

La lógica de puntuación está en `src/utils/englishScoring.js`. La validación interna de bancos de preguntas está en `src/utils/questionValidation.js`. La calculadora laboral y sus validaciones están en `src/utils/laborCalculator.js`; sus multiplicadores orientativos permanecen centralizados en `src/data/laborRules.js`.

## FASE 3.5 — Grammar Practice

Se agregó:

- ruta `#/work-english-test/grammar-practice`;
- botón de acceso desde `#/work-english-test`;
- filtros por nivel, tema y contexto;
- lista de temas disponibles;
- práctica de una pregunta por pantalla;
- revisión de respuesta con explicación;
- contador de progreso;
- resultado temporal con correctas, total, porcentaje, nivel, temas practicados y temas a reforzar.

Grammar Practice no guarda progreso todavía. Todo el estado de práctica vive sólo en memoria mientras la página está abierta.

## Work English Test principal

El banco principal está en `src/data/englishQuestions.js` y está identificado como `Test 3 balanceado revisado`.

Distribución esperada:

- 50 preguntas total;
- 20 grammar;
- 15 vocabulary;
- 15 reading;
- 10 preguntas por nivel: A1, A2, B1, B2 y C1.

El test principal mantiene resultado por skill, resultado por nivel, revisión de respuestas y recomendaciones.

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
