# General English Level Test — actualización del banco

## Fuente revisada

- Documento: `C:\Users\jason\OneDrive\Desktop\recursos para turn on\work_english_test_3_general_balanced.docx`
- Última modificación local: `2026-07-11 16:49:37` (America/Guatemala)
- Última modificación UTC: `2026-07-11 22:49:37`
- Tamaño: `46,187 bytes`
- SHA-256: `1E8DB74B28906F6E3A041F118AC359875D6FFEBF5AAC062408AC43D5B7D268C5`
- Método de lectura: extracción completa de `word/document.xml` desde el paquete OOXML.

El documento contiene 637 párrafos, 636 párrafos no vacíos, 2 tablas y exactamente 50 párrafos numerados como preguntas. No contiene inserciones o eliminaciones con control de cambios, comentarios, cuadros de texto ni contenido alternativo oculto.

## Banco utilizado por la aplicación

- Banco activo: `src/data/generalEnglishTestQuestions.js`
- Componente que lo importa: `src/pages/GeneralEnglishTest.jsx`
- Ruta pública: `#/work-english-test/general-test`
- SHA-256 del banco revisado: `222356A19958EDDB948FA9DECDB49A823A6789DCFAB3E14E553252DF33933622`

`GeneralEnglishTest.jsx` importa directamente `generalEnglishTestQuestions` y lo entrega a `createGeneralEnglishTestAttempt`. No se encontró un banco alternativo, una copia de respaldo importada, preguntas hardcodeadas en el componente ni uso accidental del banco de Work English Test.

## Comparación

La comparación se realizó por texto normalizado: minúsculas, comillas normalizadas, espacios y saltos de línea consolidados, y puntuación menor ignorada para la detección segura de equivalencias. Después se compararon sección, nivel, tema, opciones y respuesta correcta.

| Estado | Total | Grammar | Vocabulary | Reading |
| --- | ---: | ---: | ---: | ---: |
| Banco anterior | 50 | 20 | 15 | 15 |
| Documento actualizado detectado | 50 | 20 | 15 | 15 |
| Banco final | 50 | 20 | 15 | 15 |

Resultados de la comparación:

- Preguntas nuevas añadidas: **0**
- Preguntas ya existentes confirmadas: **50**
- Duplicados encontrados u omitidos: **0**
- Preguntas modificadas: **0**
- Preguntas del banco ausentes en el documento: **0**
- Preguntas pendientes de revisión: **0**
- Errores de formato: **0**

La versión indicada del Word coincide íntegramente con las 50 preguntas que ya estaban en el banco. Por seguridad, no se inventó contenido y no se reescribió el archivo de datos sin cambios reales.

## Validación del banco final

- Total: **50**
- IDs únicos: **50**
- Textos únicos: **50**
- Preguntas con cuatro opciones: **50**
- Respuestas correctas incluidas en sus opciones: **50**
- Explicaciones presentes: **50**

Distribución por nivel:

| Nivel | Cantidad |
| --- | ---: |
| A2/B1 | 7 |
| B1 | 24 |
| B1/B2 | 19 |

## Reading y pasajes

El documento no usa campos `passageId`. El banco actual conserva el título y el texto completo del pasaje dentro de cada pregunta de Reading, por lo que cada pregunta muestra siempre su lectura correcta.

- `Reading Passage 1: A Small Garden in the City`: 5 preguntas
- `Reading Passage 2: Screens Before Bed`: 5 preguntas
- `Reading Passage 3: The Unplanned Trip`: 5 preguntas

La utilidad específica del test identifica esos bloques por el título de la primera línea, mezcla los bloques y mantiene juntas las cinco preguntas de cada pasaje.

## Disponibilidad en los intentos

No se detectaron preguntas nuevas, por lo que no existe contenido nuevo que habilitar en los intentos.

La lógica actual sigue usando un conjunto fijo de exactamente 50 preguntas: 20 Grammar, 15 Vocabulary y 15 Reading. `src/utils/generalEnglishTestRandomizer.js` valida expresamente esos totales y usa todas las preguntas del banco.

Si una versión futura del Word contiene un banco mayor, será necesaria una tarea adicional y autorizada para:

1. permitir un total superior a 50 en la validación del banco;
2. seleccionar aleatoriamente 20 Grammar, 15 Vocabulary y 15 Reading;
3. conservar los grupos de Reading por pasaje durante esa selección;
4. validar que las preguntas nuevas puedan aparecer en varios intentos.

Esa lógica no se modificó en esta actualización, conforme al alcance solicitado.
