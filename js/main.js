/**
 * CMC Portfolio - Martina Caputo
 * JavaScript per interattività e animazioni
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Cookie Banner GDPR
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieReject = document.getElementById('cookieReject');
    
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1500);
    }
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            hideCookieBanner();
        });
    }
    
    if (cookieReject) {
        cookieReject.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'rejected');
            hideCookieBanner();
        });
    }
    
    function hideCookieBanner() {
        if (cookieBanner) {
            cookieBanner.classList.remove('show');
            cookieBanner.classList.add('hide');
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 400);
        }
    }
    
    // Menu Mobile
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (hamburgerBtn && mobileMenu && menuOverlay) {
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        menuOverlay.addEventListener('click', closeMenu);
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(closeMenu, 150);
            });
        });
    }
    
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (header) {
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll direction
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // FAQ Accordion
    // ========================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const wasActive = item.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active', !wasActive);
        });
    });
    
    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('[data-reveal], .reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active', 'revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ========================================
    // Stagger Animation for Grids
    // ========================================
    const staggerContainers = document.querySelectorAll('.reveal-stagger');
    
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    staggerContainers.forEach(el => staggerObserver.observe(el));
    
    // ========================================
    // Button Ripple Effect
    // ========================================
    document.querySelectorAll('.btn-primary-custom, .btn-outline-custom, .btn-scopri').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ========================================
    // Project Cards Hover Effect
    // ========================================
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ========================================
    // Skill Items Hover Pause
    // ========================================
    const skillsTrack = document.querySelector('.skills-track');
    const skillsCarousel = document.querySelector('.skills-carousel');
    
    if (skillsCarousel && skillsTrack) {
        skillsCarousel.addEventListener('mouseenter', function() {
            skillsTrack.style.animationPlayState = 'paused';
        });
        
        skillsCarousel.addEventListener('mouseleave', function() {
            skillsTrack.style.animationPlayState = 'running';
        });
    }
    
    // ========================================
    // Form Validation & Submission
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    input.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#ff4444';
            }
            
            // Privacy checkbox
            const privacyCheck = this.querySelector('input[type="checkbox"]');
            if (privacyCheck && !privacyCheck.checked) {
                isValid = false;
                privacyCheck.parentElement.style.color = '#ff4444';
                privacyCheck.addEventListener('change', function() {
                    this.parentElement.style.color = '';
                }, { once: true });
            }
            
            if (isValid) {
                // Show success message with animation
                this.style.opacity = '0';
                this.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    this.classList.add('hidden');
                    this.style.display = 'none';
                    
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                        successMessage.style.display = 'block';
                        successMessage.style.opacity = '0';
                        successMessage.style.transform = 'translateY(20px)';
                        
                        requestAnimationFrame(() => {
                            successMessage.style.transition = 'all 0.5s ease';
                            successMessage.style.opacity = '1';
                            successMessage.style.transform = 'translateY(0)';
                        });
                    }
                }, 300);
            }
        });
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // ========================================
    // Page Load Animation
    // ========================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Hide loader if exists
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
        
        // Trigger initial reveal animations
        document.querySelectorAll('.hero *[class*="animation"]').forEach((el, i) => {
            el.style.animationDelay = `${i * 0.1}s`;
        });
    });
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========================================
    // Keyboard Navigation Accessibility
    // ========================================
    document.addEventListener('keydown', function(e) {
        // Tab navigation indicator
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // ========================================
    // Active Navigation Link
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-menu a, footer a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.style.color = 'var(--color-text)';
        }
    });
    
    // ========================================
    // Performance: Debounce scroll events
    // ========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // ========================================
    // Parallax Effect for Hero (subtle)
    // ========================================
    const heroLogo = document.querySelector('.logo-container img');
    
    if (heroLogo) {
        window.addEventListener('scroll', debounce(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < 600) {
                heroLogo.style.transform = `translateY(${rate}px)`;
            }
        }, 10));
    }
    
    // ========================================
    // Social Links External Warning (optional)
    // ========================================
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // ========================================
    // Console Easter Egg
    // ========================================
    console.log('%c CMC Portfolio ', 'background: #cda741; color: #0F0F0F; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Designed by Martina Caputo ', 'color: #cda741; font-size: 14px;');
    
});

// ========================================
// CSS Keyframe for Ripple (injected)
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    body.keyboard-nav *:focus {
        outline: 2px solid #cda741 !important;
        outline-offset: 3px !important;
    }
    
    body:not(.keyboard-nav) *:focus {
        outline: none !important;
    }
`;
document.head.appendChild(style);
