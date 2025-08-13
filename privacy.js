// script.js

// Elements
const menuBtn = document.querySelector('.menu-btn');
const openMenuBtn = document.querySelector('.open-menu-btn');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const sideMenu = document.querySelector('.side-menu');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

// Function to open the side menu
function openMenu() {
  sideMenu.classList.add('active');
  overlay.classList.add('active');
}

// Function to close the side menu
function closeMenu() {
  sideMenu.classList.remove('active');
  overlay.classList.remove('active');
}

// Open menu buttons
if (menuBtn) menuBtn.addEventListener('click', openMenu);
if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);

// Close menu buttons
if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (overlay) overlay.addEventListener('click', closeMenu);

// Dropdown menu toggle
dropdownBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('active');
    const dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });
});
