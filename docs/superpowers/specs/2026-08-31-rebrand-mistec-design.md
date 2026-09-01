# Rediseño del sitio MisTec según el sistema de marca — Spec de diseño

**Fecha:** 2026-08-31
**Fuentes:** `Institucional/` (Manual de Identidad Visual v1.0, Sistema de Marca v1.0, Brand Book v1.0, Manual Institucional v1.0, MisTec Visual Style, 16 signos marcarios PNG). Los PDF no entran al repo; los signos sí.
**Estado:** aprobado en conversación (secciones 1 y 2); sección 3 se aprueba con este documento.

---

## 1. Objetivo

Alinear el sitio (`mistec-capital.com`, SvelteKit + Tailwind 4) con los manuales de marca MisTec de agosto 2026: marca nueva, una sola familia tipográfica, economía de ámbar, una sola cara cromática, composición a la izquierda, motion contenido, iconografía del sistema, y contenido con la voz institucional. La landing se rehace siguiendo el orden del Manual Institucional; el resto del sitio se migra al nuevo sistema sin rehacer su lógica.

## 2. Decisiones tomadas con el usuario

| Tema | Decisión |
|---|---|
| Estructura de la landing | **Rehacer según el manual**: Hero → 01 Quiénes somos → 02 Propuesta de valor → 03 Soluciones → 04 Cómo trabajamos → 05 Alcance → 06 Proyectos → 07 Contacto. Desaparecen Gobierno e IA como bloques propios. |
| Tipografía | No hay licencia de Suisse Int'l. **Inter variable auto-hospedada** como única familia, con fallback a grotesca de sistema. Un solo `@font-face` para poder cambiar a Suisse después. |
| Cifras | **Conteo real del contenido** (`content/projects`). No se hardcodean 39 / 7. |
| Enfoque de implementación | **A**: sistema de tokens nuevo en `theme.css` + landing nueva + resto del sitio migrado a tokens. |
| Cara cromática | **Ink** en todo el sitio. Los tokens de la cara clara quedan definidos pero no se usan. |
| Íconos | Se eliminan los decorativos. Set funcional propio en SVG. Se quita `unplugin-icons` / `@iconify`. |
| Marca | PNG originales del zip, recortados (no redibujados). Si aparece el vectorial, se reemplaza. |
| Fotografía | Fuera de alcance. No se inventan fotos. |
| `/about` | Contenido del Manual Institucional. |

## 3. Dirección de diseño y autocrítica

El manual fija la dirección: fondo obsidiana, texto hueso, un solo ámbar, reglas de 1 px, neo-grotesca única. Es una estética que hoy se parece a un "default" de diseño generado; acá **no es un default, es el brief**, y se sigue al pie de la letra. La distinción se juega en la precisión, no en la ornamentación:

- **Firma del sitio:** el hero como portada de presentación — la marca ya está arriba a la izquierda, el título ocupa el tercio inferior, y **una palabra por titular** va en ámbar (regla literal del Manual de Identidad: "una palabra por titular, economía extrema"; en el hero, *resolver*). Como único recurso gráfico, el isotipo **seccionado y extendido** fuera del borde derecho en color `rule` (≤ 14 % de contraste). Es una de las cuatro operaciones que el Sistema de Recursos Gráficos admite, ocupa un borde y no el centro, y es exactamente lo que muestra la lámina "Información + Sistema" del documento de Estilo Visual.
- **Modos de composición** (Estilo Visual, lámina "4 modos"): el hero es *Expresivo* (signo, escala); 01, 02, 03 y 06 son *Editorial* (tipografía, espacio, jerarquía); 04 y 05 son *Información* (proceso con chevrones, cifras). El modo *Humano* (fotografía) queda fuera de alcance. Intensidad: *Activa* — "balanceada, conectada, cotidiana".
- **Lo que se quita para que eso se vea:** glows, degradados, blobs, mesh, grano, marquee, pulsos, cursor, ticker de deploys inventado, contadores animados, chips píldora, íconos en cajas ámbar, botón relleno ámbar, Bold.
- **Numeración:** las secciones van numeradas 01–07 porque el Sistema Editorial exige "numeración continua y visible" y porque 04 Cómo trabajamos es una secuencia real. No es decoración: el índice del sitio es el índice del manual.
- **Cifras grandes en Light 300**, no en Bold: "la marca comunica con confianza, no con volumen".
- **Cero íconos decorativos.** Las 9 soluciones, los 6 pasos y los 8 diferenciales se sostienen con número, título y texto. "Un ícono acompaña a una palabra. Si funciona solo, sobra la palabra; si no funciona con ella, sobra el ícono."

## 4. Sistema de marca — tokens (`src/lib/theme.css` + `src/app.css`)

### 4.1 Color

| Token | Hex | Uso en el sitio |
|---|---|---|
| `--ink` | `#0A0A0A` | Fondo de todo. |
| `--bone` | `#E8E3D6` | Texto principal, marca, bordes de botón primario. Nunca `#FFFFFF`. |
| `--mist` | `#8A857A` | Texto secundario, kickers, notas, metadata, links en reposo. |
| `--rule` | `#2A2A28` | Todas las líneas y bordes. El recurso gráfico del hero. |
| `--amber` | `#FFB840` | Ver presupuesto 4.7. |
| `--paper` `#EDE6D6`, `--rule-paper` `#C8C0AE`, `--amber-dim` `#CC8F1A`, `--sig` `#D64545` | Definidos, sin uso en el sitio. |
| `--ink-2` | `#141413` | Único tono intermedio permitido: fondo de `thead`, celdas hover de tabla, fondo del contenedor del mapa. Plano, sin transparencia. |

Reparto objetivo por pantalla: fondo ≈ 85 %, texto ≈ 13 %, ámbar ≤ 2 %. Sin `rgba` decorativos, sin `backdrop-blur`, sin `box-shadow`, sin `background-image` (excepto el mapa).

### 4.2 Tipografía

