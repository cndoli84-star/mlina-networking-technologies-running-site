
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

