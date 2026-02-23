// ===== MOBILE NAVIGATION =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===== PRICING TOGGLE =====
const pricingToggle = document.getElementById('pricing-toggle');
const monthlyPrices = document.querySelectorAll('.monthly-price');
const annualPrices = document.querySelectorAll('.annual-price');

if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
        if (pricingToggle.checked) {
            // Show annual prices
            monthlyPrices.forEach(price => price.style.display = 'none');
            annualPrices.forEach(price => price.style.display = 'inline');
        } else {
            // Show monthly prices
            monthlyPrices.forEach(price => price.style.display = 'inline');
            annualPrices.forEach(price => price.style.display = 'none');
        }
    });
}

// ===== CONTACT + QUICK MESSAGE FORM HANDLING =====
function serializeForm(form) {
    const data = {};
    new FormData(form).forEach((value, key) => {
        data[key] = typeof value === 'string' ? value.trim() : value;
    });
    return data;
}

async function submitForm(form, successMessage) {
    const mailEndpoint = (form.dataset.mailEndpoint || '').trim();
    const formspreeEndpoint = form.dataset.formspree || 'https://formspree.io/f/xjkpblpj';
    const submitButton = form.querySelector('button[type="submit"]');
    const defaultButtonText = submitButton ? submitButton.textContent : '';

    if (!mailEndpoint && !formspreeEndpoint) {
        alert('Form endpoint is not configured. Please try again later.');
        return false;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
    }

    try {
        let response;
        let sent = false;

        if (mailEndpoint) {
            const isGoogleAppsScript =
                mailEndpoint.includes('script.google.com') ||
                mailEndpoint.includes('script.googleusercontent.com');

            if (isGoogleAppsScript) {
                // Apps Script web apps generally don't return CORS headers for fetch/XHR.
                // Use no-cors with FormData to avoid browser CORS failures.
                await fetch(mailEndpoint, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: new FormData(form)
                });
                sent = true;
            } else {
                response = await fetch(mailEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(serializeForm(form))
                });
                sent = response.ok;
            }
        } else {
            response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(form)
            });
            sent = response.ok;
        }

        if (sent) {
            alert(successMessage);
            form.reset();
            return true;
        }

        const data = await response.json().catch(() => null);
        const errorMessage = data && data.errors
            ? data.errors.map(err => err.message).join(', ')
            : 'Something went wrong. Please try again.';
        alert(errorMessage);
        return false;
    } catch (error) {
        console.error('Form submission failed:', error);
        alert('Network error. Please try again in a moment.');
        return false;
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = defaultButtonText;
        }
    }
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitForm(
            contactForm,
            'Thank you for your message! We will get back to you soon.'
        );
    });
}

// ===== PROCESS CARD QUICK MESSAGE PANEL =====
const quickOverlay = document.getElementById('quick-message-overlay');
const quickForm = document.getElementById('quick-message-form');
const quickClose = document.getElementById('quick-message-close');
const quickProjectInput = document.getElementById('quick-project');
const quickMessageInput = document.getElementById('quick-message');
const processCards = document.querySelectorAll('.process-card[data-inquiry-topic]');

function openQuickPanel(topic) {
    if (!quickOverlay || !quickProjectInput) return;
    quickProjectInput.value = topic || 'General Inquiry';
    if (quickMessageInput) {
        quickMessageInput.value = `Hi team, I want to discuss a project for: ${topic || 'General Inquiry'}.`;
    }
    quickOverlay.classList.add('active');
    quickOverlay.setAttribute('aria-hidden', 'false');
}

function closeQuickPanel() {
    if (!quickOverlay) return;
    quickOverlay.classList.remove('active');
    quickOverlay.setAttribute('aria-hidden', 'true');
}

processCards.forEach((card) => {
    const topic = card.dataset.inquiryTopic || card.querySelector('h3')?.textContent || 'General Inquiry';
    card.addEventListener('click', () => openQuickPanel(topic));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openQuickPanel(topic);
        }
    });
});

if (quickClose) {
    quickClose.addEventListener('click', closeQuickPanel);
}

if (quickOverlay) {
    quickOverlay.addEventListener('click', (event) => {
        if (event.target === quickOverlay) {
            closeQuickPanel();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeQuickPanel();
    }
});

if (quickForm) {
    quickForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const sent = await submitForm(
            quickForm,
            'Thanks! Your project request has been sent. We will contact you soon.'
        );
        if (sent) {
            closeQuickPanel();
        }
    });
}

