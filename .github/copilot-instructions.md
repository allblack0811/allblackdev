# Copilot 지침

## 프로젝트 개요

- allblack의 개인 블로그입니다.
- **Nuxt 3** 기반의 SPA(`ssr: false`)이며 `node-server` 프리셋으로 빌드/배포합니다.
- 배포는 GitHub Pages(`CNAME` 사용)를 기준으로 합니다.

## 기술 스택

- 프레임워크: Nuxt 3 + Vue 3 (`<script setup lang="ts">`)
- 언어: TypeScript
- 스타일: Tailwind CSS(`@nuxtjs/tailwindcss`) + CSS 변수 팔레트(`assets/palette.css`)
- SEO: `@nuxtjs/seo`
- 아이콘: `@nuxt/icon`
- 폰트: `@nuxt/fonts` (기본 본문 폰트 `Noto Sans KR`)
- 유틸: `@vueuse/nuxt`, `@vueuse/core`
- 린트: ESLint(`@nuxt/eslint`)

## 디렉터리 구조

- `app.vue`: 루트 앱. 전역 스타일과 `<NuxtPage />` 진입점.
- `pages/`: 파일 기반 라우팅 페이지.
- `features/`: 기능 단위 컴포넌트/모듈(별칭 `#`로 참조).
- `assets/`: 전역 CSS 및 정적 리소스(예: `palette.css`).
- `public/`: 그대로 서빙되는 정적 파일.
- `server/`: Nitro 서버 코드.

## 경로 별칭

- `@` → 프로젝트 루트
- `#` → `features/` 디렉터리

## 코딩 규칙

- Vue 컴포넌트는 항상 `<script setup lang="ts">`를 사용합니다.
- ESLint stylistic 규칙을 따릅니다.
  - 문자열은 **큰따옴표**(`"`)를 사용합니다.
  - 문장 끝에 **세미콜론**(`;`)을 붙입니다.
- 색상은 하드코딩하지 말고 `assets/palette.css`의 CSS 변수(`var(--color-...)`)를 사용합니다.
- 새 기능 컴포넌트는 `features/` 아래에 두고 `#` 별칭으로 참조합니다.
- 커밋/작업 후에는 `npm run lint`로 린트를 통과시키는 것을 원칙으로 합니다.

## 자주 쓰는 명령어

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드(`node-server` 프리셋)
- `npm run generate`: 정적 사이트 생성
- `npm run preview`: 빌드 결과 미리보기
- `npm run lint` / `npm run lint:fix`: 린트 검사 / 자동 수정

## 커뮤니케이션

- 답변과 코드 주석은 한국어로 작성합니다.
