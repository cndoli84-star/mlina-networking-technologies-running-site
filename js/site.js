
document.addEventListener('DOMContentLoaded', () => {

    // MOBILE NAVIGATION
    const toggle = document.querySelector('.menu-toggle');
    const navEl = document.querySelector('.nav');

    if (toggle && navEl) {

        toggle.addEventListener('click', () => {
            const open = navEl.classList.toggle('active');

            toggle.setAttribute('aria-expanded', String(open));
            toggle.textContent = open ? '×' : '☰';
        });

        // NAVIGATION DROPDOWNS
        navEl.querySelectorAll('.nav-drop > button').forEach(btn => {
            btn.addEventListener('click', () => {
                const parent = btn.parentElement;
                const open = parent.classList.toggle('open');

                btn.setAttribute('aria-expanded', String(open));
            });
        });

        // CLOSE MENU WHEN CLICKING OUTSIDE
        document.addEventListener('click', e => {
            if (!navEl.contains(e.target) && !toggle.contains(e.target)) {
                navEl.classList.remove('active');

                toggle.setAttribute('aria-expanded', 'false');
                toggle.textContent = '☰';
            }
        });

        // CLOSE MENU AFTER SELECTING A LINK ON MOBILE
        navEl.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth <= 760) {
                    navEl.classList.remove('active');

                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.textContent = '☰';
                }
            });
        });
    }

    // AUTOMATIC COPYRIGHT YEAR
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // IMPORTANT:
    // Do not add a lead-form submit handler here.
    // The form is handled exclusively by js/contact-form.js using EmailJS.

});


// ACCESSIBLE TECHNOLOGY BRANDS CAROUSEL
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-brand-carousel]').forEach((viewport) => {
        const section = viewport.closest('.brand-carousel-section');
        const button = section && section.querySelector('.brand-carousel-toggle');
        const track = viewport.querySelector('.brand-carousel-track');
        if (!button || !track) return;

        const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            button.disabled = true;
            button.textContent = 'Motion reduced';
            button.setAttribute('aria-label', 'Carousel animation disabled by reduced-motion preference');
            return;
        }

        button.addEventListener('click', () => {
            const paused = viewport.classList.toggle('is-paused');
            button.setAttribute('aria-pressed', String(paused));
            button.textContent = paused ? 'Resume' : 'Pause';
            button.setAttribute('aria-label', paused ? 'Resume technology brand carousel' : 'Pause technology brand carousel');
        });
    });
});
