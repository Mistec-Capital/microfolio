# Rediseño MisTec según el sistema de marca — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el sistema visual, la marca, la tipografía y el contenido del sitio MisTec por los que fijan los manuales de marca de agosto 2026, con una landing nueva que sigue el Manual Institucional y el resto de las páginas migradas al mismo sistema.

**Architecture:** Un solo archivo de tokens (`src/lib/theme.css`, en `@layer base` / `@layer components` para convivir con Tailwind 4) define color, escala tipográfica, retícula, motion y componentes base; los componentes Svelte solo combinan esas clases con utilidades Tailwind mapeadas a los mismos tokens (`bg-ink`, `text-mist`, `gap-s2`…). La landing se compone de ocho componentes nuevos en `src/lib/components/landing/`; el resto de rutas conserva su lógica y cambia solo el markup. Un script `scripts/check-brand.sh` hace de test de regresión del sistema (patrones prohibidos + presupuesto de ámbar) y un test `node --test` cubre el único módulo puro nuevo.

**Tech Stack:** SvelteKit 2 (Svelte 5, runas), Tailwind CSS 4 (`@tailwindcss/vite`), `sharp` (assets), `png-to-ico` (favicon), Inter variable (woff2), Node 24 `node --test`, bun como gestor de paquetes (el lockfile del repo es `bun.lock`; CI usa `pnpm install` sin lockfile y funciona igual).

**Spec:** `docs/superpowers/specs/2026-08-31-rebrand-mistec-design.md` — el plan argumenta desde el spec; leé los dos.

## Global Constraints

- Rama de trabajo: `rebrand-mistec` (ya creada, con el spec commiteado). Todo se commitea ahí.
- Gestor de paquetes: `bun` (`bun install`, `bun add -d`, `bun run <script>`). No generar `pnpm-lock.yaml` ni `package-lock.json`.
- Color: solo los tokens de la spec §4.1. Ningún hex arbitrario en clases Tailwind (`text-[#…]` está prohibido); ningún `rgba` decorativo, `backdrop-blur`, `box-shadow` ni `background-image` (salvo el mapa).
- Ámbar (`--amber`, `#FFB840`): **solo** en `src/lib/theme.css` (`--amber`, `::selection`, `:focus-visible`, `.status-dot`, `.accent`). En componentes, únicamente `<span class="accent">` con una palabra por titular, lista cerrada en spec §4.7.
- Tipografía: una familia (Inter variable). Pesos permitidos: 300, 350, 400, 500. `font-bold`, `font-semibold`, `font-extrabold` y `font-weight: 600/700` prohibidos. Sin `font-mono`.
- Alineación: izquierda. `text-center` prohibido (`text-right` permitido en celdas numéricas).
- Formas: `--radius: 2px` único. `rounded-full` prohibido (excepto el `.status-dot` de 6 px definido en theme.css).
- Motion: solo `opacity`, `clip-path`, `color`, `background-color`, `border-color`, con `--d-breve|media|larga` y `--ease`. Nada de `transform` en hover ni animaciones (`animate-*`, `marquee`, `pulse`, `blink`).
- Íconos: solo `src/lib/components/Icon.svelte` (`menu`, `close`, `arrow-right`, `arrow-up-right`, `chevron-left`, `chevron-right`, `plus`). Nada de `~icons/*`, `@iconify`, `lucide`.
- Copy: literal o condensado del Manual Institucional (spec §5). Prohibidos en `src/`: `Mistec Capital`, `LATAM`, `mistec.png`.
- Marca: solo los PNG de `static/brand/` generados desde `brand/signos/`. Nunca en ámbar, nunca con efectos.
- Antes de cada commit: `bun run format`, `bun run build` en 0, y `bunx eslint <archivos tocados>` sin errores (hasta la Task 15 quedan errores preexistentes en archivos viejos que las tareas van reemplazando; desde la Task 15, `bun run lint` completo en 0). A partir de la Task 15, además `bun run check:brand` en 0.
- Mensajes de commit en español, prefijo `feat:`/`fix:`/`chore:`/`docs:`, y el trailer:
  ```
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01KZEvzV9tjUvEvxYrFmmh9A
  ```

---

## Estructura de archivos

**Crear**
- `scripts/check-brand.sh` — regresión del sistema de marca (grep de prohibidos + presupuesto de ámbar).
- `scripts/generate-brand-assets.js` — genera `static/brand/*`, favicons y `og-default.jpg` desde `brand/signos/`.
- `brand/signos/*.png` — los 16 PNG originales del zip (fuente de verdad, no se sirven).
- `static/brand/mistec-horizontal-bone.png`, `static/brand/mistec-isotipo-bone.png`, `static/brand/mistec-logo-512.png` — generados.
- `static/fonts/InterVariable.woff2` — única familia.
- `src/lib/components/Icon.svelte` — set de íconos del sistema.
- `src/lib/utils/categories.js` — `categoryLabel`, `isInDevelopment`, `yearOf` (puro, sin `fs`).
- `tests/categories.test.js` — test `node --test` del módulo anterior.
- `src/lib/components/landing/SectionHead.svelte` — cabecera de sección numerada (kicker + título + bajada + slot).
- `src/lib/components/landing/{Hero,QuienesSomos,PropuestaValor,Soluciones,ComoTrabajamos,Alcance,Proyectos,Contacto}.svelte` — las 8 secciones de la landing.

**Modificar**
- `src/lib/theme.css` (reescritura total), `src/app.css`, `src/app.html`, `src/lib/actions/scrollReveal.js`.
- `src/routes/+layout.svelte`, `src/lib/components/AkHeader.svelte`, `src/lib/components/AkFooter.svelte`.
- `src/lib/components/AkProjectCard.svelte`, `AkFilters.svelte`, `AkBtnClose.svelte`, `ThSort.svelte`, `Pagination.svelte`, `RowsPerPage.svelte`, `RowCount.svelte`.
- `src/routes/+page.svelte`, `projects/+page.svelte`, `about/+page.svelte`, `list/+page.svelte`, `map/+page.svelte`, `projects/[slug]/+page.svelte`.
- `src/lib/config.js`, `content/about.md`, `content/index.md`, 44 fichas en `content/projects/*/index.md` (solo `authors[].name` y 2 `location`).
- `package.json`, `vite.config.js`, `CLAUDE.md`.

**Borrar**
- `src/lib/components/editorial/` (6 archivos), `src/lib/components/landing/{Hero,Manifiesto,ObraReciente,Plataformas,Gobierno,IA,Capacidades,Contacto}.svelte` (los viejos; `Hero` y `Contacto` se sobrescriben), `AkBadge.svelte`, `Search.svelte`, `ThFilter.svelte`, `AkBtnMetadata.svelte`.
- `static/mistec.png`, `static/favicon.svg`, `static/fonts/IBMPlexSans-*`, `static/fonts/ibm-plex-sans.css`, `landing.html`.

---

### Task 0: Baseline de lint en verde

**Files:**
- Modify: `eslint.config.js`, `scripts/generate-optimized-images.js`, `scripts/clean-optimized-images.js`, `src/routes/projects/[slug]/+page.server.js`, `src/lib/components/SeoHead.svelte`, `src/lib/components/Datatable.svelte`

**Interfaces:**
- Produces: `bun run lint` en 0 sobre los archivos que el plan **no** reescribe. Los errores restantes viven en archivos que las Tasks 6–14 reemplazan por completo (Header, Footer, Card, Filters, páginas, landing vieja, ThFilter, RowsPerPage, Pagination) y desaparecen con ellas.
- Produces: `<Datatable class>` sin prop `handler` (era un prop sin uso). La Task 12 ya lo llama así.

Contexto: `bun run lint` (= `prettier --check . && eslint .`) falla hoy con 58 errores preexistentes. Esta tarea deja en verde los archivos que ninguna otra tarea toca y desactiva una regla que contradice la convención del repo.

- [ ] **Step 1: Desactivar `svelte/no-navigation-without-resolve`** — el repo construye hrefs como `{base}/ruta` (convención existente y la que usa todo el plan); la regla exige `resolve()` de `$app/paths` y es un default nuevo del plugin. En `eslint.config.js`, agregar un bloque al final del array:

```js
	{
		rules: {
			// El sitio construye hrefs con `{base}/…` (convención del repo); no usa resolve().
			'svelte/no-navigation-without-resolve': 'off'
		}
	}
```

- [ ] **Step 2: Arreglar los errores triviales de archivos que el plan no toca**

Correr `bunx eslint scripts src/routes/projects/\[slug\]/+page.server.js src/lib/components/SeoHead.svelte src/lib/components/Datatable.svelte` y resolver cada error con el cambio mínimo:
- `no-unused-vars` en `scripts/*.js` y en `[slug]/+page.server.js`: borrar la variable/import sin uso (no renombrar con `_`).
- `no-empty` en `scripts/clean-optimized-images.js`: poner un comentario dentro del bloque vacío (`// no existe: nada que borrar`) o eliminar el try/catch si no protege nada.
- `no-useless-escape` en `SeoHead.svelte`: quitar la barra sobrante en el string (`<\/script>` → usar `'</' + 'script>'` o `<\u002fscript>` — elegir la forma que mantenga el `</script>` fuera del HTML literal, porque es lo que evita cerrar el tag).
- `svelte/no-at-html-tags` en `SeoHead.svelte`: anteponer `<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD generado por el sitio -->` al `{@html …}`.
- `Datatable.svelte`: quitar el prop `handler` sin uso: `let { children, class: className = '', ...props } = $props();`.

- [ ] **Step 3: Verificar**

Run: `bun run format && bunx eslint . 2>&1 | grep -c ' error ' ; bunx eslint . 2>&1 | grep '^/' | sed 's|.*/microfolio-1/||'`
Expected: el conteo baja de 58 a los que quedan en archivos que las Tasks 6–14 reescriben, y la lista de archivos con errores NO incluye `scripts/`, `+page.server.js`, `SeoHead.svelte` ni `Datatable.svelte`.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.js scripts src/routes/projects/[slug]/+page.server.js src/lib/components/SeoHead.svelte src/lib/components/Datatable.svelte
git commit -m "chore: lint en verde para los archivos base; desactiva no-navigation-without-resolve"
```

---

### Task 1: Test de regresión del sistema de marca (`check-brand.sh`)

**Files:**
- Create: `scripts/check-brand.sh`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces: `bun run check:brand` → exit 0 si `src/` cumple el sistema; exit 1 y lista de violaciones si no. Se usa como gate en la Task 15 y 16.

- [ ] **Step 1: Escribir el script**

```bash
#!/usr/bin/env bash
# Regresión del sistema de marca MisTec (spec §4.7 y §8.2).
# Falla si src/ usa recursos prohibidos por los manuales o si el ámbar
# aparece fuera del presupuesto. Uso: bun run check:brand
set -u
set -f
cd "$(dirname "$0")/.."
fail=0
files=$(find src -type f \( -name '*.svelte' -o -name '*.css' -o -name '*.js' -o -name '*.html' \) | sort)

forbidden=(
	'font-mono' 'JetBrains' 'Geist' '~icons' 'iconify' 'lucide'
	'font-bold' 'font-semibold' 'font-extrabold' 'font-weight: *[6-9]00'
	'rounded-full' 'backdrop-blur' 'gradient' 'glow' 'shadow-' 'blur\(' 'grain' 'marquee' 'animate-'
	'section-paper' 'chip' '(^|[^-])kicker' 'Kicker' 'serial' 'Serial' 'marginalia' 'Marginalia'
	'tag-pill' 'card-dark' 'ed-card' 'bg-mesh' 'bg-blueprint' 'text-center' '\[#[0-9A-Fa-f]'
	'mistec\.png' 'Mistec Capital' 'LATAM'
)
for p in "${forbidden[@]}"; do
	hits=$(grep -nE -- "$p" $files || true)
	if [ -n "$hits" ]; then
		echo "✗ prohibido «$p»:"
		echo "$hits" | sed 's/^/    /'
		fail=1
	fi
done

# Ámbar fuera de theme.css: nada.
others=$(echo "$files" | grep -v '^src/lib/theme.css$')
hits=$(grep -nEi -- 'ffb840|amber' $others || true)
if [ -n "$hits" ]; then
	echo "✗ ámbar fuera de src/lib/theme.css:"
	echo "$hits" | sed 's/^/    /'
	fail=1
fi

# Ámbar dentro de theme.css: solo el presupuesto (spec §4.7).
while IFS= read -r line; do
	[ -z "$line" ] && continue
	case "$line" in
		*'--amber:'* | *'--amber-dim:'* | *'outline: 2px solid var(--amber)'* | *'background-color: var(--amber)'* | *'color: var(--amber)'*) ;;
		*)
			echo "✗ ámbar fuera de presupuesto en theme.css: $line"
			fail=1
			;;
	esac
done < <(grep -nEi -- 'ffb840|amber' src/lib/theme.css || true)

if [ "$fail" -eq 0 ]; then
	echo "✓ check-brand: sin violaciones"
fi
exit $fail
```

- [ ] **Step 2: Hacerlo ejecutable y registrarlo en `package.json`**

```bash
chmod +x scripts/check-brand.sh
```

En `package.json`, dentro de `"scripts"`, agregar después de `"lint"`:

```json
"check:brand": "bash scripts/check-brand.sh",
```

- [ ] **Step 3: Correrlo y verificar que falla (el sitio actual viola casi todo)**

Run: `bun run check:brand; echo "exit=$?"`
Expected: varias líneas `✗ prohibido «font-mono»:` …, y al final `exit=1`.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-brand.sh package.json
git commit -m "chore: script de verificación del sistema de marca (check:brand)"
```

---

### Task 2: Assets de marca (signos, favicons, OG)

**Files:**
- Create: `brand/signos/*.png` (16), `scripts/generate-brand-assets.js`
- Create (generados): `static/brand/mistec-horizontal-bone.png`, `static/brand/mistec-isotipo-bone.png`, `static/brand/mistec-logo-512.png`, `static/favicon.ico`, `static/favicon-96.png`, `static/favicon-192.png`, `static/apple-touch-icon.png`, `static/og-default.jpg`
- Modify: `package.json` (devDependency `png-to-ico`, script `brand:assets`), `src/app.html` (links de favicon)
- Delete: `static/mistec.png`, `static/favicon.svg`

**Interfaces:**
- Produces: rutas servidas `/brand/mistec-horizontal-bone.png` (720 px de ancho, bone sobre transparente, recortado), `/brand/mistec-isotipo-bone.png` (240 px), `/brand/mistec-logo-512.png` (isotipo bone sobre ink, cuadrado). Las usan Header (Task 6), Footer (Task 6), Hero (Task 8) y el JSON-LD (Task 10).

- [ ] **Step 1: Copiar los signos originales al repo**

```bash
tmp=$(mktemp -d)
unzip -q '/home/mauro/Descargas/Institucional-20260831T222106Z-1-001.zip' -d "$tmp"
mkdir -p brand/signos
cp "$tmp/Institucional/Signos Marcarios/"*.png brand/signos/
rm -rf "$tmp"
ls brand/signos | wc -l
```
Expected: `16`.

- [ ] **Step 2: Agregar `png-to-ico`**

Run: `bun add -d png-to-ico`
Expected: `package.json` tiene `"png-to-ico": "^2.x"` en `devDependencies` y `bun.lock` se actualiza.

- [ ] **Step 3: Escribir el generador**

`scripts/generate-brand-assets.js`:

