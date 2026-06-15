# DESIGN.md — 박찬웅 포트폴리오 디자인 시스템

> **자동 생성일:** 2026-06-15  
> **분석 소스:** `index.html` · `style.css` · `main.js`  
> **기준:** Tailwind 인라인 config 토큰 + 글로벌 CSS 변수

---

## 1. 색상 토큰 (Color Palette)

인라인 `tailwind.config` — `theme.extend.colors`에 정의된 커스텀 토큰입니다.

| 토큰명   | HEX       | 용도                                  |
|----------|-----------|---------------------------------------|
| `ink`    | `#111110` | 본문 텍스트, 강조 배경, 다크 섹션 배경 |
| `ink2`   | `#3d3935` | 보조 텍스트 (본문 단락, 리스트 항목)   |
| `muted`  | `#8c8480` | 약한 텍스트 (날짜, 라벨, stat-label)   |
| `line`   | `#e5e0d8` | 보더, 구분선, 카드 테두리              |
| `paper`  | `#faf9f7` | 라이트 섹션 배경, body 기본 배경       |
| `card`   | `#ffffff` | 카드/뱃지 배경                         |

### 글로벌 CSS에서 사용되는 추가 색상 (style.css 하드코딩)

| HEX / rgba                       | 용도                                   |
|----------------------------------|----------------------------------------|
| `#57534e`                        | hero-desc, exp-role, project-desc 텍스트 |
| `#a09890`                        | section-eyebrow (라이트)               |
| `rgba(255,255,255,0.25)`         | section-eyebrow-inv (다크)             |
| `rgba(250,249,247,0.3)`          | skills-cat 카테고리 라벨               |
| `rgba(250,249,247,0.6)`          | skill-label 텍스트                     |
| `#78716c`                        | scroll-top-btn 배경                    |
| `#d5cfc8`                        | swiper pagination bullet 기본색        |
| `#c8c2bb`                        | exp-link 밑줄색, 카드 태그 hover 테두리 |
| `rgba(255,255,255,0.10)`         | 다크 섹션 내부 구분선 (border-white/10) |
| `rgba(255,255,255,0.15)`         | cta-outline 테두리                     |
| `rgba(255,255,255,0.40)`         | contact 서브 텍스트 (text-white/40)    |
| `rgba(255,255,255,0.55)`         | cta-outline 텍스트                     |

### Experience 태그 배지 색상 매핑

| 클래스          | 배경 (bg)  | 텍스트 (color) | 라벨 |
|-----------------|-----------|----------------|------|
| `.et-web`       | `#f0ebff` | `#6d28d9`      | 웹   |
| `.et-kiosk`     | `#fff3e8` | `#c2410c`      | 키오스크 |
| `.et-renewal`   | `#fef9e7` | `#92400e`      | 리뉴얼  |
| `.et-dev`       | `#ecfdf5` | `#065f46`      | 개발    |
| `.et-maint`     | `#fef3c7` | `#78350f`      | 유지보수 |
| `.et-self`      | `#e0f2fe` | `#0369a1`      | 자사    |
| `.et-refactor`  | `#f0fdf4` | `#166534`      | 리팩토링 |

---

## 2. 타이포그래피 (Typography)

### 폰트 패밀리

`tailwind.config` → `theme.extend.fontFamily.sans`:

```
['Pretendard', 'Inter', 'sans-serif']
```

- **Pretendard** (v1.3.9, CDN) — 한글 기본 서체
- **Inter** (400/600/700/800, Google Fonts) — 영문 보조 서체

### 타이포 스케일 (style.css 기준)

