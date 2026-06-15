---
description: HTML·Tailwind·JS 파일을 시맨틱, 접근성, 반응형 기준으로 깐깐하게 리뷰합니다
allowed-tools: Read, Grep
---
리뷰 대상: $ARGUMENTS

아래 순서를 반드시 따르세요.

#### 1. 기준 문서 로딩 (필수)
리뷰 대상 파일 확장자 및 스택에 맞는 rules 파일을 먼저 읽고 절대적인 판단 기준으로 삼으세요.
* HTML/Tailwind 리뷰 시 → `@.claude/rules/html.md` 및 `@.claude/rules/tailwind.md` 꼼꼼히 읽기
* JS 리뷰 시 → `@.claude/rules/javascript.md` 읽기

#### 2. 파일 읽기
사용자가 지정한 파일 경로를 Read 도구로 읽으세요.

#### 3. 리뷰 수행 (엄격한 깐깐한 심사관 모드)
* **코드를 직접 수정하지 마세요 (읽기 전용).**
* 칭찬은 절대 생략하고, 실제 버그, 크로스 브라우징 위험, **접근성 누락(`alt`, `aria-` 등)**만 냉정하게 짚어내세요.
* **[Tailwind & BEM 검사]:** 코드 내에 낡은 BEM 클래스 구조(`__box`, `__tit` 등)가 남아있거나, Tailwind의 임의의 값(`w-[13px]` 등)이 난사되어 있는지 색출하세요.
* 발견된 문제는 심각도 순으로 정렬하세요 (Critical → High → Medium → Low).

#### 4. 출력 형식
[발견 사항 | 심각도 | 문제 원인 | 수정 제안] 열을 가진 표(Table) 형식으로 깔끔하게 정리해 주세요.
문제가 없으면 "이슈 없음" 으로 출력하세요.
