document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const toggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    if (toggleBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark');
            toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            toggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Scroll Animations (AOS replacement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // If it's a stat number, trigger counter
                if (entry.target.classList.contains('stat-num')) {
                    animateValue(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos], .stat-num').forEach(el => {
        observer.observe(el);
    });

    // Counter Animation
    function animateValue(obj) {
        const start = 0;
        const end = parseInt(obj.getAttribute('data-val'));
        const duration = 2000;
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    }
});