| 요소 / 클래스        | 크기 (px / clamp)                        | 굵기  | letter-spacing | 비고              |
|----------------------|------------------------------------------|-------|----------------|-------------------|
| `body`               | 기본 (1rem = 16px)                       | 400   | `0.015em`      | line-height: 1.65 |
| `.hero-title`        | `clamp(2.75rem, 6.5vw, 5rem)`           | 800   | `-0.03em`      | line-height: 1    |
| `.hero-label`        | `1rem`                                   | 600   | `0.06em`       |                   |
| `.hero-desc`         | `1rem`                                   | 400   | —              | line-height: 1.8  |
| `.section-heading`   | `clamp(2rem, 4vw, 2.75rem)`             | 700   | `-0.03em`      | line-height: 1.1  |
| `.section-heading-inv` | 동일                                   | 700   | `-0.03em`      | 다크 버전         |
| `.section-eyebrow`   | `0.68rem`                                | 700   | `0.2em`        | uppercase         |
| `.about-headline`    | `clamp(1.75rem, 3.5vw, 2.5rem)`         | 700   | `-0.03em`      | line-height: 1.3  |
| `.contact-heading`   | `clamp(2rem, 5vw, 3.5rem)`              | 800   | `-0.04em`      | line-height: 1.1  |
| `.stat-num`          | `2.75rem`                                | 800   | `-0.04em`      |                   |
| `.stat-label`        | `0.75rem`                                | 400   | —              |                   |
| `.exp-co`            | `1.1rem`                                 | 700   | `-0.02em`      |                   |
| `.exp-date`          | `0.8rem`                                 | 400   | —              | tabular-nums      |
| `.exp-role`          | `0.875rem`                               | 400   | `0.01em`       | line-height: 1.7  |
| `.project-name`      | `1.25rem`                                | 700   | —              |                   |
| `.project-desc`      | `0.875rem`                               | 400   | —              | line-height: 1.65 |
| `.project-type`      | `0.68rem`                                | 700   | `0.16em`       | uppercase         |
| `.skill-label`       | `0.62rem`                                | 500   | —              |                   |
| `.skills-cat`        | `0.68rem`                                | 700   | `0.16em`       | uppercase         |
| `.kw`                | `0.77rem`                                | 500   | —              |                   |

### Tailwind 유틸리티로 사용 중인 텍스트 크기

| 클래스     | 용도                       |
|------------|---------------------------|
| `text-sm`  | 네비게이션 링크, 안내 문구  |
| `text-xs`  | 푸터 카피                   |
| `text-2xl` | stat-num 접미사 (+, 년)     |

---

## 3. 간격 및 레이아웃 토큰 (Spacing & Layout)

### 레이아웃 구조

| 토큰                  | 값             | 용도                        |
|-----------------------|----------------|-----------------------------|
| `max-w-7xl`           | `80rem`        | 전체 컨테이너 최대 너비     |
| `px-6`                | `1.5rem`       | 양쪽 패딩 (모든 섹션 공통)  |
| `h-16`                | `4rem`         | 헤더 높이                   |
| `py-24`               | `6rem`         | 섹션 상하 패딩              |
| `scroll-padding-top`  | `64px`         | 앵커 스크롤 여백 (html)     |
| `scroll-margin-top`   | `80px`         | 섹션 앵커 스크롤 마진       |

### Tailwind 유틸리티 간격 (인라인에서 주로 사용)

| 클래스       | 값      | 용도                              |
|--------------|---------|-----------------------------------|
| `gap-8`      | `2rem`  | 데스크톱 nav 링크 간격            |
| `gap-6`      | `1.5rem`| stat 그리드 간격                  |
| `gap-5`      | `1.25rem`| skill-card 간격, 모바일 nav 간격  |
| `gap-4`      | `1rem`  | CTA 버튼 그룹 간격               |
| `gap-3`      | `0.75rem`| Hero CTA 그룹 간격               |
| `gap-2`      | `0.5rem`| 키워드 뱃지 간격                  |
| `gap-16`     | `4rem`  | About 그리드 컬럼 간격            |
| `mt-10`      | `2.5rem`| About 그리드 상단 여백            |
| `mt-14`      | `3.5rem`| Skills/Exp 콘텐츠 시작 여백       |
| `mt-8`       | `2rem`  | Hero CTA 상단 여백                |
| `space-y-4`  | `1rem`  | About 본문 단락 간격              |

### 브레이크포인트 (Tailwind 기본값)

