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
});

/* ===========================================
   Typing effect (Hero title)
=========================================== */
function initTyping() {
  const el = document.getElementById('typingTitle');
  if (!el) return;

  const text = 'Web Publisher';
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
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
  window.addEventListener('scroll', () => {
    const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
    if (atBottom) setActive(lastSection.id);
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
  window.addEventListener('scroll', () =>
    btn.classList.toggle('visible', window.scrollY > 400),
    { passive: true }
  );
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