```js
#!/usr/bin/env node
// Genera los assets de marca servidos desde static/ a partir de los PNG
// originales en brand/signos/. La marca nunca se redibuja: solo se recorta
// (trim de transparencia) y se escala. Ver spec §4.8.
import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const SRC = 'brand/signos';
const OUT = 'static/brand';
const INK = '#0A0A0A';

await mkdir(OUT, { recursive: true });

// Bloque horizontal e isotipo en bone sobre transparente, recortados al rectángulo que los contiene.
await sharp(join(SRC, 'mistec-bloque-horizontal-transparente-bone.png'))
	.trim()
	.resize({ width: 720 })
	.png()
	.toFile(join(OUT, 'mistec-horizontal-bone.png'));

await sharp(join(SRC, 'mistec-isotipo-transparente-bone.png'))
	.trim()
	.resize({ width: 240 })
	.png()
	.toFile(join(OUT, 'mistec-isotipo-bone.png'));

// Isotipo bone sobre ink (versión negativa) para favicon, avatar y JSON-LD.
const negativo = join(SRC, 'mistec-isotipo-negativo.png');
await sharp(negativo).resize(512, 512).png().toFile(join(OUT, 'mistec-logo-512.png'));
await sharp(negativo).resize(192, 192).png().toFile('static/favicon-192.png');
await sharp(negativo).resize(96, 96).png().toFile('static/favicon-96.png');
await sharp(negativo).resize(180, 180).png().toFile('static/apple-touch-icon.png');

const icoSources = await Promise.all(
	[16, 32, 48].map((size) => sharp(negativo).resize(size, size).png().toBuffer())
);
await writeFile('static/favicon.ico', await pngToIco(icoSources));

// Open Graph 1200×630: portada ink, bloque horizontal arriba a la izquierda,
// título en el tercio inferior. Sin ámbar: la pieza es institucional.
const marca = await sharp(join(SRC, 'mistec-bloque-horizontal-transparente-bone.png'))
	.trim()
	.resize({ width: 300 })
	.png()
	.toBuffer();

const titulo = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="96" y="470" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="56" font-weight="500" fill="#E8E3D6" letter-spacing="-1.2">Ingeniería aplicada a resolver problemas.</text>
  <text x="96" y="530" font-family="Inter, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="400" fill="#8A857A">Ingeniería de software y soluciones digitales · Posadas, Misiones</text>
</svg>`);

await sharp({ create: { width: 1200, height: 630, channels: 3, background: INK } })
	.composite([
		{ input: marca, top: 96, left: 96 },
		{ input: titulo, top: 0, left: 0 }
	])
	.jpeg({ quality: 90 })
	.toFile('static/og-default.jpg');

console.log('Assets de marca generados en static/brand y static/.');
```

En `package.json`, `"scripts"`, agregar:

```json
"brand:assets": "node scripts/generate-brand-assets.js",
```

- [ ] **Step 4: Generar y verificar dimensiones**

Run:
```bash
bun run brand:assets && node -e "
const sharp = require('sharp');
(async () => {
  for (const f of ['static/brand/mistec-horizontal-bone.png','static/brand/mistec-isotipo-bone.png','static/brand/mistec-logo-512.png','static/favicon-192.png','static/favicon-96.png','static/apple-touch-icon.png','static/og-default.jpg']) {
    const m = await sharp(f).metadata(); console.log(f, m.width + 'x' + m.height);
  }
})();"
ls -la static/favicon.ico
```
Expected: `mistec-horizontal-bone.png 720x2xx` (alto ≈ 260, relación ≈ 2,77:1), `mistec-isotipo-bone.png 240x2xx` (alto ≈ 212), `mistec-logo-512.png 512x512`, `favicon-192.png 192x192`, `favicon-96.png 96x96`, `apple-touch-icon.png 180x180`, `og-default.jpg 1200x630`; `favicon.ico` con tamaño > 10 kB.

- [ ] **Step 5: Mirar los resultados** (Read tool sobre cada PNG y el JPG). Verificar: el recorte no se comió el punto final de "mistec." en el horizontal; el OG tiene la marca arriba a la izquierda y el título abajo; nada en ámbar.

- [ ] **Step 6: Borrar el tucán y actualizar `app.html`**

```bash
git rm -q static/mistec.png static/favicon.svg
```

Reemplazar el bloque `<head>` de `src/app.html` para que quede así (todavía con Google Fonts; se cambia en la Task 3):

```html
<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="%sveltekit.assets%/favicon.ico" sizes="any" />
		<link rel="icon" href="%sveltekit.assets%/favicon-96.png" sizes="96x96" type="image/png" />
		<link rel="icon" href="%sveltekit.assets%/favicon-192.png" sizes="192x192" type="image/png" />
		<link rel="apple-touch-icon" href="%sveltekit.assets%/apple-touch-icon.png" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Geist:wght@300..900&family=JetBrains+Mono:wght@400;500;700&display=swap"
			rel="stylesheet"
		/>
		%sveltekit.head%
	</head>
	<body class="grain-overlay" data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

- [ ] **Step 7: Verificar que el build sigue en 0** (el header todavía referencia `mistec.png`; el `<img>` da 404 en runtime pero el build no falla porque es una URL estática)

Run: `bun run build 2>&1 | tail -3`
Expected: `✅ Build completed successfully!`

- [ ] **Step 8: Commit**

```bash
git add brand scripts/generate-brand-assets.js package.json bun.lock static src/app.html
git commit -m "feat: signos marcarios nuevos, favicons y OG generados desde los originales"
```

---

### Task 3: Tipografía Inter (única familia)

**Files:**
- Create: `static/fonts/InterVariable.woff2`
- Modify: `src/app.html`
- Delete: `static/fonts/IBMPlexSans-*.ttf`, `static/fonts/IBMPlexSans-*.woff2`, `static/fonts/ibm-plex-sans.css`

**Interfaces:**
- Produces: `font-family: 'Inter'` disponible en pesos 100–900 vía `@font-face` inline en `app.html`. `theme.css` (Task 4) la referencia por nombre.

- [ ] **Step 1: Descargar Inter 4.1 y quedarse solo con la variable**

```bash
tmp=$(mktemp -d)
curl -L -o "$tmp/inter.zip" https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip
unzip -q "$tmp/inter.zip" -d "$tmp/inter"
git rm -q static/fonts/IBMPlexSans-* static/fonts/ibm-plex-sans.css
find "$tmp/inter" -name 'InterVariable.woff2' -exec cp {} static/fonts/ \;
rm -rf "$tmp"
ls -la static/fonts
```
Expected: solo `InterVariable.woff2`, tamaño ≈ 340 kB. (Si la descarga falla por red, avisar: no hay alternativa offline en el repo.)

- [ ] **Step 2: Reescribir `src/app.html`** (sin Google Fonts, sin `grain-overlay`, con preload y `@font-face` base-path-safe):

```html
<!doctype html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="%sveltekit.assets%/favicon.ico" sizes="any" />
		<link rel="icon" href="%sveltekit.assets%/favicon-96.png" sizes="96x96" type="image/png" />
		<link rel="icon" href="%sveltekit.assets%/favicon-192.png" sizes="192x192" type="image/png" />
		<link rel="apple-touch-icon" href="%sveltekit.assets%/apple-touch-icon.png" />
		<link
			rel="preload"
			href="%sveltekit.assets%/fonts/InterVariable.woff2"
			as="font"
			type="font/woff2"
			crossorigin
		/>
		<style>
			/* Única familia del sistema. Va acá (y no en theme.css) porque la URL
			   necesita %sveltekit.assets% para funcionar con y sin base path. */
			@font-face {
				font-family: 'Inter';
				src: url('%sveltekit.assets%/fonts/InterVariable.woff2') format('woff2');
				font-weight: 100 900;
				font-style: normal;
				font-display: swap;
			}
		</style>
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

- [ ] **Step 3: Verificar que la fuente se sirve**

Run (con el dev server levantado en otro proceso: `bun run dev`):
```bash
curl -sI http://localhost:5173/fonts/InterVariable.woff2 | head -1
curl -s http://localhost:5173/ | grep -c "InterVariable.woff2"
```
Expected: `HTTP/1.1 200 OK` y `2` (preload + font-face).

- [ ] **Step 4: Commit**

```bash
git add static/fonts src/app.html
git commit -m "feat: Inter variable auto-hospedada como única familia tipográfica"
```

---

### Task 4: Tokens del sistema (`theme.css`, `app.css`, `scrollReveal`)

**Files:**
- Modify: `src/lib/theme.css` (reescritura total), `src/app.css` (reescritura total), `src/lib/actions/scrollReveal.js` (reescritura total)

**Interfaces:**
- Produces (clases que usan todas las tasks siguientes):
  - Tipografía: `.t-titulo .t-subtitulo .t-bajada .t-cuerpo .t-nota .t-kicker .t-cifra .t-ui .tnum .accent`
  - Layout: `.container-brand .grid-12 .section .rule .list-rule .grid-rule`
  - Componentes: `.btn .btn-square .btn-text .link .link-active .card .tag .tag-active .input .status-dot .prose-brand`
  - Motion: `.reveal .reveal-1 … .reveal-6` + acción `scrollReveal(node)` que agrega `.visible` a los `.reveal` descendientes al entrar en viewport.
  - Utilidades Tailwind por tokens: colores `ink ink-2 bone mist rule`, espaciado `s1 s2 s3 s4 s5`.

- [ ] **Step 1: Reescribir `src/lib/theme.css`**

```css
/* ============================================================
   MisTec — Sistema de marca v1.0 (agosto 2026)
   Tokens, escala tipográfica, retícula, motion y componentes base.
   Spec: docs/superpowers/specs/2026-08-31-rebrand-mistec-design.md
   El @font-face de Inter vive en src/app.html (necesita %sveltekit.assets%).
   ============================================================ */

:root {
	/* Color — cara oscura, la única que usa el sitio */
	--ink: #0a0a0a;
	--ink-2: #141413;
	--bone: #e8e3d6;
	--mist: #8a857a;
	--rule: #2a2a28;
	--amber: #ffb840;
	/* Cara clara — definida por completitud, sin uso en el sitio */
	--paper: #ede6d6;
	--rule-paper: #c8c0ae;
	--amber-dim: #cc8f1a;
	--sig: #d64545;

	/* Tipografía — una sola familia */
	--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
	--w-titulo: 500;

	/* Espacio — el vacío mayor duplica al menor */
	--s-1: 8px;
	--s-2: 16px;
	--s-3: 32px;
	--s-4: 64px;
	--s-5: 128px;
	/* Retícula: 12 columnas, margen = 4 medianiles */
	--gutter: 8px;
	--margin: 32px;
	--radius: 2px;

	/* Motion — tres duraciones, una aceleración (sale rápido, llega lento) */
	--d-breve: 120ms;
	--d-media: 240ms;
	--d-larga: 480ms;
	--ease: cubic-bezier(0.2, 0, 0, 1);
	--stagger: 60ms;
}
@media (min-width: 768px) {
	:root {
		--gutter: 16px;
		--margin: 64px;
	}
}
@media (min-width: 1280px) {
	:root {
		--gutter: 24px;
		--margin: 96px;
	}
}

@layer base {
	html {
		scroll-behavior: smooth;
	}
	body {
		background-color: var(--ink);
		color: var(--bone);
		font-family: var(--font-sans);
		font-weight: 350;
		font-size: 1rem;
		line-height: 1.55;
		letter-spacing: -0.002em;
		-webkit-font-smoothing: antialiased;
		font-feature-settings: 'cv11', 'ss01', 'ss03';
	}
	strong,
	b {
		font-weight: 500;
	}
	::selection {
		background-color: var(--amber);
		color: var(--ink);
	}
	:focus-visible {
		outline: 2px solid var(--amber);
		outline-offset: 3px;
	}
	@media (prefers-reduced-motion: reduce) {
		html {
			scroll-behavior: auto;
		}
	}
}

