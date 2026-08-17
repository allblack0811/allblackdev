<script setup lang="ts">
import { works } from "#/home/works";
import { motion } from "motion-v";

const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <section class="mx-auto max-w-5xl px-6 py-28 md:py-32">
    <motion.h2
      class="mb-16 text-3xl font-bold tracking-tight md:text-4xl"
      :style="{ color: 'var(--text)' }"
      :initial="{ opacity: 0, x: -40 }"
      :while-in-view="{ opacity: 1, x: 0 }"
      :in-view-options="{ once: true, margin: '-80px' }"
      :transition="{ duration: 0.6 }"
    >
      {{ t("works.heading") }}
    </motion.h2>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <motion.div
        v-for="(work, index) in works"
        :key="work.id"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true, margin: '-40px' }"
        :transition="{ duration: 0.5, delay: index * 0.1 }"
        :while-hover="{ y: -8 }"
      >
        <NuxtLink
          :to="localePath(`/works/${work.id}`)"
          class="group block h-full overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-xl"
          :style="{
            backgroundColor: 'var(--bg-elevated)',
            borderColor: 'var(--border)',
          }"
        >
          <div class="aspect-[4/3] overflow-hidden">
            <NuxtImg
              :src="work.thumbnail"
              :alt="t(`work.${work.id}.title`)"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <h3
              class="text-lg font-semibold"
              :style="{ color: 'var(--text)' }"
            >
              {{ t(`work.${work.id}.title`) }}
            </h3>
            <p
              class="mt-2 text-sm leading-relaxed"
              :style="{ color: 'var(--text-muted)' }"
            >
              {{ t(`work.${work.id}.summary`) }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in work.tags"
                :key="tag"
                class="rounded-md px-2 py-1 text-xs font-medium"
                :style="{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                }"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </motion.div>
    </div>
  </section>
</template>
