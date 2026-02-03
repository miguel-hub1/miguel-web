/**
 * Miguel's Portfolio - Main JavaScript
 * Handles navigation, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initStatsCounter();
    initWriteupsFilter();
    initTypingEffect();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Scroll Effects - Navbar background and active link highlighting
 */
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.boxShadow = 'none';
        }

        // Highlight active section in nav
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Stats Counter Animation
 */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };

            updateNumber();
        });
    };

    // Intersection Observer for triggering animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

/**
 * Writeups Filter Functionality
 */
function initWriteupsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const writeupCards = document.querySelectorAll('.writeup-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            const filter = btn.getAttribute('data-filter');

            writeupCards.forEach(card => {
                const difficulty = card.getAttribute('data-difficulty');

                if (filter === 'all' || difficulty === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.4s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Terminal Typing Effect
 */
function initTypingEffect() {
    const cursor = document.querySelector('.cursor');

    if (cursor) {
        // Add some random commands that cycle
        const commands = [
            'cat skills.txt',
            'ls -la projects/',
            './hack --ethical',
            'nmap -sV target',
            'python exploit.py'
        ];

        let commandIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const terminalLines = document.querySelectorAll('.typing-text');
        const lastLine = terminalLines[terminalLines.length - 1];

        if (lastLine) {
            const typeCommand = () => {
                const currentCommand = commands[commandIndex];
                const promptSpan = lastLine.querySelector('.prompt');

                if (!isDeleting) {
                    // Typing
                    lastLine.innerHTML = `<span class="prompt">$</span> ${currentCommand.substring(0, charIndex)}<span class="cursor">_</span>`;
                    charIndex++;

                    if (charIndex > currentCommand.length) {
                        isDeleting = true;
                        typingSpeed = 2000; // Pause before deleting
                    } else {
                        typingSpeed = 100 + Math.random() * 50;
                    }
                } else {
                    // Deleting
                    lastLine.innerHTML = `<span class="prompt">$</span> ${currentCommand.substring(0, charIndex)}<span class="cursor">_</span>`;
                    charIndex--;

                    if (charIndex === 0) {
                        isDeleting = false;
                        commandIndex = (commandIndex + 1) % commands.length;
                        typingSpeed = 500;
                    } else {
                        typingSpeed = 50;
                    }
                }

                setTimeout(typeCommand, typingSpeed);
            };

            // Start typing after initial display
            setTimeout(typeCommand, 3000);
        }
    }
}

/**
 * Intersection Observer for fade-in animations
 */
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.project-card, .writeup-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
};

// Initialize fade-in observer
observeElements();

/**
 * Console Easter Egg
 */
console.log(`
%c╔══════════════════════════════════════════╗
║                                          ║
║   👋 Hey there, fellow hacker!           ║
║                                          ║
║   Curious about the code?                ║
║   Check out the repo on GitHub!          ║
║                                          ║
║   Happy hacking! 🔐                      ║
║                                          ║
╚══════════════════════════════════════════╝
`, 'color: #00ff88; font-family: monospace; font-size: 12px;');
