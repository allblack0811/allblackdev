<script setup lang="ts">
import { getWorks } from "#/work";
import { motion } from "motion-v";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const works = computed(() => getWorks(locale.value));
</script>

<template>
  <section class="mx-auto max-w-5xl px-12 py-28 md:py-32">
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

    <ul class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <motion.li
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
              :alt="work.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <h3
              class="text-lg font-semibold"
              :style="{ color: 'var(--text)' }"
            >
              {{ work.title }}
            </h3>
            <p
              class="mt-2 text-sm leading-relaxed"
              :style="{ color: 'var(--text-muted)' }"
            >
              {{ work.summary }}
            </p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="tag in work.tags"
                :key="tag"
                class="rounded-md px-2 py-1 text-xs font-medium"
                :style="{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                }"
              >
                {{ tag }}
              </li>
            </ul>
          </div>
        </NuxtLink>
      </motion.li>
    </ul>
  </section>
</template>