- Familia: `'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`. Archivo: `static/fonts/InterVariable.woff2` (peso 100–900), `font-display: swap`. El `@font-face` va **inline en `src/app.html`** (no en `theme.css`) porque la URL necesita `%sveltekit.assets%` para funcionar tanto con dominio propio como con el base path `/microfolio`. Se borran Geist, JetBrains Mono (link de Google Fonts en `app.html`) y todos los `IBMPlexSans-*` + `ibm-plex-sans.css`.
- Peso de títulos como token: `--w-titulo: 500`. Cambiarlo a 700 (el look de las exploraciones de Estilo Visual) es una línea; la decisión aprobada es 500 (Manual de Identidad).
- Features: `'cv11', 'ss01', 'ss03'` opcionales; `'tnum'` en cifras y tablas.
- Escala (variables CSS + clases de utilidad `.t-titulo`, `.t-subtitulo`, `.t-bajada`, `.t-cuerpo`, `.t-nota`, `.t-kicker`, `.t-cifra`):

| Clase | Tamaño | Peso | Tracking | Interlineado | Color por defecto |
|---|---|---|---|---|---|
| `.t-titulo` | `clamp(2.5rem, 5.5vw, 4.5rem)` (40–72 px) | `var(--w-titulo)` = 500 | −0.022em | 1.04 | bone |
| `.t-subtitulo` | `2rem` (32 px) | 500 | −0.016em | 1.08 | bone |
| `.t-bajada` | `1.25rem` (20 px) | 350 | −0.002em | 1.45 | mist |
| `.t-cuerpo` | `1rem` (16 px) | 350 | −0.002em | 1.55 | bone |
| `.t-nota` | `0.8125rem` (13 px) | 350 | 0 | 1.45 | mist |
| `.t-kicker` | `0.6875rem` (11 px) | 500 | +0.22em, `uppercase` | 1 | mist |
| `.t-cifra` | `clamp(4rem, 7vw, 6rem)` (64–96 px) | 300 | −0.022em | 1 | bone, `tnum` |

- Énfasis dentro de cuerpo: Medium 500 (no Bold). `<strong>` se mapea a 500.
- Máximo tres niveles por composición. Bold 700 no existe en el sitio (`grep -r "font-bold\|font-semibold\|font-extrabold" src` debe devolver 0).
- Medida: párrafos `max-width: 62ch`. Alineación izquierda siempre; `text-center` solo en un elemento aislado (no hay ninguno previsto).
- `body { font-family: var(--font-sans); font-weight: 350; color: var(--bone); background: var(--ink); -webkit-font-smoothing: antialiased }`.

### 4.3 Espacio y retícula

- Contenedor: `max-width: 1440px`, centrado.
- Retícula de 12 columnas. Medianil y margen exterior (= 4 medianiles): desktop ≥ 1280 → gutter 24 px, margen 96 px; tablet 768–1279 → gutter 16, margen 64; mobile < 768 → gutter 8, margen 32 (la proporción 1:4 se mantiene; 8 px es el mínimo para que el contenido respire en 360–430 px). Variables: `--gutter`, `--margin`; clase `.grid-12` (`display:grid; grid-template-columns: repeat(12, 1fr); gap: var(--gutter)`), `.container-brand` (`padding-inline: var(--margin); max-width: 1440px; margin-inline: auto`).
- Escala de espacio: `--s-1: 8px`, `--s-2: 16px`, `--s-3: 32px`, `--s-4: 64px`, `--s-5: 128px`. El vacío mayor duplica al menor.
- Secciones: `padding-block: var(--s-5)` en desktop, `var(--s-4)` en mobile; separadas por `border-top: 1px solid var(--rule)`. Dentro de una sección: kicker → título `--s-2`; título → bajada `--s-2`; bajada → cuerpo/contenido `--s-4`. Entre bloques siempre más aire que dentro del bloque.
- Radio único: `--radius: 2px`.

### 4.4 Motion

- Duraciones: `--d-breve: 120ms` (hover, foco), `--d-media: 240ms` (menú, filtros, cambio de estado), `--d-larga: 480ms` (revelado de sección).
- Easing único: `--ease: cubic-bezier(0.2, 0, 0, 1)` (sale rápido, llega lento).
- Retardo de grupo: `--stagger: 60ms` (`.reveal-1` … `.reveal-6` = n × 60 ms).
- Revelado (`.reveal` + acción `scrollReveal`): `opacity: 0 → 1` + `clip-path: inset(0 0 100% 0) → inset(0)` (se revela sobre su propio eje, de arriba hacia abajo). Sin `transform`. `prefers-reduced-motion: reduce` → todo visible sin transición.
- Hover cambia **un** recurso: color (`mist → bone`) o una línea (`border-color: rule → bone`). Prohibido `transform`, `scale`, `translate`, `box-shadow` en hover.
- Se eliminan: `marquee`, `status-pulse`, `cursor-blink`, `glow-pulse`, `Ticker` (contador), `DeployTicker`, `image-hover-effect`, `.grain-overlay`.

### 4.5 Iconografía — `src/lib/components/Icon.svelte`

