# Proyecto: Sitio Personal pablocarmona.cl

## Stack
- HTML + CSS (TailwindCSS v3.4.17 via CDN + style.css propio) + JS vanilla
- Google Fonts: Schibsted Grotesk (variable, 400-900) — familia única
- SVGs inline (icons.js) — Font Awesome CDN eliminado
- GitHub Pages + dominio personalizado (CNAME → pablocarmona.cl)
- Sin frameworks ni bundlers

## Estructura
```
index.html        → Página principal (338 líneas)
style.css         → Estilos personalizados (246 líneas)
script.js         → Todo el JavaScript (374 líneas)
icons.js          → SVGs inline: renderIcon() (13 iconos)
content.json      → Contenido sección About (bilingüe ES/EN, 3 jobs)
gallery.json      → Items de galería con thumbnails + full-size
interests.json    → Intereses con `link` / `target` / `image`
images/           → perfil.jpg, fondo.jpg, favicon.JPG, agua.PNG
Fotos/            → D02-D05.JPG (~250KB c/u) + original/ (backup) + thumbs/ (90KB c/u)
CNAME             → pablocarmona.cl
robots.txt        → SEO: permite todo, apunta a sitemap
sitemap.xml       → SEO: índice del sitio
PRODUCT.md        → Contexto de diseño (impeccable skill)
AGENTS.md         ← Este archivo
```

## Comandos

```bash
# Servidor local para desarrollo
python3 -m http.server 8080
# → http://localhost:8080

# Restaurar a checkpoint pre-diseño (si un cambio visual no gusta)
git checkout 7b4a6c9
```

## Funcionalidades implementadas

### Navegación
- Menú sticky con backdrop-blur, 5 anclas: Inicio, Sobre Mí, Galería, Intereses, Contacto
- Smooth scroll con offset de 80px (helper `scrollToSection`)
- Menú responsive con hamburguesa + backdrop overlay (`#mobile-backdrop`)
- `aria-expanded` sincronizado con estado del menú
- `aria-current="page"` en nav link activo (IntersectionObserver)
- Skip-link para teclado ("Saltar al contenido", visible al focus)
- Nav items responsive: `text-base md:text-2xl`

### Bilingüe (ES/EN)
- Botones de idioma con banderas (🇨🇱/🇺🇸)
- Persistencia en localStorage (`language`)
- `data-es` / `data-en` en elementos estáticos y generados dinámicamente
- Funciona en inputs/textarea (placeholder) y exit overlay
- `setLanguage(lang)` actualiza todo + re-renderiza galería + `document.documentElement.lang`

### Modo oscuro (fijo, sin toggle)
- `dark` en `<body>` siempre presente
- Tailwind config: `darkMode: 'class'`
- Variables CSS en `:root`
- `setTheme()` no existe — no intentar reimplementarlo

### Parallax background (fondo fijo)
- `<div class="bg-parallax">` global al inicio de `<body>` con `position: fixed` + `z-index: -1`
- Imagen: `images/fondo.jpg`, opacity 0.8
- `will-change: transform; transform: translateZ(0)` → GPU composited
- Mobile (`hover: none` + max-width 768px) → `position: absolute`
- **NO usar `background-attachment: fixed`** — causa stutter y no funciona en iOS
- `@media (prefers-reduced-motion: reduce)` → desactiva hints de GPU

### Tipografía
- **Schibsted Grotesk** (variable, 400-900) como familia única para display + body
- Hero: `clamp(2.5rem, 5vw + 1rem, 6rem)`, weight 800, letter-spacing -0.03em
- Headings: weight 700-800, letter-spacing -0.02em a -0.03em
- Body: weight 400, line-height 1.65 (compensa light-on-dark)
- h4: weight 600, uppercase, tracking 0.02em (rol de label)
- **NO usar DM Serif Display ni Inter** — fueron reemplazadas por estar en reflex-reject list

### Secciones

**Hero:** Nombre "Pablo Carmona" como h1 (fluid), línea naranja separadora, subtítulo con triple identidad (bilingüe), CTA "Conóceme"

**About:** Cargado desde `content.json`:
- Título, nombre, descripción reescrita (4 frases con estructura clara, bilingüe)
- Skills como pills naranjas
- Timeline de 3 jobs: Master Scuba Diver, Vibe Coding, Automatización
- Timeline responsive: puntos de 14px en móvil, padding reducido
- Foto de perfil con triple anillo concéntrico + glow naranjo (box-shadow)

**Galería:** Cargada desde `gallery.json`:
- Filtros por categoría: Todo / Fotografía / Viajes / Proyectos
- Grid responsive (1/2/3 columnas), `gap-4 sm:gap-6`
- Thumbnails (600px) en grid, full-size (1200px) en modal
- Imágenes con `aspect-[4/3]` + `loading="lazy" decoding="async"`
- Fotos originales (9-12MB) → optimizadas (~250KB c/u), originales en `Fotos/original/`
- Hover scale(1.05) + keyboard nav con `tabindex="0"`

