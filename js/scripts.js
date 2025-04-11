document.addEventListener('DOMContentLoaded', () => {

    // --- Traducción / Cambio de Idioma ---
    const translations = {
        es: {
            nav_home: "Inicio",
            nav_about: "Sobre mí",
            nav_gallery: "Galería",
            nav_interests: "Intereses",
            nav_contact: "Contacto",
            hero_title: "Pablo Carmona Contreras",
            hero_subtitle: "Desarrollador Web & Diseñador UI/UX",
            hero_cta: "Contáctame",
            about_title: "Sobre mí",
            about_p1: "Hola! Soy Pablo, un desarrollador y diseñador apasionado de Iquique, Chile. Me encanta crear experiencias digitales que no solo sean funcionales, sino también visualmente atractivas y fáciles de usar.",
            about_p2: "Con experiencia en tecnologías como React, Node.js y Tailwind CSS, disfruto transformando ideas complejas en soluciones elegantes y eficientes. Mi objetivo es siempre combinar mi conocimiento técnico con un ojo para el diseño UI/UX.",
            about_p3: "Cuando no estoy programando o diseñando, me encontrarás explorando la fotografía, disfrutando de la música o aprendiendo algo nuevo.",
            gallery_title: "Galería de Proyectos",
            filter_all: "Todos",
            filter_web: "Web",
            filter_design: "Diseño",
            filter_photo: "Fotografía",
            interests_title: "Mis Intereses",
            interest1_title: "Fotografía",
            interest1_desc: "Capturando momentos y perspectivas únicas a través del lente.",
            interest2_title: "Música",
            interest2_desc: "Explorando diversos géneros y encontrando inspiración en el sonido.",
            interest3_title: "Aprendizaje Continuo",
            interest3_desc: "Siempre buscando expandir mis conocimientos en tecnología y diseño.",
            contact_title: "Contacto",
            contact_intro: "¿Tienes alguna pregunta o proyecto en mente? ¡Hablemos!",
            form_name: "Nombre",
            form_email: "Email",
            form_message: "Mensaje",
            form_submit: "Enviar Mensaje",
            contact_email_cta: "O envíame un correo directamente:",
            copy_button: "Copiar",
            copied_button: "Copiado!",
            footer_text: "&copy; 2024 Pablo Carmona Contreras. Todos los derechos reservados.",
            // Descripciones de galería en español
            gallery_item1_desc: "Descripción del Proyecto Web 1 en español.",
            gallery_item2_desc: "Descripción del Proyecto de Diseño 1 en español.",
            gallery_item3_desc: "Descripción de Fotografía 1 en español.",
            gallery_item4_desc: "Descripción del Proyecto Web 2 en español.",
            gallery_item5_desc: "Descripción del Proyecto de Diseño 2 en español.",
            gallery_item6_desc: "Descripción de Fotografía 2 en español.",
        },
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_gallery: "Gallery",
            nav_interests: "Interests",
            nav_contact: "Contact",
            hero_title: "Pablo Carmona Contreras",
            hero_subtitle: "Web Developer & UI/UX Designer",
            hero_cta: "Contact Me",
            about_title: "About Me",
            about_p1: "Hi! I'm Pablo, a passionate developer and designer from Iquique, Chile. I love creating digital experiences that are not only functional but also visually appealing and user-friendly.",
            about_p2: "With experience in technologies like React, Node.js, and Tailwind CSS, I enjoy transforming complex ideas into elegant and efficient solutions. My goal is always to combine my technical knowledge with an eye for UI/UX design.",
            about_p3: "When I'm not coding or designing, you'll find me exploring photography, enjoying music, or learning something new.",
            gallery_title: "Project Gallery",
            filter_all: "All",
            filter_web: "Web",
            filter_design: "Design",
            filter_photo: "Photography",
            interests_title: "My Interests",
            interest1_title: "Photography",
            interest1_desc: "Capturing unique moments and perspectives through the lens.",
            interest2_title: "Music",
            interest2_desc: "Exploring diverse genres and finding inspiration in sound.",
            interest3_title: "Continuous Learning",
            interest3_desc: "Always seeking to expand my knowledge in technology and design.",
            contact_title: "Contact",
            contact_intro: "Have a question or a project in mind? Let's talk!",
            form_name: "Name",
            form_email: "Email",
            form_message: "Message",
            form_submit: "Send Message",
            contact_email_cta: "Or email me directly:",
            copy_button: "Copy",
            copied_button: "Copied!",
            footer_text: "&copy; 2024 Pablo Carmona Contreras. All rights reserved.",
            // Gallery descriptions in English
            gallery_item1_desc: "Description of Web Project 1 in English.",
            gallery_item2_desc: "Description of Design Project 1 in English.",
            gallery_item3_desc: "Description of Photography 1 in English.",
            gallery_item4_desc: "Description of Web Project 2 in English.",
            gallery_item5_desc: "Description of Design Project 2 in English.",
            gallery_item6_desc: "Description of Photography 2 in English.",
        }
    };

    // --- Datos de la Galería (Ejemplo) ---
    // ¡Asegúrate de que las rutas de imagen sean correctas!
    const galleryItemsData = [
        { id: 1, type: 'web', image: 'images/gallery/web1.jpg', title: 'Proyecto Web 1', description_key: 'gallery_item1_desc' },
        { id: 2, type: 'design', image: 'images/gallery/design1.jpg', title: 'Diseño UI/UX 1', description_key: 'gallery_item2_desc' },
        { id: 3, type: 'photo', image: 'images/gallery/photo1.jpg', title: 'Fotografía Paisaje', description_key: 'gallery_item3_desc' },
        { id: 4, type: 'web', image: 'images/gallery/web2.jpg', title: 'Proyecto Web 2', description_key: 'gallery_item4_desc' },
        { id: 5, type: 'design', image: 'images/gallery/design2.jpg', title: 'Diseño App Móvil', description_key: 'gallery_item5_desc' },
        { id: 6, type: 'photo', image: 'images/gallery/photo2.jpg', title: 'Fotografía Retrato', description_key: 'gallery_item6_desc' },
        // Añade más ítems aquí
    ];

    let currentLang = localStorage.getItem('language') || 'es'; // Default a español

    const langToggleButtons = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const galleryContainer = document.getElementById('gallery-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const copyButton = document.querySelector('.copy-btn');
    // const themeToggleButton = document.getElementById('theme-toggle'); // Descomentar si implementas modo claro/oscuro
    // const lightIcon = document.querySelector('.light-icon'); // Descomentar si implementas
    // const darkIcon = document.querySelector('.dark-icon'); // Descomentar si implementas

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang; // Actualiza el atributo lang del HTML

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[lang] && translations[lang][key]) {
                // Usar innerHTML si la traducción contiene entidades HTML como &copy;
                if (key === 'footer_text') {
                     element.innerHTML = translations[lang][key];
                } else {
                     element.textContent = translations[lang][key];
                }
            }
        });

        // Actualizar texto botones de idioma
        langToggleButtons.forEach(button => {
            button.textContent = lang === 'es' ? 'EN' : 'ES';
        });

        // Actualizar texto botón copiar (si no está en estado 'copiado')
        if (copyButton && !copyButton.classList.contains('copied')) {
            copyButton.textContent = translations[lang].copy_button;
        }

        // Re-renderizar galería para actualizar descripciones
        renderGallery(document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all');
    }

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        // Cambiar icono (opcional)
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        // Asegurarse que el targetId empieza con # y tiene algo más
        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('header')?.offsetHeight || 60; // Ajusta si es necesario
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Cerrar menú móvil si está abierto
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        }
    }

    function renderGallery(filter = 'all') {
        if (!galleryContainer) return; // Salir si el contenedor no existe

        galleryContainer.innerHTML = ''; // Limpiar galería actual
        const filteredItems = filter === 'all'
            ? galleryItemsData
            : galleryItemsData.filter(item => item.type === filter);

        filteredItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105';

            // Obtener descripción traducida
            const description = translations[currentLang]?.[item.description_key] || `Description for ${item.title}`; // Fallback

            galleryItem.innerHTML = `
                <div class="h-48 overflow-hidden">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy"> <!-- Lazy loading y Alt Text -->
                </div>
                <div class="p-4">
                    <h3 class="font-semibold mb-1">${item.title}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">${description}</p>
                </div>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }

    function handleFilterClick(event) {
        if (!event.target.classList.contains('filter-btn')) return;

        filterButtons.forEach(btn => btn.classList.remove('active', 'bg-primary', 'dark:bg-primary-dark', 'text-white'));
        filterButtons.forEach(btn => btn.classList.add('bg-gray-300', 'dark:bg-gray-700')); // Reset styles

        event.target.classList.add('active');
        // Re-aplicar estilos activos (se maneja mejor con CSS ahora usando .active)
        // event.target.classList.remove('bg-gray-300', 'dark:bg-gray-700');
        // event.target.classList.add('bg-primary', 'dark:bg-primary-dark', 'text-white');

        const filter = event.target.getAttribute('data-filter');
        renderGallery(filter);
    }

    function copyToClipboard() {
        const textToCopy = copyButton.getAttribute('data-clipboard-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Éxito al copiar
            const originalText = translations[currentLang].copy_button;
            copyButton.textContent = translations[currentLang].copied_button;
            copyButton.classList.add('copied');

            // Volver al texto original después de un tiempo
            setTimeout(() => {
                copyButton.textContent = originalText;
                copyButton.classList.remove('copied');
            }, 2000); // 2 segundos
        }).catch(err => {
            console.error('Error al copiar al portapapeles: ', err);
            // Opcional: Mostrar un mensaje de error al usuario
        });
    }

    // --- Inicialización y Event Listeners ---

    // Establecer idioma inicial
    setLanguage(currentLang);

    // Menú móvil
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    } else {
        console.warn("Elementos del menú móvil no encontrados.");
    }


    // Scroll suave para links de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Botones de cambio de idioma
    langToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const newLang = currentLang === 'es' ? 'en' : 'es';
            setLanguage(newLang);
        });
    });

    // Filtrado de galería
    if (filterButtons.length > 0) {
         // Render inicial de la galería
         renderGallery();
         // Listener para botones de filtro
         document.querySelector('#gallery .flex')?.addEventListener('click', handleFilterClick);
    } else {
        console.warn("Botones de filtro de galería no encontrados.");
    }


    // Botón copiar email
    if (copyButton) {
        copyButton.addEventListener('click', copyToClipboard);
    } else {
         console.warn("Botón de copiar no encontrado.");
    }


    // --- Modo Oscuro/Claro (Funcionalidad básica - requiere iconos en HTML) ---
    // Nota: Tailwind maneja el modo oscuro basado en la clase 'dark' en <html> o <body>.
    // Este código asume que quieres un toggle manual.
    // Actualmente, tu HTML no tiene los iconos .light-icon y .dark-icon,
    // ni el botón #theme-toggle. Añádelos si quieres usar esta funcionalidad.

    /*
    if (themeToggleButton && lightIcon && darkIcon) {
        // Comprobar preferencia inicial del sistema o localStorage
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            lightIcon.classList.remove('hidden');
            darkIcon.classList.add('hidden');
        }

        themeToggleButton.addEventListener('click', () => {
            // Alternar clase 'dark' en el elemento <html>
            document.documentElement.classList.toggle('dark');

            // Actualizar localStorage
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
                lightIcon.classList.add('hidden');
                darkIcon.classList.remove('hidden');
            } else {
                localStorage.theme = 'light';
                lightIcon.classList.remove('hidden');
                darkIcon.classList.add('hidden');
            }
        });
    } else {
         console.warn("Elementos para el toggle de tema (botón o iconos) no encontrados.");
    }
    */

}); // Fin de DOMContentLoaded
