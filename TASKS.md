# 포트폴리오 작업 백로그 (agy 실행용)

> 이 문서는 `index.html`, `main.js`, `style.css` 실제 코드를 분석해 도출한 **검증된 개선 과제**입니다.
> TASK 번호 순서대로 진행하고, 각 작업 전 계획을 보고한 뒤 승인받아 시작하세요.

---

## ⚠️ 공통 전제 (모든 TASK에 적용)

- **핵심 훅 보호:** `.fade-up` / `.count-up` / `#toast` / `.mq-*` 클래스명·DOM 구조·기존 JS 로직 훼손 금지.
- **Tailwind:** 인라인 config(`index.html` 상단)가 기준. 임의값(`w-[13px]` 등) 남발 금지. 토큰 부족하면 인라인 config 확장.
- **커밋:** 작업별 개별 커밋 (컨벤션: `Scope : Message`). `push` 금지.
- **About·Skills 콘텐츠:** BEM/SCSS/jQuery/GSAP/Vue 기술 표기는 실제 보유 역량이므로 변경 금지.
- **작업 전 필수:** `git status` + `git diff`로 오염 파일 없는지 요약 보고.

---

## TASK 1 — `window.scroll` 직접 사용 정리

### 목표
`javascript.md` 규칙("window.scroll 직접 사용 절대 금지") 위반 해소.

### 대상 파일
- `main.js`

### 실제 위반 위치 (코드 확인됨)
| 함수 | 라인 | 내용 |
|---|---|---|
| `initHeader` | L72-73 | 헤더 `.scrolled` 토글용 scroll 직접 수신 |
| `initScrollSpy` | L125-128 | 페이지 하단 도달 시 마지막 섹션 강제 active |
| `initScrollTop` | L218-221 | 맨위 버튼 `.visible` 토글용 scroll 직접 수신 |

### 지시
- `initHeader`와 `initScrollTop`의 scroll 핸들러를 `requestAnimationFrame` 기반 throttle로 감싸세요.
  ```js
  // 예시 패턴 (rAF throttle)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => { /* 실제 작업 */ ticking = false; });
    ticking = true;
  }, { passive: true });
  ```
- `initScrollSpy` 하단감지도 동일하게 rAF throttle 적용.
- 기존 동작·클래스명(`.scrolled`, `.visible`, `.active`) 변경 금지.

### 검증
- [ ] 헤더 배경이 스크롤 10px 이상 시 전환
- [ ] 맨위 버튼이 400px 이상 스크롤 시 노출
- [ ] 마지막 섹션(contact) 도달 시 nav active 전환
- [ ] 콘솔 에러 0건

### 커밋 메시지 예시
```
refactor : scroll 핸들러 rAF throttle 적용

1. initHeader·initScrollTop window.scroll → rAF throttle 전환
2. initScrollSpy 하단감지 동일 처리
```

---

## TASK 2 — `prefers-reduced-motion` 대응

### 목표
전정장애·멀미 민감 사용자를 위한 모션 감소 지원 추가 (접근성 개선).

### 대상 파일
- `style.css` (CSS 모션 정지)
- `main.js` (JS 모션 즉시 완성 처리)

### 실제 미처리 모션 (코드 확인됨)
| 파일 | 위치 | 모션 |
|---|---|---|
| `style.css` | L660-672 | `.mq-belt` 마퀴 keyframes (`mq-left`/`mq-right`) |
| `style.css` | L673-684 | `.typing-cursor` blink keyframe |
| `style.css` | 전체 | `.fade-up` → `.in-view` 트랜지션 |
| `main.js` | `initTyping` | 문자 하나씩 타이핑 interval |
| `main.js` | `initCountUp` | 숫자 카운트업 interval |
| `main.js` | `initHeroParticles` | Canvas 파티클 rAF loop |

### 지시 — `style.css`
`style.css` **파일 최하단**에 아래 블록 추가:
```css
@media (prefers-reduced-motion: reduce) {
  /* 마퀴 정지 */
  .mq-belt { animation: none; }

  /* 타이핑 커서 blink 정지 */
  .typing-cursor { animation: none; opacity: 1; }

  /* fade-up 즉시 노출 (트랜지션 제거) */
  .fade-up { opacity: 1; transform: none; transition: none; }
  .fade-up.in-view { opacity: 1; transform: none; }
}
```

### 지시 — `main.js`
각 함수 진입부에 reduced-motion 감지 가드 추가:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
- `initTyping`: `prefersReduced`이면 `el.textContent = 'Web Publisher'`로 즉시 완성 후 return.
- `initCountUp`: `prefersReduced`이면 각 el에 `target` 값을 직접 써넣고 return (interval 건너뜀).
- `initHeroParticles`: `prefersReduced`이면 함수 진입 직후 return.

