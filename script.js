document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const videoTabs = document.querySelectorAll('[data-video-tabs]');

    videoTabs.forEach((tabGroup) => {
        const tabs = tabGroup.querySelectorAll('[data-video-tab]');
        const panels = tabGroup.querySelectorAll('[data-video-panel]');

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const selectedVideo = tab.getAttribute('data-video-tab');
                if (!selectedVideo) return;

                tabs.forEach((currentTab) => {
                    const isSelected = currentTab === tab;
                    currentTab.classList.toggle('is-active', isSelected);
                    currentTab.setAttribute('aria-selected', String(isSelected));
                });

                panels.forEach((panel) => {
                    const isSelected = panel.getAttribute('data-video-panel') === selectedVideo;
                    panel.classList.toggle('is-active', isSelected);
                    panel.hidden = !isSelected;
                });
            });
        });
    });

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
