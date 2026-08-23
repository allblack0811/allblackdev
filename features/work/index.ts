// 작업물 콘텐츠 로더
// 메타데이터는 works.ts, 언어별 내용(제목·요약·역할·본문)은
// content/<id>/README.<locale>.md 에서 읽어 병합합니다.
// content 디렉터리는 .gitignore로 git에서 제외됩니다.
import { load as loadYaml } from "js-yaml";
import { marked } from "marked";
import { type WorkLink, workMetas } from "./works";

export type { WorkLink };

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

interface WorkContent {
  title: string;
  summary: string;
  role: string;
  bodyHtml: string;
}

const DEFAULT_LOCALE = "ko";

const rawFiles = import.meta.glob("./content/*/README.*.md", {
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
  const data = (loadYaml(match[1] ?? "") as Record<string, unknown>) ?? {};
  return { data, body: match[2] ?? "" };
}

function toContent(raw: string): WorkContent {
  const { data, body } = parseFrontmatter(raw);
  return {
    title: String(data.title ?? ""),
    summary: String(data.summary ?? ""),
    role: String(data.role ?? ""),
    bodyHtml: marked.parse(body, { async: false }),
  };
}

// contentByLocale[id][locale] = WorkContent
const contentByLocale: Record<string, Record<string, WorkContent>> = {};

for (const [path, raw] of Object.entries(rawFiles)) {
  const match = /\/content\/([^/]+)\/README\.([^./]+)\.md$/.exec(path);
  const id = match?.[1];
  const locale = match?.[2];
  if (!id || !locale) continue;
  (contentByLocale[id] ??= {})[locale] = toContent(raw);
}

function pickContent(id: string, locale: string): WorkContent | undefined {
  const byLocale = contentByLocale[id];
  if (!byLocale) return undefined;
  return (
    byLocale[locale] ?? byLocale[DEFAULT_LOCALE] ?? Object.values(byLocale)[0]
  );
}

function toWork(meta: (typeof workMetas)[number], locale: string): Work {
  const content = pickContent(meta.id, locale);
  return {
    id: meta.id,
    locale,
    title: content?.title || meta.id,
    summary: content?.summary ?? "",
    role: content?.role ?? "",
    year: meta.year,
    order: meta.order,
    tags: meta.tags,
    thumbnail: meta.thumbnail,
    links: meta.links,
    bodyHtml: content?.bodyHtml ?? "",
  };
}

export function getWorks(locale: string): Work[] {
  return [...workMetas]
    .sort((a, b) => a.order - b.order)
    .map(meta => toWork(meta, locale));
}

export function findWork(id: string, locale: string): Work | undefined {
  const meta = workMetas.find(item => item.id === id);
  return meta ? toWork(meta, locale) : undefined;
}