**Intereses:** Cargados desde `interests.json`:
- Cards editoriales: ícono SVG naranjo centrado, sin bloque de color
- Hover: elevación + borde superior naranjo + glow difuso
- `tabindex="0"` + `focus-visible:ring-2`
- Comportamiento al click (prioridad):
  1. `link` → exit overlay con countdown (Libros → Hardcover)
  2. `target` → smooth scroll (Buceo → `#about`, Tecnología → `#contact`)
  3. `image` → modal de imagen (ningún item lo usa actualmente)
- Íconos via `renderIcon()` en `icons.js`

**Contacto:**
- Columna naranja: botón "Enviar Correo" (email ofuscado en JS, mailto: sin exponer dirección), ubicación, Telegram
- Redes sociales: Instagram, Facebook, YouTube (touch targets 44px, WCAG 2.5.5 ✅)
- Formulario con validación (`required`), feedback verde 3s, `form.reset()` al completar
- Footer: logo agua.PNG, Twitter/X, LinkedIn, GitHub, copyright dinámico

### Componentes
- **Wave dividers:** SVG ondulado entre secciones (tema oceánico, 3 divisores)
- **Image Modal:** Cierra solo con Escape o click fuera. Listeners fijos (sin memory leak).
- **Exit Overlay:** Bilingüe (mensaje + countdown + botón). Intervalo limpiado al cancelar.

### SEO
- Meta description + Open Graph tags + Twitter card (imágenes con URL absoluta)
- `canonical` + `hreflang` (es → root, en → ?lang=en, x-default → root) con self-referencing
- Title: "Pablo Carmona — Odontólogo, Buzo & Tech | Iquique, Chile" (keywords + geolocalización)
- JSON-LD Person structured data (schema.org) con sameAs de 6 redes sociales
- `robots.txt` + `sitemap.xml`
- `viewport-fit=cover` + `safe-area-inset-*`

### Funciones principales en script.js

| Función | Propósito |
|---|---|
| `loadInterests()` | Fetch a interests.json, renderiza cards con renderIcon() |
| `loadContent()` | Fetch a content.json, pinta About con setBilingual() |
| `loadGalleryData()` | Fetch a gallery.json, llena `galleryItems` |
| `renderGallery(category, lang)` | Filtra y renderiza grid (usa thumbnails) |
| `setLanguage(lang)` | Cambia idioma + re-renderiza galería + actualiza html[lang] |
| `openImageModal(src, alt)` | Muestra modal de imagen |
| `closeImageModal()` | Cierra modal (llamada por handlers globales) |
| `showExitOverlay(url, delay)` | Overlay bilingüe con countdown |
| `scrollToSection(selector)` | Smooth scroll con offset 80px |
| `setBilingual(el, es, en)` | Asigna textContent + data-es + data-en |
| `renderIcon(name)` | Retorna SVG inline (icons.js) |
| `toggleMobileMenu()` | Toggle menú + backdrop |
| `faName(cls)` | Extrae nombre de icono de clase FontAwesome legacy |

### Helpers (icons.js)
| Función | Propósito |
|---|---|
| `renderIcon(name)` | Retorna SVG markup para el nombre de icono |
| `ICONS` | Mapa de 13 iconos: water, book, laptop-code, envelope, map-marker-alt, phone-alt, telegram, instagram, facebook-f, youtube, twitter, linkedin-in, github |

## Pendientes / Bugs conocidos
1. Formulario no envía realmente (solo feedback visual 3s) — integrar Formspree o EmailJS
2. Contraste white-on-orange en sección Contact: 1.6:1 — no cumple WCAG AA (P0)
3. Gallery description text `dark:text-gray-300`: 3.4:1 — no cumple AA para texto pequeño (P1)
4. `content.json` tiene campos `cta` y `navigation` sin usar
5. Sin imágenes WebP ni `srcset` responsivo en galería (P2)
6. Sitemap sin `lastmod` dinámico ni `<xhtml:link>` hreflang (P3)

## Gotchas técnicas
- **NO usar `background-attachment: fixed`** — usar `position: fixed` en `<div>` con `will-change: transform`
- **NO usar DM Serif Display ni Inter** — están en la reflex-reject list de la skill impeccable
- **Hreflang self-referencing obligatorio** — cada página debe incluirse a sí misma en el set. Sin esto Google ignora todas las anotaciones. `es` apunta a la raíz canonical, NO a `?lang=es`.
- **OG/Twitter images deben ser URLs absolutas** — `https://pablocarmona.cl/images/perfil.jpg`, nunca relativas. Las redes sociales no resuelven paths relativos.
- `interests.json` soporta 3 acciones: `link` (exit overlay), `target` (scroll), `image` (modal). Prioridad en ese orden.
- `setTheme()` no existe — modo oscuro fijo. No referenciar `darkMode` en localStorage.
- Las fotos de galería viven en `Fotos/` (con mayúscula). Thumbnails en `Fotos/thumbs/`. Originales backup en `Fotos/original/`.
- El servidor de desarrollo es `python3 -m http.server 8080`, sin build step.
- `font-weight: 400` en body + `line-height: 1.65` compensa light-on-dark. No bajar el weight ni la altura de línea.
