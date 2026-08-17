// 작업물 콘텐츠 로더
// content/<id>.<locale>.md 파일을 프론트매터 + 마크다운 본문으로 읽어 제공합니다.
// content 디렉터리는 .gitignore로 git에서 제외됩니다.
import { load as loadYaml } from "js-yaml";
import { marked } from "marked";

export interface WorkLink {
  label: string;
  url: string;
}

export interface Work {
  id: string;
  locale: string;
  title: string;
  summary: string;
  role: string;
  year: string;
  order: number;
  tags: string[];
  thumbnail: string;
  links?: WorkLink[];
  bodyHtml: string;
}

const DEFAULT_LOCALE = "ko";

const rawFiles = import.meta.glob("./content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = (loadYaml(match[1]) as Record<string, unknown>) ?? {};
  return { data, body: match[2] };
}

function toWork(id: string, locale: string, raw: string): Work {
  const { data, body } = parseFrontmatter(raw);
  return {
    id,
    locale,
    title: String(data.title ?? id),
    summary: String(data.summary ?? ""),
    role: String(data.role ?? ""),
    year: String(data.year ?? ""),
    order: Number(data.order ?? 0),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    thumbnail: String(data.thumbnail ?? ""),
    links: Array.isArray(data.links) ? (data.links as WorkLink[]) : undefined,
    bodyHtml: marked.parse(body, { async: false }),
  };
}

// worksByLocale[id][locale] = Work
const worksByLocale: Record<string, Record<string, Work>> = {};

for (const [path, raw] of Object.entries(rawFiles)) {
  const name = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
  const dot = name.lastIndexOf(".");
  if (dot < 0) continue;
  const id = name.slice(0, dot);
  const locale = name.slice(dot + 1);
  (worksByLocale[id] ??= {})[locale] = toWork(id, locale, raw);
}

function pick(id: string, locale: string): Work | undefined {
  const byLocale = worksByLocale[id];
  if (!byLocale) return undefined;
  return (
    byLocale[locale] ?? byLocale[DEFAULT_LOCALE] ?? Object.values(byLocale)[0]
  );
}

export function getWorks(locale: string): Work[] {
  return Object.keys(worksByLocale)
    .map(id => pick(id, locale))
    .filter((work): work is Work => Boolean(work))
    .sort((a, b) => a.order - b.order);
}

export function findWork(id: string, locale: string): Work | undefined {
  return pick(id, locale);
}
