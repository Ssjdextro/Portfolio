// PAGE ELEMENTS
// Cache the main controls once so the handlers below can reuse them.
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');
const languageButton = document.querySelector('.language-toggle');
let language = 'en';
try { language = localStorage.getItem('gowtham-portfolio-language') === 'ta' ? 'ta' : 'en'; } catch { /* Local-file previews may block storage. */ }

// LANGUAGE TOGGLE
// Update every translated label and remember the choice in this browser.
function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-ta]').forEach((element) => {
    element.textContent = element.dataset[language];
  });
  languageButton.setAttribute('aria-label', language === 'en' ? 'Switch language to Tamil' : 'Switch language to English');
  document.querySelector('.gallery-prev')?.setAttribute('aria-label', language === 'en' ? 'Previous photo' : 'முந்தைய படம்');
  document.querySelector('.gallery-next')?.setAttribute('aria-label', language === 'en' ? 'Next photo' : 'அடுத்த படம்');
  try { localStorage.setItem('gowtham-portfolio-language', language); } catch { /* Language still changes for this page view. */ }
}

languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'ta' : 'en'));
setLanguage(language);
document.querySelector('#year').textContent = new Date().getFullYear();

// MOBILE MENU
// Open and close the small-screen navigation, including when a link is chosen.
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  menu.hidden = isOpen;
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}));

document.addEventListener('click', (event) => {
  if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
});

// HEADER SCROLL STATE
// Add a subtle shadow after the visitor scrolls down the page.
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });


// TRAINING PHOTO CAROUSEL
// Add your own session photos to this list when they are ready.
// Each photo needs a relative image path, a short title, and descriptive alt text.
const gallery = document.querySelector('.gallery-card');
if (gallery) {
  const slides = [
    {
      image: 'assets/Photo1.jpg',
      title: 'AI learning',
      titleTa: 'AI கற்றல்',
      alt: 'Temporary visual for an AI learning session',
      altTa: 'AI கற்றல் வகுப்புக்கான தற்காலிகப் படம்'
    },
    {
      image: 'assets/Photo2.jpg',
      title: 'Learning together',
      titleTa: 'ஒன்றாகக் கற்றல்',
      alt: 'Temporary visual for collaborative learning',
      altTa: 'கூட்டுக் கற்றலுக்கான தற்காலிகப் படம்'
    }
  ];

  const galleryImage = gallery.querySelector('.gallery-image');
  const galleryTitle = gallery.querySelector('.gallery-slide-title');
  const galleryCount = gallery.querySelector('.gallery-count');
  const previousButton = gallery.querySelector('.gallery-prev');
  const nextButton = gallery.querySelector('.gallery-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let slideIndex = 0;
  let galleryTimer;

  // Display the selected photo. The calculation wraps arrows from the last photo to the first.
  function showSlide(nextIndex) {
    slideIndex = (nextIndex + slides.length) % slides.length;
    gallery.classList.add('is-changing');

    window.setTimeout(() => {
      const slide = slides[slideIndex];
      galleryImage.src = slide.image;
      galleryImage.alt = language === 'ta' ? slide.altTa : slide.alt;
      galleryTitle.textContent = language === 'ta' ? slide.titleTa : slide.title;
      galleryCount.innerHTML = `${String(slideIndex + 1).padStart(2, '0')} <span>/ ${String(slides.length).padStart(2, '0')}</span>`;
      gallery.classList.remove('is-changing');
    }, 180);
  }

  // Rotate every six seconds unless the visitor prefers reduced motion.
  function startGalleryTimer() {
    window.clearInterval(galleryTimer);
    if (!reducedMotion.matches) {
      galleryTimer = window.setInterval(() => showSlide(slideIndex + 1), 6000);
    }
  }

  // Arrow clicks change the photo immediately and restart the timer.
  previousButton.addEventListener('click', () => {
    showSlide(slideIndex - 1);
    startGalleryTimer();
  });
  nextButton.addEventListener('click', () => {
    showSlide(slideIndex + 1);
    startGalleryTimer();
  });

  // Pause while someone is looking at or using the gallery, then resume afterward.
  gallery.addEventListener('mouseenter', () => window.clearInterval(galleryTimer));
  gallery.addEventListener('mouseleave', startGalleryTimer);
  gallery.addEventListener('focusin', () => window.clearInterval(galleryTimer));
  gallery.addEventListener('focusout', (event) => {
    if (!gallery.contains(event.relatedTarget)) startGalleryTimer();
  });
  reducedMotion.addEventListener('change', startGalleryTimer);

  startGalleryTimer();
}