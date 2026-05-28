# Strnd 프로젝트 — Claude Code 개발 컨텍스트

> 헤어디자이너 1인 살롱용 고객 설문·시술 기록 관리 웹앱.
> 마지막 업데이트: 2026-05-27

---

## 1. 프로젝트 개요

```
이름        Strnd (스트랜드)
의미        Strand(머리카락 한 올)에서 모음 뺀 미니멀 네이밍
정의        헤어디자이너 1인 살롱용 고객 설문·시술 기록 관리 웹앱
규모        고객 100명 이하, 디자이너 1명 사용
용도        실제 서비스 (남자친구 헤어샵 운영용) + 본인 포트폴리오
```

### 핵심 가치

```
시술 전   설문으로 정확한 의도 파악
시술 중   디자이너가 결과를 보며 시술
시술 후   사용한 컬러·특이사항 기록
재방문    이전 기록 자동 호출
```

---

## 2. 사용자 / 디바이스 분리

```
디자이너   본인 폰              디자이너 전용 화면
고객       살롱 비치 태블릿      설문 화면만
연결 방식   URL (/survey/{visitId}) — 클립보드 복사 방식
```

---

## 3. 기술 스택

```
Frontend     React 18 + JavaScript (TypeScript는 추후 단계적 전환)
Routing      React Router v6
Styling      Tailwind CSS v4 + @theme 토큰 시스템
Backend      Spring Boot (Java) — REST API 방식 연동
Database     MySQL (JPA)
Auth         커스텀 PIN 인증 (4자리)
빌드툴       Vite
```

---

## 4. 유저 시나리오

### 4.1 첫방문 고객 플로우

```
[디자이너 폰]
1. 홈에서 고객 검색 → 결과 없음
2. "신규 등록" 클릭 → 이름, 연락처 입력 후 저장
   → customers row 생성
3. 자동으로 고객 상세 페이지 진입
4. "설문 시작" 버튼 클릭
   → visits row 생성 (status: PENDING)
   → 설문 URL 클립보드 자동 복사
   → 토스트 "설문 URL이 복사되었어요" (3초)

[고객 태블릿]
5. URL 접속 → 메인 (신규 환영)
6. Step 0~5 진행 → 제출
   → visits status: SUBMITTED

[디자이너 폰]
7. [오늘 설문 결과] 탭 — 설문 내용 전체 + "시술 내용 기록하기" 버튼
8. 시술 진행
9. "시술 내용 기록하기" → 4-2 시술 결과 기록 화면
   → visits status: COMPLETED
   → customers.LAST_VISIT_DT 업데이트 (백엔드 trigger)
```

### 4.2 단골/짧은 주기 재방문 고객 플로우 (설문 생략)

```
[디자이너 폰]
1. 홈에서 고객 검색 → 결과 표시
2. 고객 카드 클릭 → 고객 상세 진입
3. [방문 히스토리] 탭에서 이전 기록 확인
4. "설문 없이 바로 기록" 클릭 → 4-1 화면
   → visits row 생성 없이 바로 기록
   → 저장 시 visits status: COMPLETED (PENDING 생략)
   → customers.LAST_VISIT_DT 업데이트 (백엔드 trigger)
```

### 4.3 STATUS 흐름

```
일반 흐름    PENDING → SUBMITTED → COMPLETED
바로 기록    (PENDING 생략) → COMPLETED
```

---

## 5. 화면 구성 (총 16개)

### 5.1 디자이너 영역 (모바일 전용) — 8개

```
1.   로그인 (PIN 입력)
2.   홈 — 검색 + 신규 등록 + 최근 방문
3.   신규 고객 등록
4.   고객 상세 — 방문 히스토리 탭
5.   고객 상세 — 오늘 설문 결과 탭
6.   고객 상세 — 메모 탭 (디자이너 자유 메모)
4-1. 설문 없이 바로 기록
4-2. 시술 결과 기록
```

> 4, 5, 6은 한 페이지에서 탭으로 분리

### 5.2 고객 설문 영역 (모바일 + 태블릿) — 8개

```
7.  메인 — 신규/재방문 분기
8.  Step 0 — 고객 정보 입력
9.  Step 1 — 시술 선택
10. Step 2 — 선호 스타일 선택
11. Step 3 — 이미지 카드 선택
12. Step 4 — 모발 상태
13. Step 5 — 추가 요청
14. 제출 완료
```

---

## 6. 화면별 기능 명세

### 화면 1. 인증 (로그인)

#### 1.1 PIN 코드 진입

- 4자리 숫자 PIN 입력
- 최초 1회 PIN 설정 후 이후 동일 PIN으로 진입
- 잘못된 PIN 입력 시 오류 토스트 메시지

#### 1.2 자동 진입

