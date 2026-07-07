# Pablo Carmona — Sitio Personal

[![pablocarmona.cl](https://img.shields.io/badge/live-pablocarmona.cl-orange)](https://pablocarmona.cl)

Portfolio personal de Pablo Carmona: odontólogo, buzo PADI, fotógrafo y entusiasta de la tecnología. Una sola página que unifica identidades sin sentirse como un template.

## Stack

HTML + **TailwindCSS v3.4** (CDN) + CSS propio + JS vanilla. Sin frameworks ni bundlers. **Schibsted Grotesk** como tipografía única vía Google Fonts. Iconos SVG inline (`icons.js`). GitHub Pages + dominio `pablocarmona.cl`.

## Lo que hace

- **Bilingüe** — español e inglés con persistencia en localStorage, `hreflang` tags con self-referencing y `lang` dinámico
- **Parallax** — fondo fijo con aceleración GPU, sin `background-attachment: fixed` (roto en iOS)
- **Galería** — filtros por categoría, thumbnails (90KB) + fotos optimizadas (250KB), modal con teclado
- **Intereses** — Buceo (scroll a About), Libros (exit overlay → Hardcover), Tecnología (scroll a Contacto)
- **Contacto** — email ofuscado en JS, formulario con validación, redes sociales con touch targets WCAG
- **Modo oscuro fijo** — diseñado para light-on-dark, sin toggle
- **SEO** — meta description, Open Graph, Twitter card, JSON-LD Person, sitemap, robots.txt, canonical + hreflang con self-referencing
- **A11y** — skip-link, `aria-current`, `aria-expanded`, touch targets 44px, `prefers-reduced-motion`
- **Performance** — imágenes comprimidas 97% (44MB → 1.1MB), lazy loading, 0 dependencias de iconos externos

## Estructura

```
index.html        → Página principal
style.css         → Estilos + fluid typography + wave dividers
script.js         → Lógica: galería, modal, idioma, menú, event delegation
icons.js          → 13 iconos SVG inline
content.json      → About: descripción, skills, experiencia (bilingüe, 3 jobs)
gallery.json      → Galería: thumbnails + full-size, categorías
interests.json    → Intereses: acciones link / target / image
images/           → perfil.jpg, fondo.jpg, favicon.JPG, agua.PNG
Fotos/            → Optimizadas (~250KB c/u)
Fotos/thumbs/     → Thumbnails (~90KB c/u)
Fotos/original/   → Backup de originales (9-12MB)
CNAME             → pablocarmona.cl
robots.txt        → SEO
sitemap.xml       → SEO
PRODUCT.md        → Contexto de diseño
AGENTS.md         → Guía para agentes
```

## Desarrollo local

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

Sin dependencias. Sin `npm install`. Solo un servidor estático.

## Restore points

```bash
git log --oneline          # ver checkpoints
git checkout 7b4a6c9       # revertir cambios de diseño
```

## Pendientes

Ver `AGENTS.md` para la lista completa. Los principales:
- Formulario sin backend (solo feedback visual)
- Contraste white-on-orange en Contact (WCAG AA)
- Sin imágenes WebP ni srcset responsivo

---

Hecho con ❤️ desde Iquique, Chile
