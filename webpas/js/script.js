const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

hamburger.onclick = (e) => {
  e.preventDefault();
  navbarNav.classList.toggle('active');
};

document.addEventListener('click', function (e) {
  if (!navbarNav.contains(e.target) && !hamburger.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});

const track = document.getElementById("carousel");
const cards = document.querySelectorAll(".card");
let index = 0;
let visible = 3;

function getVisibleCount() {
  const container = document.querySelector('.carousel-container');
  const cardWidth = cards[0].offsetWidth ; // card width + margin
  return Math.floor(container.offsetWidth / cardWidth);
}

function updateCarousel() {
  visible = getVisibleCount();
  const cardWidth = cards[0].offsetWidth + 20; // card width + margin
  const maxIndex = cards.length - visible;
  if (index > maxIndex) index = 0;
  if (index < 0) index = maxIndex;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

function nextCard() {
  index++;
  updateCarousel();
}

function prevCard() {
  index--;
  updateCarousel();
}

window.addEventListener("resize", updateCarousel);
window.addEventListener("load", () => {
  // Carousel
  updateCarousel();

  // Motion Effect
  const elements = document.querySelectorAll("h1, h2, h3, p, img, section");
  const filtered = Array.from(elements).filter(el => !el.classList.contains("no-anim"));

  filtered.forEach(el => el.classList.add("motion-start"));

  gsap.to(filtered, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.1,
    onComplete: () => {
      filtered.forEach(el => el.classList.remove("motion-start"));
    }
  });
});