- 인증 성공 후 localStorage 토큰 저장
- 만료 시 재입력 요청

#### 1.3 로그아웃

- 홈에서 수동 로그아웃 가능

---

### 화면 2. 홈

#### 2.1 인사말 표시

- "안녕하세요, [디자이너명]님"

#### 2.2 고객 이름 검색

- 검색 결과 카드 리스트 형태
  - 고객 이름
  - 마지막 방문일
  - 경과 시간
- 검색 결과 없음 → "+ 신규 등록" 버튼 표시

#### 2.3 최근 방문 고객 표시

- 최근 5명 카드 리스트
- 클릭 시 해당 고객 상세 진입

#### 2.4 신규 등록 진입

- 하단 고정 "신규 고객 등록" 버튼

---

### 화면 3. 신규 고객 등록

#### 3.1 입력 항목

- 이름 (필수)
- 연락처 (필수)
- 디자이너 메모 (선택)

#### 3.2 유효성 검사

- 이름: 1자 이상
- 연락처: 10~11자리 숫자
- 필수값 미입력 시 등록 버튼 비활성화

#### 3.3 등록 처리

- "등록하기" 클릭 시
  - customers row 생성
  - 등록 완료 후 해당 고객 상세 페이지 자동 이동

#### 3.4 취소 처리

- 뒤로가기 클릭 시 입력 내용 폐기 + 홈 이동
- 입력 내용 있을 시 확인 모달 표시

---

### 화면 4. 고객 상세 — 방문 히스토리 탭

#### 4.1 고객 정보 영역 (4·5·6 공통)

- 이름 / 연락처
- 마지막 방문일, 경과 시간 (~개월 전)
- 디자이너 메모 (있을 시)

#### 4.2 설문 시작 버튼

- "설문 시작" 클릭 시
  - visits row 생성 (status: PENDING)
  - 설문 URL 클립보드 자동 복사
  - **토스트 "설문 URL이 복사되었어요" (3초)** — URL 모달 없음
  - 고객 상세 화면 유지 (페이지 이동 없음)

#### 4.3 설문 없이 바로 기록 버튼

- 단골/짧은 주기 재방문 고객 대상
- 클릭 시 4-1 화면으로 이동

#### 4.4 탭 네비게이션

- 3개 탭: 히스토리 / 오늘 설문 / 메모
- 현재 탭 시각적 강조

#### 4.5 타임라인 표시 (히스토리)

- 최신순 정렬
- 각 아이템 표시 정보
  - 방문 날짜
  - 시술 내용 / 사용 약품 / 특이사항
  - 네이버 복사 버튼 (히스토리 카드 내부)
- 무한 스크롤 또는 페이지네이션

#### 4.6 빈 상태

- "아직 방문 기록이 없어요"

---

### 화면 5. 고객 상세 — 오늘 설문 탭

#### 5.1 상태별 UI

| STATUS | 표시 내용 |
|--------|-----------|
| PENDING | "작성된 설문이 아직 없어요" (빈 상태) |
| SUBMITTED | 설문 내용 전체 표시 + "시술 내용 기록하기" 버튼 + 서브텍스트 "메모를 저장하면 히스토리에 기록돼요" |
| COMPLETED | "작성된 설문이 아직 없어요" (PENDING과 동일) |

#### 5.2 설문 내용 표시 (SUBMITTED)

- 시술 선택 / 원하는 스타일 / 이미지 카드 / 모발 상태 / 요청사항
- 제출 시간
- "시술 내용 기록하기" 버튼 → 4-2 시술 결과 기록 화면

---

### 화면 6. 고객 상세 — 메모 탭

> 시술 기록이 아닌 디자이너 자유 메모란.
> 특이사항, 고객 선호도 등 디자이너가 자유롭게 기록.

#### 6.1 입력 항목

- 자유 메모 텍스트 영역 (제한 없음)

#### 6.2 저장 처리

- "저장하기" 클릭 시 customers.designer_memo 업데이트
- 저장 완료 토스트 메시지

---

### 화면 4-1. 설문 없이 바로 기록

> 단골/짧은 주기 재방문 고객 — 설문 생략 대응

- 타이틀: "오늘 시술 내용을 기록해주세요"
- 서브: "설문 없이 시술 내용만 간단히 남겨요"

#### 입력 항목

| 필드 | 필수 여부 |
|------|----------|
| 서비스 카테고리 | 선택 |
| 시술 메뉴 | ✅ 필수 |
| 시술 내용 | ✅ 필수 |
| 사용 약제 | 선택 |
| 특이사항 | 선택 |

#### 저장 처리

- 저장 시 visits row 생성, status: COMPLETED (PENDING 단계 없음)
- customers.LAST_VISIT_DT 업데이트 (백엔드 trigger)
- 저장 완료 토스트 후 히스토리 탭으로 이동

