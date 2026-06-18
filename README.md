# turnon-portal — FASE 2

Portal web estático de TurnOn. La FASE 2 corrige la calculadora laboral a dólares estadounidenses e incorpora Work English Test v1, una evaluación local de 50 preguntas con resultado por skill y nivel.

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
│   ├── utils/         Funciones de cálculo sin persistencia
│   ├── styles/        Estilos globales
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Los contenidos reutilizables están separados de los componentes en `src/data/`:

- `resources.js`: recursos y guías;
- `offers.js`: ofertas;
- `communityLinks.js`: enlaces de comunidad;
- `laborRules.js`: reglas de cálculo laboral;
- `englishPractice.js`: estructura del futuro Work English Test;
- `englishQuestions.js`: 50 preguntas locales de grammar, vocabulary y reading.
- `siteContent.js`: navegación y contenido general.

La lógica de puntuación está en `src/utils/englishScoring.js`. La calculadora laboral y sus validaciones están en `src/utils/laborCalculator.js`; sus multiplicadores orientativos permanecen centralizados en `src/data/laborRules.js`.

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

1. Ejecuta `npm run build`.
2. Abre el administrador de archivos o conéctate por FTP/SFTP al hosting.
3. Entra en el directorio público del dominio, normalmente `public_html/`.
4. Sube **el contenido** de `dist/` (no la carpeta del código fuente).
5. Comprueba que `index.html` esté directamente dentro de `public_html/`.
6. Abre el dominio y verifica la navegación. Esta fase usa rutas con `#`, por lo que no requiere reglas especiales de redirección.

## Alcance de la FASE 2

Esta fase no utiliza backend, Supabase, Firebase, login, IA, `localStorage`, `sessionStorage` ni panel administrativo. Los datos viven en archivos reales versionados dentro de `src/data/`. La calculadora usa USD y mantiene entradas transitorias sólo en memoria. Work English Test v1 funciona localmente y no guarda respuestas al cerrar o recargar el sitio.

Si una fase futura permite crear, editar o eliminar contenido, debe incorporarse Supabase, un backend propio o un sistema formal de exportación/importación; el almacenamiento del navegador no será la fuente principal.
