// Initialize EmailJS
(function() {
    emailjs.init("t9tTMmJ3pE2ZPP8vW"); // Public Key
})();

// Function to send email
async function sendEmail(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const templateParams = {
            from_name: name,
            from_email: email,
            to_name: "Nikhil",
            message: message,
            to_email: "nikhilshirsathe@gmail.com"
        };

        const response = await emailjs.send(
            'service_tsd93rv', // Service ID
            'template_yoefa6c', // Template ID
            templateParams
        );

        if (response.status === 200) {
            alert('Thank you! Your message has been sent successfully.');
            document.getElementById('contactForm').reset();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again.');
    }
}

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add scroll event listener for header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
    } else {
        header.style.backgroundColor = '#2c3e50';
    }
});

// Add animation to sections when they come into view
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Intersection Observer for Fade-in Animations
const fadeObserverOptions = {
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, fadeObserverOptions);

document.querySelectorAll('.section-title, .project-card, .certificate-card, .skill-category').forEach(el => {
    fadeObserver.observe(el);
});

// Hover Effects
document.querySelectorAll('.skill-item, .project-card').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Typing Effect for Hero Text
const heroText = document.querySelector('.hero h1');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Active State for Navigation
const navSections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    navSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Certificate PDF Functionality
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
    const button = card.querySelector('.btn');
    button.addEventListener('click', () => {
        const pdfPath = card.getAttribute('data-pdf');
        if (pdfPath) {
            openPDFModal(pdfPath);
        }
    });
});

// PDF Modal Functionality
const modal = document.getElementById('pdfModal');
const pdfViewer = document.getElementById('pdfViewer');
const closeBtn = document.querySelector('.close');

// Function to open PDF in modal
function openPDFModal(pdfPath) {
    pdfViewer.src = pdfPath;
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Handle project overview clicks
document.querySelectorAll('.project-links .btn').forEach(button => {
    button.addEventListener('click', () => {
        const pdfPath = button.getAttribute('data-pdf');
        if (pdfPath) {
            openPDFModal(pdfPath);
        }
    });
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    pdfViewer.src = '';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        pdfViewer.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === "block") {
        modal.style.display = "none";
        pdfViewer.src = '';
        document.body.style.overflow = 'auto';
    }
}); 