---

### 화면 4-2. 시술 결과 기록

> 고객 설문 완료(SUBMITTED) 후 디자이너가 시술 내용 기록

- 타이틀: "시술 결과를 기록해주세요"
- 서브: "고객 설문을 바탕으로 시술 내용을 남겨요"

#### 입력 항목

| 필드 | 필수 여부 |
|------|----------|
| 서비스 카테고리 | 선택 |
| 시술 메뉴 | ✅ 필수 |
| 시술 내용 | ✅ 필수 |
| 사용 약제 | 선택 |
| 특이사항 | 선택 |

#### 저장 처리

- 저장 시 visits status: SUBMITTED → COMPLETED
- customers.LAST_VISIT_DT 업데이트 (백엔드 trigger)
- 저장 완료 토스트 후 히스토리 탭으로 이동

---

### 화면 7. 고객 설문 — 메인

#### 7.1 분기 처리

- URL의 visitId로 고객 정보 조회
- 방문 이력 유무로 분기

#### 7.2 신규 고객

- "안녕하세요, [이름]님" + 첫 방문 환영 메시지
- "작성하기" 버튼

#### 7.3 재방문 고객

- "안녕하세요, [이름]님" + "[경과일]일 만에 방문해주셨네요"
- "작성하기" 버튼

---

### 화면 8. 고객 설문 — Step 0 고객 정보

- 상단 ProgressBar
- 타이틀: "고객님의 간단한 정보를 입력해주세요"
- 입력 항목
  - 성별 (필수)
  - 방문 경로 (체크박스, 필수)
  - 디자이너 소개 유무 (선택)

---

### 화면 9. 고객 설문 — Step 1 시술 선택

- 타이틀: "오늘 원하는 시술을 선택해주세요"
- 옵션: 컷 / 펌 / 컬러 시술 / 클리닉 / "정확한 상담이 필요해요"
- 다중 선택 가능

---

### 화면 10. 고객 설문 — Step 2 스타일 선택

- 타이틀: "선호하는 스타일을 골라주세요"
- 옵션: 자연스럽고 편안한 / 깔끔하고 단정한 / 트렌디하고 감각적인 / 개성있고 독특한 / 세련되고 고급스러운
- 다중 선택 가능

---

### 화면 11. 고객 설문 — Step 3 이미지 카드 선택

- 타이틀: "원하는 이미지의 스타일이 있나요?"
- 이미지 카드 그리드 (모바일 2열 / 태블릿 3열)
- 다중 선택 가능 / "직접 보여드릴게요" 체크 옵션
- 선택 없이도 진행 가능

---

### 화면 12. 고객 설문 — Step 4 모발 상태

- 타이틀: "현재 헤어스타일에서 신경쓰이는 부분이 있나요?"
- 다중 선택 가능 / 선택 없이도 진행 가능

---

### 화면 13. 고객 설문 — Step 5 추가 요청

- 타이틀: "추가적으로 디자이너에게 전달하고 싶은 사항이 있나요?"
- Textarea (최대 500자)
- "제출하기" 클릭 시 완료 화면 이동

---

### 화면 14. 고객 설문 — 제출 완료

- "작성 완료!" 메시지
- "멋진 스타일 만들어드릴게요" 안내
- "처음으로" 버튼 → 메인 진입 화면

---

## 7. 공통 기능

```
토스트 메시지     저장 / 복사 완료 알림 (3초 자동 사라짐)
모달 / 확인창     삭제 / 취소 등 위험한 액션 확인
빈 상태           검색 결과 없음, 방문 기록 없음 등 안내
반응형            모바일 / 태블릿 / 데스크탑 대응
네이버 복사       히스토리 카드 내부 — 포맷팅된 텍스트 클립보드 복사
CSV 내보내기      설정 페이지에서 전체 데이터 내보내기
```

네이버 복사 포맷:
```
[김지수 / 2024-05-04]
시술: 컬러 + 영양케어
컬러: 7NB + 0.6 톤다운
메모: 두피 민감, 약 강도 조절 필요
```

---

## 8. 데이터 모델

### 8.1 customers

```javascript
{
  id: number,
  name: string,           // 필수
  phone: string,          // 필수
  designerMemo: string,   // 선택 — 자유 메모란
  createdAt: string,
  lastVisitDt: string,
  visitCount: number,
}
```

### 8.2 visits

