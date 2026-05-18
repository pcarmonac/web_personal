// === Interests ===
function loadInterests() {
    fetch('interests.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('interests-title').textContent = data.title.es;
            document.getElementById('interests-title').setAttribute('data-es', data.title.es);
            document.getElementById('interests-title').setAttribute('data-en', data.title.en);

            const container = document.getElementById('interests-container');

            data.interests.forEach(interest => {
                const el = document.createElement('div');
                el.className = 'bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer interest-item';

                el.innerHTML = `
                    <div class="h-48 bg-orange-500 flex items-center justify-center">
                        <i class="${interest.icon} text-white text-6xl"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2" data-es="${interest.title.es}" data-en="${interest.title.en}">${interest.title.es}</h3>
                        <p data-es="${interest.description.es}" data-en="${interest.description.en}">
                            ${interest.description.es}
                        </p>
                    </div>
                `;

                if (interest.link) {
                    el.addEventListener('click', () => {
                        showExitOverlay(interest.link, interest.linkDelay || 10);
                    });
                } else {
                    el.addEventListener('click', () => {
                        openImageModal(interest.image, interest.title.es);
                    });
                }

                container.appendChild(el);
            });
        })
        .catch(error => console.error('Error cargando intereses:', error));
}

// === About content ===
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const content = await response.json();

        document.getElementById('about-title').textContent = content.about.title.es;
        document.getElementById('about-title').setAttribute('data-es', content.about.title.es);
        document.getElementById('about-title').setAttribute('data-en', content.about.title.en);

        document.getElementById('about-name').textContent = content.about.intro.name.es;
        document.getElementById('about-name').setAttribute('data-es', content.about.intro.name.es);
        document.getElementById('about-name').setAttribute('data-en', content.about.intro.name.en);

        document.getElementById('about-description').textContent = content.about.intro.description.es;
        document.getElementById('about-description').setAttribute('data-es', content.about.intro.description.es);
        document.getElementById('about-description').setAttribute('data-en', content.about.intro.description.en);

        document.getElementById('skills-title').textContent = content.about.skills.title.es;
        document.getElementById('skills-title').setAttribute('data-es', content.about.skills.title.es);
        document.getElementById('skills-title').setAttribute('data-en', content.about.skills.title.en);

        const skillsContainer = document.getElementById('skills-container');
        content.about.skills.items.forEach(skill => {
            const span = document.createElement('span');
            span.className = 'px-3 py-1 bg-orange-100 dark:bg-orange-900 rounded-full';
            span.textContent = skill;
            skillsContainer.appendChild(span);
        });

        document.getElementById('experience-title').textContent = content.about.experience.title.es;
        document.getElementById('experience-title').setAttribute('data-es', content.about.experience.title.es);
        document.getElementById('experience-title').setAttribute('data-en', content.about.experience.title.en);

        const experienceContainer = document.getElementById('experience-container');
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
            description.textContent = job.description.es;
            description.setAttribute('data-es', job.description.es);
            description.setAttribute('data-en', job.description.en);

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

function renderGallery(category) {
    const galleryContainer = document.querySelector('.gallery-container');
    const currentLang = localStorage.getItem('language') || 'es';

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
        galleryItem.className = 'gallery-item bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer';

        galleryItem.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-4">
                <h3 class="font-semibold mb-1">${item.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">${item.description[currentLang]}</p>
            </div>
        `;

        galleryItem.addEventListener('click', () => {
            openImageModal(item.image, item.title);
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
    setTimeout(() => {
        modal.classList.add('opacity-100');
    }, 10);

    modal.addEventListener('click', closeImageModal);
    document.addEventListener('keydown', closeImageModalOnKey);
}

function closeImageModal(event) {
    if (event.target.id === 'imageModal') {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('opacity-100');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);

        modal.removeEventListener('click', closeImageModal);
        document.removeEventListener('keydown', closeImageModalOnKey);
    }
}

function closeImageModalOnKey(event) {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('opacity-100');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);

    modal.removeEventListener('click', closeImageModal);
    document.removeEventListener('keydown', closeImageModalOnKey);
}

// === Exit overlay ===
let exitTimer = null;

function showExitOverlay(url, delay) {
    const overlay = document.getElementById('exitOverlay');
    const countdown = document.getElementById('exitCountdown');
    let remaining = delay;

    countdown.textContent = `Redirigiendo en ${remaining} segundos...`;
    overlay.classList.remove('hidden');

    exitTimer = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(exitTimer);
            window.location.href = url;
        } else {
            countdown.textContent = `Redirigiendo en ${remaining} segundos...`;
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
    renderGallery(currentCategory);
}

// === Theme ===
function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        document.querySelector('.dark-icon')?.classList.remove('hidden');
        document.querySelector('.light-icon')?.classList.add('hidden');
    } else {
        document.body.classList.remove('dark');
        document.querySelector('.dark-icon')?.classList.add('hidden');
        document.querySelector('.light-icon')?.classList.remove('hidden');
    }
    localStorage.setItem('darkMode', isDark);
}

// === Init ===
document.addEventListener('DOMContentLoaded', async function () {
    loadContent();
    loadInterests();
    await loadGalleryData();

    // Theme
    const isDark = localStorage.getItem('darkMode') !== 'false';
    setTheme(isDark);

    // Language
    const lang = localStorage.getItem('language') || 'es';
    document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.language-option[data-lang="${lang}"]`)?.classList.add('active');
    setLanguage(lang);

    // Mobile menu
    document.getElementById('mobile-menu-button').addEventListener('click', function () {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                document.getElementById('mobile-menu').classList.add('hidden');
            }
        });
    });

    // Theme toggle
    document.querySelector('.mode-toggle').addEventListener('click', function () {
        setTheme(!document.body.classList.contains('dark'));
    });

    // Language toggle
    document.querySelectorAll('.language-option').forEach(opt => {
        opt.addEventListener('click', function () {
            document.querySelectorAll('.language-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            setLanguage(this.getAttribute('data-lang'));
        });
    });

    // Gallery filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderGallery(this.getAttribute('data-category'));
        });
    });

    // Copy email
    document.querySelector('.copy-btn').addEventListener('click', function () {
        const email = document.getElementById('email-address').textContent;
        navigator.clipboard.writeText(email);

        const currentLang = localStorage.getItem('language') || 'es';
        this.textContent = currentLang === 'es' ? 'Copiado!' : 'Copied!';
        this.classList.add('copied');

        setTimeout(() => {
            this.textContent = currentLang === 'es' ? 'Copiar' : 'Copy';
            this.classList.remove('copied');
        }, 2000);
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
        }, 3000);
    });
});
