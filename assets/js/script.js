/**
 * Yellow Bus - Core Script v2.0
 * Handles Navigation, Animations, and Global Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    initScrollAnimations();
    initBackToTop();
    initCurrentYear();
    initContactForm();
});

/* =========================================
   1. Sticky Header
   ========================================= */
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* =========================================
   2. Mobile Menu
   ========================================= */
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    // Create Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.ariaLabel = 'Toggle navigation';

    // Find where to insert (before nav-links)
    if (nav && navLinks) {
        // Insert before the links
        nav.insertBefore(toggleBtn, navLinks);

        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            toggleBtn.innerHTML = navLinks.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

/* =========================================
   3. Scroll Animations (AOS replacement)
   ========================================= */
function initScrollAnimations() {
    // Add fade-in classes to elements
    const elements = document.querySelectorAll('.card, .hero-content > *, .section-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => {
        el.classList.add('fade-in-hidden');
        observer.observe(el);
    });
}

/* =========================================
   4. Back To Top
   ========================================= */
function initBackToTop() {
    // Check if button exists or create it
    let btn = document.getElementById('back-to-top');
    if (!btn) {
        btn = document.createElement('a');
        btn.id = 'back-to-top';
        btn.href = '#';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'back-to-top';
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* =========================================
   5. Dynamic Date
   ========================================= */
function initCurrentYear() {
    // If we used document.write, this runs after load, so we might need to target specific spans if we change the HTML
    // Ideally, we replace the document.write in HTML with <span id="year"></span>
    const yearSpan = document.getElementById('year-span');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/* =========================================
   6. Contact Form Simulation
   ========================================= */
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            btn.classList.add('btn-success');
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.remove('btn-success');
            }, 3000);
        }, 1500);
    });
}
