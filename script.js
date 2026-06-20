/* ==========================================
   REAL NINJA — SCRIPTS
   All animations, interactions, and libraries
   ========================================== */

// --- Lenis Smooth Scroll ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- GSAP Setup ---
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// --- Splitting.js Init ---
if (typeof Splitting !== 'undefined') {
    Splitting();
}

// --- Custom Cursor (removed) ---

// --- Mobile Menu ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// --- Swiper Carousel (Fresh Drops) ---
const isMobile = window.innerWidth <= 768;
const dropsSwiper = new Swiper('.drops-swiper', {
    slidesPerView: isMobile ? 2.5 : 2,
    spaceBetween: isMobile ? 10 : 16,
    centeredSlides: false,
    loop: true,
    loopAdditionalSlides: 10,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: !isMobile,
    },
    speed: isMobile ? 1800 : 3000,
    grabCursor: true,
    allowTouchMove: true,
    breakpoints: {
        480: { slidesPerView: 2.5, spaceBetween: 12 },
        768: { slidesPerView: 3.5, spaceBetween: 20 },
        1024: { slidesPerView: 4.5, spaceBetween: 24 },
        1400: { slidesPerView: 5.5, spaceBetween: 24 },
    }
});

// --- lightGallery (Video Popup) ---
if (typeof lightGallery !== 'undefined') {
    const videoGallery = document.querySelector('.swiper-wrapper');
    if (videoGallery) {
        lightGallery(videoGallery, {
            selector: '.lightbox-video',
            plugins: [typeof lgVideo !== 'undefined' ? lgVideo : null].filter(Boolean),
            download: false,
            counter: false,
            videojs: false,
            youTubePlayerParams: {
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
            },
        });
    }
}

// --- GSAP Animations ---

// Hero entrance
gsap.from('.hero-top-left', {
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.2,
});

gsap.from('.hero-trusted', {
    y: -20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.4,
});

gsap.from('.hero-title .title-line', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.5,
});

gsap.from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.9,
});

gsap.from('.hero-cta-row', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.1,
});

gsap.from('.hero-stats', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1.3,
});

// Section headers reveal
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
        scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
    });
});

// Drop cards stagger reveal
gsap.from('.drop-card', {
    scrollTrigger: {
        trigger: '.drops-carousel',
        start: 'top 80%',
        toggleActions: 'play none none none',
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
});

// Client frames stagger with clip-path reveal
gsap.utils.toArray('.client-frame').forEach((frame, i) => {
    gsap.from(frame, {
        scrollTrigger: {
            trigger: '.clients-gallery',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: i * 0.12,
        ease: 'power3.out',
    });
});

// Archive grid items reveal
gsap.utils.toArray('.archive-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: '.archive-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out',
    });
});

// Manifesto text reveal (instant when in view)
gsap.utils.toArray('.manifesto-line').forEach((line, i) => {
    gsap.to(line, {
        scrollTrigger: {
            trigger: line,
            start: 'top 95%',
            toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.1,
        ease: 'power2.out',
        onComplete: () => line.classList.add('revealed'),
    });
});

// CTA cards reveal
gsap.utils.toArray('.cta-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.cta-cards',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        y: 50,
        opacity: 0,
        scale: 0.92,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
    });
});

// Final CTA
gsap.from('.final-cta', {
    scrollTrigger: {
        trigger: '.final-cta',
        start: 'top 85%',
        toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
});

// --- Parallax on Hero Background ---
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: 150,
    scale: 1.1,
    ease: 'none',
});

// --- Parallax on Section 2 (Proof) background ---
gsap.to('.fresh-drops-bg', {
    scrollTrigger: {
        trigger: '.fresh-drops',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    },
    y: -80,
    scale: 1.15,
    ease: 'none',
});

// --- Parallax on Section 3 (Manifesto) background ---
gsap.to('.archive-bg', {
    scrollTrigger: {
        trigger: '.archive',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    },
    y: -80,
    scale: 1.15,
    ease: 'none',
});

