# Work English Test — reporte de actualización

## Documento fuente

- Documento: `C:\Users\jason\OneDrive\Desktop\recursos para turn on\work_specialized_full_test.docx`
- Última modificación local: `2026-07-11 16:18:10` (America/Guatemala)
- Última modificación UTC: `2026-07-11 22:18:10`
- Tamaño: `60,025 bytes`
- SHA-256: `6319F68E3F6B6A23765DFFB8C1A51AD0181671CF13331AF309C2897B8F2B0F3C`
- Método: extracción de `word/document.xml` desde el paquete OOXML mediante `scripts/import_work_english_test.ps1`.

El documento no contiene inserciones o eliminaciones con control de cambios, comentarios ni cuadros de texto. La estructura detectada contiene 60 preguntas de Grammar, 20 de Vocabulary y cuatro pasajes de Reading con cinco preguntas cada uno.

## Comparación con el banco anterior

| Estado | Total | Grammar | Vocabulary | Reading |
| --- | ---: | ---: | ---: | ---: |
| Banco anterior | 50 | 20 | 15 | 15 |
| Documento fuente | 100 | 60 | 20 | 20 |
| Banco activo final | 100 | 60 | 20 | 20 |

- Coincidencias por texto normalizado con el banco anterior: **0**
- Preguntas importadas desde la nueva fuente: **100**
- Preguntas anteriores no incluidas en la nueva fuente: **50**
- Duplicados omitidos: **0**
- Preguntas incompletas rechazadas: **0**
- Preguntas pendientes de revisión: **0**

Las 50 preguntas anteriores permanecen en `src/data/englishQuestions.js` como contenido histórico no activo. No se mezclaron con la nueva fuente y no fueron eliminadas automáticamente.

## Banco activo

- Archivo: `src/data/workEnglishTestQuestions.js`
- Componente: `src/pages/WorkEnglishTestExam.jsx`
- Utilidad de selección: `src/utils/workEnglishTestRandomizer.js`
- Ruta: `#/work-english-test/work-test`
- Fuente declarada en datos: `work_specialized_full_test.docx`

Validaciones:

- IDs únicos: **100**
- Textos únicos: **100**
- Cuatro opciones: **100**
- Respuestas correctas incluidas en las opciones: **100**
- Explicaciones presentes: **100**
- Pasajes completos: **4 de 5 preguntas cada uno**

## Distribución por nivel

| Sección | B1 | B2 | C1 | Total |
| --- | ---: | ---: | ---: | ---: |
| Grammar | 20 | 24 | 16 | 60 |
| Vocabulary | 6 | 8 | 6 | 20 |
| Reading | 5 | 10 | 5 | 20 |
| **Total** | **31** | **42** | **27** | **100** |

Pasajes:

- `RSET1` — B1 — The Peer Learning Program
- `RSET2` — B2 — A New Self-Service Customer Portal
- `RSET3` — B2 — Digital Property Claim Review
- `RSET4` — C1 — Using Calibration to Interpret Service Quality

## Lógica del intento

Cada intento se crea una sola vez al iniciar o repetir y se almacena en estado de React. La utilidad:

1. valida el banco completo;
2. selecciona 30 Grammar con distribución 10 B1, 12 B2 y 8 C1;
3. selecciona 10 Vocabulary con distribución 3 B1, 4 B2 y 3 C1;
4. selecciona una lectura B1 y una lectura avanzada B2 o C1;
5. conserva completas las cinco preguntas de cada pasaje;
6. concatena Grammar, Vocabulary y Reading sin mezcla global;
7. valida 50 IDs únicos y las posiciones 1–30, 31–40 y 41–50;
8. evita repetir el mismo conjunto de pasajes consecutivamente cuando hay alternativas.

No se mezclan las opciones y no se usa `localStorage`, `sessionStorage`, cookies, Supabase, Firebase ni backend.

## Cinco intentos simulados

| Intento | Total | Grammar | Vocabulary | Reading | Grammar B1/B2/C1 | Vocabulary B1/B2/C1 | Pasajes | IDs únicos | Igual al anterior |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- | ---: | --- |
| 1 | 50 | 30 | 10 | 10 | 10/12/8 | 3/4/3 | RSET1 + RSET3 | 50 | No |
| 2 | 50 | 30 | 10 | 10 | 10/12/8 | 3/4/3 | RSET1 + RSET2 | 50 | No |
| 3 | 50 | 30 | 10 | 10 | 10/12/8 | 3/4/3 | RSET3 + RSET1 | 50 | No |
| 4 | 50 | 30 | 10 | 10 | 10/12/8 | 3/4/3 | RSET1 + RSET4 | 50 | No |
| 5 | 50 | 30 | 10 | 10 | 10/12/8 | 3/4/3 | RSET1 + RSET3 | 50 | No |

Los cinco intentos tuvieron conjuntos distintos, orden correcto de secciones y ausencia de duplicados internos. Algunas preguntas individuales pueden reaparecer entre intentos porque no se guarda historial persistente, conforme al alcance solicitado.

## Aislamiento

El General English Level Test continúa importando `src/data/generalEnglishTestQuestions.js` y usando `src/utils/generalEnglishTestRandomizer.js`. No se modificaron su banco, componente ni utilidad.

## Verificación funcional

- Inicio: generó un único intento en estado de React.
- Navegación: regresar conservó la respuesta seleccionada y permitió cambiarla.
- Estructura: 30 Grammar, 10 Vocabulary y 10 Reading en las posiciones correctas.
- IDs: 50 únicos dentro del intento.
- Reading: `RSET4` y `RSET1` aparecieron como dos bloques completos y contiguos.
- Resultado: `50/50` y `100%` al responder con las claves del banco.
- Puntaje por sección: Grammar `30/30`, Vocabulary `10/10`, Reading `10/10`.
- Revisión: 50 preguntas con explicaciones.
- Repetir test: regresó a la pregunta 1, limpió respuestas y mostró una pregunta inicial distinta.
- General English Level Test: conservó 20 Grammar, 15 Vocabulary y 15 Reading.
- Otros módulos y rutas: cargaron sin errores de consola.
