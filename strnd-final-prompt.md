# Strnd 프로젝트 — Claude Code 개발 컨텍스트

> 헤어디자이너 1인 살롱용 고객 설문·시술 기록 관리 웹앱.
> 이 문서는 노션 최종 기획서 기준 개발 작업 컨텍스트.

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
연결 방식   URL (/survey/{visitId})
```

---

## 3. 기술 스택

```
Frontend     React 18 + TypeScript
Routing      React Router v6
Styling      SCSS + 디자인 토큰 시스템
Database     Firebase Firestore
Auth         커스텀 PIN 인증 (4자리)
Storage      Firebase Storage (스타일 이미지)
Hosting      Vercel
빌드툴       Vite
```

---

## 4. 유저 시나리오

### 4.1 첫방문 고객 플로우

```
[디자이너 폰]
1. 홈에서 고객 검색 → 결과 없음
2. "신규 등록" 클릭 → 이름, 연락처 입력 후 저장
   → customers 테이블에 row 생성
3. 자동으로 고객 상세 페이지 진입
4. "설문 시작" 버튼 클릭 → URL 생성

[고객 태블릿]
5. URL 접속 → 메인 (신규 환영)
6. Step 0~5 진행 → 제출
   → visits 테이블에 row 생성 (customerId 연결)

[디자이너 폰]
7. 실시간 알림 → [오늘 설문 결과] 탭 확인
8. 시술 진행
9. [시술 메모] 탭에서 기록
   → visits 테이블 row 업데이트
```

### 4.2 재방문 고객 플로우

```
[디자이너 폰]
1. 홈에서 고객 검색 → 결과 표시
2. 고객 카드 클릭 → 고객 상세 진입
3. [방문 히스토리] 탭에서 이전 기록 확인
4. "설문 시작" 버튼 클릭 → URL 생성

(이후 5~9는 첫방문과 동일)
```

### 4.3 핵심 차이

```
첫방문 → "신규 등록" 단계 추가
재방문 → 이전 기록 확인 단계 추가
이외 흐름은 동일
```

---

## 5. 화면 구성 (총 13개)

### 5.1 디자이너 영역 (모바일 전용) — 6개

```
1. 로그인 (PIN 입력)
2. 홈 — 검색 + 신규 등록 + 최근 방문
3. 신규 고객 등록
4. 고객 상세 — 방문 히스토리 탭
5. 고객 상세 — 오늘 설문 결과 탭
6. 고객 상세 — 시술 메모 탭
```

> 4, 5, 6은 한 페이지에서 탭으로 분리

### 5.2 고객 설문 영역 (모바일 + 태블릿) — 7개

```
7. 메인 — 신규/재방문 분기
8. Step 0 — 고객 정보 입력
9. Step 1 — 시술 선택
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

#### 1.2 자동 진입 (보류)

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
- 클릭 시 신규 등록 화면 이동

#### 2.5 설정 (보류)

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
  - customers 테이블에 row 생성
  - 등록 완료 후 해당 고객 상세 페이지 자동 이동

#### 3.4 취소 처리

- 뒤로가기 클릭 시 입력 내용 폐기 + 홈 이동
- 입력 내용 있을 시 확인 모달 표시 ("작성 중인 내용이 있습니다")

---

### 화면 4. 고객 상세 — 방문 히스토리

#### 4.1 고객 정보 영역 (4·5·6 공통)

- 이름
- 연락처
- 마지막 방문일, 경과 시간 (~개월 전)
- 디자이너 메모 (있을 시)

#### 4.2 설문 시작

- "설문 시작" 메인 버튼
- 클릭 시
  - 설문 URL 생성
  - QR 또는 URL 표시 모달
  - 태블릿에서 해당 URL 접속 안내

#### 4.3 탭 네비게이션

- 3개 탭: 히스토리 / 오늘 설문 / 시술 메모
- 현재 탭 시각적 강조

#### 4.4 타임라인 표시