@layer components {
	/* ---- Escala tipográfica: cinco niveles, ninguno intermedio ---- */
	.t-titulo {
		font-size: clamp(2.5rem, 5.5vw, 4.5rem);
		font-weight: var(--w-titulo);
		letter-spacing: -0.022em;
		line-height: 1.04;
		color: var(--bone);
	}
	.t-subtitulo {
		font-size: 2rem;
		font-weight: 500;
		letter-spacing: -0.016em;
		line-height: 1.08;
		color: var(--bone);
	}
	.t-bajada {
		font-size: 1.25rem;
		font-weight: 350;
		letter-spacing: -0.002em;
		line-height: 1.45;
		color: var(--mist);
		max-width: 62ch;
	}
	.t-cuerpo {
		font-size: 1rem;
		font-weight: 350;
		letter-spacing: -0.002em;
		line-height: 1.55;
		color: var(--bone);
		max-width: 62ch;
	}
	.t-nota {
		font-size: 0.8125rem;
		font-weight: 350;
		letter-spacing: 0;
		line-height: 1.45;
		color: var(--mist);
	}
	.t-kicker {
		font-size: 0.6875rem;
		font-weight: 500;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		line-height: 1;
		color: var(--mist);
	}
	.t-cifra {
		font-size: clamp(4rem, 7vw, 6rem);
		font-weight: 300;
		letter-spacing: -0.022em;
		line-height: 1;
		color: var(--bone);
		font-variant-numeric: tabular-nums;
	}
	.t-ui {
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.002em;
	}
	.tnum {
		font-variant-numeric: tabular-nums;
	}
	/* El acento: una palabra por titular. Único uso del ámbar en componentes. */
	.accent {
		color: var(--amber);
	}

	/* ---- Retícula y secciones ---- */
	.container-brand {
		max-width: 1440px;
		margin-inline: auto;
		padding-inline: var(--margin);
	}
	.grid-12 {
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		column-gap: var(--gutter);
	}
	.section {
		padding-block: var(--s-4);
		border-top: 1px solid var(--rule);
	}
	@media (min-width: 1024px) {
		.section {
			padding-block: var(--s-5);
		}
	}
	.rule {
		display: block;
		width: 100%;
		height: 1px;
		background-color: var(--rule);
		border: 0;
	}
	.list-rule > li {
		border-top: 1px solid var(--rule);
		padding-block: var(--s-2);
	}
	.list-rule > li:last-child {
		border-bottom: 1px solid var(--rule);
	}
	.grid-rule {
		display: grid;
		gap: 1px;
		background-color: var(--rule);
		border: 1px solid var(--rule);
	}
	.grid-rule > * {
		background-color: var(--ink);
	}
	.grid-rule > .card {
		border-color: transparent;
		border-radius: 0;
	}

	/* ---- Componentes base: cuatro estados, un recurso por cambio ---- */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--s-1);
		height: 48px;
		padding: 0 24px;
		border: 1px solid var(--bone);
		border-radius: var(--radius);
		background-color: transparent;
		color: var(--bone);
		font-size: 0.9375rem;
		font-weight: 500;
		line-height: 1;
		cursor: pointer;
		transition:
			background-color var(--d-breve) var(--ease),
			color var(--d-breve) var(--ease);
	}
	.btn:hover {
		background-color: var(--bone);
		color: var(--ink);
	}
	.btn-square {
		width: 40px;
		height: 40px;
		padding: 0;
		justify-content: center;
	}
	.btn-text {
		display: inline-flex;
		align-items: center;
		gap: var(--s-1);
		color: var(--bone);
		font-weight: 500;
		text-underline-offset: 4px;
		text-decoration-thickness: 1px;
		cursor: pointer;
	}
	.btn-text:hover {
		text-decoration-line: underline;
	}
	.link {
		color: var(--mist);
		transition: color var(--d-breve) var(--ease);
	}
	.link:hover {
		color: var(--bone);
	}
	.link-active {
		color: var(--bone);
		border-bottom: 1px solid var(--bone);
	}
	.card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		background-color: var(--ink);
		transition: border-bottom-color var(--d-breve) var(--ease);
	}
	a.card:hover {
		border-bottom-color: var(--bone);
	}
	.tag {
		display: inline-block;
		font-size: 0.8125rem;
		line-height: 1.45;
		padding: 2px 8px;
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		background-color: transparent;
		color: var(--mist);
		transition:
			color var(--d-breve) var(--ease),
			border-color var(--d-breve) var(--ease);
	}
	button.tag {
		cursor: pointer;
	}
	button.tag:hover {
		color: var(--bone);
	}
	.tag-active {
		color: var(--bone);
		border-color: var(--bone);
	}
	.input {
		width: 100%;
		height: 40px;
		padding: 0 12px;
		background-color: var(--ink);
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		color: var(--bone);
		font: inherit;
	}
	.input::placeholder {
		color: var(--mist);
	}
	.status-dot {
		display: inline-block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: var(--amber);
		vertical-align: middle;
		flex-shrink: 0;
	}

	/* ---- Markdown ---- */
	.prose-brand > * + * {
		margin-top: var(--s-2);
	}
	.prose-brand h2 {
		font-size: 2rem;
		font-weight: 500;
		letter-spacing: -0.016em;
		line-height: 1.08;
		color: var(--bone);
		margin-top: var(--s-4);
	}
	.prose-brand h3 {
		font-size: 1rem;
		font-weight: 500;
		color: var(--bone);
		margin-top: var(--s-3);
	}
	.prose-brand p,
	.prose-brand li {
		font-size: 1rem;
		font-weight: 350;
		line-height: 1.55;
		color: var(--bone);
		max-width: 62ch;
	}
	.prose-brand a {
		color: var(--bone);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.prose-brand ul {
		list-style: none;
		padding-left: 0;
	}
	.prose-brand ul > li {
		position: relative;
		padding-left: 1.25rem;
	}
	.prose-brand ul > li::before {
		content: '–';
		position: absolute;
		left: 0;
		color: var(--mist);
	}
	.prose-brand ol {
		list-style: decimal;
		padding-left: 1.25rem;
	}
	.prose-brand li + li {
		margin-top: var(--s-1);
	}
	.prose-brand blockquote {
		border-left: 1px solid var(--rule);
		padding-left: var(--s-2);
		color: var(--mist);
	}
	.prose-brand code {
		font-family: inherit;
		font-size: 0.9em;
		color: var(--bone);
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		padding: 0 4px;
	}
	.prose-brand hr {
		border: 0;
		height: 1px;
		background-color: var(--rule);
		margin-block: var(--s-3);
	}

	/* ---- Revelado: sobre su propio eje, sin trasladarse ---- */
	.reveal {
		opacity: 0;
		clip-path: inset(0 0 100% 0);
		transition:
			opacity var(--d-larga) var(--ease),
			clip-path var(--d-larga) var(--ease);
	}
	.reveal.visible {
		opacity: 1;
		clip-path: inset(0);
	}
	.reveal-1 {
		transition-delay: calc(var(--stagger) * 1);
	}
	.reveal-2 {
		transition-delay: calc(var(--stagger) * 2);
	}
	.reveal-3 {
		transition-delay: calc(var(--stagger) * 3);
	}
	.reveal-4 {
		transition-delay: calc(var(--stagger) * 4);
	}
	.reveal-5 {
		transition-delay: calc(var(--stagger) * 5);
	}
	.reveal-6 {
		transition-delay: calc(var(--stagger) * 6);
	}
	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			clip-path: none;
			transition: none;
		}
	}
}
```

- [ ] **Step 2: Reescribir `src/app.css`**

```css
@import 'tailwindcss';

/* Tokens y componentes del sistema de marca MisTec. */
@import './lib/theme.css';

/* Los mismos tokens, expuestos como utilidades Tailwind
   (bg-ink, text-mist, border-rule, gap-s2, p-s3…). Sin ámbar a propósito:
   el acento solo existe como .accent en theme.css. */
@theme {
	--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;

	--color-ink: #0a0a0a;
	--color-ink-2: #141413;
	--color-bone: #e8e3d6;
	--color-mist: #8a857a;
	--color-rule: #2a2a28;

	--spacing-s1: 8px;
	--spacing-s2: 16px;
	--spacing-s3: 32px;
	--spacing-s4: 64px;
	--spacing-s5: 128px;

	--radius-sm: 2px;
	--radius-md: 2px;
	--radius-lg: 2px;
	--radius-xl: 2px;
}
```

- [ ] **Step 3: Reescribir `src/lib/actions/scrollReveal.js`**

```js
/**
 * Acción Svelte: cuando un descendiente `.reveal` entra en el viewport
 * recibe `.visible` y dispara el revelado (opacidad + clip sobre su eje).
 * Respeta prefers-reduced-motion y tiene un fallback de 3 s.
 */
export function scrollReveal(node) {
	if (typeof window === 'undefined') return;

	const targets = node.querySelectorAll('.reveal');
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	if (reduce || !('IntersectionObserver' in window)) {
		targets.forEach((t) => t.classList.add('visible'));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.05, rootMargin: '0px 0px 10% 0px' }
	);

	targets.forEach((target) => {
		const rect = target.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			target.classList.add('visible');
		} else {
			observer.observe(target);
		}
	});

	const safety = window.setTimeout(() => {
		targets.forEach((t) => t.classList.add('visible'));
	}, 3000);

	return {
		destroy() {
			observer.disconnect();
			window.clearTimeout(safety);
		}
	};
}
```

- [ ] **Step 4: Verificar que compila y que las utilidades por token existen**

Run:
```bash
bun run build 2>&1 | tail -2
grep -o '\.bg-ink\b\|\.text-mist\b\|\.gap-s2\b\|\.t-titulo\b\|\.grid-rule\b' build/_app/immutable/assets/*.css | sort -u
```
Expected: `✅ Build completed successfully!` y las cinco clases listadas (Tailwind solo emite las utilidades usadas: `bg-ink`/`text-mist`/`gap-s2` aparecerán recién cuando algún componente las use; en esta task es suficiente ver `.t-titulo` y `.grid-rule`). Las páginas viejas se ven rotas (perdieron sus clases): es esperado hasta que cada task las migre.

- [ ] **Step 5: Commit**

```bash
git add src/lib/theme.css src/app.css src/lib/actions/scrollReveal.js
git commit -m "feat: tokens del sistema de marca (tipografía, color, retícula, motion, componentes base)"
```

---

### Task 5: `Icon.svelte` y `utils/categories.js` (con test)

**Files:**
- Create: `src/lib/components/Icon.svelte`, `src/lib/utils/categories.js`, `tests/categories.test.js`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces: `<Icon name="menu|close|arrow-right|arrow-up-right|chevron-left|chevron-right|plus" size={16|20|24} class="" />` — SVG 24-box, `stroke="currentColor"`, `aria-hidden`.
- Produces: `categoryLabel(type: string) → string`, `isInDevelopment(status?: string) → boolean`, `yearOf(date?: string) → string`.

- [ ] **Step 1: Escribir el test (falla porque el módulo no existe)**

`tests/categories.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryLabel, isInDevelopment, yearOf } from '../src/lib/utils/categories.js';

test('categoryLabel traduce los tipos de las fichas', () => {
	assert.equal(categoryLabel('gobierno-digital'), 'Gobierno digital');
	assert.equal(categoryLabel('saas'), 'SaaS');
	assert.equal(categoryLabel('e-commerce'), 'E-commerce');
	assert.equal(categoryLabel('ecommerce'), 'E-commerce');
	assert.equal(categoryLabel('punto de venta'), 'Punto de venta');
	assert.equal(categoryLabel('todos'), 'Todos');
});

test('categoryLabel devuelve el tipo crudo si no lo conoce y "Proyecto" si está vacío', () => {
	assert.equal(categoryLabel('blockchain'), 'blockchain');
	assert.equal(categoryLabel(''), 'Proyecto');
	assert.equal(categoryLabel(undefined), 'Proyecto');
});

test('isInDevelopment detecta "desarrollo" sin importar mayúsculas', () => {
	assert.equal(isInDevelopment('en desarrollo'), true);
	assert.equal(isInDevelopment('En Desarrollo'), true);
	assert.equal(isInDevelopment('entregado'), false);
	assert.equal(isInDevelopment(undefined), false);
});

test('yearOf extrae el año de una fecha ISO', () => {
	assert.equal(yearOf('2025-09-01'), '2025');
	assert.equal(yearOf(undefined), '');
});
```

En `package.json`, `"scripts"`, agregar:

```json
"test": "node --test tests/",
```

- [ ] **Step 2: Correr el test y ver que falla**

Run: `bun run test 2>&1 | tail -5`
Expected: error `Cannot find module '.../src/lib/utils/categories.js'`, `fail 1`.

- [ ] **Step 3: Implementar `src/lib/utils/categories.js`**

```js
// Etiquetas y helpers puros para las fichas de proyecto.
// No importa fs: se usa tanto en el servidor como en el cliente.

const LABELS = {
	todos: 'Todos',
	saas: 'SaaS',
	'mobile-app': 'App móvil',
	mobile: 'App móvil',
	'e-commerce': 'E-commerce',
	ecommerce: 'E-commerce',
	'gobierno-digital': 'Gobierno digital',
	logistica: 'Logística',
	'recursos-humanos': 'RRHH',
	'gestion-administrativa': 'Administrativo',
	'gestion-deportiva': 'Gestión deportiva',
	'gis-mapas': 'GIS',
	ia: 'IA',
	iot: 'IoT',
	salud: 'Salud',
	'punto de venta': 'Punto de venta',
	movilidad: 'Movilidad'
};

export function categoryLabel(type) {
	const key = (type || '').toLowerCase().trim();
	if (!key) return 'Proyecto';
	return LABELS[key] ?? type;
}

export function isInDevelopment(status) {
	return (status || '').toLowerCase().includes('desarrollo');
}

export function yearOf(date) {
	return date ? new Date(date).getFullYear().toString() : '';
}
```

- [ ] **Step 4: Correr el test y ver que pasa**

Run: `bun run test 2>&1 | tail -4`
Expected: `pass 4`, `fail 0`.

- [ ] **Step 5: Escribir `src/lib/components/Icon.svelte`**

```svelte
<script>
	/**
	 * Íconos del sistema (spec §4.5): caja de 24, trazo 2, remates rectos,
	 * vértice exterior redondeado / interior vivo. Solo trazos verticales,
	 * horizontales y diagonales a 45°. Un tamaño por contexto: 16 junto a
	 * texto, 20 en botones, 24 en el header. Color heredado.
	 */
	const PATHS = {
		menu: 'M3 6h18M3 12h18M3 18h18',
		close: 'M5 5l14 14M19 5L5 19',
		'arrow-right': 'M4 12h16M13 5l7 7-7 7',
		'arrow-up-right': 'M6 18L18 6M8 6h10v10',
		'chevron-left': 'M15 5l-7 7 7 7',
		'chevron-right': 'M9 5l7 7-7 7',
		plus: 'M12 4v16M4 12h16'
	};

	let { name, size = 16, class: className = '' } = $props();
	let d = $derived(PATHS[name] ?? '');
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="butt"
	stroke-linejoin="round"
	aria-hidden="true"
	class="shrink-0 {className}"
>
	<path {d} />
