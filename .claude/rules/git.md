# Git 형상관리 및 커밋 규칙 (Agent 통제용)

## 1. 에이전트 Git 작업 절대 원칙 (Safety First)
에이전트가 코드를 수정한 후 Git 작업을 수행할 때는 사용자의 승인 없이 멋대로 커밋(Commit)하거나 푸시(Push)하는 것을 절대 금지합니다.
- **[필수 검문]** 커밋 전 반드시 `git status`와 `git diff`를 실행하여, 사용자가 지시한 파일 외에 오염된 파일이 없는지 요약해서 사용자에게 보고하세요.
- **[Push 금지]** 사용자의 명시적인 승인 없이는 절대 `git push`를 실행하지 마세요. (특히 `--force` 옵션은 최대한 사용을 자제하며, 필요시 반드시 사전 승인을 받습니다.)

## 2. 브랜치(Branch) 운영 전략
에이전트는 사용자가 지정한 브랜치에서만 작업해야 하며, 팀의 브랜치 정책을 이해해야 합니다.
- **main:** 정식 배포되는 안정적인 버전. (직접 수정 금지. 매우 긴급한 critical 버그만 `hotfix`로 처리)
- **develop:** 개발 브랜치. `main`을 base로 하며, 작업이 완료된 `feature` 브랜치가 이곳으로 Merge 됩니다.
- **feature (작업 브랜치):** 실제 에이전트가 코드를 수정할 브랜치입니다. `develop`을 base로 생성하며 `feat/기능명` 형태로 네이밍합니다.

## 3. 커밋(Commit) 분리 단위 규칙 (Atomic Commits)
커밋은 논리적으로 구분되고 일관성이 있는 '최소 액션 단위'로 작성해야 합니다.
- **리팩터링 분리:** 규모가 큰 리팩터링은 기능 수정과 절대로 동시에 진행하거나 섞어서 커밋하지 마세요. (각각 나누어 커밋)
- **과도한 세분화 지양:** 가능하면 작은 단위로 수시로 커밋하되, 커밋이 너무 과도하게 쪼개졌다면 Merge 전에 스쿼시(squash)를 사용하여 커밋 로그를 깔끔하게 정리하세요.
- **테스트 필수:** 반드시 테스트(Unit Test, UI 깨짐 등)가 완료되고 운영 서버에 적용되어도 문제가 없을 상태에서만 커밋합니다. 예외(Exception) 처리 코드는 항상 핸들링 코드를 포함하세요.

## 4. 커밋 메시지 컨벤션 (Commit Message Convention)
커밋 메시지 작성 시 여러 분류의 내용이 섞여 있다면 반드시 나누어 커밋하고, 아래의 구조를 엄격하게 지키세요.

**[메시지 구조]**
```text
Scope : Message
(빈 줄)
1. Description 상세 내용 1
2. Description 상세 내용 2
```

**[Scope (작업 내용) 종류]**
- `feat` : 기능 개발 / 수정 / 삭제 등
- `hotfix` : Critical 수정 사항 (main 브랜치에서 바로 수정 시)
- `build` : maven, gradle 의존성 관리 (UI 프로젝트의 경우 패키지 설치 등)
- `refactor` : 코드 리팩터링 등 (시각적/기능적 변화 없음)
- `chore` : 기능과 관련 없는 수정 사항 (단순 포맷팅 등)

**[작성 예시]**
```text
feat : exception handler 수정

1. egov 공통 exception handler 제거
2. web.xml http status handler 제거
3. @ControllerAdvice, ExceptionHandler 적용
```

## 5. 리뷰 및 Merge 절차
- Feature 브랜치에서 작업 및 테스트가 완료되면, `rebase`, `squash`, `amend` 등을 활용해 Commit Log를 정리한 후 Push를 진행합니다.
- Push 전 코드 리뷰(또는 PR)를 반드시 거친 후 `develop` 브랜치로 Merge 합니다.
- 만약 추후 수정이나 추가 사항이 필요하다면 코드 내에 `// TODO:` 코멘트를 작성해 두세요.