- 최신순 정렬
- 각 아이템 표시 정보
  - 방문 날짜
  - 시술 내용
  - 사용 약품
  - 디자이너 메모
- 무한 스크롤 또는 페이지네이션

#### 4.5 빈 상태

- 첫 방문 고객일 경우 "아직 방문 기록이 없습니다"

---

### 화면 5. 고객 상세 — 오늘 설문 결과

#### 5.1 설문 결과 표시

- 시술 선택 (선택된 시술 표시)
- 원하는 스타일 (선택된 이미지 카드)
- 원하는 컬러 (선택된 컬러 칩)
- 모발 손상도
- 신경 쓰이는 부분
- 요청사항
- 제출 시간

#### 5.2 상태별 표시

- 설문 미시작 → "설문 시작 전입니다"

---

### 화면 6. 고객 상세 — 시술 메모

#### 6.1 입력 항목

- 사용 약품 (텍스트필드)
- 시술 내용 (텍스트필드)
- 특이사항 (텍스트필드)

#### 6.2 저장 처리

- "저장하기" 클릭 시
  - visits 테이블의 해당 row 업데이트
  - 저장 완료 토스트 메시지
  - 자동으로 히스토리 탭으로 이동 (선택)

#### 6.3 클립보드 복사

- CSV 내보내기 또는 복사 버튼 클릭 시
- 포맷팅된 텍스트 자동 복사
  ```
  [김지수 / 2024-05-04]
  시술: 컬러 + 영양케어
  컬러: 7NB + 0.6 톤다운
  메모: 두피 민감, 약 강도 조절 필요
  ```
- 복사 완료 토스트 메시지

#### 6.4 수정 모드

- 이미 저장된 시술 메모가 있을 시 자동으로 기존 값 불러옴
- 수정 후 재저장 가능

---

### 화면 7. 고객 설문 — 메인

#### 7.1 분기 처리

- URL의 customerId로 고객 정보 조회
- 방문 이력 유무로 분기

#### 7.2 신규 고객 (방문 이력 없음)

- "안녕하세요, [이름]님" 인사
- 첫 방문 환영 메시지
- "작성하기" 버튼

#### 7.3 재방문 고객 (방문 이력 있음)

- "안녕하세요, [이름]님"
- "[경과일]일 만에 방문해주셨네요"
- "작성하기" 버튼

---

### 화면 8. 고객 설문 — Step 0 고객 정보

- 상단 — Progress Bar
- 페이지 타이틀 — "고객님의 간단한 정보를 입력해주세요"
- 입력 항목
  - 성별 (텍스트박스) — 필수
  - 방문 경로 (체크박스) — 필수
  - 디자이너 소개 유무 (텍스트박스) — 선택

---

### 화면 9. 고객 설문 — Step 1 시술 선택

- 페이지 타이틀 — "오늘 원하는 시술을 선택해주세요"
- 선택 옵션
  - 컷
  - 펌
  - 컬러 시술
  - 클리닉
  - "정확한 상담이 필요해요" (별도 옵션)
- 다중 선택 가능
- "다음" 버튼 클릭 시 단계 이동

---

### 화면 10. 고객 설문 — Step 2 스타일 선택

- 페이지 타이틀 — "선호하는 스타일을 골라주세요"
- 선택 옵션
  - 자연스럽고 편안한
  - 깔끔하고 단정한
  - 트랜디하고 감각적인
  - 개성있고 독특한
  - 세련되고 고급스러운
- 다중 선택 가능
- "다음" 버튼 클릭 시 단계 이동

---

### 화면 11. 고객 설문 — Step 3 이미지 카드 선택

- 페이지 타이틀 — "원하는 이미지의 스타일이 있나요?"
- 이미지 카드 그리드
  - 디자이너가 사전 등록한 스타일 이미지 표시
  - 모바일 2열 / 태블릿 3열
  - 무한 스크롤
- 다중 선택 가능
- "직접 보여드릴게요" 체크 옵션
- 선택 없이도 진행 가능 (이 경우 '선택 안함')
- "다음" 버튼 클릭 시 단계 이동