</svg>
```

- [ ] **Step 6: Verificar que compila**

Run: `bun run format && bun run lint && bun run build 2>&1 | tail -1`
Expected: sin errores de lint; `✅ Build completed successfully!`

- [ ] **Step 7: Commit**

```bash
git add src/lib/components/Icon.svelte src/lib/utils/categories.js tests/categories.test.js package.json
git commit -m "feat: set de íconos del sistema y helpers de categorías con test"
```

---

### Task 6: Layout, Header y Footer

**Files:**
- Modify: `src/routes/+layout.svelte`, `src/lib/components/AkHeader.svelte`, `src/lib/components/AkFooter.svelte`, `src/lib/config.js`

**Interfaces:**
- Consumes: `Icon` (Task 5), clases de Task 4, `/brand/*.png` (Task 2).
- Produces: `siteConfig.landingNav` con los anchors nuevos (`#nosotros #soluciones #metodo #proyectos #contacto`); `siteConfig.contact.location = 'Posadas, Misiones, Argentina'`; `siteConfig.version` eliminado.

- [ ] **Step 1: Reescribir `src/lib/config.js`**

```js
export const siteConfig = {
	title: 'MisTec',
	tagline: 'Ingeniería de software y soluciones digitales',
	description:
		'MisTec diseña, desarrolla e implementa soluciones digitales para organizaciones públicas y privadas. Ingeniería de software, productos digitales y consultoría tecnológica desde Posadas, Misiones.',
	author: 'MisTec',

	// URL canónica (sitemap, OG, JSON-LD)
	siteUrl: 'https://mistec-capital.com',
	defaultOgImage: '/og-default.jpg',
	locale: 'es_AR',
	founded: '2020',

	socialLinks: {
		github: 'https://github.com/mistec-capital',
		linkedin: 'https://linkedin.com/company/mistec-capital',
		instagram: 'https://instagram.com/mistec.capital'
	},

	contact: {
		email: 'mistec.capital@gmail.com',
		whatsapp: '+54 9 3764 734375',
		location: 'Posadas, Misiones, Argentina'
	},

	// Navegación de la landing (anclas a las secciones del Manual Institucional)
	landingNav: [
		{ name: 'Nosotros', href: '#nosotros' },
		{ name: 'Soluciones', href: '#soluciones' },
		{ name: 'Cómo trabajamos', href: '#metodo' },
		{ name: 'Proyectos', href: '#proyectos' },
		{ name: 'Contacto', href: '#contacto' }
	],

	// Navegación del resto de las páginas
	navigation: [
		{ name: 'Inicio', href: '/' },
		{ name: 'Proyectos', href: '/projects' },
		{ name: 'Lista', href: '/list' },
		{ name: 'Mapa', href: '/map' },
		{ name: 'Nosotros', href: '/about' }
	]
};
```

- [ ] **Step 2: Reescribir `src/routes/+layout.svelte`**

```svelte
<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import AkHeader from '$lib/components/AkHeader.svelte';
	import AkFooter from '$lib/components/AkFooter.svelte';

	let { children } = $props();

	// La landing compone sus propias secciones a sangre; el resto usa el contenedor.
	let isHome = $derived(
		$page.url.pathname === base + '/' || $page.url.pathname === base || $page.url.pathname === '/'
	);
</script>

<AkHeader />

<main class="bg-ink">
	{#if isHome}
		{@render children()}
	{:else}
		<div class="container-brand pt-[calc(64px_+_var(--s-4))] pb-s5">
			{@render children()}
		</div>
	{/if}
</main>

<AkFooter />
```

- [ ] **Step 3: Reescribir `src/lib/components/AkHeader.svelte`**

```svelte
<script>
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';

	let currentPage = $derived($page.url.pathname);
	let isHome = $derived(
		currentPage === base + '/' || currentPage === base || currentPage === '/'
	);
	let navItems = $derived(isHome ? siteConfig.landingNav : siteConfig.navigation);

	let open = $state(false);
	let scrolled = $state(false);

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 8);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function hrefOf(item) {
		return item.href.startsWith('#') ? item.href : `${base}${item.href}`;
	}

	function isActive(item) {
		if (isHome || item.href.startsWith('#')) return false;
		return currentPage === base + item.href || currentPage.startsWith(base + item.href + '/');
	}
</script>

<!-- La marca aparece una vez, arriba a la izquierda. Fondo plano; al hacer scroll
     solo cambia un recurso: aparece la regla inferior. -->
<header
	class="fixed inset-x-0 top-0 z-50 border-b bg-ink {scrolled || open
		? 'border-rule'
		: 'border-transparent'}"
	style="transition: border-color var(--d-breve) var(--ease)"
>
	<div class="container-brand flex h-16 items-center justify-between">
		<a href="{base}/" aria-label="MisTec — inicio" class="flex items-center">
			<img
				src="{base}/brand/mistec-horizontal-bone.png"
				alt="MisTec"
				width="112"
				height="40"
				class="h-auto w-[112px]"
			/>
		</a>

		<nav class="hidden items-center gap-s3 lg:flex" aria-label="Principal">
			{#each navItems as item (item.href)}
				<a href={hrefOf(item)} class="link t-ui {isActive(item) ? 'link-active' : ''}">
					{item.name}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="-mr-2 cursor-pointer p-2 text-bone lg:hidden"
			onclick={() => (open = !open)}
			aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
			aria-expanded={open}
		>
			<Icon name={open ? 'close' : 'menu'} size={24} />
		</button>
	</div>

	{#if open}
		<nav class="border-t border-rule bg-ink lg:hidden" aria-label="Principal">
			<ul class="container-brand list-rule py-s2">
				{#each navItems as item (item.href)}
					<li>
						<a
							href={hrefOf(item)}
							class="t-bajada block text-bone"
							onclick={() => (open = false)}
						>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
```

- [ ] **Step 4: Reescribir `src/lib/components/AkFooter.svelte`** (la "firma": donde vive la marca y no compite con nada)

```svelte
<script>
	import { base } from '$app/paths';
	import { siteConfig } from '$lib/config.js';

	const year = new Date().getFullYear();
	const wa = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;

	const empresa = [
		{ name: 'Nosotros', href: `${base}/about` },
		{ name: 'Proyectos', href: `${base}/projects` },
		{ name: 'Lista', href: `${base}/list` },
		{ name: 'Mapa', href: `${base}/map` }
	];
	const soluciones = [
		{ name: 'Soluciones', href: `${base}/#soluciones` },
		{ name: 'Cómo trabajamos', href: `${base}/#metodo` },
		{ name: 'Alcance', href: `${base}/#alcance` }
	];
</script>

<footer class="border-t border-rule">
	<div class="container-brand py-s4">
		<div class="grid-12 gap-y-s4">
			<div class="col-span-12 md:col-span-4">
				<img
					src="{base}/brand/mistec-isotipo-bone.png"
					alt="MisTec"
					width="45"
					height="40"
					class="h-10 w-auto"
				/>
				<p class="t-nota mt-s2 max-w-[32ch]">
					Ingeniería de software y soluciones digitales para organizaciones públicas y privadas.
					Posadas, Misiones, Argentina.
				</p>
			</div>

			<div class="col-span-6 md:col-span-2 md:col-start-6">
				<p class="t-kicker">Empresa</p>
				<ul class="mt-s2 flex flex-col gap-s1">
					{#each empresa as item (item.href)}
						<li><a href={item.href} class="link t-nota">{item.name}</a></li>
					{/each}
				</ul>
			</div>

			<div class="col-span-6 md:col-span-2">
				<p class="t-kicker">Soluciones</p>
				<ul class="mt-s2 flex flex-col gap-s1">
					{#each soluciones as item (item.href)}
						<li><a href={item.href} class="link t-nota">{item.name}</a></li>
					{/each}
				</ul>
			</div>

			<div class="col-span-12 md:col-span-3">
				<p class="t-kicker">Contacto</p>
				<ul class="mt-s2 flex flex-col gap-s1">
					<li>
						<a href="mailto:{siteConfig.contact.email}" class="link t-nota break-all">
							{siteConfig.contact.email}
						</a>
					</li>
					<li>
						<a href={wa} target="_blank" rel="noopener noreferrer" class="link t-nota">
							{siteConfig.contact.whatsapp}
						</a>
					</li>
					<li class="t-nota">{siteConfig.contact.location}</li>
				</ul>
			</div>
		</div>

		<div
			class="t-nota mt-s4 flex flex-col gap-s1 border-t border-rule pt-s2 md:flex-row md:justify-between"
		>
			<span>© {year} MisTec</span>
			<span>Posadas, Misiones · Argentina · Desde 2020</span>
		</div>
	</div>
</footer>
```

- [ ] **Step 5: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -c 'brand/mistec-horizontal-bone.png' build/index.html
grep -c 'brand/mistec-isotipo-bone.png' build/about/index.html
grep -c 'siteConfig.version' -r src || echo "sin usos de version"
```
Expected: build OK; `1`; `1`; `sin usos de version`.

- [ ] **Step 6: Commit**

```bash
git add src/routes/+layout.svelte src/lib/components/AkHeader.svelte src/lib/components/AkFooter.svelte src/lib/config.js
git commit -m "feat: header con la marca nueva, footer como firma y layout sobre la retícula"
```

---

### Task 7: `AkProjectCard`, `AkFilters` y `/projects`

**Files:**
- Modify: `src/lib/components/AkProjectCard.svelte`, `src/lib/components/AkFilters.svelte`, `src/routes/projects/+page.svelte`

**Interfaces:**
- Consumes: `categoryLabel`, `isInDevelopment`, `yearOf`, `Icon`, `.card`, `.grid-rule`, `.tag`, `.input`.
- Produces: `<AkProjectCard project class />` (card sin borde propio dentro de `.grid-rule`); `<AkFilters projects bind:searchTerm bind:selectedType bind:filteredProjects showResultsCount />` (misma API que hoy). Los usan la landing (Task 10), `/list` (12) y `/map` (13).

- [ ] **Step 1: Reescribir `src/lib/components/AkProjectCard.svelte`**

```svelte
<script>
	import { base } from '$app/paths';
	import AkOptimizedImage from './AkOptimizedImage.svelte';
	import Icon from './Icon.svelte';
	import { categoryLabel, isInDevelopment, yearOf } from '$lib/utils/categories.js';

	let { project, class: className = '' } = $props();

	function shortTitle(title) {
		return (title || '').split(' - ')[0].split(' — ')[0];
	}
</script>

<a href="{base}/projects/{project.slug}" class="card {className}">
	<!-- Imagen plana, cortada por la retícula. Sin filtros ni degradados. -->
	<div class="aspect-[16/10] overflow-hidden border-b border-rule bg-ink-2">
		<AkOptimizedImage
			src={project.thumbnailSrc}
			alt=""
			class="h-full w-full object-cover"
			hasWebP={project.hasWebP || false}
		/>
	</div>

	<div class="flex flex-1 flex-col p-s3">
		<p class="t-nota flex flex-wrap items-center gap-s1">
			<span>{categoryLabel(project.type)} · <span class="tnum">{yearOf(project.date)}</span></span>
			{#if isInDevelopment(project.status)}
				<span class="status-dot" aria-hidden="true"></span>
				<span>En desarrollo</span>
			{/if}
		</p>

		<h3 class="t-cuerpo mt-s2 font-medium">{shortTitle(project.title)}</h3>
		<p class="t-nota mt-s1 line-clamp-2">{project.description}</p>

		<div class="mt-s3 flex flex-1 items-end justify-between gap-s2 border-t border-rule pt-s2">
			<span class="t-nota">{project.location || ''}</span>
			<Icon name="arrow-up-right" size={16} class="text-mist" />
		</div>
	</div>
</a>
```

- [ ] **Step 2: Reescribir `src/lib/components/AkFilters.svelte`**

```svelte
<script>
	import { categoryLabel } from '$lib/utils/categories.js';

	let {
		projects,
		searchTerm = $bindable(''),
		selectedType = $bindable('todos'),
		showResultsCount = true,
		filteredProjects = $bindable([])
	} = $props();

	let projectTypes = $derived(['todos', ...new Set(projects.map((p) => p.type))]);

	$effect(() => {
		const term = searchTerm.toLowerCase();
		filteredProjects = projects
			.filter((project) => {
				const matchesType = selectedType === 'todos' || project.type === selectedType;
				const matchesSearch =
					term === '' ||
					project.title?.toLowerCase().includes(term) ||
					project.description?.toLowerCase().includes(term) ||
					project.tags?.some((tag) => tag.toLowerCase().includes(term));
				return matchesType && matchesSearch;
			})
			.sort((a, b) => new Date(b.date) - new Date(a.date));
	});
</script>

<div class="reveal flex flex-col gap-s2 border-b border-rule pb-s3">
	<label class="block max-w-md">
		<span class="sr-only">Buscar proyectos</span>
		<input
			type="search"
			class="input"
			placeholder="Buscar por título, descripción o tag"
			bind:value={searchTerm}
		/>
	</label>

	<div class="flex flex-wrap gap-s1" role="group" aria-label="Filtrar por categoría">
		{#each projectTypes as type (type)}
			<button
				type="button"
				class="tag {selectedType === type ? 'tag-active' : ''}"
				aria-pressed={selectedType === type}
				onclick={() => (selectedType = type)}
			>
				{categoryLabel(type)}
			</button>
		{/each}
	</div>

	{#if showResultsCount}
		<p class="t-nota">
			<span class="tnum text-bone">{filteredProjects.length}</span>
			{filteredProjects.length === 1 ? 'proyecto' : 'proyectos'}
		</p>
	{/if}
</div>
```

- [ ] **Step 3: Reescribir `src/routes/projects/+page.svelte`**

```svelte
<script>
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state(data.projects);

	let description = $derived(
		`Índice de los ${projects.length} proyectos desarrollados por MisTec desde 2020: productos digitales, sistemas para organismos públicos y desarrollos a medida.`
	);
</script>

<SeoHead title="Proyectos" {description} />

<div use:scrollReveal>
	<header class="grid-12">
		<p class="t-kicker reveal col-span-12">Índice</p>
		<h1 class="t-titulo reveal reveal-1 col-span-12 mt-s2 lg:col-span-8">
			Todos los <span class="accent">proyectos</span>.
		</h1>
		<p class="t-bajada reveal reveal-2 col-span-12 mt-s2">
			{projects.length} proyectos desde 2020, filtrables por categoría y búsqueda.
		</p>
	</header>

	<div class="mt-s4">
		<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />
	</div>

	{#if filteredProjects.length > 0}
		<div class="grid-rule mt-s3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredProjects as project (project.slug)}
				<AkProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="t-cuerpo mt-s3 text-mist">No hay proyectos que coincidan con la búsqueda.</p>
	{/if}
</div>
```

- [ ] **Step 4: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -o 'class="card' build/projects/index.html | wc -l
```
Expected: build OK; `44` (una card por proyecto).

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/AkProjectCard.svelte src/lib/components/AkFilters.svelte src/routes/projects/+page.svelte
git commit -m "feat: card de proyecto, filtros e índice sobre el sistema de marca"
```

---

### Task 8: Landing — `SectionHead`, Hero, 01 Quiénes somos, 02 Propuesta de valor

**Files:**
- Create: `src/lib/components/landing/SectionHead.svelte`, `QuienesSomos.svelte`, `PropuestaValor.svelte`
- Modify (sobrescribir): `src/lib/components/landing/Hero.svelte`, `src/routes/+page.svelte`
- Delete: `src/lib/components/landing/{Manifiesto,ObraReciente,Plataformas,Gobierno,IA,Capacidades,Contacto}.svelte`

**Interfaces:**
- Produces: `<SectionHead id n label>` con snippets opcionales `title` y `lead` y `children` — envuelve `<section id class="section">` + `.container-brand`. Lo usan las Tasks 9 y 10.
- Produces: `+page.svelte` con `use:scrollReveal` en el wrapper y las secciones en orden; las de Tasks 9 y 10 se agregan a ese wrapper.

- [ ] **Step 1: Borrar los componentes viejos**

```bash
git rm -q src/lib/components/landing/{Manifiesto,ObraReciente,Plataformas,Gobierno,IA,Capacidades,Contacto}.svelte
```

- [ ] **Step 2: `src/lib/components/landing/SectionHead.svelte`**

```svelte
<script>
	/**
	 * Cabecera numerada de sección (Sistema Editorial: numeración continua y
	 * visible). `title` y `lead` son snippets para poder marcar una palabra
	 * con <span class="accent">.
	 */
	let { id, n, label, title, lead, children } = $props();
</script>