| 접두사 | 최소 너비 | 용도                                    |
|--------|-----------|----------------------------------------|
| `sm:`  | `640px`   | Skills 그리드 4컬럼, 푸터 가로 정렬     |
| `md:`  | `768px`   | 데스크톱 nav 표시, About 2컬럼 그리드   |
| `lg:`  | `1024px`  | (현재 미사용)                           |

---

## 4. 컴포넌트 목록 (Components)

### 4-A. 시맨틱 섹션 구조

| 섹션 ID        | 태그        | 배경                   | 설명                     |
|----------------|-------------|------------------------|--------------------------|
| `#hero`        | `<section>` | `bg-paper` (기본)      | 풀 스크린 히어로          |
| `#about`       | `<section>` | `bg-paper` (기본)      | 자기소개 + 통계           |
| `#skills`      | `<section>` | `bg-ink` (다크)        | 기술 스택 그리드          |
| `#experience`  | `<section>` | `bg-paper` (기본)      | 경력 타임라인 + 마퀴      |
| `#projects`    | `<section>` | `bg-paper` (기본)      | 사이드 프로젝트 (Swiper)  |
| `#contact`     | `<section>` | `bg-ink` (다크)        | 연락처 CTA               |

### 4-B. UI 컴포넌트 (CSS 클래스 기준)

| 컴포넌트              | CSS 클래스                       | 설명                                      |
|-----------------------|----------------------------------|-------------------------------------------|
| 헤더                   | `#header`, `.scrolled`          | 스크롤 시 블러 배경 + 하단 보더 활성화     |
| 데스크톱 Nav           | `.nav-link`                     | 밑줄 hover/active 인터랙션                 |
| 모바일 Nav             | `#mobileMenu`, `.mobile-nav-link` | 풀 width 드롭다운                        |
| 햄버거 버튼            | `#menuBtn`, `.hamburger-line`   | 3선 → X 토글 (`.open` 클래스)             |
| CTA 버튼 (다크)        | `.btn-dark`                     | pill 형태, ink 배경                       |
| CTA 버튼 (아웃라인)    | `.btn-outline`                  | pill 형태, line 테두리                    |
| CTA 버튼 (라이트)      | `.cta-light`                    | Contact 다크 섹션용, paper 배경            |
| CTA 버튼 (다크 아웃라인)| `.cta-outline`                 | Contact 다크 섹션용, 반투명 테두리         |
| 섹션 아이브라우         | `.section-eyebrow`, `-inv`     | 대문자 미니 라벨 (라이트/다크)             |
| 섹션 헤딩              | `.section-heading`, `-inv`      | clamp 반응형 제목 (라이트/다크)            |
| 통계 카드              | `.stat-num`, `.stat-label`      | 카운트업 숫자 + 라벨                       |
| 키워드 뱃지            | `.kw`                           | pill 태그, hover 시 ink 테두리            |
| 스킬 카드              | `.skill-card`, `.skill-icon`, `.skill-label` | 아이콘 + 라벨 수직 배치       |
| 스킬 카테고리          | `.skills-cat`                   | 대문자 카테고리명                          |
| 경력 블록              | `.exp-block`, `.exp-meta`, `.exp-co`, `.exp-date`, `.exp-role` | 타임라인 항목 |
| 재직중 뱃지            | `.badge-now`                    | 소형 pill, ink 배경                        |
| 경력 태그              | `.et`, `.et-web` ~ `.et-refactor` | 컬러 코딩된 업무 유형 태그               |
| 경력 링크              | `.exp-link`                     | 밑줄 스타일 인라인 링크                    |
| 프로젝트 카드          | `.project-card`, `.project-type`, `.project-name`, `.project-desc` | Swiper 슬라이드 카드 |
| 프로젝트 태그          | `.project-tag`                  | pill 형태 기술 스택 태그                   |
| 프로젝트 버튼          | `.project-btn`, `--demo`, `--git` | 데모/GitHub 링크 버튼                   |
| Swiper 컨트롤          | `.proj-controls`, `.proj-pagination`, `.proj-arrows`, `.proj-btn`, `.proj-prev`, `.proj-next` | 페이지네이션 + 화살표 |
| 토스트 알림            | `#toast`, `.toast`, `.show`     | 하단 중앙 고정, 자동 사라짐                |
| 스크롤 힌트            | `.scroll-hint`, `.scroll-hint-arrow` | Hero 하단 드롭 애니메이션          |
| 스크롤 투 탑           | `#scrollTop`, `.scroll-top-btn`, `.visible` | 우하단 고정 버튼               |

