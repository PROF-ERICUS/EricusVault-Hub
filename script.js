const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const sideMenu = document.querySelector('.side-menu');
const overlay = document.querySelector('.overlay');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');
const openMenuBtn = document.querySelector('.open-menu-btn');

// Menu open/close functions
function openMenu() {
  sideMenu.classList.add('active');
  overlay.style.display = 'block';
}

function closeMenu() {
  sideMenu.classList.remove('active');
  overlay.style.display = 'none';
}

// Event listeners for menu toggle
menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
openMenuBtn.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);

// Dropdown toggles in menu
dropdownBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slides');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.dots-container');

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  // Create dots dynamically
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to project ${i + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider();
      resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll('button');

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  // Initialize slider and start autoplay
  updateSlider();
  autoSlideInterval = setInterval(nextSlide, 4000);
});
