<p align="center">
  <img src="public/preview.png" alt="KIO" width="200" />
</p>

<h1 align="center">키오스쿨</h1>

<p align="center">대학 축제 주점을 위한 QR 테이블 주문 서비스</p>

<p align="center">
  <a href="https://kio-school.com">서비스</a> ·
  <a href="https://kio-school.com/info">소개</a> ·
  <a href="https://github.com/KioSchool/KioSchool-API">API 저장소</a> ·
  <a href="https://www.instagram.com/kioschool/">인스타그램</a>
</p>

손님은 테이블에 붙은 QR을 찍어 휴대폰으로 주문하고, 운영진은 PC 화면에서 주문·테이블·매출을 관리한다.

이 저장소는 키오스쿨의 웹 프론트엔드(손님 주문 화면, 운영진 화면, 서비스 소개 페이지)다. 서버는 [KioSchool-API](https://github.com/KioSchool/KioSchool-API)에 있다.

## 주요 기능

### 손님

- 테이블 QR을 찍으면 그 주점의 메뉴판이 열린다. 앱 설치나 로그인은 필요 없다
- 장바구니에 담고 입금자명과 송금 방법(토스, 계좌이체)을 고르면 주문이 들어가고, 주점 계좌로 송금한다
- 운영진이 입금을 확인하면 결제완료, 음식이 나가면 서빙완료로 주문 상태가 바뀐다

### 운영진 (PC 전용)

- 학교 이메일로 가입하고, 손님이 송금할 주점 계좌를 등록한다
- 주점을 만들고 메뉴·카테고리·품절 여부를 관리한다
- 테이블 수를 정하면 테이블마다 주문용 QR이 만들어진다
- 실시간 주문: 새 주문 알림음, 입금 확인, 서빙 처리, 취소
- 테이블 현황: 테이블별 사용 시간과 주문 금액, 배치도·목록 보기
- 주문 통계, 주문 타임라인, 전체 주문 내역

### 슈퍼어드민

서비스 관리용 화면. 주점·사용자 조회, 가입 가능한 학교 이메일 도메인과 은행 목록, 문의, 축제 달력, 서비스 대시보드를 다룬다.

## 기술 스택

| 구분 | 사용 |
|---|---|
| 기본 | React 18, TypeScript, Vite 7 |
| 라우팅·상태 | React Router v6, Jotai |
| 스타일 | Emotion, MUI v7 |
| 통신 | Axios, SockJS + STOMP (실시간 주문) |
| 빌드 | vite-prerender-plugin (소개 페이지 정적 생성) |
| 모니터링 | Sentry, Google Analytics 4 |
| 개발 도구 | Storybook 8, ESLint(airbnb-typescript), Prettier, husky + lint-staged |

## 로컬에서 실행하기

필요한 것: Node.js 22, Yarn 1

```bash
yarn install
```

```bash
yarn start
```

http://localhost:3000 에서 열린다. 개발 서버는 `/api` 요청을 `http://localhost:8080`으로 넘기므로, 화면에 데이터가 나오려면 [KioSchool-API](https://github.com/KioSchool/KioSchool-API)를 로컬에서 함께 띄워야 한다(API 저장소 README의 로컬 DB·서버 실행 참고).

손님 주문 화면은 테이블 QR에 담긴 주소 형식으로 연다.

```
http://localhost:3000/order?workspaceId=<주점 ID>&tableNo=<테이블 번호>&tableHash=<테이블 해시>
```

### 빌드 모드와 환경 변수

| 명령 | 모드 | 환경 파일 | API 주소 |
|---|---|---|---|
| `yarn start` | development | `.env.development` | `localhost:8080` (`/api` 프록시) |
| `yarn build:local` | development | `.env.development` | 로컬 |
| `yarn build:dev` | dev | `.env.dev` | `dev-api.kio-school.com` |
| `yarn build` | production | `.env.production` | `api.kio-school.com` |

환경 파일은 저장소에 들어 있고, 값은 모두 브라우저에 그대로 노출되는 공개 값이다. 내 PC에서만 바꿀 값은 `.env.development.local`에 둔다(git 제외).

| 변수 | 용도 |
|---|---|
| `VITE_ENVIRONMENT` | 환경 이름. Sentry 환경 구분에 쓰고, `production`이 아니면 검색 엔진 노출을 막는다(noindex) |
| `VITE_API_BASE_URL` | API 주소 |
| `VITE_WS_URL` | 실시간 주문 WebSocket(SockJS) 주소 |
| `VITE_GA_ID` | Google Analytics 측정 ID. 비워 두면 GA를 불러오지 않는다 |
| `VITE_INSIGHT_CARD_ENABLED` | 운영진 대시보드·주문 통계의 인사이트 카드 표시 여부 |
| `VITE_TURNSTILE_SITE_KEY` | 문의 폼 봇 차단(Cloudflare Turnstile) 사이트 키 |

### 빌드 결과 확인

빌드하면 `build/`에 결과가 생긴다. `/`, `/info`, `/privacy`는 미리 렌더링된 HTML로 나오고, `sitemap.xml`과 `robots.txt`도 함께 만들어진다(`scripts/generate-seo-assets.mjs`).

개발 서버(`yarn start`)는 미리 렌더링을 하지 않는다. 배포본과 같은 첫 화면을 확인하려면 로컬 모드로 빌드한 뒤 `yarn preview`로 띄운다. preview도 3000번 포트에서 `/api`를 로컬 API로 넘긴다.

```bash
yarn build:local && yarn preview
```

Sentry 소스맵 업로드에는 Sentry 인증 토큰(`SENTRY_AUTH_TOKEN` 또는 `.env.sentry-build-plugin`)이 필요하다. 토큰이 없으면 경고만 나오고 빌드는 그대로 끝난다.

## 스크립트

| 명령 | 설명 |
|---|---|
| `yarn start` | 개발 서버 (3000) |
| `yarn build`, `yarn build:dev`, `yarn build:local` | 빌드 (위 표 참고) |
| `yarn preview` | 빌드 결과 띄우기 (3000) |
| `yarn storybook` | Storybook (6006) |
| `yarn build-storybook` | Storybook 정적 빌드 |
| `yarn lint`, `yarn lint:fix` | ESLint 검사, 자동 수정 |

커밋할 때 husky가 lint-staged를 실행해, 바뀐 `.ts`·`.tsx` 파일에 `eslint --fix`와 `prettier --write`를 적용한다.

## 폴더 구조

```
src/
├── apis/         API 클라이언트 (userApi, adminApi, superAdminApi)
├── components/   컴포넌트 (common, user, admin, super-admin)
├── constants/    라우트, URL, 화면 문구와 데이터
├── hooks/        커스텀 훅
├── jotai/        전역 상태
├── pages/        라우트별 페이지
├── resources/    이미지, 아이콘, 알림음, 색상
├── styles/       전역 스타일, flex 믹스인
├── types/        타입 정의
├── utils/        유틸 함수
└── prerender.tsx 소개 페이지 프리렌더 진입점
```

컴포넌트 작성법, 이름 규칙, import 순서, 스타일 규칙은 [CLAUDE.md](CLAUDE.md)에 정리돼 있다.

## 브랜치와 배포

| 브랜치 | 역할 |
|---|---|
| `master` | 기본 브랜치. 기능 브랜치를 여기서 따서 여기로 PR을 보낸다 |
| `release` | 운영 서버(kio-school.com) 배포용. `master`에서 `release`로 PR(`DEPLOY - ...`)을 보내 올린다 |

## PR 규칙

- 제목은 `종류 - 설명` 형식이고 CI가 검사한다. 종류는 `ADD`, `FIX`, `EDIT`, `REFACTOR`, `REMOVE`, `DEPLOY`, `REVERT` 중 하나다(예: `ADD - 주문 통계에 결제수단별 주문 지표 추가`)
- 본문은 PR 템플릿의 체크리스트와 개요를 채운다
- CI에서 ESLint(`yarn eslint src`)를 돌린다
- 브랜치 이름에 노션 태스크 번호(`KIO-123`)를 넣으면, PR을 열 때 태스크가 '진행 중', 머지되면 '완료'로 바뀐다
- 스크린샷 같은 이미지는 코드 브랜치에 커밋하지 않고 PR 본문에 첨부한다

## 라이선스

[GPL-3.0](LICENSE)
