/**
 * ÉBANO & ORO INTERIORISMO - MAIN JS
 * Funcionalidades: Navbar scroll, Smooth scroll, Swiper carrusel, WhatsApp, Newsletter
 * Autor: Estudio Ébano & Oro
 */

(function() {
    'use strict';

    // ==================== 1. NAVBAR SCROLL EFFECT ====================
    const navbar = document.getElementById('mainNav');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ==================== 2. SMOOTH SCROLL ====================
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .footer-links a, .btn-gold[href^="#"], .btn-outline-gold[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navbarCollapse).toggle();
                    }
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==================== 3. SWIPER CARRUSEL (ANTES Y DESPUÉS) ====================
    if (typeof Swiper !== 'undefined') {
        const portfolioSwiper = new Swiper('.portfolioSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                }
            },
            effect: 'slide',
            speed: 800,
        });
        console.log('✅ Carrusel de antes/después inicializado');
    }

    // ==================== 4. NEWSLETTER ====================
    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterInput = document.getElementById('newsletterEmail');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterInput.value.trim();
            if (email && email.includes('@')) {
                alert(`📧 ¡Gracias por suscribirte! Recibirás inspiración en ${email}`);
                newsletterInput.value = '';
            } else {
                alert('⚠️ Por favor ingresa un email válido.');
            }
        });
        
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                newsletterBtn.click();
            }
        });
    }
    
    // ==================== 5. SCROLL REVEAL ====================
    const revealElements = document.querySelectorAll('.service-card, .before-after-card, .about-text, .contact-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    } else {
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
    
    // ==================== 6. AJUSTE DE ANCLAJES ====================
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
    
    // ==================== 7. ACTUALIZAR AÑO EN FOOTER ====================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
    
    console.log('✅ Sitio web Ébano & Oro Interiorismo inicializado correctamente');
})();