- Props: `name`, `size` (16 | 20 | 24, por defecto 16), `class`.
- SVG `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, `stroke-linecap="butt"` (remates rectos), `stroke-linejoin="round"` (exterior redondeado, interior vivo). Solo trazos verticales, horizontales y diagonales a 45°.
- Set: `menu` (tres horizontales en y = 6, 12, 18; x 3→21), `close` (dos diagonales 5,5→19,19 y 19,5→5,19), `arrow-right` (horizontal 4,12→20,12 + diagonales 13,5→20,12 y 13,19→20,12), `arrow-up-right` (diagonal 6,18→18,6 + horizontal 8,6→18,6 + vertical 18,6→18,16), `chevron-left` (15,5→8,12→15,19), `chevron-right` (9,5→16,12→9,19), `plus` (12,4→12,20 y 4,12→20,12).
- Un tamaño por contexto: 16 junto a texto de cuerpo/nota, 20 en botones, 24 en el header. Color heredado. Nunca en caja, círculo ni color ámbar.

### 4.6 Componentes base (clases en `theme.css`)

- `.btn` (primario): `display:inline-flex; align-items:center; gap: var(--s-1); height: 48px; padding: 0 24px; border: 1px solid var(--bone); border-radius: var(--radius); color: var(--bone); font-weight: 500; font-size: 0.9375rem; transition: background-color var(--d-breve) var(--ease), color var(--d-breve) var(--ease)`. Hover: `background: var(--bone); color: var(--ink)`. Foco: ver `:focus-visible`.
- `.btn-text` (secundario): texto bone 500 + `Icon arrow-right`; `text-underline-offset: 4px`; hover: `text-decoration: underline`.
- `.link`: mist → bone en hover, `--d-breve`. `.link-active`: bone + `border-bottom: 1px solid var(--bone)`.
- `.card`: `border: 1px solid var(--rule); border-radius: var(--radius); background: transparent; border-bottom-color` pasa a `var(--bone)` en hover (`--d-breve`).
- `.rule`: `height:1px; background: var(--rule); border:0`.
- `.tag`: `.t-nota` + `border: 1px solid var(--rule); border-radius: var(--radius); padding: 2px 8px; color: var(--mist)`. `.tag-active`: borde y texto bone.
- `.input`: `background: var(--ink); border: 1px solid var(--rule); border-radius: var(--radius); color: var(--bone); height: 40px; padding: 0 12px; font: inherit`. Foco por `:focus-visible` global.
- `:focus-visible { outline: 2px solid var(--amber); outline-offset: 3px }`. `::selection { background: var(--amber); color: var(--ink) }`.
- `.status-dot`: 6 × 6 px, `border-radius: 50%`, `background: var(--amber)`. Solo para "en desarrollo".
- `.prose-brand` (para Markdown): `h2 → .t-subtitulo` con `margin-top: var(--s-4)`, `h3 → .t-cuerpo` 500, `p/li → .t-cuerpo` con `max-width: 62ch`, `a → bone subrayado`, `strong → 500`, `ul` con guion `–` como marcador en mist, `blockquote` con `border-left: 1px solid var(--rule)`.

### 4.7 Presupuesto de ámbar (lista cerrada)

1. **Una palabra por titular**, con `<span class="accent">` (`.accent { color: var(--amber) }`). Lista cerrada de palabras: hero *resolver* · 01 *soluciones* · 02 *todo* · 03 *ecosistema* · 04 *continuo* · 05 *consolidada* · 06 *destacados* · 07 *proyecto* · `/projects` *proyectos* · `/list` *tabla* · `/map` *territorio*. Los títulos que vienen de datos (`/about`, detalle de proyecto) no llevan acento.
2. `:focus-visible` (outline).
3. `::selection`.
4. `.status-dot` junto a "en desarrollo" (ficha de proyecto, tabla).
5. `marker-featured.png` en el mapa (asset existente, se conserva).

Cualquier otro `#FFB840` / `var(--amber)` en `src/` es un error. Verificación: `grep -rn "FFB840\|amber" src --include=*.svelte --include=*.css` debe listar solo estos usos.

### 4.8 Marca — assets

Carpeta fuente en el repo: `brand/signos/` con los 16 PNG originales del zip (sin modificar). Carpeta servida: `static/brand/`, generada por `scripts/generate-brand-assets.js` (usa `sharp`, ya instalado):

| Archivo | Origen | Operación |
|---|---|---|
| `static/brand/mistec-horizontal-bone.png` | `mistec-bloque-horizontal-transparente-bone.png` | `trim()` de márgenes transparentes; ancho final 720 px (se muestra a 112 px CSS; 1× = 112, 2× = 224, sobra) |
| `static/brand/mistec-isotipo-bone.png` | `mistec-isotipo-transparente-bone.png` | `trim()`; 240 px |
| `static/brand/mistec-logo-512.png` | `mistec-isotipo-negativo.png` | resize 512 (para JSON-LD `logo`) |
| `static/favicon.ico` | `mistec-isotipo-negativo.png` | 16 + 32 + 48 (ICO multi-tamaño; si `sharp` no escribe ICO, se genera PNG 32 y se empaqueta con un script mínimo o se usa `png-to-ico` como devDependency) |
| `static/favicon-96.png`, `static/favicon-192.png` | ídem | resize |
| `static/apple-touch-icon.png` | ídem | resize 180 |
| `static/og-default.jpg` | compuesto | 1200 × 630, fondo ink, bloque horizontal bone a 96 px del borde superior e izquierdo con 300 px de ancho, texto "Ingeniería aplicada a resolver problemas." en bone 500 ocupando el tercio inferior (SVG rasterizado con `sharp`). Sin ámbar (el OG es institucional). |

Se borran: `static/mistec.png` (tucán), `static/favicon.svg`, `static/fonts/IBMPlexSans-*`, `static/fonts/ibm-plex-sans.css`. `app.html` deja de referenciar `favicon.svg` (ya estaba comentado) y elimina el `<link>` a Google Fonts; agrega `<link rel="preload" as="font" type="font/woff2" crossorigin href="%sveltekit.assets%/fonts/InterVariable.woff2">`.

Reglas: la marca nunca en ámbar, nunca con efectos, nunca deformada; área de protección 2X (en el header, mínimo 16 px de aire alrededor); mínimo bloque horizontal 80 px de ancho, isotipo 24 px de alto.

## 5. Landing (`src/routes/+page.svelte`)

Componentes nuevos en `src/lib/components/landing/`: `Hero.svelte`, `QuienesSomos.svelte`, `PropuestaValor.svelte`, `Soluciones.svelte`, `ComoTrabajamos.svelte`, `Alcance.svelte`, `Proyectos.svelte`, `Contacto.svelte`. Se borran los ocho anteriores (`Hero`, `Manifiesto`, `ObraReciente`, `Plataformas`, `Gobierno`, `IA`, `Capacidades`, `Contacto`) y toda la carpeta `editorial/`.

