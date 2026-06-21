// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer dark mode
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    });
});

// Menu Filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter menu items
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
const reservationForm = document.getElementById('reservationForm');
const emailInput = document.getElementById('email');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        emailInput.style.borderColor = 'red';
        alert('������ ����� ���� �������� ����');
    } else {
        emailInput.style.borderColor = '#ddd';
    }
});

reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateEmail(emailInput.value)) {
        emailInput.style.borderColor = 'red';
        alert('������ ����� ���� �������� ����');
        return;
    }
    
    // Form is valid, show success message
    alert('�� ������ ��� ����� �����! ������� ��� ������ ������ ��������.');
    reservationForm.reset();
    
    // Remove the beforeunload event listener after successful submission
    window.removeEventListener('beforeunload', preventUnload);
});

// Prevent data loss on page exit
const formFields = reservationForm.querySelectorAll('input, textarea');
let formHasData = false;

function checkFormData() {
    formHasData = false;
    formFields.forEach(field => {
        if (field.value.trim() !== '') {
            formHasData = true;
        }
    });
    return formHasData;
}

function preventUnload(e) {
    if (checkFormData()) {
        e.preventDefault();
        e.returnValue = '���� ������ ��� ������ �� �������. �� ��� ����� ��� ���� �������ɿ';
        return '���� ������ ��� ������ �� �������. �� ��� ����� ��� ���� �������ɿ';
    }
}

// Add event listener when form has data
formFields.forEach(field => {
    field.addEventListener('input', () => {
        if (checkFormData() && !window.unloadListenerAdded) {
            window.addEventListener('beforeunload', preventUnload);
            window.unloadListenerAdded = true;
        } else if (!checkFormData() && window.unloadListenerAdded) {
            window.removeEventListener('beforeunload', preventUnload);
            window.unloadListenerAdded = false;
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-content, .menu-items, .gallery, .contact-container');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            el.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
// Initial check on page load
animateOnScroll();

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('����� �� ��� �������� �� ������ ��������!');
    newsletterForm.reset();
});
