// === Helpers ===
function scrollToSection(selector) {
    const target = document.querySelector(selector);
    if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
}

function setBilingual(el, es, en) {
    el.textContent = es;
    el.dataset.es = es;
    el.dataset.en = en;
}

// === Interests ===
async function loadInterests() {
    try {
        const response = await fetch('interests.json');
        const data = await response.json();

        setBilingual(document.getElementById('interests-title'), data.title.es, data.title.en);

        const container = document.getElementById('interests-container');

        data.interests.forEach(interest => {
            const el = document.createElement('div');
            el.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer interest-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500';
            el.setAttribute('tabindex', '0');

            const iconName = interest.icon.replace(/^fa[sb] fa-/, '');
            el.innerHTML = `
                <div class="aspect-[16/9] bg-orange-500 flex items-center justify-center">
                    <span class="icon interest-icon">${renderIcon(iconName)}</span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2" data-es="${interest.title.es}" data-en="${interest.title.en}">${interest.title.es}</h3>
                    <p data-es="${interest.description.es}" data-en="${interest.description.en}">
                        ${interest.description.es}
                    </p>
                </div>
            `;

            if (interest.link) {
                el.addEventListener('click', () => showExitOverlay(interest.link, interest.linkDelay || 10));
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        showExitOverlay(interest.link, interest.linkDelay || 10);
                    }
                });
            } else if (interest.target) {
                el.addEventListener('click', () => scrollToSection(interest.target));
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        scrollToSection(interest.target);
                    }
                });
            } else if (interest.image) {
                el.addEventListener('click', () => openImageModal(interest.image, interest.title.es));
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openImageModal(interest.image, interest.title.es);
                    }
                });
            }

            container.appendChild(el);
        });
    } catch (error) {
        console.error('Error cargando intereses:', error);
    }
}

// === About content ===
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const content = await response.json();

        setBilingual(document.getElementById('about-title'), content.about.title.es, content.about.title.en);
        setBilingual(document.getElementById('about-name'), content.about.intro.name.es, content.about.intro.name.en);
        setBilingual(document.getElementById('about-description'), content.about.intro.description.es, content.about.intro.description.en);
        setBilingual(document.getElementById('skills-title'), content.about.skills.title.es, content.about.skills.title.en);

        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = '';
        content.about.skills.items.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-orange-100 dark:bg-orange-900 rounded-full';
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });

        setBilingual(document.getElementById('experience-title'), content.about.experience.title.es, content.about.experience.title.en);

        const experienceContainer = document.getElementById('experience-container');
        experienceContainer.innerHTML = '';
        content.about.experience.jobs.forEach((job, index) => {
            const isLast = index === content.about.experience.jobs.length - 1;
            const jobDiv = document.createElement('div');
            jobDiv.className = isLast ? 'relative timeline-item' : 'mb-8 relative timeline-item';

            const title = document.createElement('h5');
            title.className = 'font-semibold';
            title.textContent = job.title;

            const period = document.createElement('p');
            period.className = 'text-sm text-gray-500 dark:text-gray-400';
            period.textContent = `${job.company} | ${job.period}`;

            const description = document.createElement('p');
            setBilingual(description, job.description.es, job.description.en);

            jobDiv.appendChild(title);
            jobDiv.appendChild(period);
            jobDiv.appendChild(description);
            experienceContainer.appendChild(jobDiv);
        });
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// === Gallery ===
let galleryItems = [];

async function loadGalleryData() {
    try {
        const response = await fetch('gallery.json');
        const data = await response.json();
        galleryItems = data.items;
    } catch (error) {
        console.error('Error loading gallery data:', error);
    }
}

