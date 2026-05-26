# Strnd

헤어디자이너 1인 살롱용 고객 설문·시술 기록 관리 웹앱.
---

## 개요

디자이너와 고객이 각자 디바이스에서 사용하는 2-sided 앱.
- **디자이너 (폰)** — 고객 검색·등록, 설문 URL 생성, 시술 메모 기록
- **고객 (살롱 태블릿)** — 시술 전 설문 작성 (Step 0~5)

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v4 (`@theme` 토큰 시스템) |
| Routing | React Router v6 (예정) |
| Hosting | Vercel (예정) |
| 폰트 | Pretendard (CDN) |

---

## 프로젝트 구조

```
src/
├── main.jsx              진입점
├── main.css              Tailwind v4 @theme 토큰 + 반응형 타이포
├── App.jsx               루트 컴포넌트
└── components/           공통 컴포넌트
    ├── button.jsx        버튼 (primary / secondary / ghost)
    ├── input.jsx         인풋박스
    ├── chip.jsx          고민 선택 칩 (Step 4)
    ├── moodchip.jsx      무드 선택 칩 (Step 2)
    └── stylecard.jsx     스타일 이미지 카드 (Step 3)
```

---

## 디자인 토큰 (`src/main.css`)

Tailwind v4 `@theme`으로 정의. 아래 CSS 변수가 유틸리티 클래스로 자동 생성됨.

| 구분 | 토큰 | 클래스 예시 |
|------|------|------------|
| 컬러 | `--color-brand`, `--color-bg` 등 | `bg-brand`, `text-secondary` |
| 라운드 | `--rounded-sm` ~ `--rounded-full` | `rounded-xl`, `rounded-full` |
| 간격 | `--spacing-xs` ~ `--spacing-hero` | `p-xs`, `gap-sm` |
| 그림자 | `--shadow-sm/md/lg` | `shadow-md` |
| 폰트 | `--font-primary` | `font-primary` |
| 타이포 | `@utility text-large` ~ `text-label` | `text-base`, `text-small` |

반응형 타이포는 `@utility`로 모바일→태블릿(768px) 자동 분기.

---

## 컴포넌트 현황

| 컴포넌트 | 파일 | 상태 |
|----------|------|------|
| Button | `components/button.jsx` | ✅ 진행 중 |
| Input | `components/input.jsx` | ✅ 진행 중 |
| Chip | `components/chip.jsx` | ✅ 진행 중 |
| MoodChip | `components/moodchip.jsx` | ✅ 진행 중 |
| StyleCard | `components/stylecard.jsx` | ✅ 진행 중 |
| Card (Customer/Visit) | — | ⬜ 예정 |
| Modal | — | ⬜ 예정 |
| ProgressBar | — | ⬜ 예정 |
| SurveyHeader/Footer | — | ⬜ 예정 |

---

## 화면 구성 (총 14개)

### 디자이너 영역 (모바일 전용)

| # | 화면 | 경로 |
|---|------|------|
| 1 | 로그인 (PIN) | `/login` |
| 2 | 홈 | `/` |
| 3 | 신규 고객 등록 | `/register` |
| 4 | 고객 상세 — 방문 히스토리 | `/customer/:id` |
| 5 | 고객 상세 — 오늘 설문 결과 | `/customer/:id?tab=survey` |
| 6 | 고객 상세 — 시술 메모 | `/customer/:id?tab=memo` |

### 고객 설문 영역 (모바일 + 태블릿)

| # | 화면 | 경로 |
|---|------|------|
| 7 | 설문 메인 (신규/재방문 분기) | `/survey/:visitId` |
| 8 | Step 0 — 고객 정보 | `/survey/:visitId/step0` |
| 9 | Step 1 — 시술 선택 | `/survey/:visitId/step1` |
| 10 | Step 2 — 선호 무드 | `/survey/:visitId/step2` |
| 11 | Step 3 — 스타일 이미지 | `/survey/:visitId/step3` |
| 12 | Step 4 — 모발 고민 | `/survey/:visitId/step4` |
| 13 | Step 5 — 추가 요청 | `/survey/:visitId/step5` |
| 14 | 제출 완료 | `/survey/:visitId/complete` |

---

## 개발 단계

```
1단계  Tailwind v4 세팅 + 공통 컴포넌트     ← 현재 진행 중
2단계  레이아웃 컴포넌트 (SurveyHeader/Footer, ProgressBar)
3단계  고객 설문 화면 (Step 0~5 + 메인 + 완료)
4단계  디자이너 영역 (로그인, 홈, 등록, 상세 3탭)
5단계  Supabase 연동 + React Router 라우팅
6단계  실시간 알림 + 토스트 + 에러 처리
7단계  반응형 마무리 + 배포
```

---

## 퍼블리싱 레퍼런스 (HTML/SCSS)

기존 퍼블리싱 결과물은 GitHub Pages에서 확인 가능합니다.

| 화면 | 링크 |
|------|------|
| 홈 | [index.html](https://mightyantgirl.github.io/strnd/) |
| Step 1 — 시술 선택 | [step1.html](https://mightyantgirl.github.io/strnd/step1.html) |
| Step 2 — 스타일 선택 | [step2.html](https://mightyantgirl.github.io/strnd/step2.html) |
| Step 4 — 고민 선택 | [step4.html](https://mightyantgirl.github.io/strnd/step4.html) |
| Step 5 — 메모 입력 | [step5.html](https://mightyantgirl.github.io/strnd/step5.html) |
| 완료 | [complete.html](https://mightyantgirl.github.io/strnd/complete.html) |
| 디자인 시스템 가이드 | [design-system.html](https://mightyantgirl.github.io/strnd/design-system.html) |
