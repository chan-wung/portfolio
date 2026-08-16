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
  const totalMonths = JINSUNG + NAMO + spring;
  const fullYears = Math.floor(totalMonths / 12);
  const nthYear = totalMonths % 12 === 0 ? fullYears : fullYears + 1;
  
  return { fullYears, nthYear, totalMonths };
}

/* ===========================================
   Init
=========================================== */
document.addEventListener('DOMContentLoaded', async () => {
  const career = calcCareerYears();

  const careerEl = document.getElementById('careerYears');
  if (careerEl) careerEl.textContent = career.nthYear;

  const footerYear = document.getElementById('footerYear');
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  initTyping();
  initHeader();
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initCountUp();
  initClipboardCopy();
  initScrollTop();
  initHeroMesh();
  initProjectsSwiper();

  // JSON 데이터 렌더링 후 fade-up 관찰 시작
  await Promise.all([initMarquee(), initExperience()]);
  initFadeUp();
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
   Theme Toggle (Dark Mode)
=========================================== */
function initThemeToggle() {
  const btns = [document.getElementById('themeToggleBtn'), document.getElementById('mobileThemeToggleBtn')];
  const html = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const setDark = (isDark) => {
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    btns.forEach(btn => {
      if (btn) btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
  };

  if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
    setDark(true);
  } else {
    setDark(false);
  }

  btns.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isCurrentlyDark = html.classList.contains('dark');
      setDark(!isCurrentlyDark);
    });
  });
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
  const career = calcCareerYears();
  const yearEl = document.getElementById('yearsStatText');
  if (yearEl) yearEl.dataset.target = career.fullYears;

  const monthsEl = document.getElementById('totalMonthsText');
  if (monthsEl) monthsEl.textContent = career.totalMonths;

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
   Marquee (JSON-driven)
=========================================== */
async function initMarquee() {
  const belt1 = document.getElementById('mq-belt-1');
  const belt2 = document.getElementById('mq-belt-2');
  if (!belt1 || !belt2) return;

  try {
    const res = await fetch('data/marquee.json');
    const data = await res.json();

    [[belt1, data.row1], [belt2, data.row2]].forEach(([belt, tags]) => {
      belt.innerHTML = [...tags, ...tags]
        .map(t => `<span class="mq-tag">${t}</span>`)
        .join('');
    });
  } catch (e) {
    console.warn('marquee.json 로드 실패', e);
  }
}

/* ===========================================
   Experience (JSON-driven)
=========================================== */
async function initExperience() {
  const list = document.getElementById('exp-list');
  if (!list) return;

  try {
    const res = await fetch('data/experience.json');
    const data = await res.json();
    const delays = ['', ' delay-1', ' delay-2', ' delay-3'];

    list.innerHTML = data.map((co, idx) => {
      const delay = delays[idx] || '';
      const badge = co.current ? '<span class="badge-now">재직 중</span>' : '';

      const items = co.items.map(item => {
        const segs = item.segments.map(seg =>
          seg.url
            ? `<a href="${seg.url}" target="_blank" rel="noopener noreferrer" class="exp-link">${seg.text}</a>`
            : seg.text
        ).join('');
        return `<li><span class="et et-${item.type}">${item.label}</span>${segs}</li>`;
      }).join('');

      return `
        <div class="exp-block fade-up${delay}">
          <div class="exp-meta">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="exp-co">${co.company}</h3>${badge}
            </div>
            <time class="exp-date">${co.period}</time>
          </div>
          <p class="exp-role">${co.role}</p>
          <ul class="exp-items">${items}</ul>
        </div>`;
    }).join('');
  } catch (e) {
    console.warn('experience.json 로드 실패', e);
  }
}

/* ===========================================
   Hero Mesh Gradient
=========================================== */
function initHeroMesh() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  
  const section = document.getElementById('hero');
  const mouseMesh = document.querySelector('.hero-mesh-mouse');
  if (!section || !mouseMesh) return;

  let ticking = false;
  section.addEventListener('mousemove', e => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseMesh.style.setProperty('--mouse-x', `${x}px`);
        mouseMesh.style.setProperty('--mouse-y', `${y}px`);
        ticking = false;
      });
      ticking = true;
    }
  });
}