---

## 5. JS 인터랙션 컴포넌트 (main.js)

### 5-A. 초기화 함수 목록

| 함수                     | 셀렉터 / ID                              | 설명                                     |
|--------------------------|-------------------------------------------|------------------------------------------|
| `calcCareerYears()`      | —                                         | 실무 경력 년차 동적 계산                  |
| `initTyping()`           | `#typingTitle`                            | Hero 타이핑 이펙트 (setInterval 80ms)     |
| `initHeader()`           | `#header`                                 | 스크롤 감지 → `.scrolled` 토글            |
| `initMobileMenu()`       | `#menuBtn`, `#mobileMenu`, `.hamburger-line`, `.mobile-nav-link` | 모바일 메뉴 토글 + aria 동기화 |
| `initScrollSpy()`        | `section[id]`, `.nav-link`                | IO 기반 네비 active 상태 추적             |
| `initFadeUp()`           | `.fade-up`                                | IO 기반 스크롤 등장 → `.in-view` 추가     |
| `initCountUp()`          | `.count-up`, `#yearsStatText`             | IO 기반 숫자 카운트업 애니메이션           |
| `initClipboardCopy()`    | `#copyEmailBtn`, `#toast`                 | Clipboard API + 토스트 알림               |
| `showToast(msg)`         | `#toast`                                  | 토스트 표시/2.5s 후 자동 해제             |
| `initScrollTop()`        | `#scrollTop`                              | 스크롤 > 400px → `.visible` 토글          |
| `initHeroParticles()`    | `#hero`, `<canvas>`                       | Canvas 파티클 + 마우스 인터랙션           |
| `initProjectsSwiper()`   | `.projects-swiper`, `.proj-*`             | Swiper 라이브러리 초기화                  |

### 5-B. js- 접두사 훅 클래스 현황

> 현재 코드에 `js-` 접두사 훅 클래스는 사용되지 않고 있습니다.  
> 모든 JS 셀렉터는 **ID (`#menuBtn`, `#toast` 등)** 또는 **CSS 컴포넌트 클래스 (`.fade-up`, `.count-up`, `.hamburger-line` 등)** 를 직접 참조합니다.

### 5-C. 접근성(a11y) 구현 현황

| 기능                | 구현 상태                                                     |
|--------------------|---------------------------------------------------------------|
| 햄버거 메뉴 `aria-expanded` | ✅ JS에서 `true`/`false` 동기화                        |
| 토스트 `role="alert"`       | ✅ `aria-live="polite"` 적용                           |
| 타이핑 Hero `aria-label`    | ✅ `h1`에 `aria-label="Web Publisher"` 고정            |
| 타이핑 커서 `aria-hidden`   | ✅ 스크린리더 숨김 처리                                 |
| 파티클 Canvas `aria-hidden` | ✅ 동적 생성 시 적용                                    |
| 마퀴 `aria-hidden`          | ✅ `.mq-wrap`에 적용                                    |
| 스킬 아이콘 `aria-hidden`   | ✅ 장식용 이미지 처리 (`alt=""`)                        |
| `prefers-reduced-motion`    | ✅ 타이핑·카운트업·마퀴·파티클·fade-up 모두 대응        |

---

## 6. 애니메이션 / 인터랙션 목록

### CSS 애니메이션 (style.css `@keyframes`)

| 이름           | 클래스                     | 설명                                    |
|----------------|----------------------------|-----------------------------------------|
| `scroll-drop`  | `.scroll-hint-arrow::after`| Hero 스크롤 힌트 드롭 (2s, ease-in-out, infinite) |
| `mq-left`      | `.mq-belt`                 | 마퀴 좌측 이동 (50s, linear, infinite)  |
| `mq-right`     | `.mq-row--reverse .mq-belt`| 마퀴 우측 이동 (55s, linear, infinite)  |
| `blink`        | `.typing-cursor`           | 타이핑 커서 깜빡임 (0.7s, step-end, infinite) |