Componente auxiliar `landing/SectionHead.svelte`: props `n` ("01"…"07"), `id`, `kicker`, `title`, `lead` (opcional). Renderiza `<section id class="section container-brand">` con `border-top: 1px solid var(--rule)`, kicker `{n} · {kicker}`, `h2.t-titulo` y `p.t-bajada` (máx. 62ch), y un slot para el contenido. La numeración es visible a la izquierda del kicker.

Datos: `+page.server.js` ya entrega `projects`, `featuredProjects`, `stats` (`total`, `government`, `countries`). Cambios: `countries` se calcula con el último segmento de `location` (ya lo hace); se corrigen dos fichas (5.9). `page` (contenido de `content/index.md`) deja de usarse en la landing; el archivo se actualiza con el boilerplate para consistencia.

Copy: todo el texto de esta sección es **literal o condensado del Manual Institucional**. No se agrega copy nuevo salvo microcopy funcional (botones, labels).

### 5.0 Hero — la entrada

- `section#top`, `min-height: 85vh`, `display:flex; flex-direction: column; justify-content: flex-end`, `padding-top: 64px` (header) + `padding-bottom: var(--s-5)`.
- `p.t-kicker`: `Ingeniería de software y soluciones digitales · Posadas, Misiones`
- `h1.t-titulo` (grid cols 1–9): `Ingeniería aplicada a <span class="accent">resolver</span> problemas.` — `.accent { color: var(--amber) }`. Único uso.
- `p.t-bajada` (cols 1–7, `margin-top: var(--s-2)`): `Diseñamos, desarrollamos e implementamos plataformas tecnológicas para organizaciones públicas y privadas. Soluciones confiables, escalables y sostenibles.`
- Botones (`margin-top: var(--s-3)`, gap `--s-2`): `<a class="btn" href="{base}/projects">Ver proyectos</a>` · `<a class="btn-text" href="#contacto">Hablemos <Icon name="arrow-right" size=20/></a>`.
- Recurso gráfico: `<img src="{base}/brand/mistec-isotipo-bone.png" aria-hidden="true">` posicionado `absolute; right: -18%; top: 50%; translate: 0 -50%; width: 44vw; max-width: 640px; opacity: 0.09; filter: none`, dentro de `overflow: hidden`. Con bone al 9 % sobre ink el contraste queda ≈ 12 % (< 14 %). Se oculta en `< 1024px`. Está seccionado por el borde derecho (solo se ve la pierna izquierda y el chevron).
- Sin cifras, sin ticker, sin stats, sin fecha.
- Revelado en carga: kicker → título → bajada → botones con `--stagger`.

### 5.1 · 01 Quiénes somos (`#nosotros`)

- Kicker `01 · Quiénes somos`. Sin bajada en `SectionHead`; el título va en la columna izquierda.
- Grid 12: izquierda cols 1–5 `h2.t-titulo`: "Ingeniería de software y *soluciones* digitales para organizaciones públicas y privadas." (*soluciones* en ámbar).
- Derecha cols 7–12:
  - `p.t-cuerpo`: `MisTec es una empresa especializada en ingeniería de software y desarrollo de soluciones digitales para organizaciones públicas y privadas. Desde sus inicios orientó su crecimiento al desarrollo de productos tecnológicos capaces de resolver desafíos reales mediante soluciones confiables, escalables y sostenibles.`
  - `p.t-cuerpo`: `Su experiencia integra consultoría tecnológica, arquitectura de software, diseño de experiencia de usuario, desarrollo de aplicaciones, automatización de procesos, inteligencia artificial e integración de sistemas. Acompaña a sus clientes durante todo el ciclo de vida de cada solución, desde la identificación de una necesidad hasta la evolución permanente del producto implementado.`
  - `margin-top: var(--s-4)`; `p.t-kicker`: `Valores`; lista `<ul>` con `border-top: 1px solid var(--rule)` por ítem, `padding-block: var(--s-2)`, cada `<li>` en dos columnas (nombre en `.t-cuerpo` 500 bone ocupando 4/12; descripción en `.t-cuerpo` mist ocupando 8/12):
    1. **Compromiso** — Asumimos cada proyecto como una responsabilidad compartida con nuestros clientes. Trabajamos con dedicación, cercanía y responsabilidad para alcanzar los objetivos definidos.
    2. **Calidad** — Buscamos la excelencia técnica en cada etapa del desarrollo, promoviendo soluciones robustas, mantenibles y preparadas para evolucionar en el tiempo.
    3. **Innovación** — Incorporamos nuevas tecnologías cuando aportan valor real a las organizaciones, priorizando siempre la utilidad por sobre la novedad.
    4. **Colaboración** — Creemos que los mejores resultados se obtienen mediante el trabajo conjunto entre equipos, clientes y especialistas, promoviendo el intercambio permanente de conocimientos.
    5. **Transparencia** — Construimos relaciones basadas en la confianza, la comunicación clara y el cumplimiento de los compromisos asumidos.
- En mobile las dos columnas se apilan (título arriba).

### 5.2 · 02 Propuesta de valor (`#propuesta`)

- Kicker `02 · Propuesta de valor`. Título: "Acompañar *todo* el ciclo de vida de una solución." (*todo* en ámbar).
- Bajada: `No limitamos nuestra participación al desarrollo inicial de un sistema. Cada proyecto es una inversión de largo plazo y cada solución se diseña considerando escalabilidad, mantenimiento, seguridad y experiencia de usuario.`
- Contenido (`margin-top: var(--s-4)`): `p.t-kicker` `Diferenciales`, luego `<ol>` en 2 columnas (`grid-cols-1 md:grid-cols-2`, gap `--s-2` × `--gutter`), cada ítem con número `.t-nota` tabular a la izquierda (ancho 2.5rem) y texto `.t-cuerpo`, `border-top: 1px solid var(--rule)`, `padding-block: var(--s-2)`:
  01 Ingeniería de software especializada. · 02 Desarrollo de productos digitales. · 03 Experiencia en proyectos públicos y privados. · 04 Equipos multidisciplinarios. · 05 Acompañamiento integral durante todo el ciclo de vida del producto. · 06 Soluciones escalables y mantenibles. · 07 Innovación aplicada a necesidades concretas. · 08 Compromiso con la calidad técnica y la mejora continua.

