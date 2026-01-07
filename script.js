// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

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

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animated Counter for Stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

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
                    const target = parseInt(stat.getAttribute('data-target'));
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
const API_URL = 'http://localhost:5000/api';

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Create submit button reference
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        try {
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                message: formData.get('message'),
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
    const text = heroTitle.textContent;
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
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