---

### 화면 12. 고객 설문 — Step 4 모발 상태

- 페이지 타이틀 — "현재 헤어스타일에서 신경쓰이는 부분이 있나요?"
- 선택 옵션 (다중 선택 가능)
- 선택 없이도 진행 가능 (이 경우 '선택 안함')
- "다음" 버튼 클릭 시 단계 이동

---

### 화면 13. 고객 설문 — Step 5 추가 요청

- 페이지 타이틀 — "추가적으로 디자이너에게 전달하고 싶은 사항이 있나요?"
- Textarea (최대 500자) + 플레이스홀더
- "제출하기" 클릭 시 완료 화면 이동

---

### 화면 14. 고객 설문 — 제출 완료

- "작성 완료!" 메시지
- "멋진 스타일 만들어드릴게요" 안내
- 자동으로 디자이너 폰에 알림
- "처음으로" 버튼 → 메인 진입 화면 이동

---

## 7. 공통 기능

```
토스트 메시지     저장 / 복사 완료 알림 (3초 자동 사라짐)
모달 / 확인창     삭제 / 취소 등 위험한 액션 확인
빈 상태           검색 결과 없음, 방문 기록 없음 등 안내
반응형            모바일 / 태블릿 / 데스크탑 대응
CSV 내보내기      시술 메모를 클립보드로 복사
```

---

## 8. 데이터 모델

### 8.1 customers 컬렉션

```typescript
{
  id: string;              // 자동 생성
  name: string;            // 필수
  phone: string;           // 필수
  designerMemo?: string;   // 선택
  createdAt: Timestamp;
  lastVisitAt?: Timestamp;
  visitCount: number;
}
```

### 8.2 visits 컬렉션

```typescript
{
  id: string;
  customerId: string;      // customers.id 참조
  date: Timestamp;

  survey: {
    gender: string;                    // Step 0
    visitChannel: string[];            // Step 0
    referrer?: string;                 // Step 0 (선택)
    requestedService: string[];        // Step 1
    preferredStyle: string[];          // Step 2
    requestedStyleImages: string[];    // Step 3
    needsConsultation: boolean;        // Step 3
    concerns: string[];                // Step 4
    additionalRequest: string;         // Step 5
    submittedAt: Timestamp | null;
  };

  treatment: {
    productUsed: string;
    serviceNote: string;
    specialNote: string;
    completedAt: Timestamp | null;
  };

  status: "draft" | "submitted" | "completed";
}
```

### 8.3 styleImages 컬렉션

```typescript
{
  id: string
  name: string
  imageUrl: string // Firebase Storage URL
  category: string // "컷" | "펌" | "컬러"
  order: number
  isActive: boolean
  createdAt: Timestamp
}
```

### 8.4 settings 컬렉션 (단일 문서)

```typescript
{
  id: 'designer'
  designerName: string
  pinHash: string
  lastLoginAt: Timestamp
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
/customer/:id?tab=memo       시술 메모 탭
/survey/:visitId             설문 메인 분기
/survey/:visitId/step0       Step 0 고객 정보
/survey/:visitId/step1       Step 1 시술 선택
/survey/:visitId/step2       Step 2 스타일 선택
/survey/:visitId/step3       Step 3 이미지 카드
/survey/:visitId/step4       Step 4 모발 상태
/survey/:visitId/step5       Step 5 추가 요청
/survey/:visitId/complete    설문 제출 완료
/settings                    설정 (보류)
```

---

## 10. 디자인 시스템

### 10.1 토큰 구조 (SCSS 기반)

```
$base-*    원시값 (color, spacing, radius)
$sema-*    역할 정의 (bg, text, border)
$comp-*    컴포넌트 전용 (button-primary-bg 등)
```

### 10.2 컬러

```
베이스      warm undertone 뉴트럴
포인트      Sage Green (#6B8F5E) ← 임시
포커스      #435EE5
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
$space-8 / 16 / 24 / 32 / 40 / 48 / 56 / 120
```

