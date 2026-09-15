/**
 * LAAD UNSAAC - Multi-Page Web Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initActiveNav();
    initNavbarScroll();
    initMobileMenu();
    initPublicationFilters();
    initStatsCounter();
});

/* --------------------------------------------------------------------------
   1. Dynamic Active Navbar Link Detection
   -------------------------------------------------------------------------- */
function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* --------------------------------------------------------------------------
   2. Navbar Scroll Shadow Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   3. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = toggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   4. Publications Filter & Search (Used in publicaciones.html)
   -------------------------------------------------------------------------- */
function initPublicationFilters() {
    const searchInput = document.getElementById('pub-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');

    if (!pubCards.length) return;

    let currentCategory = 'all';
    let searchQuery = '';

    function filterPubs() {
        pubCards.forEach(card => {
            const categories = card.getAttribute('data-category') || '';
            const title = card.querySelector('.pub-title')?.textContent.toLowerCase() || '';
            const authors = card.querySelector('.pub-authors')?.textContent.toLowerCase() || '';
            const abstract = card.querySelector('.pub-abstract')?.textContent.toLowerCase() || '';
            
            const matchesCategory = currentCategory === 'all' || categories.includes(currentCategory);
            const matchesSearch = !searchQuery || title.includes(searchQuery) || authors.includes(searchQuery) || abstract.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterPubs();
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            filterPubs();
        });
    });
}

/* --------------------------------------------------------------------------
   5. Toggle Publication Abstract
   -------------------------------------------------------------------------- */
function toggleAbstract(abstractId, btnElem) {
    const abstractBox = document.getElementById(abstractId);
    if (!abstractBox) return;

    const isShowing = abstractBox.classList.contains('show');
    const spanText = btnElem.querySelector('span');
    const iconElem = btnElem.querySelector('i');

    if (isShowing) {
        abstractBox.classList.remove('show');
        if (spanText) spanText.textContent = 'Ver resumen completo';
        if (iconElem) iconElem.className = 'fa-solid fa-chevron-down';
    } else {
        abstractBox.classList.add('show');
        if (spanText) spanText.textContent = 'Ocultar resumen';
        if (iconElem) iconElem.className = 'fa-solid fa-chevron-up';
    }
}

/* --------------------------------------------------------------------------
   6. Lightbox & Video Modals
   -------------------------------------------------------------------------- */
function openLightbox(imgSrc, captionText) {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    if (modal && img) {
        img.src = imgSrc;
        caption.textContent = captionText || '';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openVideoModal(videoSrc) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    if (modal && iframe) {
        iframe.src = videoSrc;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    if (modal && iframe) {
        modal.classList.remove('active');
        iframe.src = '';
        document.body.style.overflow = '';
    }
}

// Close modal on background click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeLightbox();
            closeVideoModal();
        }
    });
});

/* --------------------------------------------------------------------------
   7. Copy Email Utility
   -------------------------------------------------------------------------- */
function copyEmail() {
    const emailText = document.getElementById('lab-email')?.textContent || 'laad@unsaac.edu.pe';
    navigator.clipboard.writeText(emailText).then(() => {
        showToast('¡Correo laad@unsaac.edu.pe copiado!');
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* --------------------------------------------------------------------------
   8. Animated Stats Counter (Used in index.html)
   -------------------------------------------------------------------------- */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    let animated = false;

    function animateStats() {
        const firstStat = statNumbers[0];
        if (!firstStat || animated) return;

        const rect = firstStat.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target') || '0', 10);
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (target > 50 ? '+' : '+');
                        clearInterval(timer);
                    } else {
                        stat.textContent = current;
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();
}
