# 에이전트 지시 템플릿 모음

> 복사 → 붙여넣기로 에이전트에게 지시할 때 사용하는 재사용 템플릿입니다.
> `{중괄호}` 안의 내용을 실제 값으로 교체하세요.

---

## 공통 전제 (모든 지시에 자동 적용)

* CLAUDE.md · .claude/rules/* 규칙은 **에이전트가 자동 로딩**합니다.
  따라서 지시는 _"무엇을 만들지"_ 에 집중하세요. 스택이나 컨벤션을 매번 반복할 필요 없습니다.
* 핵심 애니메이션 훅은 **절대 DOM·JS 훼손 금지**:
  * `.fade-up` — 스크롤 등장 애니메이션 (IntersectionObserver)
  * `.count-up` — 숫자 카운트업 (IntersectionObserver)
  * `#toast` — 클립보드 복사 토스트 알림
  * `.mq-wrap` / `.mq-row` / `.mq-belt` / `.mq-tag` — 무한 마퀴
* Tailwind 토큰은 `index.html` 인라인 `tailwind.config`에서 관리합니다.
  새 토큰이 필요하면 해당 인라인 config의 `theme.extend`를 확장하세요.

---

## 1. 새 UI / 섹션 지시 템플릿

```
## 목표
{만들고 싶은 기능·섹션 한 줄 설명}

## 범위
- {변경할 파일 1: 무엇을 하는지}
- {변경할 파일 2: 무엇을 하는지}

## 비범위 (건드리지 말 것)
- {변경하지 않을 파일·기능}

## 참고 사항
- {디자인 레퍼런스, 스크린샷 링크 등}

→ 먼저 /plan 으로 계획을 보여주고, 승인 후 구현해 줘.
```

---

## 2. 버그 / 수정 지시 템플릿

```
## 대상 파일
- {파일 경로}

## 재현 방법
1. {재현 절차 1}
2. {재현 절차 2}

## 현재 동작
{현재 잘못 작동하는 내용}

## 기대 결과
{올바르게 작동해야 하는 내용}
```

---

## 3. 리뷰 지시 템플릿

```
/ui-review {파일경로}
```

> 예시: `/ui-review index.html`
> 보완된 tailwind.md · html.md · javascript.md 규칙 기준으로 코드 리뷰를 실행합니다.

---

## 4. 하지 말 것 체크리스트

에이전트에게 특별히 주의를 환기할 때 아래 목록을 붙여 넣으세요.

```
[주의] 아래 패턴은 이 프로젝트에서 절대 사용하지 마세요:

- ❌ jQuery ($, jQuery) 사용 금지 → Vanilla JS만 사용
- ❌ BEM 네이밍 (__box, --modifier 등) 금지 → Tailwind 유틸리티만 사용
- ❌ Arbitrary value (w-[13px], bg-[#333]) 금지 → 인라인 config에 토큰 추가 후 사용
- ❌ 인라인 이벤트 (onclick, onchange) 금지 → addEventListener 사용
- ❌ window.scroll 직접 사용 금지 → IntersectionObserver 또는 GSAP ScrollTrigger 사용
```
