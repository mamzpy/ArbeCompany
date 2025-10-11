// =========================
// Initialize AOS (Animate On Scroll)
// =========================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// =========================
// Navbar Scroll Effect
// =========================
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =========================
// Mobile Menu Toggle
// =========================
if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// =========================
// Smooth Scroll for Anchor Links
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// =========================
// Active Navigation Link Based on Scroll Position
// =========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// =========================
// Hero Parallax Effect
// =========================
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// =========================
// Animated Counter for Statistics
// =========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.ceil(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start);
        }
    }, 16);
}

// Observe counters and trigger animation when visible
const counterElements = document.querySelectorAll('.counter');
if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// =========================
// Image Lazy Loading with Fade Effect
// =========================
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// =========================
// Product Card Hover Effect
// =========================
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderTopColor = 'var(--primary-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderTopColor = 'var(--secondary-color)';
    });
});

// =========================
// Form Validation (for Contact Page)
// =========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        // Validate name
        if (name === '') {
            showError('name', 'لطفاً نام خود را وارد کنید');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'لطفاً ایمیل خود را وارد کنید');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'لطفاً یک ایمیل معتبر وارد کنید');
            isValid = false;
        }
        
        // Validate phone
        const phoneRegex = /^09\d{9}$/;
        if (phone === '') {
            showError('phone', 'لطفاً شماره تماس خود را وارد کنید');
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            showError('phone', 'لطفاً یک شماره تماس معتبر وارد کنید (مثال: 09123456789)');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('message', 'لطفاً پیام خود را وارد کنید');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
            contactForm.reset();
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#dc3545';
    error.style.fontSize = '0.875rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    field.parentElement.appendChild(error);
    field.style.borderColor = '#dc3545';
    
    field.addEventListener('input', function() {
        this.style.borderColor = '';
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 50%;
        transform: translateX(50%);
        background-color: #28a745;
        color: white;
        padding: 20px 40px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideDown 0.5s ease;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 3000);
}

// =========================
// Product Filter (for Products Page)
// =========================
const filterButtons = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// =========================
// Scroll to Top Button
// =========================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.backgroundColor = '#c59563';
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.backgroundColor = 'var(--secondary-color)';
    this.style.transform = 'scale(1)';
});

// =========================
// Add CSS Animations
// =========================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(50%, -100px);
        }
        to {
            opacity: 1;
            transform: translate(50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(50%, -100px);
        }
    }
    
    img.loaded {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);

// =========================
// Preloader (Optional)
// =========================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// =========================
// Handle Hash Links on Page Load
// =========================
window.addEventListener('load', function() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// =========================
// Prevent Right Click on Images (Optional - for protection)
// =========================
// Uncomment if you want to prevent right-click on images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});
*/

// =========================
// Console Message
// =========================
console.log('%c🍞 Welcome to ARBE - Bread & Flour Improver', 'color: #d4a574; font-size: 16px; font-weight: bold;');
console.log('%cWebsite developed with precision and care', 'color: #1a2332; font-size: 12px;');
// Show/Hide Contact Numbers Button
const showContactBtn = document.getElementById('showContactBtn');
const contactNumbers = document.getElementById('contactNumbers');

if (showContactBtn && contactNumbers) {
    showContactBtn.addEventListener('click', function() {
        if (contactNumbers.classList.contains('show')) {
            contactNumbers.classList.remove('show');
            this.textContent = 'نمایش شماره تماس';
        } else {
            contactNumbers.classList.add('show');
            this.textContent = 'مخفی کردن';
        }
    });
}

// Reveal Phone Numbers in Contact Page
function revealPhone(id) {
    const element = document.getElementById(id);
    const button = event.target;
    if (element && button) {
        element.style.display = 'block';
        button.style.display = 'none';
    }
}

// Make revealPhone available globally
window.revealPhone = revealPhone;
// ========================================
// CIRCULAR ORBIT ANIMATION
// ========================================

// Bakery images array
const bakeryImages = [
    'images/baguette.jpg',
    'images/bread-1.jpg',
    'images/bread-2.jpg',
    'images/croissant.jpg',
    'images/donut.jpg',
    'images/pastry-1.jpg',
    'images/pastry-2.jpg',
    'images/wheat.jpg',
    'images/flour-package.jpg'
];

const orbitContainer = document.getElementById('orbitContainer');
let itemIndex = 0;

// Create orbiting item
function createOrbitItem() {
    if (!orbitContainer) return;
    
    const item = document.createElement('div');
    item.className = 'orbit-item';
    
    const img = document.createElement('img');
    img.src = bakeryImages[itemIndex % bakeryImages.length];
    img.alt = 'Bakery Product';
    img.onerror = function() {
        this.style.display = 'none';
    };
    
    item.appendChild(img);
    
    // Apply smooth orbit animation with slight variation
    const duration = 10 + Math.random() * 2; // 10-12 seconds
    item.style.animation = `smoothOrbit ${duration}s linear forwards`;
    
    orbitContainer.appendChild(item);
    
    // Remove after animation completes
    setTimeout(() => {
        item.remove();
    }, duration * 1000);
    
    itemIndex++;
}

// Create wave of items (multiple at once)
function createWave() {
    // Create 6-8 items at once with slight delays
    const waveSize = 6 + Math.floor(Math.random() * 3); // 6-8 items
    
    for (let i = 0; i < waveSize; i++) {
        setTimeout(() => {
            createOrbitItem();
        }, i * 200); // Small stagger: 200ms between each in the wave
    }
}

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('flourParticles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize orbit animation
if (orbitContainer) {
    createParticles();
    createWave();
    setInterval(createWave, 3000);
}