### 10.5 Border Radius

```
xs 4px / sm 8px / md 12px / lg 16px / xl 20px / 2xl 28px / full 999px
```

### 10.6 그리드

```
Mobile    360 × 800       4열, 거터 16, 마진 16  → 1열 70px
Tablet    1024 × 1366     12열, 거터 24, 마진 32
Desktop   1366 × 768      12열, 거터 24, 마진 48, 최대 1200px
```

### 10.7 브레이크포인트

```
tablet     768px~
desktop    1200px~
```

### 10.8 컴포넌트 네이밍

```
Button/    Primary / Secondary / Ghost
Card/      StyleCard / CustomerCard / VisitCard
Chip/      Status / Service
Input/     Default / Focus / Error
Progress/  Bar
Layout/    SurveyHeader / SurveyFooter
```

### 10.9 폰트

```
Pretendard
```

---

## 11. 폴더 구조

```
src/
├── components/       공통 컴포넌트
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Chip.tsx
│   ├── ProgressBar.tsx
│   └── Modal.tsx
├── pages/            라우팅 페이지
│   ├── Login.tsx
│   ├── Home.tsx
│   ├── Register.tsx
│   ├── CustomerDetail/
│   │   ├── index.tsx
│   │   ├── History.tsx
│   │   ├── TodaySurvey.tsx
│   │   └── TreatmentMemo.tsx
│   └── Survey/
│       ├── Main.tsx
│       ├── Step0.tsx
│       ├── Step1.tsx
│       ├── Step2.tsx
│       ├── Step3.tsx
│       ├── Step4.tsx
│       ├── Step5.tsx
│       └── Complete.tsx
├── hooks/            커스텀 훅
│   ├── useAuth.ts
│   ├── useCustomer.ts
│   └── useVisit.ts
├── lib/              Firebase
│   ├── firebase.ts
│   └── firestore.ts
├── types/            TypeScript 타입
│   └── index.ts
├── utils/            유틸 함수
│   ├── dateUtils.ts
│   ├── clipboard.ts
│   └── csvExport.ts
├── styles/           SCSS
│   ├── _tokens.scss
│   ├── _mixins.scss
│   ├── _reset.scss
│   ├── _typography.scss
│   └── main.scss
└── App.tsx
```

---

## 12. 초기 세팅 요청 사항

아래 순서대로 프로젝트 세팅:

```
1. Vite + React + TypeScript 프로젝트 생성
2. SCSS 설치 및 토큰 파일 적용
3. React Router v6 설치 및 기본 라우팅 설정
4. Firebase 설치 및 환경변수 .env 처리
5. Firebase Firestore + Storage 연결
6. 폴더 구조 세팅
7. 기본 컴포넌트 (Button, Input, Card, Chip) 생성
8. 레이아웃 컴포넌트 (SurveyHeader, SurveyFooter, ProgressBar) 생성
```

---

## 13. 작업 우선순위

```
1단계   SCSS 토큰 + 공통 컴포넌트
2단계   레이아웃 컴포넌트 (SurveyHeader, SurveyFooter, ProgressBar)
3단계   고객 설문 화면 (Step 0~5 + 메인 + 완료)
4단계   디자이너 영역 (로그인 + 홈 + 등록 + 상세 3탭)
5단계   Firebase 연동 + 라우팅
6단계   실시간 리스너 + 토스트 + 에러 처리
7단계   반응형 마무리 + 배포
```

---

## 14. 코드 작성 규칙

```
- TypeScript strict 모드 적용
- any 타입 사용 금지
- 컴포넌트는 함수형으로만
- 변수명 camelCase, 컴포넌트명 PascalCase
- Firebase 환경변수는 반드시 .env에 분리 (.gitignore 포함)
- 모든 Firebase 호출은 try/catch로 에러 핸들링
- SCSS는 BEM 네이밍 + 토큰 사용 필수
- 직접 색상·폰트·간격 하드코딩 금지 (반드시 토큰 사용)
```
