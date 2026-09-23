document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const preview = document.querySelector('.video-preview');
    preview?.addEventListener('click', () => {
        const player = document.createElement('iframe');
        player.className = 'video-frame video-player';
        player.src = 'https://www.youtube.com/embed/3ut-VcpZwk8?autoplay=1&playsinline=1&rel=0';
        player.title = '아마존 특강 영상';
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        preview.replaceWith(player);
        player.focus();
    }, { once: true });

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
        animatedElements.forEach((el) => el.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        animatedElements.forEach((el) => observer.observe(el));
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            event.preventDefault();
            targetElement.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });
});
