'use strict';

/* ===========================================
   경력 년차 계산 (실제 근무 기간 합산, 공백 제외)
   진성이디씨: 2021.02 ~ 2021.06 = 5개월 (고정)
   ㈜나모:     2021.08 ~ 2024.11 = 40개월 (고정, 11월 포함)
   ㈜스프링웍스: 2026.01 ~ 현재 (동적, 현재 달 포함)
=========================================== */
function calcCareerYears() {
  const JINSUNG = 5;
  const NAMO    = 40;

  const springStart = new Date(2026, 0);
  const now         = new Date();
  const spring = Math.max(
    (now.getFullYear() - springStart.getFullYear()) * 12 +
    (now.getMonth() - springStart.getMonth()) + 1,
    0
  );

  return Math.floor((JINSUNG + NAMO + spring) / 12);
}

/* ===========================================
   Init
=========================================== */
document.addEventListener('DOMContentLoaded', () => {
  const years = calcCareerYears();

  const careerEl = document.getElementById('careerYears');
  if (careerEl) careerEl.textContent = years;

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  initTyping();
  initHeader();
  initMobileMenu();
  initScrollSpy();
  initFadeUp();
  initCountUp();
  initClipboardCopy();
  initScrollTop();
  initHeroParticles();
  initProjectsSwiper();
});

/* ===========================================
   Typing effect (Hero title)
=========================================== */
function initTyping() {
  const el = document.getElementById('typingTitle');
  if (!el) return;

  const text = 'Web Publisher';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = text;
    return;
  }

  let i = 0;

  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent += text[i++];
      if (i >= text.length) clearInterval(timer);
    }, 80);
  }, 500);
}

/* ===========================================
   Header scroll
=========================================== */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 10);
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => { update(); ticking = false; });
    ticking = true;
  }, { passive: true });
  update();
}

/* ===========================================
   Mobile menu
=========================================== */
function initMobileMenu() {
  const btn   = document.getElementById('menuBtn');
  const menu  = document.getElementById('mobileMenu');
  const lines = document.querySelectorAll('.hamburger-line');
  if (!btn || !menu) return;

  const close = () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    lines.forEach(l => l.classList.remove('open'));
  };

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) { close(); return; }
    menu.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    lines.forEach(l => l.classList.add('open'));
  });

  document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', close));
}

/* ===========================================
   Scroll spy
=========================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length) return;

  const setActive = id => navLinks.forEach(link =>
    link.classList.toggle('active', link.getAttribute('href') === '#' + id)
  );

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => io.observe(sec));

  // 페이지 맨 끝 도달 시 마지막 섹션(contact) 강제 active
  const lastSection = sections[sections.length - 1];
  let spyTicking = false;
  window.addEventListener('scroll', () => {
    if (spyTicking) return;
    requestAnimationFrame(() => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      if (atBottom) setActive(lastSection.id);
      spyTicking = false;
    });
    spyTicking = true;
  }, { passive: true });
}

/* ===========================================
   Count-up
=========================================== */
function initCountUp() {
  const years = calcCareerYears();
  const yearEl = document.getElementById('yearsStatText');
  if (yearEl) yearEl.dataset.target = years;

  const els = document.querySelectorAll('.count-up');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => { el.textContent = el.dataset.target; });
    return;
  }

  const run = el => {
    const target = +el.dataset.target;
    const duration = 1500;
    const interval = Math.floor(duration / target);
    let current = 0;
    const timer = setInterval(() => {
      current++;
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, interval);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        run(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
}

/* ===========================================
   Fade-up
=========================================== */
function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => io.observe(el));
}

/* ===========================================
   Clipboard copy
=========================================== */
function initClipboardCopy() {
  const btn = document.getElementById('copyEmailBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast('이메일 주소가 복사되었습니다 ✓');
    } catch {
      showToast(email);
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ===========================================
   Scroll to top
=========================================== */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  let topTicking = false;
  window.addEventListener('scroll', () => {
    if (topTicking) return;
    requestAnimationFrame(() => {
      btn.classList.toggle('visible', window.scrollY > 400);
      topTicking = false;
    });
    topTicking = true;
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===========================================
   Projects Swiper
=========================================== */
function initProjectsSwiper() {
  if (typeof Swiper === 'undefined') return;
  const el = document.querySelector('.projects-swiper');
  if (!el) return;

  new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.proj-next',
      prevEl: '.proj-prev',
    },
    pagination: {
      el: '.proj-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1280: { slidesPerView: 3 },
    },
  });
}

/* ===========================================
   Hero Particles
=========================================== */
function initHeroParticles() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  const section = document.getElementById('hero');
  if (!section) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  section.insertBefore(canvas, section.firstChild);

  const content = section.querySelector('.max-w-7xl');
  if (content) { content.style.position = 'relative'; content.style.zIndex = '1'; }

  const ctx = canvas.getContext('2d');
  const COLORS = ['rgba(140,132,128,', 'rgba(61,57,53,', 'rgba(160,152,144,', 'rgba(87,83,78,'];
  const COUNT = 45;
  const mouse = { x: -9999, y: -9999, r: 100 };
  let pts = [];

  const resize = () => {
    canvas.width = section.offsetWidth;
    canvas.height = section.offsetHeight;
  };

  const spawn = () => {
    pts = [];
    for (let i = 0; i < COUNT; i++) {
      pts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.22 + 0.07,
        col: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  };

  window.addEventListener('mousemove', e => {
    const rect = section.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  resize(); spawn();
  window.addEventListener('resize', () => { resize(); spawn(); });

  let heroVisible = true;
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
  }, { threshold: 0 }).observe(section);

  const MAX_D = 85;
  const MAX_D2 = MAX_D * MAX_D;

  (function tick() {
    requestAnimationFrame(tick);
    if (!heroVisible) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < mouse.r && dist > 0) {
        const f = (mouse.r - dist) / mouse.r * 0.55;
        p.x += (dx / dist) * f;
        p.y += (dy / dist) * f;
      }
      p.x += p.vx; p.y += p.vy;
      if (p.x < -4) p.x = canvas.width + 4;
      if (p.x > canvas.width + 4) p.x = -4;
      if (p.y < -4) p.y = canvas.height + 4;
      if (p.y > canvas.height + 4) p.y = -4;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.col + p.alpha + ')';
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d2 = (p.x - q.x) ** 2 + (p.y - q.y) ** 2;
        if (d2 < MAX_D2) {
          const d = Math.sqrt(d2);
          ctx.strokeStyle = `rgba(140,132,128,${(1 - d / MAX_D) * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
  })();
}

