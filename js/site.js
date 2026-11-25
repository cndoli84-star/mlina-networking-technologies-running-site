
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


// HOMEPAGE IMPACT COUNTERS: COUNT UP, CELEBRATE FOR 3 SECONDS, REPEAT
document.addEventListener('DOMContentLoaded', () => {
    const counterSection = document.querySelector('[data-impact-counters]');
    if (!counterSection) return;

    const cards = Array.from(counterSection.querySelectorAll('.impact-card'));
    const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const counters = cards.map(card => {
        const number = card.querySelector('[data-count]');
        return {
            card,
            number,
            target: Number(number && number.dataset.count) || 0,
            suffix: number ? (number.dataset.suffix || '') : ''
        };
    }).filter(item => item.number && item.target > 0);

    if (reduceMotion) {
        counters.forEach(item => {
            item.number.textContent = item.target.toLocaleString() + item.suffix;
        });
        return;
    }

    let visible = false;
    let stopped = false;
    let frameId = 0;
    let cycleTimer = 0;
    let cycleStartedAt = 0;
    const countDuration = 2400;
    const celebrationDuration = 3000;
    const formatter = new Intl.NumberFormat();

    const render = (item, value) => {
        item.number.textContent = formatter.format(Math.min(item.target, Math.floor(value))) + item.suffix;
    };

    const resetCounters = () => {
        counters.forEach(item => {
            item.card.classList.remove('is-counting', 'is-celebrating');
            render(item, 0);
        });
    };

    const animateCount = timestamp => {
        if (!visible || stopped) return;
        if (!cycleStartedAt) cycleStartedAt = timestamp;
        const progress = Math.min((timestamp - cycleStartedAt) / countDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        counters.forEach(item => render(item, item.target * eased));

        if (progress < 1) {
            frameId = window.requestAnimationFrame(animateCount);
            return;
        }

        counters.forEach(item => {
            render(item, item.target);
            item.card.classList.remove('is-counting');
            item.card.classList.add('is-celebrating');
        });

        cycleTimer = window.setTimeout(() => {
            if (!visible || stopped) return;
            resetCounters();
            cycleStartedAt = 0;
            counters.forEach(item => item.card.classList.add('is-counting'));
            frameId = window.requestAnimationFrame(animateCount);
        }, celebrationDuration);
    };

    const startCycle = () => {
        if (!visible || stopped || frameId || cycleTimer) return;
        cycleStartedAt = 0;
        counters.forEach(item => item.card.classList.add('is-counting'));
        frameId = window.requestAnimationFrame(animateCount);
    };

    const stopCycle = () => {
        if (frameId) window.cancelAnimationFrame(frameId);
        if (cycleTimer) window.clearTimeout(cycleTimer);
        frameId = 0;
        cycleTimer = 0;
        cycleStartedAt = 0;
        resetCounters();
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            visible = entries.some(entry => entry.isIntersecting);
            if (visible) {
                startCycle();
            } else {
                stopCycle();
            }
        }, { threshold: 0.22 });
        observer.observe(counterSection);
    } else {
        visible = true;
        startCycle();
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopCycle();
        } else if (visible) {
            startCycle();
        }
    });
});
