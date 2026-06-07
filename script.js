// ============================================================
//  script.js — البطولات المدرسية
//  عدّل البيانات في هذا الملف لتحديث الترتيب والمحتوى
// ============================================================


// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});


// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}


// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});


// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (!target) return;
  let current = 0;
  const step = Math.ceil(target / 50);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) observer.observe(heroStats);


// ===== MATCHES TABS =====
function switchTab(tabId, btn) {
  document.querySelectorAll('.matches-list').forEach(t => t.classList.remove('active-tab'));
  document.querySelectorAll('.match-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active-tab');
  btn.classList.add('active');
}


// ============================================================
//  ===== بيانات جدول الترتيب =====
//  عدّل الأسماء والأرقام هنا مباشرة
//  كل مجموعة تمثل رياضة — المفتاح يجب أن يطابق onclick في HTML
// ============================================================
const standingsData = {

  sport1: [
    // { rank, name, p=لعب, w=فاز, d=تعادل, l=خسر, gf=للـ, ga=عليه, pts=نقاط }
    { rank: 1, name: 'المدرسة الأولى',  p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { rank: 2, name: 'المدرسة الثانية', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { rank: 3, name: 'المدرسة الثالثة', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { rank: 4, name: 'المدرسة الرابعة', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ],

  sport2: [
    { rank: 1, name: 'المدرسة الأولى',  p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { rank: 2, name: 'المدرسة الثانية', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { rank: 3, name: 'المدرسة الثالثة', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ],

  sport3: [
    { rank: 1, name: 'المدرسة الأولى',  p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    { rank: 2, name: 'المدرسة الثانية', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
  ],

};

// دالة رسم الجدول — لا تعدّل هذا القسم
function rankClass(i) {
  return ['gold', 'silver', 'bronze'][i] || '';
}

function filterStandings(sport, ev) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (ev && ev.target) ev.target.classList.add('active');
  const data = standingsData[sport] || [];
  const tbody = document.getElementById('standingsBody');
  if (!tbody) return;
  tbody.innerHTML = data.map((row, i) => {
    const rc = rankClass(i);
    const rowClass = i < 3 ? 'class="top-3"' : '';
    return `<tr ${rowClass}>
      <td>${rc ? `<span class="rank ${rc}">${row.rank}</span>` : row.rank}</td>
      <td><div class="school-cell"><span class="school-emoji">🏫</span><span>${row.name}</span></div></td>
      <td>${row.p}</td><td>${row.w}</td><td>${row.d}</td><td>${row.l}</td>
      <td>${row.gf}</td><td>${row.ga}</td>
      <td>${rc ? `<span class="pts ${rc}">${row.pts}</span>` : `<span class="pts">${row.pts}</span>`}</td>
    </tr>`;
  }).join('');
}

// تحميل الجدول الأول عند فتح الصفحة
filterStandings('sport1', null);
const firstBtn = document.querySelector('.filter-btn');
if (firstBtn) firstBtn.classList.add('active');


// ===== FADE IN ANIMATION =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.tournament-card, .match-card, .news-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
