# Proyecto: Sitio Personal pablocarmona.cl

## Stack
- HTML + CSS (TailwindCSS via CDN + style.css propio) + JS vanilla
- Font Awesome v6.4.0 (CDN)
- GitHub Pages + dominio personalizado (CNAME → pablocarmona.cl)
- Sin frameworks ni bundlers

## Estructura
```
index.html        → Página principal (288 líneas)
style.css         → Estilos personalizados (196 líneas)
script.js         → Todo el JavaScript (371 líneas)
content.json      → Contenido sección About (bilingüe ES/EN)
gallery.json      → Items de galería con categorías y descripciones bilingües
interests.json    → Intereses con iconos FontAwesome + enlace externo para Libros
images/           → perfil.jpg, fondo.jpg, favicon.JPG, agua.PNG
Fotos/            → D02-D05.JPG (fotos de galería, 9-12MB c/u)
CNAME             → pablocarmona.cl
AGENTS.md         ← Este archivo
```

## Comandos

```bash
# Servidor local para desarrollo
python3 -m http.server 8080
# → http://localhost:8080
```

## Funcionalidades implementadas

### Navegación
- Menú sticky con backdrop-blur, 5 anclas: Inicio, Sobre Mí, Galería, Intereses, Contacto
- Smooth scroll con offset de 80px
- Menú responsive con hamburguesa (`md:hidden`), `max-h-[80vh] overflow-y-auto`
- `aria-expanded` sincronizado con estado del menú móvil
- Animación hover en nav-items (subrayado naranjo con transición)
- Nav items responsive: `text-base md:text-2xl`

### Bilingüe (ES/EN)
- Botones de idioma con banderas (🇨🇱/🇺🇸)
- Persistencia en localStorage (`language`)
- `data-es` / `data-en` en elementos estáticos y generados dinámicamente
- Funciona en inputs/textarea (placeholder)
- `setLanguage(lang)` actualiza todo + re-renderiza galería

### Modo oscuro (fijo, sin toggle)
- `dark` en `<body>` siempre presente
- Tailwind config: `darkMode: 'class'`
- Variables CSS en `:root`
- Los `dark:` variants de Tailwind se aplican automáticamente
- El toggle luna/sol y `setTheme()` fueron eliminados — no intentar reimplementarlos

### Parallax background (fondo fijo)
- `<div class="bg-parallax">` global al inicio de `<body>` con `position: fixed` + `z-index: -1`
- Imagen: `images/fondo.jpg`, opacity 0.8
- `will-change: transform; transform: translateZ(0)` → GPU composited, sin stutter en desktop
- Mobile (`hover: none` + max-width 768px) → `position: absolute` (evita bugs de iOS con fixed)
- **NO usar `background-attachment: fixed`** — causa stutter en desktop y no funciona en iOS
- `@media (prefers-reduced-motion: reduce)` → elimina hints de GPU

### Secciones

**Hero:** Título con gradiente naranjo + subtitle + CTA "Conóceme"

**About:** Cargado desde `content.json`:
- Título, nombre, descripción (bilingüe, max-width 65ch)
- Skills como pills naranjas (`bg-orange-100` / `dark:bg-orange-900`)
- Timeline de experiencia: 1 solo job (Master Scuba Diver — PADI), con puntos naranjos y línea vertical
- Timeline responsive: puntos de 14px en móvil, padding reducido
- Foto de perfil circular con borde naranjo, responsive: `w-40 sm:w-56 lg:w-64`

**Galería:** Cargada desde `gallery.json`:
- Filtros por categoría: Todo / Fotografía / Viajes / Proyectos
- Grid responsive (1/2/3 columnas), `gap-4 sm:gap-6`
- Imágenes con `aspect-[4/3]` + `loading="lazy" decoding="async"`
- Hover scale(1.05)
- Click/keyboard → abre modal fullscreen
- Items con `tabindex="0"` + `focus-visible:ring-2 focus-visible:ring-orange-500`

**Intereses:** Cargados desde `interests.json`:
- Cards con `aspect-[16/9]` icono FontAwesome naranjo + título + descripción
- Items con `tabindex="0"` + `focus-visible:ring-2 focus-visible:ring-orange-500`
- Comportamiento al click (prioridad en este orden):
  1. Si tiene `link` → overlay de salida con countdown (Libros → Hardcover)
  2. Si tiene `target` → smooth scroll a esa sección (Buceo → `#about`, Tecnología → `#contact`)
  3. Si tiene `image` → modal de imagen
- **NO tienen campo `image`** actualmente (se eliminó porque las imágenes no existen)

**Contacto:**
- Columna naranja: email (botón copiar), ubicación, Telegram, redes sociales
- Columna blanca: formulario (nombre, email, mensaje)
- Formulario no envía realmente — solo feedback verde 3s al submit
- Footer: logo agua.PNG responsive (`h-[50px] md:h-[60px] max-w-[200px] md:max-w-none`), Twitter/X, LinkedIn, GitHub, copyright

### Componentes reutilizados
**Image Modal:** Overlay fullscreen negro 80%, cierre click fuera o cualquier tecla. `select-none` + `pointer-events-none` en la imagen.

**Exit Overlay:** Para enlaces externos, mensaje con countdown regresivo y botón cancelar. Intervalo limpiado al cancelar.

### Funciones principales en script.js
| Función | Propósito |
|---|---|
| `loadInterests()` | Fetch a interests.json, renderiza cards |
| `loadContent()` | Fetch a content.json, pinta About |
| `loadGalleryData()` | Fetch a gallery.json, llena `galleryItems` |
| `renderGallery(category)` | Filtra y renderiza grid de galería |
| `setLanguage(lang)` | Cambia idioma en todos los elementos con data-* + re-renderiza galería |
| `openImageModal(src, alt)` | Muestra modal de imagen |
| `closeImageModal(event)` | Cierra modal click fuera |
| `closeImageModalOnKey(event)` | Cierra modal con tecla |
| `showExitOverlay(url, delay)` | Overlay de salida con countdown |

## Pendientes / Bugs conocidos
1. Formulario no envía realmente (solo feedback visual 3s) — integrar Formspree o EmailJS
2. Fotos de galería (9-12MB cada una) — comprimir a WebP o generar thumbnails
3. No hay loading states mientras se cargan los JSONs (interests, content, gallery)
4. `content.json` tiene campos `cta` y `navigation` sin usar

## Gotchas técnicas
- El fondo parallax usa `position: fixed` en un `<div>`, NO `background-attachment: fixed` en body (este último se traba en desktop y no funciona en iOS Safari)
- `interests.json` soporta 3 acciones: `link` (exit overlay), `target` (scroll), `image` (modal). El campo `image` se eliminó de todos los items porque las imágenes no existen.
- `content.json` solo tiene 1 job de experiencia; se eliminaron UI Designer y Web Developer por no reflejar el perfil real.
- `setTheme()` no existe más — el modo oscuro es fijo. No referenciar `darkMode` en localStorage.
- Las fotos de galería viven en `Fotos/` (con mayúscula), no en `images/`.
- El servidor de desarrollo es `python3 -m http.server 8080`, sin build step.
