### HTML 및 Tailwind CSS 작성 규칙

#### 기본 원칙 (Safety First)
* **BEM 네이밍 절대 금지:** 기존 `__box`, `__tit` 같은 BEM 클래스명 대신, 오직 Tailwind CSS 유틸리티 클래스만 사용합니다.
* **JavaScript 훅(Hook) 클래스:** JS 동작 제어를 위한 선택자는 스타일 클래스(Tailwind)와 섞이지 않도록 `js-` 접두사를 사용합니다. (예: `class="flex items-center js-menu-toggle"`)

#### 시맨틱 태그 및 레이아웃 제약
* `header`, `main`, `nav`, `section`, `article`, `footer` 적절히 사용.
* 불필요한 `<div>` 래퍼 남발 금지. Tailwind의 `flex`, `grid`를 적극 활용하여 DOM depth를 최소화할 것.
* **버튼 요소:** 폼 제출용을 제외하고는 반드시 `<button type="button">`을 사용. `<a>` 태그로 버튼 흉내 절대 금지.
* **새 창 링크:** `target="_blank" rel="noopener noreferrer" title="새창열기"` 속성 필수.

#### 접근성 (a11y) - 최우선 규칙
* **이미지:** 반드시 의미에 맞는 `alt="설명"` 제공 (단순 장식용 이미지는 `alt=""` 빈 값 필수 제공).
* **스크린리더 전용 텍스트:** `<span class="sr-only">텍스트</span>` (Tailwind 유틸리티) 사용.
* **상태 동기화:** 햄버거 메뉴 등 토글 UI는 반드시 `aria-expanded`, `aria-label` 속성을 부여하고 JS 상태와 동기화할 것.