### 검증
- [ ] OS "동작 줄이기" 켠 상태에서 마퀴 정지
- [ ] 타이핑 효과 없이 즉시 "Web Publisher" 표시
- [ ] 카운트업 즉시 최종값 표시
- [ ] 파티클 canvas 생성 안 됨
- [ ] 콘텐츠 정상 표시 (레이아웃 깨짐 없음)

### 커밋 메시지 예시
```
feat : prefers-reduced-motion 대응 추가

1. style.css 마퀴·커서·fade-up 모션 정지 블록 추가
2. main.js 타이핑·카운트업·파티클 즉시완성 가드 추가
```

---

## TASK 3 — 타이핑 h1 접근성 보완

### 목표
JS 비활성·로드 전 상태에서 h1이 비어있는 문제 해소. 스크린리더 정상 낭독 보장.

### 대상 파일
- `index.html` (L87-89)

### 현재 코드 (문제)
```html
<h1 class="hero-title fade-up delay-1">
  <span id="typingTitle"></span><span class="typing-cursor">|</span>
</h1>
```
JS 로드 전 `#typingTitle`이 빈 값 → h1이 텅 빔 → SEO 크롤러·스크린리더 손해.

### 지시
아래 패턴으로 수정:
```html
<h1 class="hero-title fade-up delay-1" aria-label="Web Publisher">
  <span id="typingTitle" aria-hidden="true"></span><span class="typing-cursor" aria-hidden="true">|</span>
</h1>
```
- h1에 `aria-label="Web Publisher"` 추가 — 스크린리더가 aria-label을 낭독.
- `#typingTitle`과 `.typing-cursor`에 `aria-hidden="true"` — 시각적 타이핑 낭독 방지 (중복 방지).
- 타이핑 JS 로직(`main.js`의 `initTyping`) **변경 금지** — 시각 효과는 그대로.

### 검증
- [ ] JS 끈 상태(브라우저 JS 비활성)에서 h1에 aria-label로 "Web Publisher" 존재 확인
- [ ] VoiceOver/NVDA로 낭독 시 h1 "Web Publisher" 한 번만 낭독
- [ ] 타이핑 시각 효과 정상 작동

### 커밋 메시지 예시
```
feat : 타이핑 h1 접근성 보완 (aria-label 추가)

1. h1 aria-label="Web Publisher" 추가
2. 타이핑 span aria-hidden 처리로 중복 낭독 방지
```

---

## TASK 4 — OG / Twitter 메타 태그 추가

### 목표
카카오톡·슬랙·SNS 공유 시 미리보기 노출.

### 대상 파일
- `index.html` (head 섹션)

### 지시
`<link rel="stylesheet" href="style.css" />` 바로 **위**에 추가:
```html
<!-- Open Graph -->
<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://chan-wung.github.io/portfolio/" />
<meta property="og:title"       content="박찬웅 | Web Publisher" />
<meta property="og:description" content="웹 접근성과 크로스브라우징을 지향하는 웹 퍼블리셔 박찬웅의 포트폴리오입니다." />
<!-- TODO: og:image — 썸네일 이미지 확정 후 경로 채울 것 (권장: 1200×630px) -->
<!-- <meta property="og:image" content="https://chan-wung.github.io/portfolio/og-thumbnail.png" /> -->

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="박찬웅 | Web Publisher" />
<meta name="twitter:description" content="웹 접근성과 크로스브라우징을 지향하는 웹 퍼블리셔 박찬웅의 포트폴리오입니다." />
<!-- TODO: twitter:image — og:image와 동일 이미지 경로 채울 것 -->
<!-- <meta name="twitter:image" content="https://chan-wung.github.io/portfolio/og-thumbnail.png" /> -->
```

### 미결 사항 (사용자 확인 필요)
- `og:image` / `twitter:image`에 들어갈 **썸네일 이미지**(1200×630px 권장)가 필요합니다.
- 이미지 확정 전까지 해당 태그는 TODO 주석 상태로 남기세요. **주석 해제는 이미지 파일 확정 후 사용자 지시에 따라 진행.**

### 검증
- [ ] [Open Graph Debugger](https://developers.facebook.com/tools/debug/) 또는 [Twitter Card Validator](https://cards-dev.twitter.com/validator)에서 title/description 정상 노출
- [ ] og:image는 TODO 주석 상태
- [ ] 기존 `<title>`, `<meta name="description">`과 내용 일치

### 커밋 메시지 예시
```
feat : OG·Twitter 메타 태그 추가

1. og:type/url/title/description 추가
2. twitter:card/title/description 추가
3. og:image·twitter:image는 썸네일 확정 전 TODO 주석 처리
```

---

## 완료 체크리스트

- [ ] TASK 1 — window.scroll rAF throttle
- [ ] TASK 2 — prefers-reduced-motion 대응
- [ ] TASK 3 — 타이핑 h1 aria-label
- [ ] TASK 4 — OG/Twitter 메타 태그