// ===== GUIDED PAGE SCROLL (SOFT SNAP) =====
function initGuidedPageScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchPrimary = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouchPrimary) return;

    const waypointSelectors = [
        '.hero',
        '#about',
        '#process',
        '#services',
        '#services-more',
        '#benefits',
        '#pricing',
        '#contact',
        '#faq',
        '#cta',
        '#footer'
    ];

    const waypoints = waypointSelectors
        .map((selector) => document.querySelector(selector))
        .filter(Boolean);

    if (waypoints.length < 2) return;

    let wheelAccumulator = 0;
    let lock = false;
    const WHEEL_THRESHOLD = 130;
    const LOCK_MS = 760;

    function getNavOffset() {
        const nav = document.querySelector('.navbar');
        return nav ? nav.offsetHeight + 14 : 84;
    }

    function getWaypointTop(index) {
        const clamped = Math.max(0, Math.min(index, waypoints.length - 1));
        const top = waypoints[clamped].getBoundingClientRect().top + window.scrollY - getNavOffset();
        return Math.max(0, Math.round(top));
    }

    function getCurrentIndex() {
        const current = window.scrollY + getNavOffset() + 6;
        let idx = 0;
        let distance = Number.POSITIVE_INFINITY;
        waypoints.forEach((el, i) => {
            const d = Math.abs((el.getBoundingClientRect().top + window.scrollY) - current);
            if (d < distance) {
                distance = d;
                idx = i;
            }
        });
        return idx;
    }

    function scrollToWaypoint(index) {
        const y = getWaypointTop(index);
        window.scrollTo({ top: y, behavior: 'smooth' });
        lock = true;
        window.setTimeout(() => {
            lock = false;
        }, LOCK_MS);
    }

    window.addEventListener(
        'wheel',
        (event) => {
            if (event.ctrlKey || lock) {
                if (lock) event.preventDefault();
                return;
            }

            if (event.target.closest('textarea, input, select, [contenteditable="true"], .quick-message-panel')) {
                return;
            }

            wheelAccumulator += event.deltaY;
            if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return;

            const direction = wheelAccumulator > 0 ? 1 : -1;
            wheelAccumulator = 0;

            const currentIndex = getCurrentIndex();
            const nextIndex = currentIndex + direction;
            if (nextIndex < 0 || nextIndex >= waypoints.length) return;

            event.preventDefault();
            scrollToWaypoint(nextIndex);
        },
        { passive: false }
    );
}

