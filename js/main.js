// ============================================
// ARBE - Flour Improver Website JavaScript
// ============================================

// ============================================
// Language Toggle
// ============================================
let currentLang = 'fa'; // Default is Farsi

function toggleLanguage() {
    currentLang = currentLang === 'fa' ? 'en' : 'fa';
    const html = document.documentElement;
    
    if (currentLang === 'en') {
        // Switch to English
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        
        // Hide Farsi, Show English
        document.querySelectorAll('.lang-fa').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = 'inline';
        });
    } else {
        // Switch to Farsi
        html.setAttribute('lang', 'fa');
        html.setAttribute('dir', 'rtl');
        
        // Hide English, Show Farsi
        document.querySelectorAll('.lang-en').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.lang-fa').forEach(el => {
            el.style.display = 'inline';
        });
    }
    
    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
}

// ============================================
// Mobile Menu Toggle
// ============================================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks) {
        navLinks.classList.toggle('active');
        
        // Animate hamburger icon
        if (mobileBtn) {
            mobileBtn.classList.toggle('active');
        }
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('navLinks');
            if (menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    });
});

// ============================================
// Hero Image Slider (Rotating Images)
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function changeSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % totalSlides;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
if (slides.length > 0) {
    setInterval(changeSlide, 5000);
}

// ============================================
// Navbar Scroll Effect
// ============================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
});

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// Contact Form Handler
// ============================================
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Success message based on current language
    const successMessage = currentLang === 'fa' 
        ? `با تشکر ${name} عزیز!\n\nپیام شما با موفقیت دریافت شد.\nبه زودی کارشناسان ما با شما تماس خواهند گرفت.`
        : `Thank you ${name}!\n\nYour message has been received successfully.\nOur team will contact you soon.`;
    
    // Show success message
    alert(successMessage);
    
    // Reset form
    form.reset();
    
    // In production, you would send this data to a server
    // Example with fetch API (uncomment when you have a backend):
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(successMessage);
        form.reset();
    })
    .catch(error => {
        const errorMessage = currentLang === 'fa'
            ? 'خطا در ارسال پیام. لطفاً دوباره تلاش کنید.'
            : 'Error sending message. Please try again.';
        alert(errorMessage);
    });
    */
    
    return false;
}

// ============================================
// Scroll Animations (Fade in on scroll)
// ============================================
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .stat-card, .quality-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// Preload hero images for smooth transitions
// ============================================
function preloadImages() {
    const images = [
        'images/flour5.jpg',
        'images/flour4.jpg',
        'images/flour.webp'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload images when page loads
window.addEventListener('load', preloadImages);

// ============================================
// Close mobile menu when clicking outside
// ============================================
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && navLinks.classList.contains('active')) {
        // Check if click is outside menu and button
        if (!navLinks.contains(event.target) && !mobileBtn.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    }
});

// ============================================
// Prevent body scroll when mobile menu is open
// ============================================
function toggleBodyScroll() {
    const navLinks = document.getElementById('navLinks');
    
    if (navLinks && navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Watch for mobile menu changes
const navLinksElement = document.getElementById('navLinks');
if (navLinksElement) {
    const menuObserver = new MutationObserver(toggleBodyScroll);
    menuObserver.observe(navLinksElement, { attributes: true, attributeFilter: ['class'] });
}

// ============================================
// Add active state to current section in nav
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ============================================
// Performance: Debounce scroll events
// ============================================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(function() {
    updateActiveNavLink();
}, 15);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// Console welcome message
// ============================================
console.log('%c👋 Welcome to ARBE Website!', 'color: #d4a574; font-size: 20px; font-weight: bold;');
console.log('%cLotus Bread and Flour Improver Company', 'color: #1a2744; font-size: 14px;');
console.log('%c🌐 www.arbecompany.com', 'color: #d4a574; font-size: 12px;');

// ============================================
// Page load performance
// ============================================
window.addEventListener('load', function() {
    // Hide loading screen if you add one
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }
    
    // Log page load time (for development)
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage loaded in ${pageLoadTime}ms`, 'color: #4CAF50; font-weight: bold;');
    }
});