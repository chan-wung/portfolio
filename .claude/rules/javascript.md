### JavaScript 및 인터랙션 규칙

#### 기본 원칙 (Safety First)
* **jQuery 사용 절대 금지:** DOM 제어 및 이벤트 바인딩은 오직 **Vanilla JS** (`document.querySelector`, `addEventListener` 등)만 사용합니다.
* **인라인 이벤트 금지:** HTML 태그 내 `onclick`, `onchange` 속성 작성 절대 금지.
* 동적으로 추가된 요소는 상위 컨테이너에 이벤트 위임(Event Delegation)을 사용하여 성능을 최적화할 것.

#### 포트폴리오 핵심 인터랙션 가이드
* **스크롤 애니메이션 (Fade-up):** `window.scroll` 직접 사용을 엄격히 금지하며, 반드시 **GSAP ScrollTrigger** 또는 `IntersectionObserver`를 활용해 성능 저하(Jank)를 막을 것.
* **무한 마퀴 (Marquee):** CSS `keyframes`나 GSAP을 활용하여 끊김 없이 좌/우 루프되도록 구현하되, 성능을 위해 `transform: translateX` 속성을 최우선으로 사용할 것.
* **타이핑 커서 & 숫자 카운트업:** `requestAnimationFrame`을 활용한 최적화된 Vanilla JS 로직이나 GSAP 기능을 활용할 것.
* **이메일 클립보드 & 토스트 알림:** 최신 Clipboard API (`navigator.clipboard.writeText`)를 사용하고, 성공/실패 여부를 감지해 화면에 토스트 알림이 렌더링되도록 구현할 것.

#### 접근성 상태 동기화
* **[필수]** 모바일 햄버거 메뉴, 탭, 모달 등의 UI 상태 변경 시, 시각적 토글뿐만 아니라 반드시 관련된 `aria-*` 속성(`aria-hidden`, `aria-expanded` 등)의 상태값도 Vanilla JS 로직 내에서 동기화할 것.
