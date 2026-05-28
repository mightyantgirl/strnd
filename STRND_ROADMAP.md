# Strnd — 개발 로드맵

> 최종 기획서(strnd-final-prompt.md) 기준으로 정리.
> 마지막 업데이트: 2026-05-27

---

## 프로젝트 개요

```
이름      Strnd (스트랜드)
정의      헤어디자이너 1인 살롱용 고객 설문·시술 기록 관리 웹앱
규모      고객 100명 이하, 디자이너 1명
용도      실제 서비스 (남자친구 헤어샵) + 포트폴리오
```

---

## 기술 스택 (확정)

```
Frontend     React 18 + JavaScript (TypeScript는 추후 단계적 전환)
Routing      React Router v6
Styling      Tailwind CSS v4 + @theme 토큰 시스템
Backend      Spring Boot (Java) — REST API 방식 연동
Database     MySQL (JPA)
Auth         커스텀 PIN 인증 4자리
빌드툴       Vite
```

---

## 화면 구성 (총 16개)

### 디자이너 영역 — 모바일 전용 (8개)

| # | 화면 | 경로 |
|---|------|------|
| 1 | 로그인 (PIN 입력) | `/login` |
| 2 | 홈 — 검색 + 신규 등록 + 최근 방문 | `/` |
| 3 | 신규 고객 등록 | `/register` |
| 4 | 고객 상세 — 방문 히스토리 탭 | `/customer/:id` |
| 5 | 고객 상세 — 오늘 설문 결과 탭 | `/customer/:id?tab=survey` |
| 6 | 고객 상세 — 메모 탭 | `/customer/:id?tab=memo` |
| 4-1 | 설문 없이 바로 기록 | `/customer/:id/record` |
| 4-2 | 시술 결과 기록 | `/visit/:visitId/result` |

### 고객 설문 영역 — 모바일 + 태블릿 (8개)

| # | 화면 | 경로 |
|---|------|------|
| 7 | 설문 메인 (신규/재방문 분기) | `/survey/:visitId` |
| 8 | Step 0 — 고객 정보 입력 | `/survey/:visitId/step0` |
| 9 | Step 1 — 시술 선택 | `/survey/:visitId/step1` |
| 10 | Step 2 — 선호 스타일 선택 | `/survey/:visitId/step2` |
| 11 | Step 3 — 이미지 카드 선택 | `/survey/:visitId/step3` |
| 12 | Step 4 — 모발 상태 | `/survey/:visitId/step4` |
| 13 | Step 5 — 추가 요청 | `/survey/:visitId/step5` |
| 14 | 제출 완료 | `/survey/:visitId/complete` |

---

## STATUS 흐름

```
일반 흐름    PENDING → SUBMITTED → COMPLETED
바로 기록    (PENDING 생략) → COMPLETED

COMPLETED 시 customers.LAST_VISIT_DT 업데이트 (백엔드 trigger)
```

---

## 데이터 모델 (MySQL / JPA)

### customers 테이블

```sql
id              BIGINT      PK, AUTO_INCREMENT
name            VARCHAR     NOT NULL
phone           VARCHAR     NOT NULL
designer_memo   TEXT
created_at      DATETIME    DEFAULT now()
last_visit_dt   DATETIME
visit_count     INT         DEFAULT 0
```

### visits 테이블

```sql
id              BIGINT      PK, AUTO_INCREMENT
customer_id     BIGINT      FK → customers.id
date            DATETIME    DEFAULT now()
status          ENUM        'PENDING' | 'SUBMITTED' | 'COMPLETED'

-- survey
gender              VARCHAR
visit_channel       JSON        (배열)
referrer            TEXT
requested_service   JSON        (배열)
preferred_style     JSON        (배열)
requested_images    JSON        (배열)
needs_consultation  BOOLEAN     DEFAULT false
concerns            JSON        (배열)
additional_request  TEXT
submitted_at        DATETIME

-- treatment
service_category    VARCHAR
service_menu        VARCHAR     NOT NULL (바로기록/시술결과기록 공통 필수)
service_note        TEXT        NOT NULL (바로기록/시술결과기록 공통 필수)
product_used        TEXT
special_note        TEXT
completed_at        DATETIME
```

### style_images 테이블

```sql
id          BIGINT      PK, AUTO_INCREMENT
name        VARCHAR
image_url   TEXT
category    VARCHAR     -- '컷' | '펌' | '컬러'
sort_order  INT
is_active   BOOLEAN     DEFAULT true
created_at  DATETIME    DEFAULT now()
```

### settings 테이블 (단일 row)

```sql
id              VARCHAR     PK DEFAULT 'designer'
designer_name   VARCHAR
pin_hash        VARCHAR
last_login_at   DATETIME
```

---

## 폴더 구조