### 5.3 · 03 Soluciones (`#soluciones`)

- Kicker `03 · Soluciones`. Título: "Un mismo *ecosistema*. Servicios, productos y capacidades." (*ecosistema* en ámbar).
- Bajada: `Un conjunto de capacidades que pueden implementarse de manera independiente o integrada según las necesidades de cada organización.`
- Grilla 3 × 3 (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), celdas con `border: 1px solid var(--rule)` colapsado (`gap: 1px; background: var(--rule)`, celdas `background: var(--ink)`), `padding: var(--s-3)`, `min-height: 240px`, `display:flex; flex-direction:column`. Sin íconos. Cada celda: `span.t-nota` número, `h3.t-cuerpo` 500 (`margin-top: var(--s-2)`), `p.t-nota` descripción (`margin-top: var(--s-1)`, `flex:1`):
  1. **Desarrollo de Software a Medida** — Diseño y construcción de aplicaciones adaptadas a procesos específicos, considerando criterios de escalabilidad, seguridad, mantenimiento y evolución continua.
  2. **Productos Digitales** — Desarrollo de plataformas y soluciones digitales orientadas a resolver problemáticas comunes mediante productos reutilizables y preparados para crecer junto a las organizaciones.
  3. **Aplicaciones Web y Mobile** — Diseño y desarrollo de aplicaciones multiplataforma centradas en la experiencia de usuario, la accesibilidad y el rendimiento.
  4. **Inteligencia Artificial** — Incorporación de tecnologías de inteligencia artificial para automatizar procesos, optimizar decisiones y generar nuevas oportunidades de valor mediante el análisis inteligente de la información.
  5. **Automatización de Procesos** — Implementación de soluciones que reducen tareas repetitivas, mejoran la eficiencia operativa y favorecen la integración entre procesos y sistemas.
  6. **Integraciones Tecnológicas** — Conexión entre plataformas, servicios y aplicaciones para garantizar el intercambio seguro y eficiente de información entre diferentes entornos tecnológicos.
  7. **Arquitectura e Infraestructura** — Diseño de arquitecturas tecnológicas escalables y servicios cloud preparados para soportar el crecimiento de cada organización.
  8. **Experiencia de Usuario (UX/UI)** — Diseño de experiencias digitales simples, intuitivas y orientadas a facilitar la interacción entre las personas y la tecnología.
  9. **Consultoría Tecnológica** — Acompañamiento estratégico para organizaciones que buscan definir, planificar o fortalecer sus procesos de transformación digital.
- Nota al pie (`margin-top: var(--s-3)`, `p.t-nota`, `max-width: none`): `Capacidades técnicas — Ingeniería de Software · Arquitectura de Soluciones · Desarrollo Backend · Desarrollo Frontend · Desarrollo Mobile · Plataformas Cloud · DevOps · Inteligencia Artificial · Automatización · Integraciones · UX Research · UX/UI Design · Bases de Datos · Analítica y Visualización de Información`.

### 5.4 · 04 Cómo trabajamos (`#metodo`) — proceso con chevrones (modo Información)

- Kicker `04 · Cómo trabajamos`. Título: "Un proceso *continuo*." (*continuo* en ámbar). Bajada: `Todos los proyectos siguen una metodología estructurada que permite comprender el problema, diseñar la solución adecuada y acompañar su evolución en el tiempo.`
- Los 6 pasos en `<ol>`: en desktop (`≥ 1280px`, `xl:`) una fila de 6 columnas iguales — entre 1024 y 1279 px las columnas quedarían en ~114 px, así que ahí se mantiene la lista vertical —, cada paso separado del anterior por `border-left: 1px solid var(--rule)` y un `Icon chevron-right` 16 en mist centrado sobre esa línea (con fondo ink para cortarla) — el chevron es el interior del isotipo, como en la lámina de proceso del Estilo Visual. En mobile, lista vertical con `border-top` por ítem. Cada paso: número `.t-nota` tabular, `h3.t-cuerpo` 500 y `p.t-nota` con la descripción:
  01 **Descubrimiento** — Comprender el contexto, identificar necesidades, relevar información y definir los objetivos del proyecto. Esta etapa permite construir una visión compartida entre el cliente y el equipo de trabajo.
  02 **Estrategia** — Definir el alcance, priorizar objetivos, seleccionar tecnologías y establecer una hoja de ruta para el desarrollo de la solución.
  03 **Diseño** — Diseñar la experiencia de usuario, la arquitectura funcional y los componentes necesarios para garantizar una solución clara, intuitiva y eficiente.
  04 **Desarrollo** — Construir la solución mediante procesos de ingeniería de software orientados a la calidad, la seguridad y la escalabilidad.
  05 **Implementación** — Desplegar la solución, realizar pruebas, capacitar a los equipos y acompañar la puesta en funcionamiento.
  06 **Evolución Continua** — El lanzamiento de un producto representa el inicio de una nueva etapa. Acompañamos la evolución permanente de las soluciones implementadas mediante mantenimiento, incorporación de mejoras, optimización del rendimiento y desarrollo de nuevas funcionalidades.

### 5.5 · 05 Alcance (`#alcance`)

- Kicker `05 · Alcance`. Título: "Experiencia *consolidada* en organizaciones de distintas características." (*consolidada* en ámbar).
- Fila de 4 cifras (`grid-cols-2 lg:grid-cols-4`, `border-top` y `border-bottom` rule, cada celda `padding-block: var(--s-3)`, `border-left: 1px solid var(--rule)` desde la segunda en desktop): `span.t-cifra` (sin animación, valor final directo, `tnum`) + `span.t-nota` label:
  - `{stats.total}` — `proyectos desarrollados`
  - `{stats.countries}` — `países`
  - `{stats.government}` — `organismos públicos`
  - `{new Date().getFullYear() - 2020}` — `años de trayectoria`
