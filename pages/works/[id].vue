<script setup lang="ts">
import { findWork } from "#/work";
import { motion } from "motion-v";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const work = computed(() => findWork(String(route.params.id), locale.value));

useSeoMeta({
  title: () => work.value?.title ?? t("workDetail.notFound"),
  description: () => work.value?.summary ?? t("workDetail.notFound"),
  ogTitle: () => work.value?.title ?? t("works.heading"),
  ogDescription: () => work.value?.summary ?? "",
  ogImage: () => work.value?.thumbnail ?? "",
  ogType: "article",
  twitterCard: "summary_large_image",
});

// works 페이지 전용 타이틀 템플릿
useHead({ titleTemplate: "%s · allblack" });
</script>

<template>
  <main class="mx-auto max-w-3xl px-6 py-24">
    <NuxtLink
      :to="localePath('/')"
      class="mb-10 inline-flex items-center gap-1 text-sm font-medium"
      :style="{ color: 'var(--accent)' }"
    >
      <Icon name="ph:arrow-left-bold" />
      {{ t("workDetail.back") }}
    </NuxtLink>

    <template v-if="work">
      <motion.article
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <header>
          <div
            class="mb-6 overflow-hidden rounded-3xl border shadow-lg"
            :style="{ borderColor: 'var(--border)' }"
          >
            <NuxtImg
              :src="work.thumbnail"
              :alt="work.title"
              class="h-64 w-full object-cover md:h-80"
            />
          </div>

          <h1
            class="text-3xl font-bold md:text-4xl"
            :style="{ color: 'var(--text)' }"
          >
            {{ work.title }}
          </h1>

          <div
            class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm"
            :style="{ color: 'var(--text-muted)' }"
          >
            <span>{{ work.year }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ work.role }}</span>
          </div>

          <ul class="mt-5 flex flex-wrap gap-2">
            <li
              v-for="tag in work.tags"
              :key="tag"
              class="rounded-md px-2 py-1 text-xs font-medium"
              :style="{
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
              }"
            >
              {{ tag }}
            </li>
          </ul>
        </header>

        <!-- 작성자가 직접 관리하는 신뢰된 마크다운 본문 -->
        <!-- eslint-disable vue/no-v-html -->
        <div
          class="work-body mt-10"
          :style="{ color: 'var(--text-muted)' }"
          v-html="work.bodyHtml"
        />
        <!-- eslint-enable vue/no-v-html -->

        <div v-if="work.links?.length" class="mt-10 flex flex-wrap gap-3">
          <motion.a
            v-for="link in work.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium"
            :style="{ borderColor: 'var(--border)', color: 'var(--text)' }"
            :while-hover="{ scale: 1.05, y: -2 }"
            :while-tap="{ scale: 0.96 }"
          >
            <Icon name="ph:link-bold" />
            {{ link.label }}
          </motion.a>
        </div>
      </motion.article>
    </template>

    <template v-else>
      <p :style="{ color: 'var(--text-muted)' }">
        {{ t("workDetail.notFound") }}
      </p>
    </template>
  </main>
</template>

<style scoped>
.work-body :deep(h2) {
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
}

.work-body :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

.work-body :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.work-body :deep(ul),
.work-body :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.25rem;
  list-style: revert;
}

.work-body :deep(li) {
  margin-bottom: 0.35rem;
  line-height: 1.7;
}

.work-body :deep(a) {
  color: var(--accent);
  text-decoration: underline;
}

.work-body :deep(code) {
  padding: 0.1rem 0.35rem;
  border-radius: 0.35rem;
  background-color: var(--bg-subtle);
  font-size: 0.9em;
}

.work-body :deep(pre) {
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: var(--bg-subtle);
  overflow-x: auto;
}
</style>
