document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // TYPEWRITER EFFECT
    // ==========================================================================
    const words = ["AI & Data Science.", "Full-Stack Web Apps.", "Vulnerability Assessments.", "Machine Learning Systems."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById('typewriter');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = delayBetweenWords;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    if (typewriterElement) {
        type();
    }

    // ==========================================================================
    // STICKY HEADER & ACTIVE SCROLL SPY
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header shadow
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // ==========================================================================
    // MOBILE NAV DRAWER
    // ==========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navLinksContainer.classList.remove('open');
            });
        });
    }

    // ==========================================================================
    // SKILLS TAB SWITCHER
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Set active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Set active content block
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetTab) {
                    content.classList.add('active');
                    
                    // Re-trigger progress bar animation
                    const fills = content.querySelectorAll('.skill-fill');
                    fills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 50);
                    });
                }
            });
        });
    });

    // ==========================================================================
    // PROJECTS GALLERY FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Animating out before hiding
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================================================
    // FORM SUBMISSION & MOCK TOAST
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const toastContainer = document.getElementById('toast-container');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Transition button to loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span>Sending...</span>
                <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
            `;

            // Mock async request
            setTimeout(() => {
                showToast("Message Sent! Thank you for reaching out.");
                
                // Reset form fields
                contactForm.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1800);
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger reflow & slide-in animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Slide-out and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    }
});

// Keyframe injection for spinning loading indicator
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);
