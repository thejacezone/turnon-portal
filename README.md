# turnon-portal — FASE 3 beta

Portal web estático de TurnOn. La FASE 3 agrega recursos desarrollados con rutas de detalle, calculadora laboral multilínea en USD, ofertas ampliadas, comunidad organizada y mejoras al Work English Test.

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

## Preparar beta para hosting

1. Ejecutá `npm run build`.
2. Entrá a la carpeta `dist/`.
3. Subí **el contenido de `dist/`** a `public_html/` en Hostinger o BanaHosting.
4. No subás `node_modules/`.
5. No subás toda la carpeta del proyecto: sólo los archivos generados dentro de `dist/`.
6. El portal usa `HashRouter`, por eso las rutas públicas incluyen `#/` y funcionan sin reglas especiales del servidor.

## Alcance de la FASE 3

Esta fase no utiliza backend, Supabase, Firebase, login, IA, `localStorage`, `sessionStorage` ni panel administrativo. Los datos viven en archivos reales versionados dentro de `src/data/`. La calculadora usa USD y mantiene entradas transitorias sólo en memoria. Work English Test v1 funciona localmente y no guarda respuestas al cerrar o recargar el sitio.

Si una fase futura permite crear, editar o eliminar contenido, debe incorporarse Supabase, un backend propio o un sistema formal de exportación/importación; el almacenamiento del navegador no será la fuente principal.