<section {id} class="section">
	<div class="container-brand">
		<p class="t-kicker reveal"><span class="tnum">{n}</span> · {label}</p>
		{#if title}
			<h2 class="t-titulo reveal reveal-1 mt-s2 max-w-[22ch]">{@render title()}</h2>
		{/if}
		{#if lead}
			<p class="t-bajada reveal reveal-2 mt-s2">{@render lead()}</p>
		{/if}
		<div class="mt-s4">
			{@render children?.()}
		</div>
	</div>
</section>
```

- [ ] **Step 3: `src/lib/components/landing/Hero.svelte`** (sobrescribir por completo)

```svelte
<script>
	import { base } from '$app/paths';
	import Icon from '$lib/components/Icon.svelte';
</script>

<!-- La entrada: una sola idea. Como la portada de presentación del manual,
     el título ocupa el tercio inferior. Único recurso gráfico del sitio:
     el isotipo seccionado y extendido fuera del borde derecho, a ≤ 14 % de contraste. -->
<section
	id="top"
	class="relative flex min-h-[85vh] flex-col justify-end overflow-hidden pt-16 pb-s4 lg:pb-s5"
>
	<img
		src="{base}/brand/mistec-isotipo-bone.png"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute top-1/2 right-[-18%] hidden w-[44vw] max-w-[640px] -translate-y-1/2 opacity-[0.09] lg:block"
	/>

	<div class="container-brand relative">
		<p class="t-kicker reveal">
			Ingeniería de software y soluciones digitales · Posadas, Misiones
		</p>

		<div class="grid-12 mt-s2">
			<h1 class="t-titulo reveal reveal-1 col-span-12 lg:col-span-9">
				Ingeniería aplicada a <span class="accent">resolver</span> problemas.
			</h1>
			<p class="t-bajada reveal reveal-2 col-span-12 mt-s2 lg:col-span-7">
				Diseñamos, desarrollamos e implementamos plataformas tecnológicas para organizaciones
				públicas y privadas. Soluciones confiables, escalables y sostenibles.
			</p>
		</div>

		<div class="reveal reveal-3 mt-s3 flex flex-wrap items-center gap-s2">
			<a class="btn" href="{base}/projects">Ver proyectos</a>
			<a class="btn-text" href="#contacto">Hablemos <Icon name="arrow-right" size={20} /></a>
		</div>
	</div>
</section>
```

- [ ] **Step 4: `src/lib/components/landing/QuienesSomos.svelte`**

```svelte
<script>
	const VALORES = [
		{
			nombre: 'Compromiso',
			texto:
				'Asumimos cada proyecto como una responsabilidad compartida con nuestros clientes. Trabajamos con dedicación, cercanía y responsabilidad para alcanzar los objetivos definidos.'
		},
		{
			nombre: 'Calidad',
			texto:
				'Buscamos la excelencia técnica en cada etapa del desarrollo, promoviendo soluciones robustas, mantenibles y preparadas para evolucionar en el tiempo.'
		},
		{
			nombre: 'Innovación',
			texto:
				'Incorporamos nuevas tecnologías cuando aportan valor real a las organizaciones, priorizando siempre la utilidad por sobre la novedad.'
		},
		{
			nombre: 'Colaboración',
			texto:
				'Creemos que los mejores resultados se obtienen mediante el trabajo conjunto entre equipos, clientes y especialistas, promoviendo el intercambio permanente de conocimientos.'
		},
		{
			nombre: 'Transparencia',
			texto:
				'Construimos relaciones basadas en la confianza, la comunicación clara y el cumplimiento de los compromisos asumidos.'
		}
	];
</script>

<section id="nosotros" class="section">
	<div class="container-brand">
		<p class="t-kicker reveal"><span class="tnum">01</span> · Quiénes somos</p>

		<div class="grid-12 mt-s2">
			<h2 class="t-titulo reveal reveal-1 col-span-12 lg:col-span-5">
				Ingeniería de software y <span class="accent">soluciones</span> digitales para
				organizaciones públicas y privadas.
			</h2>

			<div class="col-span-12 mt-s3 lg:col-span-6 lg:col-start-7 lg:mt-0">
				<p class="t-cuerpo reveal reveal-2">
					MisTec es una empresa especializada en ingeniería de software y desarrollo de
					soluciones digitales para organizaciones públicas y privadas. Desde sus inicios orientó
					su crecimiento al desarrollo de productos tecnológicos capaces de resolver desafíos
					reales mediante soluciones confiables, escalables y sostenibles.
				</p>
				<p class="t-cuerpo reveal reveal-3 mt-s2">
					Su experiencia integra consultoría tecnológica, arquitectura de software, diseño de
					experiencia de usuario, desarrollo de aplicaciones, automatización de procesos,
					inteligencia artificial e integración de sistemas. Acompaña a sus clientes durante todo
					el ciclo de vida de cada solución, desde la identificación de una necesidad hasta la
					evolución permanente del producto implementado.
				</p>

				<p class="t-kicker reveal mt-s4">Valores</p>
				<ul class="list-rule mt-s2">
					{#each VALORES as valor (valor.nombre)}
						<li class="grid-12 reveal">
							<span class="t-cuerpo col-span-12 font-medium md:col-span-4">{valor.nombre}</span>
							<span class="t-cuerpo col-span-12 text-mist md:col-span-8">{valor.texto}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 5: `src/lib/components/landing/PropuestaValor.svelte`**

```svelte
<script>
	import SectionHead from './SectionHead.svelte';

	const DIFERENCIALES = [
		'Ingeniería de software especializada.',
		'Desarrollo de productos digitales.',
		'Experiencia en proyectos públicos y privados.',
		'Equipos multidisciplinarios.',
		'Acompañamiento integral durante todo el ciclo de vida del producto.',
		'Soluciones escalables y mantenibles.',
		'Innovación aplicada a necesidades concretas.',
		'Compromiso con la calidad técnica y la mejora continua.'
	];
</script>

<SectionHead id="propuesta" n="02" label="Propuesta de valor">
	{#snippet title()}
		Acompañar <span class="accent">todo</span> el ciclo de vida de una solución.
	{/snippet}
	{#snippet lead()}
		No limitamos nuestra participación al desarrollo inicial de un sistema. Cada proyecto es una
		inversión de largo plazo y cada solución se diseña considerando escalabilidad,
		mantenimiento, seguridad y experiencia de usuario.
	{/snippet}

	<p class="t-kicker reveal">Diferenciales</p>
	<ol class="mt-s2 grid grid-cols-1 gap-x-[var(--gutter)] md:grid-cols-2">
		{#each DIFERENCIALES as texto, i (texto)}
			<li class="reveal flex gap-s2 border-t border-rule py-s2">
				<span class="t-nota tnum w-10 shrink-0">{String(i + 1).padStart(2, '0')}</span>
				<span class="t-cuerpo">{texto}</span>
			</li>
		{/each}
	</ol>
</SectionHead>
```

- [ ] **Step 6: Reescribir `src/routes/+page.svelte`** (con las secciones disponibles hasta ahora; las Tasks 9 y 10 agregan el resto)

```svelte
<script>
	import { siteConfig } from '$lib/config.js';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import Hero from '$lib/components/landing/Hero.svelte';
	import QuienesSomos from '$lib/components/landing/QuienesSomos.svelte';
	import PropuestaValor from '$lib/components/landing/PropuestaValor.svelte';

	let { data } = $props();
	let stats = $derived(data.stats ?? { total: 0, government: 0, countries: 0 });

	let description = $derived(
		`MisTec diseña, desarrolla e implementa soluciones digitales para organizaciones públicas y privadas. ${stats.total} proyectos en ${stats.countries} países.`
	);

	const organizationJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'MisTec',
		url: siteConfig.siteUrl,
		logo: `${siteConfig.siteUrl}/brand/mistec-logo-512.png`,
		image: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
		description:
			'Empresa dedicada al diseño, desarrollo e implementación de soluciones digitales para organizaciones públicas y privadas. Ingeniería de software, productos digitales y consultoría tecnológica.',
		foundingDate: siteConfig.founded,
		foundingLocation: { '@type': 'Place', name: 'Posadas, Misiones, Argentina' },
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Posadas',
			addressRegion: 'Misiones',
			addressCountry: 'AR'
		},
		contactPoint: {
			'@type': 'ContactPoint',
			email: siteConfig.contact.email,
			telephone: siteConfig.contact.whatsapp,
			contactType: 'customer support',
			availableLanguage: ['Spanish', 'English']
		},
		sameAs: [
			siteConfig.socialLinks.github,
			siteConfig.socialLinks.linkedin,
			siteConfig.socialLinks.instagram
		].filter(Boolean)
	};
</script>

<SeoHead title={siteConfig.title} {description} jsonLd={organizationJsonLd} />

<div use:scrollReveal>
	<Hero />
	<QuienesSomos />
	<PropuestaValor />
</div>
```

- [ ] **Step 7: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -o 'class="accent">[a-z]*' build/index.html
ls src/lib/components/landing
```
Expected: build OK; `class="accent">resolver`, `class="accent">soluciones`, `class="accent">todo`; en `landing/` solo `Hero.svelte PropuestaValor.svelte QuienesSomos.svelte SectionHead.svelte`.

- [ ] **Step 8: Commit**

```bash
git add -A src/lib/components/landing src/routes/+page.svelte
git commit -m "feat: landing nueva — hero, quiénes somos y propuesta de valor según el Manual Institucional"
```

---

### Task 9: Landing — 03 Soluciones, 04 Cómo trabajamos, 05 Alcance

**Files:**
- Create: `src/lib/components/landing/Soluciones.svelte`, `ComoTrabajamos.svelte`, `Alcance.svelte`
- Modify: `src/routes/+page.svelte`

**Interfaces:**
- Consumes: `SectionHead` (Task 8), `Icon`, `stats` de `+page.server.js` (`{ total, government, countries }`).

- [ ] **Step 1: `src/lib/components/landing/Soluciones.svelte`**

```svelte
<script>
	import SectionHead from './SectionHead.svelte';

	const SOLUCIONES = [
		{
			titulo: 'Desarrollo de Software a Medida',
			texto:
				'Diseño y construcción de aplicaciones adaptadas a procesos específicos, considerando criterios de escalabilidad, seguridad, mantenimiento y evolución continua.'
		},
		{
			titulo: 'Productos Digitales',
			texto:
				'Desarrollo de plataformas y soluciones digitales orientadas a resolver problemáticas comunes mediante productos reutilizables y preparados para crecer junto a las organizaciones.'
		},
		{
			titulo: 'Aplicaciones Web y Mobile',
			texto:
				'Diseño y desarrollo de aplicaciones multiplataforma centradas en la experiencia de usuario, la accesibilidad y el rendimiento.'
		},
		{
			titulo: 'Inteligencia Artificial',
			texto:
				'Incorporación de tecnologías de inteligencia artificial para automatizar procesos, optimizar decisiones y generar nuevas oportunidades de valor mediante el análisis inteligente de la información.'
		},
		{
			titulo: 'Automatización de Procesos',
			texto:
				'Implementación de soluciones que reducen tareas repetitivas, mejoran la eficiencia operativa y favorecen la integración entre procesos y sistemas.'
		},
		{
			titulo: 'Integraciones Tecnológicas',
			texto:
				'Conexión entre plataformas, servicios y aplicaciones para garantizar el intercambio seguro y eficiente de información entre diferentes entornos tecnológicos.'
		},
		{
			titulo: 'Arquitectura e Infraestructura',
			texto:
				'Diseño de arquitecturas tecnológicas escalables y servicios cloud preparados para soportar el crecimiento de cada organización.'
		},
		{
			titulo: 'Experiencia de Usuario (UX/UI)',
			texto:
				'Diseño de experiencias digitales simples, intuitivas y orientadas a facilitar la interacción entre las personas y la tecnología.'
		},
		{
			titulo: 'Consultoría Tecnológica',
			texto:
				'Acompañamiento estratégico para organizaciones que buscan definir, planificar o fortalecer sus procesos de transformación digital.'
		}
	];

	const CAPACIDADES =
		'Ingeniería de Software · Arquitectura de Soluciones · Desarrollo Backend · Desarrollo Frontend · Desarrollo Mobile · Plataformas Cloud · DevOps · Inteligencia Artificial · Automatización · Integraciones · UX Research · UX/UI Design · Bases de Datos · Analítica y Visualización de Información';
</script>

<SectionHead id="soluciones" n="03" label="Soluciones">
	{#snippet title()}
		Un mismo <span class="accent">ecosistema</span>. Servicios, productos y capacidades.
	{/snippet}
	{#snippet lead()}
		Un conjunto de capacidades que pueden implementarse de manera independiente o integrada
		según las necesidades de cada organización.
	{/snippet}

	<ol class="grid-rule grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each SOLUCIONES as s, i (s.titulo)}
			<li class="reveal flex min-h-[240px] flex-col p-s3">
				<span class="t-nota tnum">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="t-cuerpo mt-s2 font-medium">{s.titulo}</h3>
				<p class="t-nota mt-s1">{s.texto}</p>
			</li>
		{/each}
	</ol>

	<p class="t-nota reveal mt-s3">Capacidades técnicas — {CAPACIDADES}</p>
</SectionHead>
```

- [ ] **Step 2: `src/lib/components/landing/ComoTrabajamos.svelte`** (proceso con chevrones: el chevron es el interior del isotipo)

```svelte
<script>
	import SectionHead from './SectionHead.svelte';
	import Icon from '$lib/components/Icon.svelte';

	const PASOS = [
		{
			titulo: 'Descubrimiento',
			texto:
				'Comprender el contexto, identificar necesidades, relevar información y definir los objetivos del proyecto. Esta etapa permite construir una visión compartida entre el cliente y el equipo de trabajo.'
		},
		{
			titulo: 'Estrategia',
			texto:
				'Definir el alcance, priorizar objetivos, seleccionar tecnologías y establecer una hoja de ruta para el desarrollo de la solución.'
		},
		{
			titulo: 'Diseño',
			texto:
				'Diseñar la experiencia de usuario, la arquitectura funcional y los componentes necesarios para garantizar una solución clara, intuitiva y eficiente.'
		},
		{
			titulo: 'Desarrollo',
			texto:
				'Construir la solución mediante procesos de ingeniería de software orientados a la calidad, la seguridad y la escalabilidad.'
		},
		{
			titulo: 'Implementación',
			texto:
				'Desplegar la solución, realizar pruebas, capacitar a los equipos y acompañar la puesta en funcionamiento.'
		},
		{
			titulo: 'Evolución Continua',
			texto:
				'El lanzamiento de un producto representa el inicio de una nueva etapa. Acompañamos la evolución permanente de las soluciones implementadas mediante mantenimiento, incorporación de mejoras, optimización del rendimiento y desarrollo de nuevas funcionalidades.'
		}
	];
</script>

<SectionHead id="metodo" n="04" label="Cómo trabajamos">
	{#snippet title()}
		Un proceso <span class="accent">continuo</span>.
	{/snippet}
	{#snippet lead()}
		Todos los proyectos siguen una metodología estructurada que permite comprender el problema,
		diseñar la solución adecuada y acompañar su evolución en el tiempo.
	{/snippet}

	<ol class="grid grid-cols-1 lg:grid-cols-6">
		{#each PASOS as paso, i (paso.titulo)}
			<li
				class="reveal relative border-t border-rule py-s3 lg:border-t-0 lg:border-l lg:pr-s3 lg:pl-s2 {i ===
				PASOS.length - 1
					? 'border-b lg:border-r lg:border-b-0'
					: ''}"
			>
				{#if i > 0}
					<span
						class="absolute top-s3 -left-2 hidden bg-ink text-mist lg:block"
						aria-hidden="true"
					>
						<Icon name="chevron-right" size={16} />
					</span>
				{/if}
				<span class="t-nota tnum">{String(i + 1).padStart(2, '0')}</span>
				<h3 class="t-cuerpo mt-s2 font-medium">{paso.titulo}</h3>
				<p class="t-nota mt-s1">{paso.texto}</p>
			</li>
		{/each}
	</ol>
</SectionHead>
```

- [ ] **Step 3: `src/lib/components/landing/Alcance.svelte`**

```svelte
<script>
	import SectionHead from './SectionHead.svelte';

	let { stats } = $props();

	const anios = new Date().getFullYear() - 2020;

	let cifras = $derived([
		{ valor: stats.total, label: 'proyectos desarrollados' },
		{ valor: stats.countries, label: 'países' },
		{ valor: stats.government, label: 'organismos públicos' },
		{ valor: anios, label: 'años de trayectoria' }
	]);

	// Bordes de la fila 2×2 (mobile) / 1×4 (desktop), por índice.
	const CELDA = [
		'',
		'border-l border-rule pl-s2',
		'border-t border-rule lg:border-t-0 lg:border-l lg:pl-s2',
		'border-l border-t border-rule pl-s2 lg:border-t-0'
	];

	const SECTORES =
		'Administración Pública · Empresas Privadas · Industria · Comercio · Salud · Educación · Servicios · Organizaciones Sociales';
</script>

<SectionHead id="alcance" n="05" label="Alcance">
	{#snippet title()}
		Experiencia <span class="accent">consolidada</span> en organizaciones de distintas
		características.
	{/snippet}

	<ul class="grid grid-cols-2 border-y border-rule lg:grid-cols-4">
		{#each cifras as c, i (c.label)}
			<li class="reveal py-s3 pr-s2 {CELDA[i]}">
				<span class="t-cifra block">{c.valor}</span>
				<span class="t-nota mt-s2 block">{c.label}</span>
			</li>
		{/each}
	</ul>

	<p class="t-nota reveal mt-s3">Sectores — {SECTORES}</p>
</SectionHead>
```

- [ ] **Step 4: Agregar las secciones a `src/routes/+page.svelte`**

En el `<script>`, después del import de `PropuestaValor`:

```js
	import Soluciones from '$lib/components/landing/Soluciones.svelte';
	import ComoTrabajamos from '$lib/components/landing/ComoTrabajamos.svelte';
	import Alcance from '$lib/components/landing/Alcance.svelte';
```

En el markup, dentro del `<div use:scrollReveal>`, después de `<PropuestaValor />`:

```svelte
	<Soluciones />
	<ComoTrabajamos />
	<Alcance {stats} />
```

- [ ] **Step 5: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -o 'class="accent">[a-z]*' build/index.html | tr '\n' ' '; echo
grep -o 'id="\(soluciones\|metodo\|alcance\)"' build/index.html | tr '\n' ' '; echo
grep -o 'class="t-cifra block">[0-9]*' build/index.html | tr '\n' ' '; echo
```
Expected: build OK; `resolver soluciones todo ecosistema continuo consolidada`; los tres ids; cuatro cifras (`44`, `3`, `12`, `6` con el contenido actual — la de países será `3` recién después de la Task 10, hoy da `4`).

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/landing src/routes/+page.svelte
git commit -m "feat: landing — soluciones, cómo trabajamos con chevrones y alcance"
```

---

### Task 10: Landing — 06 Proyectos, 07 Contacto; contenido

**Files:**
- Create: `src/lib/components/landing/Proyectos.svelte`, `Contacto.svelte`
- Modify: `src/routes/+page.svelte`, `content/index.md`, `content/projects/hcd-posadas-sueldos/index.md`, `content/projects/houton-camisas/index.md`, `content/projects/*/index.md` (authors)

**Interfaces:**
- Consumes: `AkProjectCard` (Task 7), `SectionHead`, `Icon`, `siteConfig.contact`.

- [ ] **Step 1: `src/lib/components/landing/Proyectos.svelte`**

```svelte
<script>
	import { base } from '$app/paths';
	import SectionHead from './SectionHead.svelte';
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let { projects, total } = $props();
</script>

<SectionHead id="proyectos" n="06" label="Proyectos">
	{#snippet title()}
		Proyectos <span class="accent">destacados</span>.
	{/snippet}
	{#snippet lead()}
		Una selección de plataformas propias, sistemas para organismos públicos y desarrollos a
		medida, en producción o en desarrollo activo.
	{/snippet}

	<div class="grid-rule grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
		{#each projects as project (project.slug)}
			<AkProjectCard {project} class="reveal" />
		{/each}
	</div>

	<p class="reveal mt-s3">
		<a class="btn-text" href="{base}/projects">
			Ver los {total} proyectos <Icon name="arrow-right" size={20} />
		</a>
	</p>
</SectionHead>
```

- [ ] **Step 2: `src/lib/components/landing/Contacto.svelte`**

```svelte
<script>
	import { siteConfig } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';

	const wa = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`;
	const fila = 'grid grid-cols-[6rem_1fr_auto] items-center gap-s2 md:grid-cols-[8rem_1fr_auto]';
</script>

<section id="contacto" class="section">
	<div class="container-brand">
		<p class="t-kicker reveal"><span class="tnum">07</span> · Contacto</p>

		<div class="grid-12 mt-s2">
			<div class="col-span-12 lg:col-span-5">
				<h2 class="t-titulo reveal reveal-1">Hablemos de tu <span class="accent">proyecto</span>.</h2>
				<p class="t-bajada reveal reveal-2 mt-s2">Contanos qué necesitás y te respondemos.</p>
			</div>

			<ul class="list-rule col-span-12 mt-s3 lg:col-span-6 lg:col-start-7 lg:mt-0">
				<li class="reveal">
					<a href={wa} target="_blank" rel="noopener noreferrer" class="link {fila}">
						<span class="t-kicker">WhatsApp</span>
						<span>
							<span class="t-cuerpo block text-bone">{siteConfig.contact.whatsapp}</span>
							<span class="t-nota">Lunes a viernes, 9 a 18 h</span>
						</span>
						<Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li class="reveal reveal-1">
					<a href="mailto:{siteConfig.contact.email}" class="link {fila}">
						<span class="t-kicker">Email</span>
						<span class="t-cuerpo break-all text-bone">{siteConfig.contact.email}</span>
						<Icon name="arrow-up-right" size={16} />
					</a>
				</li>
				<li class="reveal reveal-2">
					<div class="grid grid-cols-[6rem_1fr] items-center gap-s2 md:grid-cols-[8rem_1fr]">
						<span class="t-kicker">Ubicación</span>
						<span class="t-cuerpo">{siteConfig.contact.location}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</section>
```

- [ ] **Step 3: Completar `src/routes/+page.svelte`**

Imports (después de `Alcance`):

```js
	import Proyectos from '$lib/components/landing/Proyectos.svelte';
	import Contacto from '$lib/components/landing/Contacto.svelte';
```

Después de `let stats = …`:

```js
	let projects = $derived(data.projects ?? []);
	// Seis destacados; si hay menos, se completa con los más recientes.
	let destacados = $derived(
		[...(data.featuredProjects ?? []), ...projects.filter((p) => !p.featured)].slice(0, 6)
	);
```

Markup, después de `<Alcance {stats} />`:

```svelte
	<Proyectos projects={destacados} total={stats.total} />
	<Contacto />
```

- [ ] **Step 4: Corregir contenido**

```bash
sed -i "s/^location: 'Posadas, Misiones'$/location: 'Posadas, Misiones, Argentina'/" content/projects/hcd-posadas-sueldos/index.md content/projects/houton-camisas/index.md
sed -i "s/name: 'Mistec Capital'/name: 'MisTec'/" content/projects/*/index.md
grep -h '^location:' content/projects/*/index.md | grep -vc 'Argentina\|Paraguay\|Chile'
grep -rl 'Mistec Capital' content | wc -l
```
Expected: `0` y `0`.

Reescribir `content/index.md`:

```markdown
---
title: 'MisTec'
description: 'Ingeniería de software y soluciones digitales para organizaciones públicas y privadas.'
---

MisTec es una empresa especializada en ingeniería de software y desarrollo de soluciones digitales para organizaciones públicas y privadas.

Diseñamos, desarrollamos e implementamos plataformas tecnológicas que ayudan a optimizar procesos, mejorar la experiencia de las personas y acompañar procesos de transformación digital mediante soluciones confiables, escalables y sostenibles.

Nuestra propuesta integra estrategia, diseño, ingeniería y evolución continua para construir productos capaces de generar valor a largo plazo.
```

- [ ] **Step 5: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -o 'class="accent">[a-z]*' build/index.html | tr '\n' ' '; echo
grep -o 'id="\(top\|nosotros\|propuesta\|soluciones\|metodo\|alcance\|proyectos\|contacto\)"' build/index.html | wc -l
grep -o 'class="card reveal' build/index.html | wc -l
grep -o 'class="t-cifra block">[0-9]*' build/index.html | tr '\n' ' '; echo
```
Expected: build OK; `resolver soluciones todo ecosistema continuo consolidada destacados proyecto`; `8`; `6`; `44 3 12 6` (el año actual menos 2020).

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/landing src/routes/+page.svelte content
git commit -m "feat: landing — proyectos destacados y contacto; fichas sin 'Capital' y con país"
```

---

### Task 11: `/about` con el contenido institucional

**Files:**
- Modify: `content/about.md`, `src/routes/about/+page.svelte`

- [ ] **Step 1: Reescribir `content/about.md`** (literal del Manual Institucional, cap. 02 y 03)

```markdown
---
title: 'Sobre MisTec'
description: 'Ingeniería de software y soluciones digitales para organizaciones públicas y privadas.'
---

## Quiénes somos

MisTec es una empresa especializada en ingeniería de software y desarrollo de soluciones digitales para organizaciones públicas y privadas.

Desde sus inicios, la empresa ha orientado su crecimiento al desarrollo de productos tecnológicos capaces de resolver desafíos reales mediante soluciones confiables, escalables y sostenibles.

Su experiencia integra consultoría tecnológica, arquitectura de software, diseño de experiencia de usuario, desarrollo de aplicaciones, automatización de procesos, inteligencia artificial e integración de sistemas.

La empresa acompaña a sus clientes durante todo el ciclo de vida de cada solución, desde la identificación de una necesidad hasta la evolución permanente del producto implementado.

Más que desarrollar software, MisTec construye soluciones tecnológicas que permiten mejorar procesos, optimizar recursos y generar nuevas oportunidades de crecimiento.

## Historia

MisTec nace con el propósito de acercar soluciones tecnológicas de alto nivel a organizaciones que requieren acompañamiento profesional para afrontar procesos de transformación digital.

A lo largo de su evolución la empresa ha ampliado progresivamente sus capacidades, incorporando nuevas tecnologías, fortaleciendo equipos multidisciplinarios y desarrollando productos propios capaces de responder a necesidades específicas de distintos sectores.

Su crecimiento ha estado acompañado por una permanente actualización tecnológica y por una visión orientada a construir relaciones de largo plazo con cada cliente.

La experiencia acumulada en proyectos para organismos públicos, empresas privadas y organizaciones de diferentes industrias permitió consolidar una metodología de trabajo basada en la planificación, la calidad técnica y la mejora continua.

Hoy MisTec desarrolla soluciones que operan en distintos países y continúa ampliando su ecosistema de productos y servicios manteniendo el mismo compromiso con la excelencia que dio origen a la empresa.

## Propósito

Desarrollar soluciones tecnológicas que generen impacto positivo y sostenible en las organizaciones, contribuyendo a mejorar procesos, fortalecer capacidades y crear nuevas oportunidades mediante el uso inteligente de la tecnología.

## Misión

Diseñar, desarrollar e implementar soluciones digitales que ayuden a organizaciones públicas y privadas a transformar sus procesos mediante tecnología confiable, escalable y centrada en las personas.

## Visión

Ser una empresa referente en ingeniería de software y desarrollo de soluciones digitales, reconocida por la calidad de sus productos, la innovación aplicada y la confianza construida con cada proyecto.

## Valores

- **Compromiso.** Asumimos cada proyecto como una responsabilidad compartida con nuestros clientes. Trabajamos con dedicación, cercanía y responsabilidad para alcanzar los objetivos definidos.
- **Calidad.** Buscamos la excelencia técnica en cada etapa del desarrollo, promoviendo soluciones robustas, mantenibles y preparadas para evolucionar en el tiempo.
- **Innovación.** Incorporamos nuevas tecnologías cuando aportan valor real a las organizaciones, priorizando siempre la utilidad por sobre la novedad.
- **Colaboración.** Creemos que los mejores resultados se obtienen mediante el trabajo conjunto entre equipos, clientes y especialistas, promoviendo el intercambio permanente de conocimientos.
- **Transparencia.** Construimos relaciones basadas en la confianza, la comunicación clara y el cumplimiento de los compromisos asumidos.

## Audiencias

- Organismos públicos.
- Empresas privadas.
- Instituciones.
- Organizaciones sin fines de lucro.
- Directivos y responsables de transformación digital.
- Equipos técnicos y áreas de tecnología.
- Emprendedores y empresas en proceso de innovación.
```

- [ ] **Step 2: Reescribir `src/routes/about/+page.svelte`**

```svelte
<script>
	import SeoHead from '$lib/components/SeoHead.svelte';

	let { data } = $props();
	let page = $derived(data.page);
</script>

<SeoHead title={page.title} description={page.description} />

<header class="grid-12">
	<p class="t-kicker col-span-12">Institucional</p>
	<h1 class="t-titulo col-span-12 mt-s2 lg:col-span-8">{page.title}</h1>
	{#if page.description}
		<p class="t-bajada col-span-12 mt-s2">{page.description}</p>
	{/if}
</header>

<div class="grid-12 mt-s4">
	<article class="prose-brand col-span-12 lg:col-span-8">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown propio, renderizado en build -->
		{@html page.content}
	</article>
</div>
```

- [ ] **Step 3: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -o '<h2>[^<]*</h2>' build/about/index.html | tr '\n' ' '; echo
grep -c 'secundaria\|UTN\|Capital' build/about/index.html
```
Expected: build OK; `Quiénes somos Historia Propósito Misión Visión Valores Audiencias`; `0`.

- [ ] **Step 4: Commit**

```bash
git add content/about.md src/routes/about/+page.svelte
git commit -m "feat: página Nosotros con el contenido del Manual Institucional"
```

---

### Task 12: `/list` y los componentes de tabla

**Files:**
- Modify: `src/routes/list/+page.svelte`, `src/lib/components/ThSort.svelte`, `Pagination.svelte`, `RowsPerPage.svelte`, `RowCount.svelte`

- [ ] **Step 1: `src/lib/components/ThSort.svelte`**

```svelte
<script>
	let { handler, orderBy, children, class: className = '', ...props } = $props();

	function handleSort() {
		handler.sort(orderBy);
	}

	let sortState = $derived(handler.getSort());
</script>

<th class={className} {...props}>
	<button
		type="button"
		onclick={handleSort}
		class="link t-kicker flex w-full cursor-pointer items-center gap-s1 text-left"
	>
		{@render children()}
		{#if $sortState && $sortState.identifier === orderBy}
			<span class="t-nota" aria-hidden="true">{$sortState.direction === 'asc' ? '↑' : '↓'}</span>
		{/if}
	</button>
</th>
```

- [ ] **Step 2: `src/lib/components/Pagination.svelte`**

```svelte
<script>
	import Icon from './Icon.svelte';

	let { handler, class: className = '', ...props } = $props();

	let pageNumber = $derived(handler.getPageNumber());
	let pageCount = $derived(handler.getPageCount());
	let pages = $derived(handler.getPages({ ellipsis: true }));
</script>

{#if $pageCount > 1}
	<nav class="flex flex-wrap items-center gap-s1 {className}" aria-label="Paginación" {...props}>
		<button
			type="button"
			class="tag inline-flex items-center disabled:cursor-not-allowed disabled:opacity-40"
			onclick={() => handler.setPage('previous')}
			disabled={$pageNumber === 1}
			aria-label="Página anterior"
		>
			<Icon name="chevron-left" size={16} />
		</button>

		{#each $pages as page, i (`${page}-${i}`)}
			{#if page === '...'}
				<span class="t-nota px-s1">…</span>
			{:else}
				<button
					type="button"
					class="tag tnum {$pageNumber === page ? 'tag-active' : ''}"
					aria-current={$pageNumber === page ? 'page' : undefined}
					onclick={() => handler.setPage(page)}
				>
					{page}
				</button>
			{/if}
		{/each}

		<button
			type="button"
			class="tag inline-flex items-center disabled:cursor-not-allowed disabled:opacity-40"
			onclick={() => handler.setPage('next')}
			disabled={$pageNumber === $pageCount}
			aria-label="Página siguiente"
		>
			<Icon name="chevron-right" size={16} />
		</button>
	</nav>
{/if}
```

- [ ] **Step 3: `src/lib/components/RowsPerPage.svelte`**

```svelte
<script>
	let { handler, class: className = '', ...props } = $props();

	let rowsPerPageStore = $derived(handler.getRowsPerPage());
	const options = [5, 10, 20, 50, 100];
</script>

<label class="t-nota flex items-center gap-s1 {className}" {...props}>
	<span>Mostrar</span>
	<select bind:value={$rowsPerPageStore} class="input h-8 w-auto cursor-pointer py-0">
		{#each options as option (option)}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<span>por página</span>
</label>
```

- [ ] **Step 4: `src/lib/components/RowCount.svelte`**

```svelte
<script>
	let { handler, class: className = '', ...props } = $props();

	let rowCount = $derived(handler.getRowCount());
</script>

<p class="t-nota tnum {className}" {...props}>
	<span class="text-bone">{$rowCount.start}–{$rowCount.end}</span> de
	<span class="text-bone">{$rowCount.total}</span>
</p>
```

- [ ] **Step 5: Reescribir `src/routes/list/+page.svelte`**

```svelte
<script>
	import { base } from '$app/paths';
	import { DataHandler } from '@vincjo/datatables/legacy';
	import Datatable from '$lib/components/Datatable.svelte';
	import ThSort from '$lib/components/ThSort.svelte';
	import RowsPerPage from '$lib/components/RowsPerPage.svelte';
	import RowCount from '$lib/components/RowCount.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import { categoryLabel } from '$lib/utils/categories.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let handler = $state();
	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state(data.projects);

	let rows = $derived(handler ? handler.getRows() : []);

	$effect(() => {
		if (filteredProjects && filteredProjects.length >= 0) {
			handler = new DataHandler(filteredProjects, { rowsPerPage: 12 });
		}
	});

	function formatDate(dateString) {
		return dateString ? new Date(dateString).toISOString().slice(0, 7) : '';
	}

	function truncate(text, max = 60) {
		if (!text) return '';
		return text.length > max ? text.substring(0, max) + '…' : text;
	}

	const th = 'px-s2 py-s2 text-left';
	const td = 'px-s2 py-s2 align-top';
</script>

<SeoHead
	title="Lista de proyectos"
	description="Tabla ordenable de los {projects.length} proyectos de MisTec, con búsqueda por título, descripción, tags y ubicación."
/>

<div use:scrollReveal>
	<header class="grid-12">
		<p class="t-kicker reveal col-span-12">Lista</p>
		<h1 class="t-titulo reveal reveal-1 col-span-12 mt-s2 lg:col-span-8">
			Proyectos en <span class="accent">tabla</span>.
		</h1>
		<p class="t-bajada reveal reveal-2 col-span-12 mt-s2">
			Ordenable por columna, con búsqueda y paginado.
		</p>
	</header>

	<div class="mt-s4">
		<AkFilters
			{projects}
			bind:searchTerm
			bind:selectedType
			bind:filteredProjects
			showResultsCount={false}
		/>
	</div>

	{#if handler}
		<div class="mt-s3 flex flex-col gap-s2 sm:flex-row sm:items-center sm:justify-between">
			<RowsPerPage {handler} />
			<RowCount {handler} />
		</div>

		<div class="mt-s2 overflow-x-auto border border-rule">
			<Datatable class="w-full">
				<table class="w-full">
					<thead>
						<tr class="border-b border-rule bg-ink-2">
							<ThSort {handler} orderBy="title" class={th}>Título</ThSort>
							<ThSort {handler} orderBy="type" class={th}>Tipo</ThSort>
							<ThSort {handler} orderBy="location" class={th}>Ubicación</ThSort>
							<ThSort {handler} orderBy="date" class={th}>Fecha</ThSort>
							<th class="{th} t-kicker">Descripción</th>
							<th class="{th} t-kicker">Tags</th>
							<th class="{th} text-right"><span class="sr-only">Ver</span></th>
						</tr>
					</thead>
					<tbody>
						{#each $rows as project (project.slug)}
							<tr
								class="border-t border-rule hover:bg-ink-2"
								style="transition: background-color var(--d-breve) var(--ease)"
							>
								<td class={td}>
									<a href="{base}/projects/{project.slug}" class="btn-text">{project.title}</a>
								</td>
								<td class={td}><span class="tag">{categoryLabel(project.type)}</span></td>
								<td class="{td} t-nota">{project.location || '—'}</td>
								<td class="{td} t-nota tnum">{formatDate(project.date)}</td>
								<td class="{td} t-nota max-w-md">{truncate(project.description)}</td>
								<td class={td}>
									{#if project.tags}
										<div class="flex flex-wrap gap-s1">
											{#each project.tags.slice(0, 3) as tag (tag)}
												<span class="tag">{tag}</span>
											{/each}
											{#if project.tags.length > 3}
												<span class="t-nota">+{project.tags.length - 3}</span>
											{/if}
										</div>
									{/if}
								</td>
								<td class="{td} text-right">
									<a
										href="{base}/projects/{project.slug}"
										class="link inline-flex"
										aria-label="Ver {project.title}"
									>
										<Icon name="arrow-up-right" size={16} />
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</Datatable>
		</div>

		<div class="mt-s3">
			<Pagination {handler} />
		</div>
	{:else}
		<p class="t-nota mt-s3">Cargando registros…</p>
	{/if}
</div>
```

- [ ] **Step 6: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -c 'JetBrains\|font-mono\|FFB840' src/routes/list/+page.svelte src/lib/components/{ThSort,Pagination,RowsPerPage,RowCount}.svelte
```
Expected: build OK; todos `0`.

- [ ] **Step 7: Commit**

```bash
git add src/routes/list/+page.svelte src/lib/components/{ThSort,Pagination,RowsPerPage,RowCount}.svelte
git commit -m "feat: lista de proyectos y componentes de tabla sobre el sistema de marca"
```

---

### Task 13: `/map` y `AkBtnClose`

**Files:**
- Modify: `src/routes/map/+page.svelte`, `src/lib/components/AkBtnClose.svelte`

- [ ] **Step 1: `src/lib/components/AkBtnClose.svelte`**

```svelte
<script>
	import Icon from './Icon.svelte';

	let { onclick = () => {}, class: className = '', ariaLabel = 'Cerrar' } = $props();
</script>

<button type="button" {onclick} class="btn btn-square bg-ink {className}" aria-label={ariaLabel}>
	<Icon name="close" size={20} />
</button>
```

- [ ] **Step 2: Reescribir `src/routes/map/+page.svelte`** — el `<script>` conserva toda la lógica actual de Leaflet (copiarla tal cual, solo cambian imports y markup):

```svelte
<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import AkProjectCard from '$lib/components/AkProjectCard.svelte';
	import AkFilters from '$lib/components/AkFilters.svelte';
	import AkBtnClose from '$lib/components/AkBtnClose.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';

	let { data } = $props();
	let projects = $derived(data.projects);

	let selectedType = $state('todos');
	let searchTerm = $state('');
	let filteredProjects = $state([]);

	let mapContainer;
	let map;
	let selectedProject = $state(null);
	let markers = [];
	let windowHeight = $state(0);
	let mapHeight = $state('600px');

	$effect(() => {
		if (windowHeight > 0) {
			const height = Math.max(600, Math.min(800, windowHeight * 0.7));
			const newMapHeight = `${height}px`;
			if (newMapHeight !== mapHeight) {
				mapHeight = newMapHeight;
				if (map) {
					const currentBounds = map.getBounds();
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							map.invalidateSize(true);
							if (currentBounds) map.fitBounds(currentBounds);
						});
					});
				}
			}
		}
	});

	onMount(async () => {
		windowHeight = window.innerHeight;

		let resizeTimeout;
		const handleResize = () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				const newHeight = window.innerHeight;
				if (newHeight !== windowHeight) windowHeight = newHeight;
			}, 100);
		};
		window.addEventListener('resize', handleResize);

		const L = await import('leaflet');

		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: `${base}/marker-icon@2x.png`,
			iconUrl: `${base}/marker-icon.png`,
			shadowUrl: `${base}/marker-shadow.png`
		});

		map = L.map(mapContainer, {
			center: [-27.3671, -55.8961],
			zoom: 5,
			zoomControl: true,
			scrollWheelZoom: false,
			doubleClickZoom: true,
			touchZoom: true,
			dragging: true,
			attributionControl: true
		});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap',
			className: 'map-tiles-dark'
		}).addTo(map);

		setTimeout(() => {
			updateMarkers();
		}, 100);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (map) map.remove();
		};
	});

	$effect(() => {
		void filteredProjects; // registra la dependencia
		if (map) updateMarkers();
	});

	async function updateMarkers() {
		if (!map) return;

		const L = await import('leaflet');

		markers.forEach((marker) => map.removeLayer(marker));
		markers = [];

		filteredProjects.forEach((project) => {
			if (
				project.coordinates &&
				Array.isArray(project.coordinates) &&
				project.coordinates.length === 2
			) {
				const [lat, lng] = project.coordinates;

				try {
					const iconOptions = project.featured
						? {
								iconUrl: `${base}/marker-featured.png`,
								iconRetinaUrl: `${base}/marker-featured@2x.png`,
								shadowUrl: `${base}/marker-shadow.png`,
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								popupAnchor: [1, -34],
								shadowSize: [41, 41]
							}
						: undefined;

					const marker = iconOptions
						? L.marker([lat, lng], { title: project.title, icon: L.icon(iconOptions) }).addTo(map)
						: L.marker([lat, lng], { title: project.title }).addTo(map);

					marker.on('click', () => {
						selectedProject = project;
					});

					marker.bindTooltip(project.title, { permanent: false, direction: 'top' });

					markers.push(marker);
				} catch (error) {
					console.error('Error creating marker:', error);
				}
			}
		});

		if (markers.length > 0) {
			const group = L.featureGroup(markers);
			map.fitBounds(group.getBounds().pad(0.15));
		} else {
			map.setView([-27.3671, -55.8961], 5);
		}
	}

	function closeProjectCard() {
		selectedProject = null;
	}
</script>

<SeoHead
	title="Mapa de proyectos"
	description="Mapa georreferenciado de los {projects.length} proyectos de MisTec."
/>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div use:scrollReveal>
	<header class="grid-12">
		<p class="t-kicker reveal col-span-12">Mapa</p>
		<h1 class="t-titulo reveal reveal-1 col-span-12 mt-s2 lg:col-span-8">
			Proyectos en el <span class="accent">territorio</span>.
		</h1>
		<p class="t-bajada reveal reveal-2 col-span-12 mt-s2">
			Cada marcador es un proyecto. Filtrá por categoría o búsqueda.
		</p>
	</header>

	<div class="mt-s4">
		<AkFilters {projects} bind:searchTerm bind:selectedType bind:filteredProjects />
	</div>

	<div class="reveal relative mt-s3 overflow-hidden border border-rule bg-ink-2">
		<div bind:this={mapContainer} class="w-full" style="height: {mapHeight}; max-height: 80vh;"></div>

		<p class="t-nota tnum pointer-events-none absolute right-s2 bottom-s2 z-[400]">
			{filteredProjects.length} de {projects.length}
		</p>

		{#if selectedProject}
			<div class="absolute inset-0 z-[1000] flex items-center justify-center bg-ink p-s2">
				<div class="relative w-full max-w-sm">
					<AkBtnClose class="absolute -top-s2 -right-s2 z-10" onclick={closeProjectCard} />
					<AkProjectCard project={selectedProject} />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Cara ink aplicada a los tiles: no es decoración, es el sistema cromático. */
	:global(.map-tiles-dark) {
		filter: invert(1) hue-rotate(180deg) brightness(0.85) contrast(0.95) grayscale(0.4);
	}
	:global(.leaflet-container) {
		background: #141413;
		font-family: inherit;
	}
	:global(.leaflet-bar) {
		border: 1px solid #2a2a28 !important;
		border-radius: 2px !important;
		box-shadow: none !important;
	}
	:global(.leaflet-control-zoom a) {
		background-color: #0a0a0a !important;
		color: #e8e3d6 !important;
		border-color: #2a2a28 !important;
	}
	:global(.leaflet-control-zoom a:hover) {
		background-color: #141413 !important;
	}
	:global(.leaflet-control-attribution) {
		background: #0a0a0a !important;
		color: #8a857a !important;
		font-family: inherit;
		font-size: 11px !important;
	}
	:global(.leaflet-control-attribution a) {
		color: #e8e3d6 !important;
	}
	:global(.leaflet-tooltip) {
		background: #0a0a0a !important;
		color: #e8e3d6 !important;
		border: 1px solid #2a2a28 !important;
		border-radius: 2px !important;
		font-family: inherit;
		font-size: 13px !important;
		box-shadow: none !important;
	}
	:global(.leaflet-tooltip-top:before) {
		border-top-color: #2a2a28 !important;
	}
</style>
```

- [ ] **Step 3: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -c 'LIVE\|status-dot-live\|backdrop-blur\|JetBrains' src/routes/map/+page.svelte
```
Expected: build OK; `0`.

- [ ] **Step 4: Commit**

```bash
git add src/routes/map/+page.svelte src/lib/components/AkBtnClose.svelte
git commit -m "feat: mapa de proyectos sobre el sistema de marca"
```

---

### Task 14: Detalle de proyecto `/projects/[slug]`

**Files:**
- Modify: `src/routes/projects/[slug]/+page.svelte`
- Delete: `src/lib/components/AkBtnMetadata.svelte` (código muerto: alternaba una bandera que nadie renderizaba)

- [ ] **Step 1: Borrar `AkBtnMetadata`**

```bash
git rm -q src/lib/components/AkBtnMetadata.svelte
```

- [ ] **Step 2: Reescribir `src/routes/projects/[slug]/+page.svelte`**

```svelte
<script>
	import { base } from '$app/paths';
	import AkBtnClose from '$lib/components/AkBtnClose.svelte';
	import AkOptimizedImage from '$lib/components/AkOptimizedImage.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import SeoHead from '$lib/components/SeoHead.svelte';
	import { scrollReveal } from '$lib/actions/scrollReveal.js';
	import { categoryLabel, isInDevelopment, yearOf } from '$lib/utils/categories.js';

	let { data } = $props();
	let project = $derived(data.project);
	let images = $derived(project.resources?.images ?? []);

	let selectedImage = $state(null);
	let currentImageIndex = $state(0);

	function openLightbox(image) {
		currentImageIndex = images.findIndex((img) => img.path === image.path);
		selectedImage = image;
	}

	function closeLightbox() {
		selectedImage = null;
		currentImageIndex = 0;
	}

	function navigateToImage(index) {
		if (index >= 0 && index < images.length) {
			currentImageIndex = index;
			selectedImage = images[index];
		}
	}

	function nextImage() {
		navigateToImage((currentImageIndex + 1) % images.length);
	}

	function previousImage() {
		navigateToImage(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
	}

	function handleKeydown(event) {
		if (!selectedImage) return;
		if (event.key === 'Escape') closeLightbox();
		else if (event.key === 'ArrowRight') {
			event.preventDefault();
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			previousImage();
		}
	}

	// Los botones del lightbox no deben cerrar el diálogo al hacer click.
	function stop(fn) {
		return (event) => {
			event.stopPropagation();
			fn();
		};
	}

	function caption(image) {
		const head = image.metadata?.headline ?? image.name;
		return image.metadata?.description ? `${head} — ${image.metadata.description}` : head;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<SeoHead
	title={project.title}
	description={project.description}
	image="/content/projects/{project.slug}/thumbnail.jpg"
	type="article"
/>

<a href="{base}/projects" class="link t-nota inline-flex items-center gap-s1">
	<Icon name="chevron-left" size={16} /> Proyectos
</a>

<header class="grid-12 mt-s3">
	<p class="t-kicker col-span-12 flex flex-wrap items-center gap-s1">
		<span>{categoryLabel(project.type)} · <span class="tnum">{yearOf(project.date)}</span></span>
		{#if isInDevelopment(project.status)}
			<span>·</span>
			<span class="status-dot" aria-hidden="true"></span>
			<span>En desarrollo</span>
		{/if}
	</p>
	<h1 class="t-titulo col-span-12 mt-s2 lg:col-span-9">{project.title}</h1>
	<p class="t-bajada col-span-12 mt-s2">{project.description}</p>
</header>

<div class="my-s4 aspect-video overflow-hidden border border-rule bg-ink-2">
	<img
		src="{base}/content/projects/{project.slug}/thumbnail.jpg"
		alt=""
		class="h-full w-full object-cover"
	/>
</div>

<div use:scrollReveal class="grid-12">
	<div class="col-span-12 flex flex-col gap-s4 lg:col-span-8">
		{#if project.content}
			<section class="reveal">
				<p class="t-kicker">Detalles</p>
				<hr class="rule mt-s2" />
				<article class="prose-brand mt-s3">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -- Markdown propio, renderizado en build -->
					{@html project.content}
				</article>
			</section>
		{/if}

		{#if images.length > 0}
			<section class="reveal">
				<div class="flex items-baseline justify-between">
					<p class="t-kicker">Galería</p>
					<p class="t-nota tnum">{images.length} {images.length === 1 ? 'imagen' : 'imágenes'}</p>
				</div>
				<hr class="rule mt-s2" />
				<ul class="mt-s3 grid grid-cols-1 gap-s2 md:grid-cols-2">
					{#each images as image (image.path)}
						<li>
							<button
								type="button"
								onclick={() => openLightbox(image)}
								class="block aspect-[4/3] w-full cursor-pointer overflow-hidden border border-rule bg-ink-2"
								aria-label="Ampliar {image.metadata?.headline ?? image.name}"
							>
								<AkOptimizedImage
									src={image.path}
									alt=""
									class="h-full w-full object-cover"
									hasWebP={image.hasWebP || false}
								/>
							</button>
							<p class="t-nota mt-s1">{caption(image)}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if project.resources?.videos?.length}
			<section class="reveal">
				<p class="t-kicker">Videos</p>
				<hr class="rule mt-s2" />
				<ul class="mt-s3 grid grid-cols-1 gap-s2 md:grid-cols-2">
					{#each project.resources.videos as video (video.path)}
						<li class="border border-rule">
							<video controls class="w-full" preload="metadata">
								<source src={video.path} type="video/mp4" />
								<track kind="captions" />
								Tu navegador no reproduce este video.
							</video>
							<p class="t-nota px-s2 py-s1">{video.name}</p>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if project.resources?.documents?.length}
			<section class="reveal">
				<p class="t-kicker">Documentos</p>
				<hr class="rule mt-s2" />
				<ul class="list-rule mt-s2">
					{#each project.resources.documents as document (document.path)}
						<li>
							<a
								href={document.path}
								target="_blank"
								rel="noopener noreferrer"
								class="link flex items-center justify-between gap-s2"
							>
								<span class="t-cuerpo text-bone">{document.name}</span>
								<Icon name="arrow-up-right" size={16} />
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</div>

	<aside class="col-span-12 lg:col-span-3 lg:col-start-10">
		<div class="flex flex-col gap-s2 lg:sticky lg:top-24">
			<div class="card p-s3">
				<p class="t-kicker">Ficha</p>
				<dl class="mt-s2">
					<div class="border-t border-rule py-s2">
						<dt class="t-nota">Categoría</dt>
						<dd class="t-cuerpo mt-s1">{categoryLabel(project.type)}</dd>
					</div>
					{#if project.location}
						<div class="border-t border-rule py-s2">
							<dt class="t-nota">Ubicación</dt>
							<dd class="t-cuerpo mt-s1">{project.location}</dd>
						</div>
					{/if}
					{#if project.date}
						<div class="border-t border-rule py-s2">
							<dt class="t-nota">Año</dt>
							<dd class="t-cuerpo tnum mt-s1">{yearOf(project.date)}</dd>
						</div>
					{/if}
					{#if project.status}
						<div class="border-t border-rule py-s2">
							<dt class="t-nota">Estado</dt>
							<dd class="t-cuerpo mt-s1 capitalize">{project.status}</dd>
						</div>
					{/if}
				</dl>
			</div>

			{#if project.authors?.length}
				<div class="card p-s3">
					<p class="t-kicker">Equipo</p>
					<ul class="mt-s2 flex flex-col gap-s2">
						{#each project.authors as author (author.name + author.role)}
							<li>
								<p class="t-cuerpo">{author.name}</p>
								<p class="t-nota">{author.role}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if project.tags?.length}
				<div class="card p-s3">
					<p class="t-kicker">Tags</p>
					<ul class="mt-s2 flex flex-wrap gap-s1">
						{#each project.tags as tag (tag)}
							<li class="tag">{tag}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<a href="{base}/projects" class="btn justify-center">Ver todos los proyectos</a>
		</div>
	</aside>
</div>

{#if selectedImage}
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Imagen ampliada"
		tabindex="-1"
		class="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-s2 bg-ink/95 p-s2"
		onclick={closeLightbox}
		onkeydown={handleKeydown}
	>
		<AkBtnClose class="absolute top-s2 right-s2" onclick={stop(closeLightbox)} />

		{#if images.length > 1}
			<button
				type="button"
				class="btn btn-square absolute top-1/2 left-s2 -translate-y-1/2 bg-ink"
				onclick={stop(previousImage)}
				aria-label="Imagen anterior"
			>
				<Icon name="chevron-left" size={20} />
			</button>
			<button
				type="button"
				class="btn btn-square absolute top-1/2 right-s2 -translate-y-1/2 bg-ink"
				onclick={stop(nextImage)}
				aria-label="Imagen siguiente"
			>
				<Icon name="chevron-right" size={20} />
			</button>
		{/if}

		<img
			src={selectedImage.path}
			alt={selectedImage.metadata?.headline ?? selectedImage.name}
			class="max-h-[75vh] max-w-[90vw] object-contain"
		/>
		<p class="t-nota max-w-[60ch] text-bone">{caption(selectedImage)}</p>
		{#if images.length > 1}
			<p class="t-nota tnum">{currentImageIndex + 1} / {images.length}</p>
		{/if}
	</div>
{/if}
```

- [ ] **Step 3: Verificar**

Run:
```bash
bun run format && bun run lint && bun run build 2>&1 | tail -1
grep -c 'grayscale\|SerialNumber\|Kicker\|showTechnicalInfo' "src/routes/projects/[slug]/+page.svelte"
grep -o 'class="t-kicker[^>]*>' build/projects/guazuapp/index.html | wc -l
```
Expected: build OK; `0`; `≥ 4` (cabecera, Detalles, Galería/…, Ficha, Equipo, Tags).

- [ ] **Step 4: Commit**

```bash
git add -A "src/routes/projects/[slug]/+page.svelte" src/lib/components/AkBtnMetadata.svelte
git commit -m "feat: detalle de proyecto sobre el sistema de marca; quita código muerto de metadatos"
```

---

### Task 15: Limpieza, dependencias, CLAUDE.md y gate de marca

**Files:**
- Delete: `src/lib/components/editorial/` (6 archivos), `src/lib/components/{AkBadge,Search,ThFilter}.svelte`, `landing.html`
- Modify: `package.json`, `vite.config.js`, `CLAUDE.md`, `bun.lock`

- [ ] **Step 1: Borrar lo que ya no se usa y verificar que nadie lo importa**

```bash
git rm -rq src/lib/components/editorial src/lib/components/AkBadge.svelte src/lib/components/Search.svelte src/lib/components/ThFilter.svelte landing.html
grep -rn "editorial/\|AkBadge\|components/Search\|ThFilter\|AkBtnMetadata" src || echo "sin referencias"
```
Expected: `sin referencias`.

- [ ] **Step 2: Quitar `unplugin-icons`, `@iconify/*` y `@tailwindcss/typography`**

```bash
bun remove unplugin-icons @iconify/svelte @iconify/json @tailwindcss/typography
```

`vite.config.js` queda:

```js
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		viteStaticCopy({
			targets: [
				{
					src: 'content',
					dest: '.',
					ignore: ['**/.DS_Store']
				},
				...(process.env.CUSTOM_DOMAIN
					? [
							{
								src: 'static/CNAME',
								dest: '.',
								ignore: ['**/.DS_Store']
							}
						]
					: [])
			]
		})
	],
	server: {
		fs: {
			allow: ['..']
		}
	}
});
```

- [ ] **Step 3: Actualizar `CLAUDE.md`**

Reemplazar la sección `### Styling & UI` por:

```markdown
### Styling & UI — sistema de marca MisTec

- Tokens y componentes base en `src/lib/theme.css` (`@layer base` / `@layer components`); Tailwind 4 expone los mismos tokens como utilidades en `src/app.css` (`bg-ink`, `text-mist`, `border-rule`, `gap-s2`…).
- Una sola familia: Inter variable (`static/fonts/InterVariable.woff2`, `@font-face` en `src/app.html`). Pesos 300/350/500; nada de Bold.
- Escala tipográfica de cinco niveles: `.t-titulo .t-subtitulo .t-bajada .t-cuerpo .t-nota` (+ `.t-kicker`, `.t-cifra`).
- Ámbar (`#FFB840`) solo en `theme.css`: `.accent` (una palabra por titular), `:focus-visible`, `::selection`, `.status-dot`. `bun run check:brand` falla si aparece en otro lado.
- Íconos: `src/lib/components/Icon.svelte` (set propio, 24-box, trazo 2). Sin librerías de íconos.
- Marca: `static/brand/*` generados con `bun run brand:assets` desde los originales en `brand/signos/`.
- Spec completo: `docs/superpowers/specs/2026-08-31-rebrand-mistec-design.md`.
```

En `### Package Management`, reemplazar la primera viñeta por:

```markdown
- Uses `bun` locally (`bun install`, `bun run dev`); the committed lockfile is `bun.lock`. CI (`.github/workflows/deploy.yml`) installs with pnpm without a lockfile.
```

Y en `## Testing & Quality`, reemplazar `- No test framework currently configured` por:

```markdown
- `bun run test` — `node --test` sobre `tests/` (módulos puros)
- `bun run check:brand` — verificación del sistema de marca (patrones prohibidos, presupuesto de ámbar)
```

- [ ] **Step 4: Gate completo**

Run:
```bash
bun install
bun run format && bun run lint && bun run test && bun run check:brand && bun run build 2>&1 | tail -1
grep -rn "~icons\|iconify\|prose-invert\|@plugin" src || echo "limpio"
```
Expected: `✓ check-brand: sin violaciones`; build OK; `limpio`. Si `check:brand` reporta algo, corregirlo en el archivo señalado antes de seguir (es un error real de sistema, no del script).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: limpieza de componentes y dependencias del sistema viejo; CLAUDE.md al día"
```

---

### Task 16: Verificación visual y ajustes finales

**Files:**
- Modify: los que hagan falta según lo que muestren las capturas (típicamente `theme.css` y componentes de `landing/`).

- [ ] **Step 1: Levantar el dev server**

Run (en background): `bun run dev`
Esperar `Local: http://localhost:5173/`.

- [ ] **Step 2: Capturas de escritorio** con las herramientas Playwright MCP (`mcp__plugin_playwright_playwright__browser_*`):

1. `browser_resize` → `{ width: 1440, height: 900 }`.
2. Para cada ruta `/`, `/projects/`, `/list/`, `/map/`, `/about/`, `/projects/guazuapp/`:
   - `browser_navigate` a `http://localhost:5173<ruta>`.
   - `browser_take_screenshot` con `fullPage: true`, `type: "jpeg"`, `filename: "<scratchpad>/after-desktop-<nombre>.jpeg"` (el scratchpad de la sesión; no dentro del repo).
   - `browser_console_messages` → no debe haber errores (los 404 de tiles de OpenStreetMap sin red se ignoran).
   - `browser_evaluate` con `() => document.documentElement.scrollWidth <= window.innerWidth` → `true`.
3. Leer cada captura (Read) y revisarla contra el "test del sistema" (spec §8.4): retícula, distancias explicables, nada que sobre, nada genérico. Anotar problemas.

- [ ] **Step 3: Capturas móviles** — `browser_resize` → `{ width: 390, height: 844 }` y repetir el paso 2 para `/`, `/projects/` y `/projects/guazuapp/`. Además, en `/`, `browser_click` sobre el botón "Abrir menú" y capturar el panel.

- [ ] **Step 4: Motion y foco**

- `browser_emulate` (si está disponible) o `browser_evaluate` con `matchMedia('(prefers-reduced-motion: reduce)').matches` para documentar el estado; navegar `/` y comprobar con `browser_evaluate` `() => [...document.querySelectorAll('.reveal')].every(e => e.classList.contains('visible'))` tras 3,5 s → `true`.
- `browser_press_key` `Tab` ×3 en `/` y `browser_take_screenshot` del viewport: el foco (outline ámbar) debe verse sobre la marca, el primer link de nav y el siguiente.

- [ ] **Step 5: Assets servidos**

```bash
for p in /favicon.ico /favicon-96.png /favicon-192.png /apple-touch-icon.png /og-default.jpg /brand/mistec-horizontal-bone.png /brand/mistec-isotipo-bone.png /brand/mistec-logo-512.png /fonts/InterVariable.woff2; do printf "%-40s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:5173$p)"; done
```
Expected: todos `200`.

- [ ] **Step 6: Ajustar lo que las capturas muestren.** Reglas para los ajustes: solo tokens y clases del sistema; si el isotipo del hero se lee como "logo recoloreado" y no como recurso, bajar `opacity-[0.09]` a `opacity-[0.06]` o quitar el `<img>`; si un título rompe feo, ajustar `max-w-[22ch]` en `SectionHead`; si el stepper de 04 queda apretado a 1024–1279 px, cambiar `lg:grid-cols-6` por `lg:grid-cols-3 xl:grid-cols-6` (y los bordes laterales a `xl:`). Después de cada ajuste: `bun run format && bun run lint && bun run check:brand && bun run build`.

- [ ] **Step 7: Build de producción con dominio propio y smoke**

```bash
CUSTOM_DOMAIN=true NODE_ENV=production bun run build 2>&1 | tail -1
ls build/brand build/fonts && grep -c 'InterVariable' build/index.html
```
Expected: build OK; los tres PNG y la fuente en `build/`; `2`.

- [ ] **Step 8: Commit final**

```bash
git add -A
git commit -m "fix: ajustes de composición tras la verificación visual del rediseño"
```

Si no hubo ajustes, no hay commit: informar que la verificación pasó sin cambios.

---

## Self-review

**Cobertura del spec.** §4.1 color → Task 4. §4.2 tipografía → Tasks 3 y 4. §4.3 retícula/espacio → Task 4. §4.4 motion → Task 4 (theme + scrollReveal). §4.5 íconos → Task 5. §4.6 componentes base → Task 4. §4.7 presupuesto de ámbar → Task 1 (gate) + cada componente. §4.8 marca/assets → Task 2. §5.0–5.7 landing → Tasks 8, 9, 10. §5.8 nav → Task 6. §5.9 contenido → Tasks 10 y 11. §6 SEO/config → Tasks 6 y 8. §7.1 layout → Task 6. §7.2 header → Task 6. §7.3 about → Task 11. §7.4 card → Task 7. §7.5 /projects → Task 7. §7.6 /list → Task 12. §7.7 /map → Task 13. §7.8 detalle → Task 14. §7.9 footer → Task 6. §7.10 limpieza → Task 15. §8 verificación → Tasks 1, 15 y 16.

**Placeholders.** Ninguno: cada archivo tiene su contenido completo; los comandos de verificación tienen salida esperada.

**Consistencia de nombres.** `Icon` (`name`, `size`, `class`) igual en Tasks 5–14. `categoryLabel/isInDevelopment/yearOf` iguales en Tasks 5, 7, 12, 14. `SectionHead` (`id n label` + snippets `title lead`) igual en Tasks 8–10. Clases de `theme.css` (`t-*`, `container-brand`, `grid-12`, `section`, `list-rule`, `grid-rule`, `btn`, `btn-square`, `btn-text`, `link`, `link-active`, `card`, `tag`, `tag-active`, `input`, `status-dot`, `prose-brand`, `reveal`, `reveal-1…6`, `accent`, `tnum`) definidas en Task 4 y usadas con esos nombres exactos. Utilidades por token (`ink ink-2 bone mist rule`, `s1…s5`) definidas en `app.css` (Task 4).