- Nota (`margin-top: var(--s-3)`, `p.t-nota`): `Sectores — Administración Pública · Empresas Privadas · Industria · Comercio · Salud · Educación · Servicios · Organizaciones Sociales`.

### 5.6 · 06 Proyectos (`#proyectos`)

- Kicker `06 · Proyectos`. Título: "Proyectos *destacados*." (*destacados* en ámbar). Bajada: `Una selección de plataformas propias, sistemas para organismos públicos y desarrollos a medida, en producción o en desarrollo activo.`
- Fuente: `featuredProjects` ordenados por fecha desc, primeros 6 (si hay menos de 6 destacados, completar con `projects`).
- Grilla `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` con `gap: 1px; background: var(--rule)`; cada card `background: var(--ink)`. Usa el **mismo** `AkProjectCard` que `/projects` (7.4).
- Link de cierre (`margin-top: var(--s-3)`): `<a class="btn-text" href="{base}/projects">Ver los {stats.total} proyectos <Icon name="arrow-right"/></a>`.

### 5.7 · 07 Contacto (`#contacto`)

- Kicker `07 · Contacto`. Grid 12: izquierda cols 1–5: `h2.t-titulo` "Hablemos de tu *proyecto*." (*proyecto* en ámbar) + `p.t-bajada` `Contanos qué necesitás y te respondemos.`
- Derecha cols 7–12: tres filas `<a>`/`<div>` con `border-top: 1px solid var(--rule)` (última con `border-bottom`), `padding-block: var(--s-2)`, grid `8rem 1fr auto`: label `.t-kicker`, valor `.t-cuerpo` bone, `Icon arrow-up-right` 16 en mist (bone al hover de la fila; la fila entera es el link):
  - `WhatsApp` — `+54 9 3764 734375` (nota debajo: `Lunes a viernes, 9 a 18 h`) → `https://wa.me/5493764734375`
  - `Email` — `mistec.capital@gmail.com` → `mailto:`
  - `Ubicación` — `Posadas, Misiones, Argentina` (sin link, sin ícono)
- Se elimina "Respondemos en < 24 h".

### 5.8 Navegación de la landing (`config.js → landingNav`)

`Nosotros #nosotros` · `Soluciones #soluciones` · `Cómo trabajamos #metodo` · `Proyectos #proyectos` · `Contacto #contacto`. Sin "Ver todos".

### 5.9 Contenido

- `content/projects/hcd-posadas-sueldos/index.md` y `content/projects/houton-camisas/index.md`: `location: 'Posadas, Misiones'` → `'Posadas, Misiones, Argentina'`.
- En todas las fichas, `authors[].name: 'Mistec Capital'` → `'MisTec'` (la marca ya no lleva "Capital"; commit `6c4a18d`). Ningún otro campo de las fichas cambia.
- `content/index.md`: `title: 'MisTec'`, `description` = boilerplate corto; cuerpo = elevator pitch. (No se renderiza; queda coherente.)
- `content/about.md`: ver 7.3.

## 6. SEO y configuración (`src/lib/config.js`, `SeoHead`, JSON-LD)

- `tagline: 'Ingeniería de software y soluciones digitales'`.
- `description: 'MisTec diseña, desarrolla e implementa soluciones digitales para organizaciones públicas y privadas. Ingeniería de software, productos digitales y consultoría tecnológica desde Posadas, Misiones.'`
- JSON-LD `Organization.logo` → `${siteUrl}/brand/mistec-logo-512.png`; `description` → boilerplate del manual (sin cifras hardcodeadas).
- `+page.svelte` (home) `description` meta: `MisTec diseña, desarrolla e implementa soluciones digitales para organizaciones públicas y privadas. ${stats.total} proyectos en ${stats.countries} países.`
- Descripciones de `/projects`, `/list`, `/map`: reemplazar "Mistec Capital" por "MisTec"; quitar "LATAM", "obra".
- Se elimina `version` de `siteConfig` (era la versión del template microfolio) y su uso en el footer.

## 7. Resto del sitio — migración a tokens

Regla general: se conserva la lógica y la estructura de datos; se reemplazan clases y componentes por los del sistema. Todo `font-mono`, `font-display`, `font-body`, `font-bold/semibold/extrabold`, `text-[#…]` arbitrario, `rounded-full`, `backdrop-blur`, `shadow`, `gradient`, `glow`, `chip`, `kicker*`, `serial`, `marginalia`, `tag-pill*`, `card-dark`, `card-gradient-border`, `ed-card*`, `section-paper`, `bg-mesh*`, `bg-blueprint*`, `divider-glow`, `reveal-left/right/scale`, `~icons/*` desaparece de `src/`.

### 7.1 `+layout.svelte`

- `<main class="bg-ink">`. En rutas no-home: `<div class="container-brand" style="padding-top: calc(64px + var(--s-4)); padding-bottom: var(--s-5)">`.
- Se quita la clase `grain-overlay` del `body` en `app.html`.

### 7.2 `AkHeader.svelte`

- `position: fixed; height: 64px; background: var(--ink)` (plano, sin transparencia ni blur). Al hacer scroll > 8 px: `border-bottom: 1px solid var(--rule)` (un solo recurso). Transición `--d-breve`.
- Izquierda: `<a href="{base}/" aria-label="MisTec — inicio"><img src="{base}/brand/mistec-horizontal-bone.png" alt="MisTec" style="width:112px;height:auto"></a>`. Sin texto al lado, sin tagline, sin fondo, sin ring.
- Derecha (desktop ≥ 1024): `nav` con `.link` (`.t-cuerpo` 14 px 500 → se define `.t-ui { font-size: .875rem; font-weight: 500 }`), gap `--s-3`. Activo (`currentPage` coincide): `.link-active`. En la landing, los anchors.
- Mobile: `button` con `Icon menu/close` 24 en bone; panel bajo el header con `background: var(--ink); border-top: 1px solid var(--rule)`, links apilados `.t-bajada` bone con `border-bottom rule`, `padding-block: var(--s-2)`; aparece sin transición (un `{#if}`); la transición queda como mejora futura.