// --- Parallax on Section 4 (CTA) background ---
gsap.to('.cta-section-bg', {
    scrollTrigger: {
        trigger: '.cta-footer-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
    },
    y: -60,
    scale: 1.12,
    ease: 'none',
});

// --- Magnetic Button Effect ---
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    });
});

// --- Vanilla Tilt Init ---
if (window.innerWidth > 768 && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 8,
        speed: 400,
        glare: false,
        'max-glare': 0.2,
    });
}

// --- Scroll Progress Bar ---
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
    lenis.on('scroll', ({ progress }) => {
        scrollProgress.style.width = (progress * 100) + '%';
    });
}

// --- Navbar scroll behavior ---
const navbar = document.querySelector('.navbar');
lenis.on('scroll', ({ scroll }) => {
    if (scroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Play Button Hover Pulse ---
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.15, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
});

// --- Text Scramble Effect ---
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
}

// Apply scramble to hero subtitle phrases
const scrambleEl = document.querySelector('.scramble-text');
if (scrambleEl) {
    const phrases = [
        'stop scrolling for.',
        'remember forever.',
        'share obsessively.',
        'watch on repeat.',
        'can\'t look away from.',
    ];
    const fx = new TextScramble(scrambleEl);
    let counter = 0;
    const nextPhrase = () => {
        fx.setText(phrases[counter]).then(() => {
            setTimeout(nextPhrase, 2500);
        });
        counter = (counter + 1) % phrases.length;
    };
    // Start after hero animation completes
    setTimeout(nextPhrase, 2000);
}

// --- Video Lazy Loading & Smart Playback ---
// Only load videos when the carousel section is in view
const videoSection = document.querySelector('.fresh-drops');
let videosLoaded = false;

function loadAndPlayVisibleVideos() {
    const slides = document.querySelectorAll('.drops-swiper .swiper-slide-visible .drop-card video, .drops-swiper .swiper-slide-active .drop-card video');
    slides.forEach(video => {
        if (!video.src && video.dataset.src) {
            video.src = video.dataset.src;
        }
        video.play().catch(() => {});
    });
}

function pauseHiddenVideos() {
    document.querySelectorAll('.drop-card video').forEach(video => {
        if (!video.closest('.swiper-slide-visible') && !video.closest('.swiper-slide-active')) {
            video.pause();
        }
    });
}

if (videoSection) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load all video sources when section comes into view
                if (!videosLoaded) {
                    document.querySelectorAll('.drop-card video[data-src]').forEach(video => {
                        video.src = video.dataset.src;
                        video.removeAttribute('data-src');
                    });
                    videosLoaded = true;
                }
                // Play visible ones
                setTimeout(loadAndPlayVisibleVideos, 300);
            } else {
                // Pause all when section is out of view
                document.querySelectorAll('.drop-card video').forEach(video => {
                    video.pause();
                });
            }
        });
    }, { threshold: 0.1 });

    videoObserver.observe(videoSection);
}

// Play/pause on slide change
dropsSwiper.on('slideChangeTransitionEnd', () => {
    if (videosLoaded) {
        loadAndPlayVisibleVideos();
        pauseHiddenVideos();
    }
});

// --- Marquee & Brand Strip: Ensure infinite seamless loop ---
function setupInfiniteMarquee(selector) {
    const track = document.querySelector(selector);
    if (!track) return;
    // Clone content until it's at least 3x the viewport width
    const originalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const clonesNeeded = Math.ceil((viewportWidth * 3) / originalWidth);
    const originalHTML = track.innerHTML;
    for (let i = 0; i < clonesNeeded; i++) {
        track.innerHTML += originalHTML;
    }
}

setupInfiniteMarquee('.marquee-track');
setupInfiniteMarquee('.brand-track');

console.log('🥷 Reel Ninja — All systems loaded');
