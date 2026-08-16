### Tailwind CSS 작성 규칙

#### 기본 원칙 (Safety First)
*   모든 스타일링은 Tailwind CSS 유틸리티 클래스를 최우선으로 사용합니다.
*   **[중요] 임의의 값(Arbitrary values, 예: `w-[13px]`, `text-[14px]`, `bg-[#fff]`) 사용을 절대 금지합니다.**
*   여백, 폰트 크기, 색상 등은 반드시 `index.html` 인라인 `tailwind.config`에 정의된 테마 토큰(예: `w-3`, `text-sm`, `bg-ink`)만 사용해야 합니다.
*   **[인라인 config 규칙]** 이 프로젝트는 별도 `tailwind.config.js` 파일이 없습니다. Tailwind 설정은 `index.html` `<head>` 안의 인라인 `tailwind.config = { ... }` 스크립트에서 관리합니다. 새 디자인 토큰이 필요하면 해당 인라인 config의 `theme.extend`를 확장하세요. 규칙 문서에서 "`tailwind.config.js`"로 표기된 부분은 모두 이 인라인 config를 가리킵니다.
*   불가피하게 1px 단위의 미세 조정이 필요한 요소(예: 특정 absolute 위치값)에 한해서만 예외적으로 `[]` 사용을 허용하되, 최소화할 것.

#### ❌ Don't — 잘못된 패턴 (에이전트 절대 금지)
```html
<!-- ❌ 하드코딩 남발 절대 금지 (유지보수 불가) -->
<div class="bg-[#333] text-[15px] pt-[22px] mt-[10px]">...</div>

<!-- ❌ 낡은 BEM 클래스명 혼용 금지 (Tailwind 프로젝트에 맞지 않음) -->
<div class="card__box flex items-center">...</div>
```

#### ✅ Do — 올바른 패턴 (디자인 시스템 활용)
```html
<!-- ✅ 인라인 tailwind.config에 세팅된 토큰값만 활용 -->
<div class="bg-ink text-base pt-5 mt-2.5">...</div>
```

#### 반응형 디자인 (Mobile-First 엄수)
*   기본 클래스는 모바일(Mobile) 해상도를 기준으로 작성합니다.
*   태블릿/PC 확장은 반드시 `md:`, `lg:` 접두사를 순차적으로 사용하여 점진적으로 전개하세요 (예: `flex-col md:flex-row`).

#### 애니메이션 및 인터랙션 요소 (포트폴리오 핵심)
*   아래 핵심 애니메이션 훅 셀렉터는 Vanilla JS(`main.js`) 및 글로벌 CSS(`style.css`)와 매핑되어 있으므로 **절대 Tailwind 클래스로 덮어쓰거나 지우지 마세요:**
    * `.fade-up` — 스크롤 등장 애니메이션 (IntersectionObserver → `.in-view` 추가)
    * `.count-up` — 숫자 카운트업 (IntersectionObserver)
    * `#toast` — 클립보드 복사 후 토스트 알림 (`.show` 토글)
    * `.mq-wrap` / `.mq-row` / `.mq-belt` / `.mq-tag` — 무한 마퀴 슬라이딩
*   해당 애니메이션 로직은 Vanilla JS 파일과 글로벌 CSS에 맵핑되어 있으므로 마크업 구조를 훼손해서는 안 됩니다.

#### 다크 모드 (Dark Mode)
*   다크 모드는 `dark:` 접두사를 사용하여 구현합니다 (예: `bg-white dark:bg-ink`).