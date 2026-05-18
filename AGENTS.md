# Proyecto: Sitio Personal pablocarmona.cl

## Stack
- HTML + CSS (TailwindCSS via CDN + style.css propio) + JS vanilla
- Font Awesome v6.4.0 (CDN)
- GitHub Pages + dominio personalizado (CNAME → pablocarmona.cl)
- Sin frameworks ni bundlers

## Estructura
```
index.html        → Página principal (294 líneas, semántica limpia)
style.css         → Estilos personalizados centralizados (180 líneas)
script.js         → Todo el JavaScript externo (353 líneas)
content.json      → Contenido sección About (bilingüe ES/EN)
gallery.json      → Items de galería con categorías y descripciones bilingües
interests.json    → Intereses con iconos FontAwesome + enlace externo para Libros
images/           → perfil.jpg, fondo.jpg, favicon.JPG, agua.PNG
Fotos/            → D02-D05.JPG (fotos de galería)
CNAME             → pablocarmona.cl
AGENTS.md         ← Este archivo (memoria del proyecto)
```

## Funcionalidades implementadas

### Navegación
- Menú sticky con backdrop-blur, 5 anclas: Inicio, Sobre Mí, Galería, Intereses, Contacto
- Smooth scroll con offset de 80px
- Menú responsive con hamburguesa (md:hidden)
- Animación hover en nav-items (subrayado naranjo con transición)

### Bilingüe (ES/EN)
- Botones de idioma con banderas (🇨🇱/🇺🇸)
- Persistencia en localStorage (`language`)
- `data-es` / `data-en` en elementos estáticos y generados dinámicamente
- Funciona también en inputs/textarea (placeholder) y formulario de contacto
- Función `setLanguage(lang)` actualiza todo + regalerya la galería

### Modo oscuro / claro
- Clase `dark` en `<body>` (por defecto oscuro)
- Tailwind configurado con `darkMode: 'class'`
- Variables CSS en `:root` (dark) y `body:not(.dark)` (light)
- Botón luna/sol en el header con rotación hover
- Persistencia en localStorage (`darkMode`)

### Secciones

**Hero:** Título con gradiente + subtitle + CTA

**About:** Cargado desde `content.json`:
- Título, nombre, descripción (bilingüe)
- Skills como pills naranjas (bg-orange-100 / dark:bg-orange-900)
- Timeline de experiencia con puntos naranjos y línea vertical
- Foto de perfil circular con borde naranjo

**Galería:** Cargada desde `gallery.json`:
- Filtros por categoría: Todo / Fotografía / Viajes / Proyectos
- Grid responsive (1/2/3 columnas)
- Hover scale(1.05)
- Click abre modal fullscreen con imagen

**Intereses:** Cargados desde `interests.json`:
- Cards con icono FontAwesome grande + título + descripción
- Buceo, Libros, Tecnología
- Click en "Libros" abre overlay de salida con countdown 10s → redirige a Hardcover
- Los demás intereses abren modal de imagen

**Contacto:**
- Info: email (con botón copiar), ubicación, Telegram
- Redes: Instagram, Facebook, YouTube
- Formulario con handler que muestra feedback verde por 3s (no envía realmente)
- Redes sociales en footer: Twitter/X, LinkedIn, GitHub

**Footer:**
- Logo agua.PNG, redes sociales, texto "Hecho con amor desde Iquique - Chile"
- Copyright 2023

### Componentes reutilizados
**Image Modal:** Overlay fullscreen negro al 80%, imagen centrada, cierre con click fuera o cualquier tecla

**Exit Overlay:** Para enlaces externos (Hardcover), mensaje con countdown y botón cancelar

### Funciones principales en script.js
| Función | Propósito |
|---|---|
| `loadInterests()` | Fetch a interests.json, renderiza cards |
| `loadContent()` | Fetch a content.json, pinta About |
| `loadGalleryData()` | Fetch a gallery.json, llena `galleryItems` |
| `renderGallery(category)` | Filtra y renderiza grid de galería |
| `setLanguage(lang)` | Cambia idioma en todos los elementos con data-* |
| `setTheme(isDark)` | Toggle dark/light class |
| `openImageModal(src, alt)` | Muestra modal de imagen |
| `closeImageModal(event)` | Cierra modal click fuera |
| `closeImageModalOnKey(event)` | Cierra modal con tecla |
| `showExitOverlay(url, delay)` | Overlay de salida con countdown |

## Pendientes / Bugs conocidos
1. Referencias a IDs que no existen en el HTML (`#about-cta`, `#nav-about`, `#mobile-nav-about`) → comentadas/eliminadas de script.js
2. Descripción del interés "Libros" habla de guitarra (content bug, no corregido)
3. Experiencia laboral en content.json es genérica (no refleja perfil de buzo/fotógrafo)
4. Imágenes `diving.jpg`, `music.jpg`, `tech.jpg` no existen en /images
5. Formulario no envía realmente (solo feedback visual 3s)
6. Logo header 400px, footer sin width fijo (se adapta)
7. Interés "Buceo" apunta a `images/diving.jpg` (no existe) → abre modal vacío
8. intereses.json: descripción de Libros habla de guitarra (probable copy-paste)

## Próximas mejoras sugeridas
- Reemplazar imágenes placeholder por las reales
- Corregir descripciones de intereses/experiencia
- Hacer que el formulario envíe (Formspree, EmailJS, o similar)
- Agregar loading states mientras se cargan los JSONs
- Considerar lazy loading en imágenes de galería