```javascript
{
  id: number,
  customerId: number,
  date: string,
  status: 'PENDING' | 'SUBMITTED' | 'COMPLETED',

  survey: {
    gender: string,
    visitChannel: string[],
    referrer: string,
    requestedService: string[],
    preferredStyle: string[],
    requestedStyleImages: string[],
    needsConsultation: boolean,
    concerns: string[],
    additionalRequest: string,
    submittedAt: string | null,
  },

  treatment: {
    serviceCategory: string,
    serviceMenu: string,      // 필수 (4-1, 4-2 공통)
    serviceNote: string,      // 필수 (4-1, 4-2 공통)
    productUsed: string,
    specialNote: string,
    completedAt: string | null,
  },
}
```

### 8.3 styleImages

```javascript
{
  id: number,
  name: string,
  imageUrl: string,
  category: string,   // '컷' | '펌' | '컬러'
  sortOrder: number,
  isActive: boolean,
  createdAt: string,
}
```

### 8.4 settings (단일 row)

```javascript
{
  id: 'designer',
  designerName: string,
  pinHash: string,
  lastLoginAt: string,
}
```

---

## 9. 라우팅 구조

```
/                            로그인 또는 홈
/login                       로그인 (PIN 입력)
/register                    신규 고객 등록
/customer/:id                고객 상세 (히스토리 탭 기본)
/customer/:id?tab=survey     오늘 설문 탭
/customer/:id?tab=memo       메모 탭
/customer/:id/record         4-1 설문 없이 바로 기록
/visit/:visitId/result       4-2 시술 결과 기록
/survey/:visitId             설문 메인 분기
/survey/:visitId/step0       Step 0 고객 정보
/survey/:visitId/step1       Step 1 시술 선택
/survey/:visitId/step2       Step 2 스타일 선택
/survey/:visitId/step3       Step 3 이미지 카드
/survey/:visitId/step4       Step 4 모발 상태
/survey/:visitId/step5       Step 5 추가 요청
/survey/:visitId/complete    설문 제출 완료
/settings                    설정 (CSV 내보내기 포함)
```

---

## 10. 디자인 시스템

### 10.1 토큰 구조 (Tailwind v4 @theme)

```css
@theme {
  /* color, spacing, radius, font-size 등 */
}
```

### 10.2 컬러

```
베이스      warm undertone 뉴트럴
포인트      Sage Green
포커스      Blue
```

### 10.3 타이포 (모바일 / 태블릿 반응형)

```
text-large    24px / 32px     페이지 제목
text-medium   18px / 24px     카드 제목
text-base     16px / 18px     본문
text-small    14px / 16px     보조 본문
text-tiny     13px / 14px     메타정보
text-micro    12px / 13px     캡션
text-label    12px / 13px     버튼·뱃지 레이블
```

### 10.4 간격 토큰

```
8 / 16 / 24 / 32 / 40 / 48 / 56 / 120
```

### 10.5 Border Radius

```
xs 4px / sm 8px / md 12px / lg 16px / xl 20px / 2xl 28px / full 999px
```

### 10.6 그리드

```
Mobile    360 × 800       4열, 거터 16, 마진 16
Tablet    1024 × 1366     12열, 거터 24, 마진 32
Desktop   1366 × 768      12열, 거터 24, 마진 48, 최대 1200px
```

### 10.7 브레이크포인트

```
tablet     768px~
desktop    1200px~
```

### 10.8 컴포넌트 현황

#### 완료
```
Button      Primary / Secondary / Ghost
Input       Default / Focus / Error
Chip        Service / Status
StyleCard
```

#### 제작 예정 (순서대로)
```
공통
  Toast
  Dropdown
  Modal

카드
  Badge
  CustomerCard
  VisitCard
  SurveyCard

레이아웃
  ProgressBar
  SurveyHeader
  SurveyFooter
  Tabs
  BottomSheet
```

### 10.9 폰트

```
Pretendard
```

---

## 11. 폴더 구조

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
│   ├── Settings.jsx
│   ├── CustomerDetail/
│   │   ├── index.jsx
│   │   ├── History.jsx
│   │   ├── TodaySurvey.jsx
│   │   └── Memo.jsx
│   ├── Record.jsx            ← 4-1 설문 없이 바로 기록
│   ├── TreatmentResult.jsx   ← 4-2 시술 결과 기록
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
├── api/                      ← Spring Boot REST API 호출
│   ├── customers.js
│   ├── visits.js
│   └── settings.js
├── utils/
│   ├── dateUtils.js
│   ├── clipboard.js
│   └── csvExport.js
├── styles/
│   └── main.css              ← Tailwind v4 + @theme 토큰
└── App.jsx
```

---

## 12. 코드 작성 규칙

```
- 컴포넌트는 함수형으로만
- 변수명 camelCase, 컴포넌트명 PascalCase
- 색상·폰트·간격 직접 하드코딩 금지 — 반드시 Tailwind 토큰 사용
- API 호출은 try/catch로 에러 핸들링
- TypeScript strict 적용은 추후 단계적 전환 시 적용
```
