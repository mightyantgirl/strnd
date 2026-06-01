# Strnd — 개발 로드맵

> 최종 기획서(strnd-final-prompt.md) 기준으로 정리.
> 기존 REACT_ROADMAP.md의 데이터베이스 설계·Export 등 유효한 내용 통합.

---

## 프로젝트 개요

```
이름      Strnd (스트랜드)
정의      헤어디자이너 1인 살롱용 고객 설문·시술 기록 관리 웹앱
규모      고객 100명 이하, 디자이너 1명
용도      실제 서비스 + 포트폴리오
```

---

## 기술 스택 (확정)

```
Frontend     React 19 + JavaScript (TypeScript는 추후 단계적 전환)
Routing      React Router v6
Styling      Tailwind CSS v4 + @theme 토큰 시스템
Auth         커스텀 PIN 인증 4자리
Hosting      Vercel
빌드툴       Vite
```

---

## 화면 구성 (총 14개)

### 디자이너 영역 — 모바일 전용 (6개)

| #   | 화면                              | 경로                       |
| --- | --------------------------------- | -------------------------- |
| 1   | 로그인 (PIN 입력)                 | `/login`                   |
| 2   | 홈 — 검색 + 신규 등록 + 최근 방문 | `/`                        |
| 3   | 신규 고객 등록                    | `/register`                |
| 4   | 고객 상세 — 방문 히스토리 탭      | `/customer/:id`            |
| 5   | 고객 상세 — 오늘 설문 결과 탭     | `/customer/:id?tab=survey` |
| 6   | 고객 상세 — 시술 메모 탭          | `/customer/:id?tab=memo`   |

### 고객 설문 영역 — 모바일 + 태블릿 (8개)

| #   | 화면                         | 경로                        |
| --- | ---------------------------- | --------------------------- |
| 7   | 설문 메인 (신규/재방문 분기) | `/survey/:visitId`          |
| 8   | Step 0 — 고객 정보 입력      | `/survey/:visitId/step0`    |
| 9   | Step 1 — 시술 선택           | `/survey/:visitId/step1`    |
| 10  | Step 2 — 선호 스타일 선택    | `/survey/:visitId/step2`    |
| 11  | Step 3 — 이미지 카드 선택    | `/survey/:visitId/step3`    |
| 12  | Step 4 — 모발 상태           | `/survey/:visitId/step4`    |
| 13  | Step 5 — 추가 요청           | `/survey/:visitId/step5`    |
| 14  | 제출 완료                    | `/survey/:visitId/complete` |

---

## 데이터 모델 (Supabase PostgreSQL)

### customers 테이블

```sql
id              UUID        PK, auto-generated
name            TEXT        NOT NULL
phone           TEXT        NOT NULL
designer_memo   TEXT
created_at      TIMESTAMP   DEFAULT now()
last_visit_at   TIMESTAMP
visit_count     INTEGER     DEFAULT 0
```

### visits 테이블

```sql
id              UUID        PK
customer_id     UUID        FK → customers.id

date            TIMESTAMP   DEFAULT now()
status          TEXT        'draft' | 'submitted' | 'completed'

-- survey (JSONB 또는 컬럼 분리)
gender              TEXT
visit_channel       TEXT[]
referrer            TEXT
requested_service   TEXT[]
preferred_style     TEXT[]
requested_images    TEXT[]
needs_consultation  BOOLEAN     DEFAULT false
concerns            TEXT[]
additional_request  TEXT
submitted_at        TIMESTAMP

-- treatment
product_used        TEXT
service_note        TEXT
special_note        TEXT
completed_at        TIMESTAMP
```

### style_images 테이블

```sql
id          UUID        PK
name        TEXT
image_url   TEXT        -- Supabase Storage URL
category    TEXT        -- '컷' | '펌' | '컬러'
order       INTEGER
is_active   BOOLEAN     DEFAULT true
created_at  TIMESTAMP   DEFAULT now()
```

### settings 테이블 (단일 row)

```sql
id              TEXT        PK DEFAULT 'designer'
designer_name   TEXT
pin_hash        TEXT
last_login_at   TIMESTAMP
```

---

## 폴더 구조

```
react/src/
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Card.jsx
│   ├── Chip.jsx
│   ├── ProgressBar.jsx
│   └── Modal.jsx
├── pages/
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Register.jsx
│   ├── CustomerDetail/
│   │   ├── index.jsx
│   │   ├── History.jsx
│   │   ├── TodaySurvey.jsx
│   │   └── TreatmentMemo.jsx
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
├── lib/
│   ├── supabase.js
│   └── queries.js
├── utils/
│   ├── dateUtils.js
│   ├── clipboard.js
│   └── csvExport.js
├── styles/
│   └── main.css       ← Tailwind v4 + @theme 토큰
└── App.jsx
```