### 7.3 `/about` (`content/about.md` + `about/+page.svelte`)

- Frontmatter: `title: 'Sobre MisTec'`, `description: 'Ingeniería de software y soluciones digitales para organizaciones públicas y privadas.'`
- Cuerpo Markdown (literal del Manual Institucional, cap. 02 y 03):
  - `## Quiénes somos` — los cinco párrafos del manual.
  - `## Historia` — los cinco párrafos del manual.
  - `## Propósito` — párrafo. `## Misión` — párrafo. `## Visión` — párrafo.
  - `## Valores` — lista de 5 con `**Nombre.** texto`.
  - `## Audiencias` — lista de 7.
  - Se elimina el texto actual (amigos de la secundaria, UTN, "no tiene Capital").
- Página: `p.t-kicker` `Institucional`, `h1.t-titulo`, `p.t-bajada`, luego `<article class="prose-brand">` en cols 1–8.

### 7.4 `AkProjectCard.svelte` (compartido landing / índice / mapa)

- `<a class="card group" href>` con `display:flex; flex-direction:column`.
- Imagen: `aspect-ratio: 16/10`, `object-fit: cover`, **sin** grayscale, opacidad ni degradado; `border-bottom: 1px solid var(--rule)`. Mantiene `AkOptimizedImage`.
- Cuerpo `padding: var(--s-3)`: fila `.t-nota` `{categoría} · {año}` (+ `.status-dot` y "En desarrollo" si `status` incluye "desarrollo"); `h3.t-cuerpo` 500 bone (`margin-top: var(--s-2)`); `p.t-nota` descripción `line-clamp-2`; pie (`margin-top:auto; padding-top: var(--s-2); border-top: 1px solid var(--rule)`) con ubicación `.t-nota` e `Icon arrow-up-right` 16 mist.
- Hover: solo `border-bottom-color: var(--bone)` del card. Se elimina el badge "★ DESTACADO" (el índice ya filtra; en la landing todos son destacados).
- `categoryLabel` se centraliza en `src/lib/utils/projects.js` (ya existe el archivo) y lo importan card, filtros, lista y detalle; se agregan los tipos que hoy caen en `default`: `salud` → Salud, `punto de venta` → Punto de venta, `movilidad` → Movilidad, `ecommerce` → E-commerce.

### 7.5 `/projects`

- Cabecera: `p.t-kicker` `Índice`, `h1.t-titulo` "Todos los *proyectos*." (cols 1–8), `p.t-bajada` `{n} proyectos desde 2020, filtrables por categoría y búsqueda.` Sin `SerialNumber`.
- `AkFilters`: input `.input` sin ícono (no hay lupa en el set y no hace falta: el placeholder `Buscar por título, descripción o tag` ya explica el campo); botones de categoría `.tag` / `.tag-active`; contador `.t-nota` `{n} proyectos`.
- Grilla con `gap: 1px; background: var(--rule)` y cards `background: var(--ink)`.
- Vacío: `p.t-cuerpo` mist `No hay proyectos que coincidan con la búsqueda.`

### 7.6 `/list`

- Cabecera: kicker `Lista`, título "Proyectos en *tabla*.", bajada `Ordenable por columna, con búsqueda y paginado.`
- Tabla: `thead` `background: var(--ink-2)`, `th` `.t-kicker` mist alineado a la izquierda, `ThSort` botón mist → bone hover; el indicador de orden es texto `↑`/`↓` en `.t-nota` (un chevron rotado 90° rompería la regla de tres direcciones). Filas `border-top rule`, hover `background: var(--ink-2)`. Celdas `.t-nota`; título `.t-cuerpo` 500 bone; tags `.tag`; acción `Icon arrow-up-right` 16 sin borde ni círculo.
- `Pagination`, `RowsPerPage`, `RowCount`: `.t-nota`, botones `.tag` / `.tag-active`, `select.input` altura 32.
- Se elimina el `<style>` con JetBrains Mono.

### 7.7 `/map`

- Cabecera: kicker `Mapa`, título "Proyectos en el *territorio*.", bajada `Cada marcador es un proyecto. Filtrá por categoría o búsqueda.`
- Contenedor `border: 1px solid var(--rule); background: var(--ink-2)`. Se eliminan "LIVE / GEO STREAM" y el `status-dot-live`; queda el contador `{n} de {total}` en `.t-nota` abajo a la derecha.
- Overlay de proyecto: `background: var(--ink)` **opaco** (sin blur), botón cerrar = `Icon close` 20 en `.btn` cuadrado 40 × 40 sin `rounded-full`.
- CSS de Leaflet: familia `inherit`; controles ink/bone/rule; links de atribución bone; tooltip sin sombra. Se mantiene el filtro de tiles oscuro (no es decoración: es la cara ink aplicada al mapa).

### 7.8 `/projects/[slug]`

- Volver: `<a class="link t-nota"><Icon chevron-left/> Proyectos</a>`.
- Cabecera: `p.t-kicker` `{categoría} · {año}` (+ status con `.status-dot` si "en desarrollo"), `h1.t-titulo` (cols 1–9), `p.t-bajada` = `description`.
- Imagen principal: `aspect-ratio: 16/9`, `object-fit: cover`, `border: 1px solid var(--rule)`, sin grayscale/degradado. `margin-block: var(--s-4)`.
- Cuerpo cols 1–8: bloques `Detalles` (`.prose-brand`), `Galería`, `Videos`, `Documentos`, cada uno con `p.t-kicker` + `hr.rule` + contenido, separados por `--s-4`. Sin `SerialNumber`. Galería: imágenes planas, pies en `.t-nota`. Documentos: filas con `border-top rule`, `Icon arrow-up-right`.
- Sidebar cols 10–12 (`lg:sticky top-24`): `Ficha` (dl con `dt.t-kicker`, `dd.t-cuerpo`, `border-bottom rule`), `Equipo`, `Tags` (`.tag`), botón `.btn` `Ver todos los proyectos`. Cajas `.card` sin hover.
- Lightbox: fondo `var(--ink)` al 95 % **sin blur**; botones prev/next/cerrar con `Icon` 20 dentro de `.btn.btn-square` 40 × 40; contador `.t-nota`. `AkBtnClose` pasa a usar `Icon close` y clases del sistema; se eliminan `scale` en hover y `rounded-full`. `AkBtnMetadata` y el estado `showTechnicalInfo` se **eliminan**: el botón alterna una bandera que ninguna parte de la página renderiza (código muerto).

