# Strnd

헤어살롱 고객 관리 서비스의 설문 플로우 UI 퍼블리싱 프로젝트입니다.

## 개요

방문 고객이 원하는 시술과 스타일을 선택하는 설문 화면을 제작합니다.
디자인 시스템 기반의 컴포넌트 구조로 구성되어 있으며, 이후 React 전환을 고려한 설계입니다.

## 기술 스택

- HTML5
- SCSS (Dart Sass, `@use` 모듈 시스템)
- Pretendard (CDN)

## 디자인 시스템

| 파일 | 역할 |
|------|------|
| `src/styles/_tokens.scss` | 컬러, 타이포, 그리드 토큰 |
| `src/styles/_mixins.scss` | 반응형, Flexbox, 텍스트 스타일 믹스인 |
| `src/styles/_grid.scss` | 컬럼 그리드 시스템 |
| `src/styles/_typography.scss` | 타이포그래피 스타일 |
| `src/styles/_reset.scss` | CSS 리셋 |
| `src/styles/_normailze.scss` | 브라우저 정규화 |
| `src/styles/_utils.scss` | 유틸리티 클래스 |
| `src/styles/_ds-guide.scss` | 디자인 시스템 가이드 전용 스타일 |

## 컴포넌트

| 컴포넌트 | 클래스 | 설명 |
|----------|--------|------|
| 설문 헤더 | `.header` `.header-nav` `.header-progress` | 상단 뒤로가기 + 프로그레스 바 |
| 질문 영역 | `.survey-question` | 스텝 라벨 + 질문 제목 |
| 설문 푸터 | `.cta` | 하단 고정 CTA 버튼 영역 |
| 체크 버튼 | `.btn-check` | 시술 선택용 버튼 |
| 칩 버튼 | `.btn-chip` | 고민/태그 다중 선택용 버튼 |
| 스타일 카드 | `.style-card` | 이미지 기반 스타일 선택 카드 |
| 텍스트 필드 | `.textfield` `.textfield--tall` | 메모 입력 필드 |
| 스낵바 | `.snackbar` | 선택 유도 인라인 알림 |

## 화면 구성

| 화면 | 설명 | 링크 |
|------|------|------|
| 재방문 인사 | 방문 이력과 인사 메시지를 보여주는 시작 화면 | [index.html](https://mightyantgirl.github.io/strnd/) |
| Step 1 — 시술 선택 | 원하는 시술(컷, 펌, 컬러, 클리닉 등)을 선택하는 화면 | [step1.html](https://mightyantgirl.github.io/strnd/step1.html) |
| Step 2 — 스타일 선택 | 헤어 스타일 이미지 카드에서 원하는 스타일을 선택하는 화면 | [step2.html](https://mightyantgirl.github.io/strnd/step2.html) |
| Step 4 — 고민 선택 | 현재 고민을 칩 버튼으로 다중 선택하는 화면 | [step4.html](https://mightyantgirl.github.io/strnd/step4.html) |
| Step 5 — 메모 입력 | 추가 요청사항을 자유롭게 입력하는 화면 | [step5.html](https://mightyantgirl.github.io/strnd/step5.html) |
| 작성 완료 | 설문 제출 후 완료 메시지를 보여주는 화면 | [complete.html](https://mightyantgirl.github.io/strnd/complete.html) |


### Step 2 상세
- 모바일: 2열 / 태블릿(768px~): 3열
- 스텝 헤더 sticky 고정, 카드 영역 독립 스크롤

## 네이밍 규칙

설문 페이지 공통 클래스는 `.survey-*` 네이밍을 사용합니다.

```html
<div class="survey-wrap">
  <header class="header">...</header>
  <main class="survey-content">
    <div class="survey-question">...</div>
    <div class="survey-grid">...</div>
  </main>
  <footer class="cta">...</footer>
</div>
```
