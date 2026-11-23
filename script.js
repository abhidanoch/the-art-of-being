const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  document.querySelectorAll('.navigation a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const coverTabs = document.querySelectorAll('.cover-tab');
const coverFront = document.getElementById('coverFront');
const coverBack = document.getElementById('coverBack');

if (coverTabs.length && coverFront && coverBack) {
  coverTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      coverTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      if (target === 'front') {
        coverFront.classList.add('active');
        coverBack.classList.remove('active');
      } else {
        coverBack.classList.add('active');
        coverFront.classList.remove('active');
      }
    });
  });
}

const bookStage = document.getElementById('heroBook3D');
const book3D = document.querySelector('.book-3d');

if (bookStage && book3D) {
  bookStage.addEventListener('mousemove', (e) => {
    const rect = bookStage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = -18 + x * 24;
    const rotateX = 4 - y * 16;
    book3D.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  });

  bookStage.addEventListener('mouseleave', () => {
    book3D.style.transform = 'rotateY(-22deg) rotateX(4deg)';
  });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}