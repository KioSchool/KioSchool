# KioSchool

대학 주점을 위한 키오스크 주문 서비스.

## Tech Stack

- React 18 + TypeScript (strict mode)
- Vite (dev server port 3000, API proxy → localhost:8080)
- Jotai (상태 관리), React Router v6
- Emotion (`styled`) + MUI v7
- Axios (HTTP), SockJS + STOMP (WebSocket)
- Sentry (에러 트래킹), Google Analytics

## Commands

```bash
yarn start          # 개발 서버
yarn build          # 프로덕션 빌드 (tsc -b && vite build)
yarn build:dev      # 개발 모드 빌드
yarn storybook      # Storybook (port 6006)
```

## Directory Structure

```
src/
├── apis/           # API 매니저 클래스 (adminApi, userApi, superAdminApi)
├── components/     # React 컴포넌트
│   ├── common/     #   공통 UI 컴포넌트
│   ├── admin/      #   어드민 전용
│   ├── user/       #   사용자 전용
│   └── super-admin/#   슈퍼어드민 전용
├── constants/      # 상수 (routes, urls, layout, data/)
├── contexts/       # React Context (최소한으로 사용)
├── hooks/          # 커스텀 훅 (common/, admin/, user/, super-admin/)
├── jotai/          # Jotai 아톰 (atoms.ts, admin/, user/, super-admin/)
├── pages/          # 페이지 컴포넌트 (admin/, user/, super-admin/)
├── resources/      # 정적 리소스 (audio/, image/, svg/, colors.ts)
├── styles/         # 글로벌 스타일 및 유틸리티
├── types/          # TypeScript 타입 정의
└── utils/          # 유틸리티 함수
```

역할 기반으로 분리: `common/` → `admin/` → `user/` → `super-admin/`.

## Naming Conventions

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase `.tsx` | `NewCommonButton.tsx` |
| 훅 파일 | `use` + PascalCase `.tsx` | `useAuthentication.tsx` |
| 유틸/상수 파일 | camelCase `.ts` | `formatDate.ts`, `urls.ts` |
| 컴포넌트 이름 | PascalCase | `ProductCard` |
| Props 인터페이스 | 컴포넌트명 + `Props` | `ProductCardProps` |
| Styled 컴포넌트 | PascalCase | `Container`, `StyledButton` |
| 이벤트 핸들러 | `handle` + 동작 | `handleButtonClick` |
| Jotai 아톰 | 도메인접두사 + camelCase + `Atom` | `adminOrdersAtom`, `loadingCountAtom` |
| 상수 (파일 내부) | SCREAMING_SNAKE_CASE | `DEFAULT_LAYOUT_WIDTH` |
| 상수 (export 객체) | SCREAMING_SNAKE_CASE | `USER_ROUTES`, `ORDER_ROUTES` |
| 라우트 헬퍼 | camelCase 함수 | `getAdminWorkspacePath(workspaceId)` |
| 인터페이스/타입 | PascalCase | `Order`, `ProductStatus` |
| Enum 값 | SCREAMING_SNAKE_CASE | `ProductStatus.SOLD_OUT` |

## Import Rules

**Path alias 사용** — `@` alias를 우선한다. 상대 경로는 같은 디렉토리 내부에서만 허용.

```
@components/*  → src/components/*
@constants/*   → src/constants/*
@hooks/*       → src/hooks/*
@pages/*       → src/pages/*
@styles/*      → src/styles/*
@resources/*   → src/resources/*
@@types/*      → src/types/*      (npm @types 충돌 회피를 위해 @@ 사용)
@utils/*       → src/utils/*
@jotai/*       → src/jotai/*
```

`src/` 직접 참조는 사용하지 않는다.

**Import 순서:**
1. 서드파티 라이브러리 (`react`, `react-router-dom`, `@emotion/styled` 등)
2. `@` path alias (`@hooks/`, `@components/`, `@utils/` 등)
3. 상대 경로 (같은 디렉토리 내부 한정)

