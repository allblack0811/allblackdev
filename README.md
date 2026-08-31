<div align="center">

# 🖤 allblack's blog

**새롭고 재미있는 것을 만드는 것을 좋아하는** 프론트엔드 개발자 allblack의 개인 블로그이자 포트폴리오

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxtdotjs&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

🌐 [allblack.dev](https://allblack.dev)

</div>

---

## ✨ 주요 기능

- 🎬 **풍부한 애니메이션** — [motion.dev](https://motion.dev)(`motion-v`) 기반 인터랙션
- 🌗 **라이트 / 다크 모드** — CSS 변수 팔레트로 부드럽게 전환
- 🌏 **다국어 지원** — 한국어 · 영어(`@nuxtjs/i18n`, URL 접두어 방식)
- 🔍 **SEO 최적화** — `@nuxtjs/seo`로 메타 · Open Graph · 사이트맵 · robots 자동화
- ⚙️ **설정 메뉴** — 테마 · 언어를 한곳에서 제어하는 팝오버 메뉴

## 🛠 기술 스택

| 구분                   | 사용 기술                                            |
| ---------------------- | ---------------------------------------------------- |
| 프레임워크             | Nuxt 4 + Vue 3 (`<script setup lang="ts">`)          |
| 언어                   | TypeScript                                           |
| 스타일                 | Tailwind CSS + CSS 변수 팔레트(`assets/palette.css`) |
| 애니메이션             | motion-v                                             |
| 국제화                 | @nuxtjs/i18n                                         |
| SEO                    | @nuxtjs/seo                                          |
| 이미지 / 아이콘 / 폰트 | @nuxt/image · @nuxt/icon · @nuxt/fonts               |
| 유틸                   | @vueuse/core · @vueuse/nuxt                          |
| 린트                   | ESLint (@nuxt/eslint)                                |

## 📁 디렉터리 구조

```
.
├─ app.vue              # 루트 앱 · 전역 스타일
├─ pages/               # 파일 기반 라우팅
│  ├─ index.vue         # 홈 (Hero · About · Works · Footer)
│  └─ works/[id].vue    # 작업물 상세 페이지
├─ features/            # 기능 단위 컴포넌트 (별칭 #)
│  ├─ common/           # SettingsMenu 등 공용
│  └─ home/             # 홈 섹션 · 작업물 데이터
├─ i18n/locales/        # ko.json · en.json 번역 메시지
├─ assets/palette.css   # 색상 팔레트 · 시맨틱 테마 토큰
└─ public/              # 정적 파일 (프로필 이미지 등)
```

### 경로 별칭

| 별칭 | 경로                 |
| ---- | -------------------- |
| `@`  | 프로젝트 루트        |
| `#`  | `features/` 디렉터리 |

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev
```

## 📜 명령어

| 명령어             | 설명                                 |
| ------------------ | ------------------------------------ |
| `npm run dev`      | 개발 서버 실행                       |
| `npm run build`    | 프로덕션 빌드 (`node-server` 프리셋) |
| `npm run generate` | 정적 사이트 생성                     |
| `npm run preview`  | 빌드 결과 미리보기                   |
| `npm run lint`     | 린트 검사                            |
| `npm run lint:fix` | 린트 자동 수정                       |

## 🌐 배포

- **SPA**(`ssr: false`) 구조로 빌드하여 **GitHub Pages**(`CNAME`)에 배포합니다.

---

<div align="center">
<sub>© 2026 allblack. All rights reserved.</sub>
</div>

<!-- 사용한 파비콘 폰트:  Black Ops One -->