### 7.9 `AkFooter.svelte` — la firma

- `border-top: 1px solid var(--rule)`, `padding-block: var(--s-4)`.
- Grid 12: cols 1–4: `img` isotipo bone 40 px de alto + `p.t-nota` (margin-top `--s-2`, `max-width: 32ch`): `Ingeniería de software y soluciones digitales para organizaciones públicas y privadas. Posadas, Misiones, Argentina.` Cols 6–7 `Empresa` (Nosotros `/about`, Proyectos `/projects`, Lista `/list`, Mapa `/map`); cols 8–9 `Soluciones` (anchor `/#soluciones`, `/#metodo`, `/#alcance`); cols 10–12 `Contacto` (email, WhatsApp, ubicación). Títulos de columna `.t-kicker`, links `.link .t-nota`.
- Fila inferior (`border-top rule`, `padding-top: var(--s-2)`, `.t-nota`): `© {año} MisTec` a la izquierda; `Posadas, Misiones · Argentina · Desde 2020` a la derecha. Sin versión, sin email repetido.

### 7.10 Limpieza

- `package.json`: quitar `@iconify/svelte`, `@iconify/json`, `unplugin-icons`; `vite.config.js`: quitar el plugin `Icons`. Ejecutar `bun install` y regenerar `bun.lock`.
- Borrar: `src/lib/components/editorial/`, los 8 componentes viejos de `landing/`, los componentes sin uso `AkBadge.svelte`, `Search.svelte`, `ThFilter.svelte` y `AkBtnMetadata.svelte`, `static/mistec.png`, `static/favicon.svg`, `static/fonts/IBMPlex*`, `static/fonts/ibm-plex-sans.css` y `landing.html` (no lo referencia nada). `svelte-complete.txt` **se queda**: lo referencia `.vscode/settings.json`.
- `@tailwindcss/typography` también se quita de `package.json` y de `app.css`: `.prose-brand` lo reemplaza.
- `CLAUDE.md`: actualizar la sección de estilos (tokens, Inter, presupuesto de ámbar, `Icon.svelte`) y aclarar que el lockfile es `bun.lock`.

## 8. Verificación

No hay framework de tests. La verificación es de build, lint, grep y visual:

1. `bun run lint` sin errores. `bun run build` (y `CUSTOM_DOMAIN=true bun run build`) termina en 0 y prerenderiza las 50 entradas.
2. Greps que deben devolver **0** en `src/`: `font-mono`, `JetBrains`, `Geist`, `~icons`, `iconify`, `font-bold`, `font-semibold`, `font-extrabold`, `rounded-full`, `backdrop-blur`, `gradient`, `glow`, `shadow-`, `blur(`, `section-paper`, `chip`, `kicker`, `serial`, `marginalia`, `tag-pill`, `card-dark`, `grain`, `marquee`, `animate-`, `mistec.png`, `Mistec Capital`, `LATAM`.
3. Grep de ámbar (4.7): solo los usos listados.
4. Visual con Playwright a 1440 × 900 y 390 × 844, para `/`, `/projects`, `/list`, `/map`, `/about`, `/projects/guazuapp`: captura completa, sin errores en consola, sin scroll horizontal (`document.documentElement.scrollWidth <= innerWidth`). Revisión de las capturas contra el "test del sistema": ¿está sobre la retícula? ¿se puede explicar cada distancia? ¿sobra algo? ¿podría pertenecer a otra empresa?
5. Accesibilidad mínima: foco visible con teclado en header, botones, cards y filtros; `prefers-reduced-motion` emulado → sin transiciones; contraste bone/ink y mist/ink ≥ 4.5:1 (mist `#8A857A` sobre ink da ≈ 4.9:1).
6. Favicon y OG: `curl -I` de `/favicon.ico`, `/favicon-96.png`, `/favicon-192.png`, `/apple-touch-icon.png`, `/og-default.jpg`, `/brand/*.png`, `/fonts/InterVariable.woff2` → 200; inspección visual del OG generado.
7. Marca: en la captura del header medir que el bloque horizontal ≥ 80 px de ancho y tenga ≥ 2X de aire (X = grosor del asta ≈ 4 px a 112 px de ancho → ≥ 8 px; el header de 64 px deja 12 px arriba y abajo); en el footer el isotipo ≥ 24 px de alto.

## 9. Fuera de alcance

- Fotografía de personas / modo "Humano".
- Cara clara (paper) en cualquier página.
- Rehacer la lógica de `list` (datatables) o `map` (Leaflet).
- Descargar los PDF al repo.
- Cambios en las fichas de proyecto más allá de las dos ubicaciones.
- Formulario de contacto.

## 10. Riesgos y notas

- **Inter vs. Suisse:** las métricas son parecidas pero no iguales; al cambiar a Suisse habrá que revisar los `clamp` del título y el tracking de kickers.
- **Recorte de PNG:** `sharp().trim()` recorta por el color de la esquina; los `transparente-bone` tienen fondo transparente, así que funciona. Verificar visualmente que no se coma el punto final del logotipo.
- **ICO:** `sharp` no escribe `.ico`. Se usa `png-to-ico` (devDependency, sin dependencias nativas) o se conserva un ICO generado una vez y se commitea.
- **Ámbar al 9 % del isotipo en el hero:** si en la captura se lee como "logo recoloreado" y no como recurso, se baja a 0.06 o se elimina. La decisión se toma con la captura.
