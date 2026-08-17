<script setup lang="ts">
import { findWork } from "#/home/works";
import { motion } from "motion-v";

const { t, tm, rt } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const work = computed(() => findWork(String(route.params.id)));
const descriptions = computed(() =>
  work.value ? (tm(`work.${work.value.id}.description`) as string[]) : [],
);

useSeoMeta({
  title: () =>
    work.value ? t(`work.${work.value.id}.title`) : t("workDetail.notFound"),
  description: () =>
    work.value ? t(`work.${work.value.id}.summary`) : t("workDetail.notFound"),
  ogTitle: () =>
    work.value ? t(`work.${work.value.id}.title`) : t("works.heading"),
  ogDescription: () => (work.value ? t(`work.${work.value.id}.summary`) : ""),
  ogImage: () => work.value?.thumbnail ?? "",
  ogType: "article",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-24">
    <NuxtLink
      :to="localePath('/')"
      class="mb-10 inline-flex items-center gap-1 text-sm font-medium"
      :style="{ color: 'var(--accent)' }"
    >
      <Icon name="ph:arrow-left-bold" />
      {{ t("workDetail.back") }}
    </NuxtLink>

    <template v-if="work">
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <div
          class="mb-6 overflow-hidden rounded-3xl border shadow-lg"
          :style="{ borderColor: 'var(--border)' }"
        >
          <NuxtImg
            :src="work.thumbnail"
            :alt="t(`work.${work.id}.title`)"
            class="h-64 w-full object-cover md:h-80"
          />
        </div>

        <h1
          class="text-3xl font-bold md:text-4xl"
          :style="{ color: 'var(--text)' }"
        >
          {{ t(`work.${work.id}.title`) }}
        </h1>

        <div
          class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm"
          :style="{ color: 'var(--text-muted)' }"
        >
          <span>{{ work.year }}</span>
          <span>·</span>
          <span>{{ t(`work.${work.id}.role`) }}</span>
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <span
            v-for="tag in work.tags"
            :key="tag"
            class="rounded-md px-2 py-1 text-xs font-medium"
            :style="{
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
            }"
          >
            {{ tag }}
          </span>
        </div>

        <div class="mt-10 space-y-5">
          <motion.p
            v-for="(text, index) in descriptions"
            :key="index"
            class="text-base leading-normal md:text-lg"
            :style="{ color: 'var(--text-muted)' }"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 0.2 + index * 0.15 }"
          >
            {{ rt(text) }}
          </motion.p>
        </div>

        <div
          v-if="work.links?.length"
          class="mt-10 flex flex-wrap gap-3"
        >
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
      </motion.div>
    </template>

    <template v-else>
      <p :style="{ color: 'var(--text-muted)' }">
        {{ t("workDetail.notFound") }}
      </p>
    </template>
  </div>
</template>
