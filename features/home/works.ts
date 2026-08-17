// 작업물 데이터: 홈 목록과 상세 페이지에서 공유합니다.
// 언어에 종속되는 텍스트(제목·설명 등)는 i18n 메시지의 "work.<id>" 키에서 관리합니다.
export interface Work {
  id: string;
  thumbnail: string;
  tags: string[];
  year: string;
  links?: { label: string; url: string }[];
}

export const works: Work[] = [
  {
    id: "personal-blog",
    thumbnail: "https://picsum.photos/seed/blog/800/600",
    tags: ["Nuxt 3", "TypeScript", "Tailwind CSS"],
    year: "2026",
    links: [{ label: "GitHub", url: "https://github.com/allblack0811" }],
  },
  {
    id: "design-system",
    thumbnail: "https://picsum.photos/seed/design/800/600",
    tags: ["Vue 3", "Storybook", "Design Token"],
    year: "2025",
  },
  {
    id: "playground",
    thumbnail: "https://picsum.photos/seed/play/800/600",
    tags: ["Motion", "Canvas", "WebGL"],
    year: "2025",
  },
];

export function findWork(id: string): Work | undefined {
  return works.find(work => work.id === id);
}