---

## 작업 우선순위 (7단계)

### 1단계 — Tailwind v4 + 공통 컴포넌트 ← 현재 진행 중

| 작업                                                 | 상태    |
| ---------------------------------------------------- | ------- |
| Tailwind v4 설치 및 vite.config 연결                 | ✅ 완료 |
| `@theme` 토큰 정의 (컬러/폰트/간격/radius)           | ✅ 완료 |
| `@utility` 반응형 타이포 7종                         | ✅ 완료 |
| 글로벌 리셋 + body 기본 스타일                       | ✅ 완료 |
| Button 컴포넌트 (Primary / Secondary / Ghost)        | ⬜ 대기 |
| Input 컴포넌트 (Default / Focus / Error)             | ⬜ 대기 |
| Card 컴포넌트 (CustomerCard / VisitCard / StyleCard) | ⬜ 대기 |
| Chip 컴포넌트 (Service / Status)                     | ⬜ 대기 |
| Modal 컴포넌트                                       | ⬜ 대기 |

### 2단계 — 레이아웃 컴포넌트

| 작업                                        |
| ------------------------------------------- |
| SurveyHeader (뒤로가기 + 프로그레스바 영역) |
| SurveyFooter (안내문 + 다음 버튼)           |
| ProgressBar                                 |

### 3단계 — 고객 설문 화면 (8개)

| 작업                         |
| ---------------------------- |
| 설문 메인 (신규/재방문 분기) |
| Step 0 — 고객 정보           |
| Step 1 — 시술 선택           |
| Step 2 — 스타일 선택         |
| Step 3 — 이미지 카드         |
| Step 4 — 모발 상태           |
| Step 5 — 추가 요청           |
| 제출 완료                    |

### 4단계 — 디자이너 영역 (6개)

| 작업                     |
| ------------------------ |
| 로그인 (PIN 입력)        |
| 홈 (검색 + 최근 방문)    |
| 신규 고객 등록           |
| 고객 상세 — 히스토리 탭  |
| 고객 상세 — 오늘 설문 탭 |
| 고객 상세 — 시술 메모 탭 |

### 5단계 — Supabase 연동 + 라우팅

| 작업                                                       |
| ---------------------------------------------------------- |
| Supabase 프로젝트 생성 + 환경변수 .env 설정                |
| 테이블 생성 (customers / visits / style_images / settings) |
| React Router v6 기본 라우팅 설정                           |
| 미인증 접근 시 로그인 리다이렉트                           |
| PIN 인증 로직 (hash 검증 + localStorage 토큰)              |
| customers CRUD                                             |
| visits CRUD                                                |

### 6단계 — 실시간 + 공통 UX

| 작업                                              |
| ------------------------------------------------- |
| Supabase Realtime — 설문 제출 시 디자이너 폰 알림 |
| 토스트 메시지 (저장/복사 완료, 3초)               |
| 확인 모달 (삭제/취소)                             |
| 로딩 상태 (스켈레톤 or 스피너)                    |
| 빈 상태 처리                                      |
| 네트워크/Supabase 에러 처리                       |
| CSV 클립보드 복사 (시술 메모 탭)                  |

### 7단계 — 반응형 마무리 + 배포

| 작업                                                      |
| --------------------------------------------------------- |
| 태블릿 반응형 (설문 화면 1024px 기준)                     |
| 엑셀 Import (SheetJS → Supabase batch insert) ← ⭐⭐ 보통 |
| Vercel 배포 + 환경변수 등록                               |
| Supabase Row Level Security 설정                          |

---

## 공통 기능 명세

```
토스트         저장 / 복사 완료 (3초 자동)
모달           삭제 / 취소 확인
빈 상태        검색 없음 / 기록 없음
반응형         모바일 360px / 태블릿 1024px / 데스크탑 1200px
CSV 복사       시술 메모 → 클립보드 포맷 복사
엑셀 Import    SheetJS로 고객 명단 일괄 등록
```

---

## 코드 작성 규칙

```
- 컴포넌트는 함수형으로만
- 변수명 camelCase, 컴포넌트명 PascalCase
- Supabase 환경변수는 반드시 .env에 분리 (.gitignore 포함)
- 모든 Supabase 호출은 try/catch로 에러 핸들링
- 색상·폰트·간격 직접 하드코딩 금지 — 반드시 Tailwind 토큰 사용
- TypeScript strict 적용은 추후 단계적 전환 시 적용
```

---

## 기존 REACT_ROADMAP.md에서 유지한 항목

- 데이터베이스 테이블 설계 (users→customers, consultations→visits로 리네이밍)
- CSV Export 기능 (7단계 포함)
- 엑셀 Import 기능 (SheetJS, ⭐⭐ 보통 난이도)
- Vercel 배포 방식
