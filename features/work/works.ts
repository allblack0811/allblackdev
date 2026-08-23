// 작업물 메타데이터 (언어 공통, git에 커밋)
// 언어별 제목·요약·역할·본문은 content/<id>/README.<locale>.md 에서 관리합니다.
export interface WorkLink {
  label: string;
  url: string;
}

export interface WorkMeta {
  id: string;
  order: number;
  year: string;
  tags: string[];
  thumbnail: string;
  links?: WorkLink[];
}

export const workMetas: WorkMeta[] = [
  {
    id: "personal-blog",
    order: 1,
    year: "2026",
    tags: ["Nuxt 4", "TypeScript", "Tailwind CSS"],
    thumbnail: "https://picsum.photos/seed/blog/800/600",
    links: [{ label: "GitHub", url: "https://github.com/allblack0811" }],
  },
];
