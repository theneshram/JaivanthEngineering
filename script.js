// ===== HERO CAROUSEL =====
const heroCarousel = () => {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    
    console.log('Carousel - Found slides:', slides.length);
    console.log('Carousel - Found dots:', dots.length);
    
    if (slides.length === 0 || dots.length === 0) {
        console.warn('Carousel elements not found!');
        return;
    }
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    let autoSlide;

    const showSlide = (n) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        console.log('Showing slide:', currentSlide);
    };

    const nextSlide = () => {
        currentSlide++;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide--;
        showSlide(currentSlide);
    };

    const goToSlide = (n) => {
        currentSlide = n;
        showSlide(currentSlide);
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, slideInterval);
    };

    // Dot navigation with click event
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Dot clicked:', index);
            goToSlide(index);
        });
    });

    // Auto-rotate carousel
    autoSlide = setInterval(nextSlide, slideInterval);
    console.log('Carousel initialized with auto-slide interval:', slideInterval);

    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
            console.log('Carousel paused on hover');
        });
        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, slideInterval);
            console.log('Carousel resumed after hover');
        });
    }

    // Initialize first slide
    showSlide(currentSlide);
};

// ===== MOBILE NAVIGATION TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name')?.value || '',
            company: document.getElementById('company')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            productType: document.getElementById('productType')?.value || '',
            quantity: document.getElementById('quantity')?.value || '',
            message: document.getElementById('message')?.value || ''
        };

        // Email validation
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Name validation
        if (!formData.name || formData.name.trim().length < 2) {
            alert('Please enter a valid name');
            return;
        }

        try {
            // Submit to Azure Functions contact API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thank you! Your inquiry has been sent successfully. We will contact you soon.');
                contactForm.reset();
            } else {
                console.warn('Primary API failed, attempting fallback');
                alert('Thank you for your inquiry! We will contact you shortly.');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Thank you for your inquiry! We will contact you shortly.');
            contactForm.reset();
        }
    });
}

// ===== ANIMATED COUNTER FOR STATS =====
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const safeTarget = Number.isFinite(target) ? target : 0;
    const increment = safeTarget / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < safeTarget) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = safeTarget + '+';
        }
    };
    
    updateCounter();
};

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .highlight-card, .product-category, .capability-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing carousel and other features...');
    heroCarousel();
    scrollReveal();
    
    // Add animation class to elements on load
    setTimeout(() => {
        document.querySelectorAll('.service-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);

    // Render Clients grid
    renderClients();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const targetValue = stat.getAttribute('data-target');
                    const target = targetValue ? Number.parseInt(targetValue, 10) : 0;
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler with SMTP integration
const contactForm = document.getElementById('contactForm');
const API_URL =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:7071/api'
        : `${window.location.origin}/api`;

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Create submit button reference
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!submitBtn) {
            showNotification('Submit button not found. Please try again later.', 'error');
            return;
        }
        const originalText = submitBtn.textContent || 'Submit';
        
        try {
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = {
                name: String(formData.get('name') || '').trim(),
                email: String(formData.get('email') || '').trim(),
                phone: String(formData.get('phone') || '').trim(),
                message: String(formData.get('message') || '').trim(),
            };
            
            // Validate data
            if (!data.name || !data.email || !data.message) {
                throw new Error('Please fill in all required fields');
            }
            
            // Send to backend
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            // Show error message
            const errorMsg = error instanceof Error ? error.message : 'An error occurred. Please try again.';
            showNotification(errorMsg, 'error');
            console.error('Contact form error:', error);
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Notification helper function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        animation: 'slideIn 0.3s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        backgroundColor: type === 'success' ? '#10b981' : 
                         type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        maxWidth: '500px',
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Add scroll reveal animation
const scrollReveal = () => {
    const reveals = document.querySelectorAll('.service-card, .capability-item, .contact-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Add CSS for scroll reveal
const style = document.createElement('style');
style.textContent = `
    .service-card,
    .capability-item,
    .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-card.active,
    .capability-item.active,
    .contact-card.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translateY(10px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-10px);
    }
`;
document.head.appendChild(style);

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title .line:first-child');
if (heroTitle) {
    const text = heroTitle.textContent || '';
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Uncomment to enable typing effect
    // setTimeout(typeWriter, 500);
}

// Clients data and renderer
const clients = [
    {
        name: 'Roots Industries',
        domain: 'rootsindia.com',
        website: 'https://www.rootsindia.com/'
    },
    {
        name: 'L.G. Balakrishnan & Bros (LGB)',
        domain: 'lgb.co.in',
        website: 'https://www.lgb.co.in/'
    },
    {
        name: 'Aditya',
        domain: 'adityaauto.com',
        website: 'https://adityaauto.com/products',
        logoUrl: 'https://adityaauto.com/static/img/logo.png'
    },
    {
        name: 'Jentex India',
        domain: 'jentexindia.com',
        website: 'https://jentexindia.com/'
    }
];

function logoCandidates(domain, logoUrl) {
    // Prefer direct logoUrl if provided; then favicon; fallback to Clearbit; finally placeholder svg
    const candidates = [];
    if (logoUrl) candidates.push(logoUrl);
    candidates.push(
        `https://${domain}/favicon.ico`,
        `https://logo.clearbit.com/${domain}`,
        'assets/clients/placeholder.svg'
    );
    return candidates;
}

function renderClients() {
    const grid = document.getElementById('clientsGrid');
    if (!grid) return;

    clients.forEach(client => {
        const card = document.createElement('a');
        card.className = 'client-card';
        card.href = client.website;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        const logoWrap = document.createElement('div');
        logoWrap.className = 'client-logo';

        const img = document.createElement('img');
        const sources = logoCandidates(client.domain, client.logoUrl);
        let idx = 0;
        img.src = sources[idx];
        img.alt = `${client.name} logo`;
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        img.onerror = () => {
            idx += 1;
            if (idx < sources.length) img.src = sources[idx];
        };
        logoWrap.appendChild(img);

        const info = document.createElement('div');
        info.className = 'client-info';
        const name = document.createElement('div');
        name.className = 'client-name';
        name.textContent = client.name;
        const link = document.createElement('div');
        link.className = 'client-link';
        link.textContent = new URL(client.website).hostname.replace('www.', '');
        info.appendChild(name);
        info.appendChild(link);

        card.appendChild(logoWrap);
        card.appendChild(info);
        grid.appendChild(card);
    });
}
