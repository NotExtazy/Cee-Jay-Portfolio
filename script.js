// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Touch-friendly scroll behavior for mobile
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Add touch-specific optimizations
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
    
    // Improve form interactions on mobile
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Scroll input into view on mobile keyboards
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + 100;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Update active navigation on scroll
window.addEventListener('scroll', updateActiveNavigation);

// Update active navigation on page load
document.addEventListener('DOMContentLoaded', updateActiveNavigation);

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .stat-item, .about-text, .contact-info, .contact-form');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        typeWriter(nameElement, originalText, 150);
    }
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Bot detection - check if honeypot is filled
        const verifyHuman = formData.get('verify_human');
        if (verifyHuman) {
            showNotification('Bot submission detected. Please leave the verification field empty.', 'error');
            return;
        }
        
        // Log legitimate submissions
        console.log('📝 LEGITIMATE SUBMISSION:', {
            name: name,
            email: email,
            subject: subject,
            message: message,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        
        // Send email using EmailJS
        sendEmail(name, email, subject, message);
    });
}

// Email sending function using EmailJS
function sendEmail(name, email, subject, message) {
    // Show loading notification
    showNotification('Sending message...', 'info');
    
    // Debug logging
    console.log('🚀 Sending email:', { name, email, subject, message });
    console.log('📧 EmailJS Service ID:', "service_onymj4s");
    console.log('📧 Template ID:', "template_your_template_id");
    
    // Create enhanced message with sender information
    const enhancedMessage = message + '\n\n---\n' + 
        'From: ' + name + ' <' + email + '>\n' +
        'Sent via Portfolio Contact Form';
    
    // EmailJS configuration
    emailjs.send("service_onymj4s", "template_bb16kfp", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: enhancedMessage,
        to_name: "Cee Jay Madayag",
        // Add sender info to message content
        reply_to: email,
        sender_name: name,
        sender_email: email
    })
    .then(function(response) {
        console.log('✅ Email sent successfully:', response);
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        document.querySelector('.contact-form').reset();
    })
    .catch(function(error) {
        console.log('❌ EmailJS error:', error);
        console.log('🔍 Error details:', {
            status: error.status,
            text: error.text,
            type: typeof error
        });
        
        let errorMessage = 'Failed to send message. Please try again or contact directly.';
        
        // Handle specific Gmail API errors
        if (error.text && error.text.includes('412') && error.text.includes('Gmail_API')) {
            errorMessage = 'Gmail API authentication issue. Please check EmailJS Gmail service setup or use alternative email service.';
            console.log('🔧 Gmail API error detected');
        } else if (error.text && error.text.includes('insufficient authentication scopes')) {
            errorMessage = 'Authentication scopes error. Please re-connect Gmail service in EmailJS dashboard.';
            console.log('🔧 Authentication scopes error detected');
        } else if (error.text && error.text.includes('template')) {
            errorMessage = 'Template configuration error. Please check EmailJS template setup.';
            console.log('📧 Template error detected');
        } else if (error.status === 412) {
            errorMessage = 'Service configuration error. Check EmailJS dashboard.';
            console.log('🔧 Service configuration error');
        }
        
        showNotification(errorMessage, 'error');
        
        // Show fallback contact option
        showFallbackContact();
    });
}

// Fallback contact method
function showFallbackContact() {
    const contactInfo = document.querySelector('.contact-info');
    const fallbackHtml = `
        <div style="margin-top: 20px; padding: 15px; background: rgba(255, 0, 0, 0.1); border-radius: 8px; border: 1px solid var(--primary-color);">
            <h4 style="color: var(--primary-color); margin-bottom: 10px;">📧 Alternative Contact Methods</h4>
            <p style="color: var(--gray-text); margin-bottom: 15px;">If the form isn't working, please use these alternatives:</p>
            <div style="display: grid; gap: 10px;">
                <a href="mailto:ceejay.madayag@example.com?subject=Contact from Portfolio" style="color: var(--primary-color); text-decoration: none; padding: 8px 12px; background: rgba(0, 255, 255, 0.1); border-radius: 5px; display: inline-block;">
                    📧 Send Email Directly
                </a>
                <a href="tel:+639991234567" style="color: var(--primary-color); text-decoration: none; padding: 8px 12px; background: rgba(0, 255, 255, 0.1); border-radius: 5px; display: inline-block;">
                    📞 Call or Text
                </a>
            </div>
        </div>
    `;
    
    // Add fallback HTML after contact info
    contactInfo.insertAdjacentHTML('beforeend', fallbackHtml);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #00ffff, #0099cc)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles');
    const gridOverlay = document.querySelector('.grid-overlay');
    
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (gridOverlay) {
        gridOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic skill bar animation (if you want to add progress bars)
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'pulse 0.5s ease';
        }, index * 100);
    });
}

// Call skill animation when skills section is visible
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Cursor trail effect (optional enhancement)
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    // Create cursor trail if you want one
    requestAnimationFrame(animateCursor);
}

// Start cursor animation
animateCursor();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive particles on click
document.addEventListener('click', (e) => {
    createParticle(e.clientX, e.clientY);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, #00ffff, #ff00ff);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: particleFade 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);
