### Project Instructions

## 1. Project Overview
*   프로젝트명: 박찬웅 포트폴리오 (https://chan-wung.github.io/portfolio)
*   목적: 웹 접근성과 크로스 브라우징을 완벽하게 지향하는 시니어 웹 퍼블리셔의 포트폴리오 웹사이트
*   핵심 유지 기능: 스크롤 fade-up, 타이핑 커서, 무한 마퀴(Marquee), 숫자 카운트업, 토스트 알림, 모바일 햄버거 메뉴

## 2. Tech Stack
*   HTML5
*   **CSS3 / Tailwind CSS** (기존 BEM/SCSS 대신 Tailwind 유틸리티 클래스 적극 활용)
*   JavaScript (Vanilla JS 전용, jQuery 사용 안 함)

## 3. Working Rules (AI 에이전트 작업 절대 규칙)
*   **접근성 최우선:** 시맨틱 마크업을 준수하고, 모든 인터랙션 요소에 `aria-*` 속성과 키보드 탭 포커스 이동을 완벽하게 보장할 것.
*   **애니메이션 보호:** 이미 구현된 핵심 인터랙션(Scroll fade-up, 무한 마퀴 슬라이딩 등)의 DOM 구조나 Vanilla JS 로직을 임의로 리팩터링하거나 훼손하지 말 것.
*   **반응형 규칙:** 모바일 우선(Mobile-First) 디자인을 엄수하며, 데스크톱 확장 시 Tailwind의 브레이크포인트(`md:`, `lg:` 등) 유틸리티 클래스를 일관되게 사용할 것.
*   작업을 시작하기 전 반드시 관련 파일을 읽고, 수정 범위를 계획으로 제안한 뒤 승인받을 것.

## 4. Reference Rules (세부 지침)
See @.claude/rules/html.md for HTML 및 시맨틱/접근성(a11y) 규칙
See @.claude/rules/javascript.md for Vanilla JS 및 애니메이션 제어 규칙
See @.claude/rules/tailwind.md for Tailwind CSS 작성 및 커스텀 설정(config) 규칙