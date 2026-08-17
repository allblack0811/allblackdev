<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();

// 타이틀을 단어 단위로 쪼개 순차 등장 애니메이션을 적용합니다.
const titleWords = computed(() => t("hero.title").split(" "));
</script>

<template>
  <section
    class="relative flex min-h-screen flex-col items-center justify-center gap-14 px-6 py-28 md:flex-row md:gap-24 md:py-32"
  >
    <div class="max-w-xl text-center md:text-left">
      <motion.p
        class="mb-4 text-sm font-medium tracking-widest"
        :style="{ color: 'var(--accent)' }"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        {{ t("hero.eyebrow") }}
      </motion.p>

      <h1
        class="flex flex-wrap justify-center gap-x-3 gap-y-1 text-3xl font-bold leading-tight tracking-tight md:justify-start md:text-6xl"
        :style="{ color: 'var(--text)' }"
      >
        <motion.span
          v-for="(word, index) in titleWords"
          :key="index"
          :initial="{ opacity: 0, y: 40, filter: 'blur(8px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.6, delay: 0.3 + index * 0.12 }"
        >
          {{ word }}
        </motion.span>
      </h1>

      <motion.p
        class="mt-8 max-w-md text-base md:text-lg"
        :style="{ color: 'var(--text-muted)' }"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 1.2 }"
      >
        {{ t("hero.subtitle") }}
      </motion.p>
    </div>

    <motion.div
      class="relative"
      :initial="{ opacity: 0, scale: 0.8, rotate: -8 }"
      :animate="{ opacity: 1, scale: 1, rotate: -3 }"
      :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 0.4 }"
      :while-hover="{ rotate: 0, scale: 1.05 }"
    >
      <NuxtImg
        src="/profile.jpg"
        :alt="t('hero.imageAlt')"
        class="h-72 w-60 rounded-2xl border-[10px] border-white object-cover shadow-2xl md:h-96 md:w-80"
      />
    </motion.div>
  </section>
</template>
