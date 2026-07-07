# Product

## Register

brand

## Users

Audiencia mixta que busca conocer a Pablo Carmona desde distintos ángulos:

- **Profesional:** potenciales clientes y colaboradores interesados en su trabajo con tecnología, automatización (n8n) y AI (Claude, DeepSeek, Google AI)
- **Personal:** comunidad de buceo (PADI, TDI, IANTD), fotógrafos, y lectores que lo siguen en Hardcover
- **Social:** red de contactos que llega desde Instagram, LinkedIn, GitHub, YouTube o Telegram

El sitio funciona como carta de presentación unificada: un solo lugar donde convergen la odontología, el buceo, la fotografía y la tecnología sin que ninguna faceta opaque a las demás.

## Product Purpose

Ser el hub digital de Pablo Carmona — un portfolio personal que comunica su triple identidad (odontólogo + buzo + tecnólogo) con autenticidad, sin sentirse como un template. El sitio debe:

1. Transmitir autoridad y experiencia real en cada área
2. Servir como puente de contacto profesional y personal
3. Mostrar trabajo visual (fotografía) y proyectos sin fricción
4. Funcionar impecablemente en móvil (gran parte del tráfico desde redes sociales)

## Brand Personality

**Dinámico, disruptivo, audaz.**

- No es el portfolio corporativo predecible ni el blog minimalista anónimo
- La energía viene de la intersección inesperada de mundos: un dentista que bucea, automatiza con n8n y construye con AI
- El tono es seguro pero accesible — experiencia real sin postureo
- El diseño debe sentirse vivo, con carácter, sin caer en efectos gratuitos

## Anti-references

- **Templates SaaS genéricos:** gradientes purple-to-cyan, hero metrics (big number + small label), cards idénticas con iconos flotando, CTAs rodeados de blur Glassmorphism
- **Brutalismo frío:** raw HTML aesthetic forzado, tipografía monoespaciada como único recurso, cero calidez visual
- **Sobrecarga de efectos:** partículas, parallax exagerado, scrolljacking, animaciones que compiten con el contenido

El sitio debe sentirse diseñado a medida, no generado por un template ni por una fórmula de moda.

## Design Principles

1. **Una identidad, tres mundos.** Cada sección debe respirar coherencia visual sin homogeneizar las facetas. El buceo, la tecnología y la fotografía comparten paleta y tipografía pero se expresan con matices propios.

2. **Mostrar, no decorar.** Las decisiones visuales deben codificar información real: la línea del timeline es experiencia cronológica, la ola entre secciones referencia el océano, la paleta naranja evoca atardeceres de Iquique.

3. **Mobile-first real.** El tráfico principal viene de redes sociales en móvil. Cada decisión de layout, tamaño de fuente y peso de imagen se valida primero en pantalla chica.

4. **Velocidad sin excusas.** Sin frameworks ni bundlers, cada kilobyte cuenta. Las imágenes se comprimen, los iconos son SVG inline, y el CSS es mínimo.

## Accessibility & Inclusion

- Target: WCAG 2.1 AA
- Contraste mínimo 4.5:1 en body text, 3:1 en texto grande
- Navegación completa por teclado (skip-link, focus visible, `aria-current`)
- `prefers-reduced-motion` respetado en animaciones y parallax
- Bilingüe completo (ES/EN) con `hreflang` tags y `lang` dinámico en `<html>`