function renderGallery(category, lang) {
    const galleryContainer = document.querySelector('.gallery-container');
    const currentLang = lang || localStorage.getItem('language') || 'es';

    galleryContainer.innerHTML = '';

    if (galleryItems.length === 0) {
        console.error('Gallery items not loaded yet');
        return;
    }

    const filteredItems = category === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === category);

    filteredItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500';
        galleryItem.setAttribute('tabindex', '0');

        const thumbSrc = item.thumb || item.image;
        galleryItem.innerHTML = `
            <div class="aspect-[4/3] overflow-hidden">
                <img src="${thumbSrc}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" decoding="async">
            </div>
            <div class="p-4">
                <h3 class="font-semibold mb-1">${item.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">${item.description[currentLang]}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => {
            openImageModal(item.image, item.title);
        });

        galleryItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openImageModal(item.image, item.title);
            }
        });

        galleryContainer.appendChild(galleryItem);
    });
}

// === Image Modal ===
function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.add('opacity-100'));
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal.classList.contains('hidden')) return;
    modal.classList.remove('opacity-100');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

document.getElementById('imageModal').addEventListener('click', function (e) {
    if (e.target === this) closeImageModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeImageModal();
});

// === Exit overlay ===
let exitTimer = null;

function showExitOverlay(url, delay) {
    const overlay = document.getElementById('exitOverlay');
    const countdown = document.getElementById('exitCountdown');
    const lang = localStorage.getItem('language') || 'es';
    let remaining = delay;

    document.getElementById('exitMessage').textContent = document.getElementById('exitMessage').getAttribute(`data-${lang}`);
    document.getElementById('exitCancelBtn').textContent = document.getElementById('exitCancelBtn').getAttribute(`data-${lang}`);

    const template = countdown.getAttribute(`data-${lang}`);
    countdown.textContent = template.replace('{n}', remaining);
    overlay.classList.remove('hidden');

    if (exitTimer) clearInterval(exitTimer);

    exitTimer = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(exitTimer);
            window.location.href = url;
        } else {
            countdown.textContent = template.replace('{n}', remaining);
        }
    }, 1000);

    document.getElementById('exitCancelBtn').onclick = function () {
        clearInterval(exitTimer);
        overlay.classList.add('hidden');
    };
}

// === Language ===
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-es], [data-en]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            const text = element.getAttribute(`data-${lang}`);

            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });

    const currentCategory = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'all';
    renderGallery(currentCategory, lang);
}

// === Init ===
document.addEventListener('DOMContentLoaded', async function () {
    loadContent();
    loadInterests();
    await loadGalleryData();

    // Copyright year
    document.getElementById('copyright-year').textContent = new Date().getFullYear();

    // Initialize inline icons
    document.querySelectorAll('[data-icon]').forEach(el => {
        const name = el.getAttribute('data-icon');
        el.innerHTML = renderIcon(name);
    });

    // Active nav tracking (IntersectionObserver)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.setAttribute('aria-current', href === '#' + entry.target.id ? 'page' : 'false');
                });
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));

    // Language
    const lang = localStorage.getItem('language') || 'es';
    document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.language-option[data-lang="${lang}"]`)?.classList.add('active');
    setLanguage(lang);

    // Mobile menu
    document.getElementById('mobile-menu-button').addEventListener('click', function () {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !menu.classList.contains('hidden'));
    });

    // Event delegation: smooth scroll, language, filters
    document.addEventListener('click', function (e) {
        const langBtn = e.target.closest('.language-option');
        if (langBtn) {
            document.querySelectorAll('.language-option').forEach(o => o.classList.remove('active'));
            langBtn.classList.add('active');
            setLanguage(langBtn.getAttribute('data-lang'));
            return;
        }

        const filterBtn = e.target.closest('.filter-btn');
        if (filterBtn) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            filterBtn.classList.add('active');
            renderGallery(filterBtn.getAttribute('data-category'), localStorage.getItem('language') || 'es');
            return;
        }

        const anchor = e.target.closest('a[href^="#"]');
        if (anchor) {
            e.preventDefault();
            scrollToSection(anchor.getAttribute('href'));
            const menu = document.getElementById('mobile-menu');
            menu.classList.add('hidden');
            document.getElementById('mobile-menu-button').setAttribute('aria-expanded', 'false');
        }
    });

    // Email button (obfuscated)
    document.getElementById('email-btn').addEventListener('click', function () {
        const p1 = 'pcarmonac';
        const p2 = 'gmail';
        const p3 = 'com';
        window.location.href = 'mailto:' + p1 + String.fromCharCode(64) + p2 + '.' + p3;
    });

    // Form handler
    document.querySelector('#contact form').addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const currentLang = localStorage.getItem('language') || 'es';

        const existingFeedback = this.querySelector('.form-feedback');
        if (existingFeedback) existingFeedback.remove();

        const feedback = document.createElement('div');
        feedback.className = 'form-feedback mt-4 p-3 bg-green-500 text-white rounded-lg text-center';
        feedback.setAttribute('data-es', '¡Mensaje enviado con éxito!');
        feedback.setAttribute('data-en', 'Message sent successfully!');
        feedback.textContent = currentLang === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!';
        this.appendChild(feedback);

        btn.disabled = true;

        setTimeout(() => {
            btn.disabled = false;
            feedback.remove();
            this.reset();
        }, 3000);
    });
});
