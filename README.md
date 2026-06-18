# turnon-portal

Portal web estático de TurnOn — FASE 1. Reúne recursos laborales, preparación para empleos bilingües, inglés para trabajo, una calculadora de horas, ofertas/referidos y comunidad. No permite crear, editar ni eliminar contenido desde la interfaz.

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
- `siteContent.js`: navegación y contenido general.

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

## Alcance de la FASE 1

Esta fase no utiliza backend, Supabase, Firebase, login, IA, `localStorage`, `sessionStorage` ni panel administrativo. Los datos viven en archivos reales versionados dentro de `src/data/`. La calculadora sólo mantiene entradas transitorias en memoria y no guarda información. El Work English Test presenta únicamente su estructura visual; su evaluación se implementará en otra fase.

Si una fase futura permite crear, editar o eliminar contenido, debe incorporarse Supabase, un backend propio o un sistema formal de exportación/importación; el almacenamiento del navegador no será la fuente principal.