## Component Pattern

```tsx
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

// 1. Styled 컴포넌트 (함수 선언 전에 정의)
const Container = styled.div`
  color: ${Color.KIO_ORANGE};

  ${colFlex({ justify: 'center', align: 'center' })};
`;

// 2. Props 인터페이스
interface ExampleCardProps {
  title: string;
  onClick?: () => void;
}

// 3. 함수 선언 (named function declaration, arrow function 사용하지 않음)
function ExampleCard({ title, onClick }: ExampleCardProps) {
  const handleClick = () => {
    onClick?.();
  };

  return <Container onClick={handleClick}>{title}</Container>;
}

// 4. default export
export default ExampleCard;
```

핵심 규칙:
- **named function declaration** 사용 (`function Foo()`, `const Foo = () =>` 아님)
- **default export** 사용
- Styled 컴포넌트는 함수 선언 위에 정의
- Props 인터페이스는 컴포넌트 바로 위에 정의
- HTML 속성 확장 시 `extends React.XxxHTMLAttributes<HTMLXxxElement>` 사용
- 선택적 속성 제외 시 `Omit<>` 활용

## Styling Rules

**Emotion `styled`** 를 기본 스타일링 도구로 사용.

- Flex 레이아웃: `colFlex()`, `rowFlex()` from `@styles/flexStyles` — 일반 CSS 속성 아래, 선택자(`&:hover` 등) 위에 배치
- 색상: `Color` 객체 from `@resources/colors` (`Color.KIO_ORANGE`, `Color.GREY` 등)
- 조건부 스타일: props 기반 — `color: ${({ disabled }) => disabled ? Color.GREY : Color.KIO_ORANGE}`
- 반응형: `mobileMediaQuery` (768px), `tabletMediaQuery` (1200px) from `@styles/globalStyles`
- 폰트: LINE Seed Sans KR (글로벌 적용)

## State Management (Jotai)

```
src/jotai/
├── atoms.ts          # 글로벌 아톰 (loadingCountAtom, layoutParamsAtom 등)
├── admin/atoms.ts    # 어드민 아톰 (adminOrdersAtom, adminWorkspaceAtom 등)
├── user/             # 사용자 아톰
└── super-admin/      # 슈퍼어드민 아톰
```

- 아톰은 도메인별로 분리
- 파생 아톰(derived atom): `atom((get) => ...)` 패턴
- 영속 아톰: `atomWithStorage('key', defaultValue)` 패턴
- 기본값은 `@@types/defaultValues.ts`에서 가져옴

## API Pattern

싱글턴 매니저 클래스 + Axios 인스턴스 구조:

```
src/apis/
├── adminApi.ts       # AdminApiManager 클래스 → adminApi export
├── userApi.ts        # UserApiManager 클래스 → userApi export
└── superAdminApi.ts  # SuperAdminApiManager 클래스 → superAdminApi export
```

- 각 매니저: private `AxiosInstance` + `AbortController`
- `withCredentials: true`, `timeout: 30000`
- 인터셉터: 로딩 표시(500ms 디바운스), 에러 → Sentry 전송, 403/401 → 인증 에러 이벤트 발행
- 사용: `useApi()` 훅에서 세 API 인스턴스를 반환

## Prettier / ESLint

Prettier:
- `printWidth: 160`, `singleQuote: true`, `trailingComma: "all"`, `tabWidth: 2`, `semi: true`

ESLint:
- `airbnb-typescript` + `prettier` 기반
- `.tsx` 파일에서 JSX 허용
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` 활성화

## Routes

```ts
// 역할별 라우트 상수 (as const)
USER_ROUTES, ORDER_ROUTES, ADMIN_ROUTES, SUPER_ADMIN_ROUTES, TEST_ROUTES

// 동적 라우트 헬퍼
getAdminWorkspacePath(workspaceId)
getAdminProductsPath(workspaceId)
```

URL 설정은 `@constants/urls.ts`의 `URLS` 객체에서 관리 (환경변수 기반).