```
src/
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Chip.jsx
│   ├── StyleCard.jsx
│   ├── Toast.jsx
│   ├── Dropdown.jsx
│   ├── Badge.jsx
│   ├── CustomerCard.jsx
│   ├── VisitCard.jsx
│   ├── SurveyCard.jsx
│   ├── Modal.jsx
│   ├── ProgressBar.jsx
│   ├── Tabs.jsx
│   ├── BottomSheet.jsx
│   ├── SurveyHeader.jsx
│   └── SurveyFooter.jsx
├── pages/
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Register.jsx
│   ├── CustomerDetail/
│   │   ├── index.jsx
│   │   ├── History.jsx
│   │   ├── TodaySurvey.jsx
│   │   └── Memo.jsx
│   ├── Record.jsx          ← 4-1 설문 없이 바로 기록
│   ├── TreatmentResult.jsx ← 4-2 시술 결과 기록
│   ├── Settings.jsx
│   └── Survey/
│       ├── Main.jsx
│       ├── Step0.jsx
│       ├── Step1.jsx
│       ├── Step2.jsx
│       ├── Step3.jsx
│       ├── Step4.jsx
│       ├── Step5.jsx
│       └── Complete.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useCustomer.js
│   └── useVisit.js
├── api/                    ← Spring Boot REST API 호출
│   ├── customers.js
│   ├── visits.js
│   └── settings.js
├── utils/
│   ├── dateUtils.js
│   ├── clipboard.js
│   └── csvExport.js
├── styles/
│   └── main.css            ← Tailwind v4 + @theme 토큰
└── App.jsx
```

---

## 작업 우선순위 (7단계)

### 1단계 — Tailwind v4 + 공통 컴포넌트 ← 현재 진행 중

| 작업 | 상태 |
|------|------|
| Tailwind v4 설치 및 vite.config 연결 | ✅ 완료 |
| `@theme` 토큰 정의 (컬러/폰트/간격/radius) | ✅ 완료 |
| `@utility` 반응형 타이포 7종 | ✅ 완료 |
| 글로벌 리셋 + body 기본 스타일 | ✅ 완료 |
| Button 컴포넌트 (Primary / Secondary / Ghost) | ✅ 완료 |
| Input 컴포넌트 (Default / Focus / Error) | ✅ 완료 |
| Chip 컴포넌트 (Service / Status) | ✅ 완료 |
| StyleCard 컴포넌트 | ✅ 완료 |
| Toast 컴포넌트 | ⬜ 대기 |
| Dropdown 컴포넌트 | ⬜ 대기 |
| Badge 컴포넌트 | ⬜ 대기 |
| CustomerCard 컴포넌트 | ⬜ 대기 |
| VisitCard 컴포넌트 | ⬜ 대기 |
| SurveyCard 컴포넌트 | ⬜ 대기 |
| Modal 컴포넌트 | ⬜ 대기 |

> 오늘 작업 순서: Toast → Dropdown → Badge → CustomerCard → VisitCard → SurveyCard → Modal

### 2단계 — 레이아웃 컴포넌트

| 작업 |
|------|
| SurveyHeader (뒤로가기 + 프로그레스바 영역) |
| SurveyFooter (안내문 + 다음 버튼) |
| ProgressBar |
| Tabs |
| BottomSheet |

### 3단계 — 고객 설문 화면 (8개)

| 작업 |
|------|
| 설문 메인 (신규/재방문 분기) |
| Step 0 — 고객 정보 |
| Step 1 — 시술 선택 |
| Step 2 — 스타일 선택 |
| Step 3 — 이미지 카드 |
| Step 4 — 모발 상태 |
| Step 5 — 추가 요청 |
| 제출 완료 |

### 4단계 — 디자이너 영역 (8개)

| 작업 |
|------|
| 로그인 (PIN 입력) |
| 홈 (검색 + 최근 방문) |
| 신규 고객 등록 |
| 고객 상세 — 히스토리 탭 |
| 고객 상세 — 오늘 설문 탭 (상태별 UI) |
| 고객 상세 — 메모 탭 |
| 4-1 설문 없이 바로 기록 |
| 4-2 시술 결과 기록 |

### 5단계 — Spring Boot REST API 연동 + 라우팅

| 작업 |
|------|
| React Router v6 기본 라우팅 설정 |
| 미인증 접근 시 로그인 리다이렉트 |
| PIN 인증 로직 (hash 검증 + localStorage 토큰) |
| customers CRUD API 연동 |
| visits CRUD API 연동 |
| CORS 설정 (Spring Boot) |

### 6단계 — 공통 UX

| 작업 |
|------|
| 토스트 메시지 (저장/복사 완료, 3초) |
| 확인 모달 (삭제/취소) |
| 로딩 상태 (스켈레톤 or 스피너) |
| 빈 상태 처리 |
| 네트워크/API 에러 처리 |
| 네이버 복사 (히스토리 카드 내부) |

### 7단계 — 반응형 마무리 + 배포

| 작업 |
|------|
| 태블릿 반응형 (설문 화면 1024px 기준) |
| CSV 내보내기 (설정 페이지) |
| 엑셀 Import (SheetJS → batch insert) ← ⭐⭐ 보통 |
| 배포 환경 설정 |

---

## 코드 작성 규칙

```
- 컴포넌트는 함수형으로만
- 변수명 camelCase, 컴포넌트명 PascalCase
- 색상·폰트·간격 직접 하드코딩 금지 — 반드시 Tailwind 토큰 사용
- API 호출은 try/catch로 에러 핸들링
- TypeScript strict 적용은 추후 단계적 전환 시 적용
```