// ===== WEBGL HERO MESH BACKGROUND =====
function initHeroWebGLBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-webgl-canvas';
    hero.prepend(canvas);

    const gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
        powerPreference: 'high-performance'
    });

    if (!gl) {
        canvas.remove();
        return;
    }

    const vertexShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
            v_uv = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision highp float;

        varying vec2 v_uv;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec3 u_colorA;
        uniform vec3 u_colorB;
        uniform vec3 u_colorC;

        float blob(vec2 p, vec2 center, vec2 size, float softness) {
            vec2 q = (p - center) / size;
            float d = dot(q, q);
            return exp(-d * softness);
        }

        void main() {
            vec2 uv = v_uv;
            vec2 p = uv * 2.0 - 1.0;
            p.x *= u_resolution.x / max(u_resolution.y, 1.0);

            float t = u_time * 0.18;

            vec2 f1 = p;
            f1.x += 0.26 * sin(f1.y * 3.3 + t * 1.7);
            f1.y += 0.08 * sin(f1.x * 2.4 - t * 1.1);

            vec2 f2 = p;
            f2.x += 0.18 * sin(f2.y * 2.0 - t * 1.3);
            f2.y += 0.20 * sin(f2.x * 1.6 + t * 1.6);

            float m1 = blob(f1, vec2(0.55, 0.62), vec2(1.35, 0.34), 3.8);
            float m2 = blob(f2, vec2(0.58, 0.40), vec2(1.10, 0.52), 3.1);
            float m3 = blob(f2, vec2(0.42, 0.78), vec2(1.65, 0.56), 3.4);

            float blendA = smoothstep(0.14, 0.92, m1);
            float blendB = smoothstep(0.08, 0.86, m2);
            float blendC = smoothstep(0.06, 0.78, m3) * 0.86;

            vec3 col = vec3(1.0);
            col = mix(col, u_colorA, blendA * 0.78);
            col = mix(col, u_colorB, blendB * 0.62);
            col = mix(col, u_colorC, blendC * 0.48);

            float haze = 0.045 * sin((uv.x + uv.y + t * 0.5) * 10.0);
            col += haze;

            float alpha = clamp(max(blendA, max(blendB * 0.9, blendC * 0.8)), 0.0, 1.0) * 0.84;
            gl_FragColor = vec4(col, alpha);
        }
    `;

    function compileShader(type, source) {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('WebGL shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) {
        canvas.remove();
        return;
    }

    const program = gl.createProgram();
    if (!program) {
        canvas.remove();
        return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('WebGL program link error:', gl.getProgramInfoLog(program));
        canvas.remove();
        return;
    }
    gl.useProgram(program);
    hero.classList.add('hero-webgl-enabled');

    const vertices = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const colorALocation = gl.getUniformLocation(program, 'u_colorA');
    const colorBLocation = gl.getUniformLocation(program, 'u_colorB');
    const colorCLocation = gl.getUniformLocation(program, 'u_colorC');

    const palettes = {
        'theme-purple-pink': [
            [0.36, 0.31, 0.98],
            [0.58, 0.50, 1.00],
            [0.77, 0.90, 1.00]
        ],
        'theme-pink-blue': [
            [0.31, 0.62, 1.00],
            [0.49, 0.80, 1.00],
            [0.70, 0.92, 1.00]
        ],
        'theme-green-yellow': [
            [0.38, 0.73, 0.67],
            [0.60, 0.86, 0.73],
            [0.93, 0.93, 0.69]
        ],
        default: [
            [0.36, 0.31, 0.98],
            [0.58, 0.50, 1.00],
            [0.77, 0.90, 1.00]
        ]
    };

    function getActivePalette() {
        for (const key of Object.keys(palettes)) {
            if (key !== 'default' && document.body.classList.contains(key)) {
                return palettes[key];
            }
        }
        return palettes.default;
    }

    function applyPalette() {
        const palette = getActivePalette();
        gl.uniform3f(colorALocation, palette[0][0], palette[0][1], palette[0][2]);
        gl.uniform3f(colorBLocation, palette[1][0], palette[1][1], palette[1][2]);
        gl.uniform3f(colorCLocation, palette[2][0], palette[2][1], palette[2][2]);
    }

    const classObserver = new MutationObserver(applyPalette);
    classObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    applyPalette();

    let running = true;
    let inView = true;
    let rafId = 0;
    let lastFrame = 0;
    const targetFrameMs = 1000 / 45;

    function resize() {
        const rect = hero.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));

        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, width, height);
        }

        gl.uniform2f(resolutionLocation, width, height);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    window.addEventListener('resize', resize);
    resize();

    const visibilityObserver = new IntersectionObserver(
        (entries) => {
            inView = entries.some((entry) => entry.isIntersecting);
        },
        { threshold: 0.01 }
    );
    visibilityObserver.observe(hero);

    document.addEventListener('visibilitychange', () => {
        running = document.visibilityState === 'visible';
    });

    function render(now) {
        rafId = requestAnimationFrame(render);
        if (!running || !inView) return;
        if (now - lastFrame < targetFrameMs) return;
        lastFrame = now;

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(timeLocation, now * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    rafId = requestAnimationFrame(render);

    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(rafId);
        classObserver.disconnect();
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
    });
}

// ===== SCROLL ANIMATIONS =====
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
    initGuidedPageScroll();
    initHeroWebGLBackground();

    const animatedElements = document.querySelectorAll(
        '.process-card, .service-card, .benefit-card, .pricing-card, .faq-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        document.body.classList.add('motion-ready');
        const sections = document.querySelectorAll(
            'section:not(.hero):not(.cta-section), .cta-section'
        );

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        sectionObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.14,
                rootMargin: '0px 0px -8% 0px'
            }
        );

        sections.forEach((section) => {
            section.classList.add('section-reveal');
            sectionObserver.observe(section);
        });
    }
});

// ===== COUNTER ANIMATION (for benefits or stats) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(counter);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== LAZY LOADING IMAGES (if you add images later) =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
function typeWriter(element, text, speed = 50) {
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

// ===== THEME SWITCHING (Optional - Dark Mode) =====
function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize theme switch if toggle exists
initThemeSwitch();

// ===== HERO COLOR CYCLING =====
const heroThemeClasses = ['theme-purple-pink', 'theme-pink-blue', 'theme-green-yellow'];
let heroThemeIndex = 0;

function applyHeroTheme(index) {
    document.body.classList.remove(...heroThemeClasses);
    document.body.classList.add(heroThemeClasses[index]);
}

applyHeroTheme(heroThemeIndex);
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
        heroThemeIndex = (heroThemeIndex + 1) % heroThemeClasses.length;
        applyHeroTheme(heroThemeIndex);
    }, 9000);
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== CONSOLE MESSAGE =====
console.log('%c🚀 AI Workflow Automation Website', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with modern web technologies', 'color: #8b5cf6; font-size: 14px;');
