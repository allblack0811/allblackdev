<script setup lang="ts">
import { motion } from "motion-v";

const { t, tm, rt } = useI18n();

const paragraphs = computed(() => tm("about.paragraphs") as string[]);
const keywords = computed(() => tm("about.keywords") as string[]);
</script>

<template>
  <section
    class="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-6 py-28 md:py-32"
  >
    <motion.h2
      class="mb-14 text-3xl font-bold tracking-tight md:text-4xl"
      :style="{ color: 'var(--text)' }"
      :initial="{ opacity: 0, x: -40 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :in-view-options="{ once: true, margin: '-80px' }"
      :transition="{ duration: 0.6 }"
    >
      {{ t("about.heading") }}
    </motion.h2>

    <div class="space-y-7">
      <motion.p
        v-for="(text, index) in paragraphs"
        :key="index"
        class="text-base leading-relaxed md:text-lg"
        :style="{ color: 'var(--text-muted)' }"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true, margin: '-60px' }"
        :transition="{ duration: 0.6, delay: index * 0.15 }"
      >
        {{ rt(text) }}
      </motion.p>
    </div>

    <div class="mt-12 flex flex-wrap gap-3">
      <motion.span
        v-for="(keyword, index) in keywords"
        :key="index"
        class="rounded-full px-4 py-2 text-sm font-medium"
        :style="{
          backgroundColor: 'var(--accent-soft)',
          color: 'var(--accent)',
        }"
        :initial="{ opacity: 0, scale: 0.6 }"
        :while-in-view="{ opacity: 1, scale: 1 }"
        :in-view-options="{ once: true }"
        :transition="{
          type: 'spring',
          stiffness: 500,
          damping: 20,
          delay: index * 0.06,
        }"
        :while-hover="{ scale: 1.08, y: -3 }"
      >
        {{ rt(keyword) }}
      </motion.span>
    </div>
  </section>
</template>
