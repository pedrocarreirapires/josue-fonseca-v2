// Navbar mobile toggle
const menuToggle = document.getElementById('menu-toggle');
const navMobile = document.querySelector('.nav-mobile');
menuToggle.addEventListener('click', () => navMobile.classList.toggle('hidden'));

// Smooth scroll for links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    navMobile.classList.add('hidden'); // sempre fecha
  });
});

function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Service & Team modals
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

function closeModal() { modal.classList.add('hidden'); }
modalClose.addEventListener('click', closeModal);

// Abre modal ao clicar nos cards
document.querySelectorAll('.service-card, .team-card').forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.innerHTML = card.dataset.title || card.dataset.name;
    modalDesc.innerHTML = card.dataset.desc; // <ul>, <p> etc
    modal.classList.remove('hidden');
  });
});

// Fecha modal ao clicar fora do conteúdo
modal.addEventListener('click', e => {
  if(e.target === modal) { // apenas se o clique for no fundo
    closeModal();
  }
});

// Contact form submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('form-success').classList.remove('hidden');
  form.reset();
});

// Feedback carousel
const container = document.getElementById('feedback-container');
const cards = Array.from(container.children);
const dotsContainer = document.getElementById('feedback-dots');
let currentIndex = 0;

// Create dots dynamically
cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('w-3','h-3','rounded-full','bg-gray-300','mx-1');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = Array.from(dotsContainer.children);

function updateDots() {
  dots.forEach(dot => dot.classList.remove('bg-orange-500'));
  dots[currentIndex].classList.add('bg-orange-500');
}

function goToSlide(index){
  currentIndex = index;
  container.style.transform = `translateX(-${index*100}%)`;
  updateDots();
}

function nextSlide() { goToSlide((currentIndex+1) % cards.length); }
function prevSlide() { goToSlide((currentIndex-1 + cards.length) % cards.length); }

document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Auto slide
let slideInterval = setInterval(nextSlide, 5000);

// Swipe support
let startX = 0;
container.addEventListener('touchstart', e => startX = e.touches[0].clientX);
container.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if(endX - startX > 50) prevSlide();
  else if(startX - endX > 50) nextSlide();
});

// Inicializa primeiro slide
goToSlide(0);

// Navbar active section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateNavbar() {
  let current = '';
  const scrollPos = window.scrollY + 120; // offset navbar
  sections.forEach(section => {
    if(scrollPos >= section.offsetTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('text-orange-500', 'font-semibold');
    if(link.getAttribute('href') === `#${current}`) {
      link.classList.add('text-orange-500', 'font-semibold');
    }
  });
}

// Chama ao scroll
window.addEventListener('scroll', updateNavbar);

// Chama no carregamento da página para ativar a primeira seção
window.addEventListener('load', updateNavbar);



// Partículas JS 
const canvas = document.getElementById('heroParticles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 60;

for(let i=0;i<particleCount;i++){
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5,
    });
}

function drawParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(drawParticles);
}
drawParticles();


 tailwind.config = {
    theme: {
      extend: {
        colors: {
          'brand-orange': '#E34224'
        }
      }
    }
  }
