// Smooth scrolling
function scrollToWaitlist() {
    document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('email').focus();
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Waitlist form submission
document.getElementById('waitlistForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Simulate form submission
    console.log('Waitlist signup:', { name, email, phone });
    
    // Show success modal
    document.getElementById('successModal').style.display = 'block';
    
    // Clear form
    document.getElementById('waitlistForm').reset();
    
    // Here you would typically send this data to a backend API
    // Example:
    // fetch('/api/waitlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, phone })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     showSuccessModal();
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
});

// Close modal
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .stat-item');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const numberElement = entry.target.querySelector('.stat-number');
            const text = numberElement.textContent;
            
            if (text.endsWith('K+')) {
                const number = parseFloat(text);
                numberElement.textContent = '0K+';
                setTimeout(() => {
                    animateCounter(numberElement, number, 2000);
                }, 200);
            }
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statsObserver.observe(item));
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const heroGradient = document.querySelector('.hero-gradient');
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    
    if (heroGradient) {
        heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (heroImage && scrolled < 500) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animated phone screen carousel
let currentScreen = 1;
const totalScreens = 4;

function changeScreen() {
    // Remove active class from current screen
    const currentActive = document.querySelector('.app-preview.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }
    
    // Move to next screen
    currentScreen = currentScreen >= totalScreens ? 1 : currentScreen + 1;
    
    // Add active class to new screen
    const nextScreen = document.querySelector(`.app-preview[data-screen="${currentScreen}"]`);
    if (nextScreen) {
        nextScreen.classList.add('active');
    }
}

// Change screen every 3 seconds
setInterval(changeScreen, 3000);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.querySelector('.menu-toggle');
    
    if (navLinks && menuButton) {
        navLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }
}

// Close mobile menu when clicking on a link
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.querySelector('.nav-links');
    const menuButton = document.querySelector('.menu-toggle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 640) {
                if (mobileMenu) mobileMenu.classList.remove('active');
                if (menuButton) menuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.navbar');
        const mobileMenu = document.querySelector('.nav-links');
        const menuButton = document.querySelector('.menu-toggle');
        
        if (window.innerWidth <= 640 && mobileMenu && menuButton) {
            if (!nav.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                menuButton.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

console.log('🔥 Flick Landing Page Loaded Successfully!');