### CSS 트랜지션 인터랙션

| 클래스                | 트리거             | 효과                              |
|-----------------------|-------------------|-----------------------------------|
| `.fade-up` → `.in-view` | IntersectionObserver | opacity 0→1, translateY 20→0 (0.7s) |
| `.delay-1` ~ `.delay-4` | —                 | transition-delay 0.1s ~ 0.4s     |
| `.nav-link::after`    | `:hover`, `.active`| 밑줄 width 0→100% (0.3s)         |
| `.hamburger-line.open`| JS 토글            | rotate ± 45deg (0.3s)            |
| `.project-card:hover` | `:hover`          | translateY -3px + box-shadow     |
| `.btn-dark:hover`     | `:hover`          | translateY -1px                  |
| `.btn-outline:hover`  | `:hover`          | translateY -1px + border 변경    |
| `.kw:hover`           | `:hover`          | border + color 변경               |
| `.mq-tag:hover`       | `:hover`          | border + color 변경               |
| `.scroll-top-btn.visible` | scroll > 400px | opacity 0→1                      |
| `.toast.show`         | JS 토글            | opacity 0→1, translateY 정렬     |
| `.mq-wrap:hover`      | `:hover`          | animation-play-state: paused     |

### JS 인터랙션 (Canvas)

| 이름                  | 대상           | 설명                                       |
|-----------------------|---------------|--------------------------------------------|
| Hero Particles        | `#hero canvas` | 45개 파티클 + 연결선 + 마우스 반발 효과     |

---

## 7. UI 카피 (Copy Inventory)

### 히어로 (Hero)

| 요소           | 텍스트                                                              |
|----------------|---------------------------------------------------------------------|
| `.hero-label`  | `박찬웅 · {N}년 차`                                                 |
| `h1`           | `Web Publisher` (타이핑 이펙트)                                     |
| `.hero-desc`   | 접근성과 크로스브라우징을 꼼꼼히 챙기며, 완성도 높은 마크업과 인터랙션으로 사용자 경험을 만들어갑니다. |
| CTA 1          | `프로젝트 보기` → `#experience`                                     |
| CTA 2          | `연락하기` → `#contact`                                             |

### 어바웃 (About)

| 요소                  | 텍스트                                                  |
|-----------------------|---------------------------------------------------------|
| 아이브라우             | `About`                                                 |
| `h2.about-headline`  | 꼼꼼한 마크업으로 더 나은 경험을 만들어갑니다.           |
| 통계 1                | `40+` · 완료 프로젝트                                    |
| 통계 2                | `{N}년` · 실무 경력                                      |
| 키워드 뱃지           | BEM, SCSS, A11y, 크로스브라우징, GSAP, Swiper, 반응형 웹, 키오스크 |

### 스킬 (Skills)

| 요소           | 텍스트       |
|----------------|-------------|
| 아이브라우      | `Skills`    |
| `h2`           | `기술 스택`  |
| 카테고리 1      | `Markup & Style` — HTML5, CSS3, SCSS |
| 카테고리 2      | `Script & Library` — JavaScript, jQuery, GSAP, Swiper, Vue.js |
| 카테고리 3      | `Tooling` — Git, Figma, VS Code, IntelliJ |
| 카테고리 4      | `AI 활용` — Claude Code, Gemini |

### 경력 (Experience)

| 요소           | 텍스트                       |
|----------------|------------------------------|
| 아이브라우      | `Experience`                 |
| `h2`           | `경력 및 프로젝트`            |
| 회사 1          | `㈜스프링웍스` · 재직 중 · `2026.01 — 현재` |
| 회사 2          | `㈜나모` · `2021.08 — 2024.11` |
| 회사 3          | `㈜진성이디씨` · `2021.02 — 2021.06` |

### 프로젝트 (Projects)

| 요소           | 텍스트                                              |
|----------------|-----------------------------------------------------|
| 아이브라우      | `Projects`                                          |
| `h2`           | `사이드 프로젝트`                                    |
| 카드 1          | `Todo List` — React + TypeScript 기반 할 일 관리 앱 |
| 카드 2          | `DeckLog` — TFT 덱 시뮬레이터 + 전적 검색 웹앱     |

### 연락처 (Contact)

| 요소           | 텍스트                                                                  |
|----------------|-------------------------------------------------------------------------|
| 헤딩            | `Contact`                                                               |
| 서브 텍스트     | 함께할 프로젝트나 좋은 기회가 있다면 언제든 편하게 연락 주세요.          |
| CTA 1          | `fhou4444@naver.com` (클립보드 복사)                                     |
| CTA 2          | `GitHub` → https://github.com/chan-wung                                  |

### 헤더 / 푸터 공통

| 요소           | 텍스트                                             |
|----------------|----------------------------------------------------|
| 헤더 CTA       | `연락하기`                                          |
| Nav 링크       | About · Skills · Experience · Projects · Contact   |
| 푸터           | `© {YYYY} 박찬웅. All rights reserved.`             |
| 푸터 서브      | `Web Publisher · HTML · CSS · JavaScript`           |

---

## 8. 외부 의존성 (Dependencies)

| 라이브러리       | 버전     | 로드 방식      | 용도                |
|-----------------|----------|---------------|---------------------|
| Tailwind CSS    | CDN Play | `<script>` 인라인 config | 유틸리티 CSS      |
| Pretendard      | v1.3.9   | CDN `<link>`   | 한글 기본 서체      |
| Inter           | —        | Google Fonts   | 영문 보조 서체      |
| Swiper          | v11      | CDN CSS + JS   | 프로젝트 슬라이더   |

> **Note:** GSAP는 CLAUDE.md 규칙에 언급되어 있으나, 현재 `main.js`에서는 GSAP를 사용하지 않습니다. 모든 애니메이션은 CSS `@keyframes` + Vanilla JS `IntersectionObserver`로 구현되어 있습니다.

---

## 9. 반응형 분기점 요약

| 화면 폭            | 레이아웃 변경 사항                                               |
|--------------------|-----------------------------------------------------------------|
| < 640px (기본)     | 단일 컬럼, 모바일 nav, 경력 메타 세로 정렬, 토스트 전체 너비     |
| ≥ 640px (`sm:`)    | Skills 4컬럼 그리드, 푸터 가로 정렬, Swiper 2슬라이드            |
| ≥ 768px (`md:`)    | 데스크톱 nav 표시, About 2컬럼 그리드, Hero 파티클 활성화        |
| ≥ 1280px           | Swiper 3슬라이드 (Swiper breakpoint)                             |

---

## 10. 보호 대상 (Do NOT Modify)

> 아래 셀렉터·DOM 구조는 JS(main.js) 및 CSS(style.css)에 강하게 결합되어 있으므로 **절대 변경/삭제 금지**합니다.

| 셀렉터                                        | 이유                                   |
|-----------------------------------------------|----------------------------------------|
| `.fade-up` / `.in-view`                       | IntersectionObserver → 스크롤 등장     |
| `.count-up` / `data-target`                   | IntersectionObserver → 숫자 카운트업   |
| `#toast` / `.show`                            | 클립보드 복사 토스트 알림              |
| `.mq-wrap` / `.mq-row` / `.mq-belt` / `.mq-tag` | CSS 무한 마퀴 슬라이딩             |
| `.mq-row--reverse`                            | 역방향 마퀴 (mq-right keyframes)      |
| `#typingTitle` / `.typing-cursor`             | 타이핑 이펙트                          |
| `#header` / `.scrolled`                       | 헤더 스크롤 배경                       |
| `#menuBtn` / `#mobileMenu` / `.hamburger-line` / `.open` | 모바일 메뉴 토글      |
| `.nav-link` / `.active`                       | 스크롤 스파이                          |
| `#scrollTop` / `.visible`                     | 스크롤 투 탑 버튼                      |
| `#hero` / `<canvas>`                          | 파티클 캔버스 (동적 삽입)              |
| `.projects-swiper` / `.proj-*`                | Swiper 초기화                          |
