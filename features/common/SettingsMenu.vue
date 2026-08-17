<script setup lang="ts">
import { onClickOutside, useDark, useToggle } from "@vueuse/core";
import { AnimatePresence, motion } from "motion-v";

const { t, locale, setLocale } = useI18n();

const isDark = useDark();
const toggleDark = useToggle(isDark);

const open = ref(false);
const root = ref<HTMLElement | null>(null);
onClickOutside(root, () => (open.value = false));

const locales = [
  { code: "ko", label: "한국어", short: "KO" },
  { code: "en", label: "English", short: "EN" },
] as const;
</script>

<template>
  <div
    ref="root"
    class="relative"
  >
    <motion.button
      type="button"
      :aria-label="t('settings.title')"
      aria-haspopup="true"
      :aria-expanded="open"
      class="flex h-11 w-11 items-center justify-center rounded-full border shadow-sm"
      :style="{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border)',
        color: 'var(--text)',
      }"
      :while-hover="{ scale: 1.1 }"
      :while-tap="{ scale: 0.9 }"
      :animate="{ rotate: open ? 90 : 0 }"
      :transition="{ type: 'spring', stiffness: 400, damping: 15 }"
      @click="open = !open"
    >
      <Icon
        name="ph:gear-six-bold"
        class="text-xl"
      />
    </motion.button>

    <AnimatePresence>
      <motion.div
        v-if="open"
        class="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border p-2 shadow-xl"
        :style="{
          backgroundColor: 'var(--bg-elevated)',
          borderColor: 'var(--border)',
        }"
        :initial="{ opacity: 0, y: -8, scale: 0.95 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :exit="{ opacity: 0, y: -8, scale: 0.95 }"
        :transition="{ type: 'spring', stiffness: 400, damping: 28 }"
      >
        <!-- 테마 -->
        <div
          class="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide"
          :style="{ color: 'var(--text-muted)' }"
        >
          {{ t("settings.theme") }}
        </div>
        <motion.button
          type="button"
          class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium"
          :style="{ color: 'var(--text)' }"
          :while-hover="{ backgroundColor: 'var(--bg-subtle)' }"
          :while-tap="{ scale: 0.97 }"
          @click="() => toggleDark()"
        >
          <span class="flex items-center gap-2">
            <Icon
              :name="isDark ? 'ph:moon-stars-bold' : 'ph:sun-bold'"
              class="text-lg"
            />
            {{ isDark ? t("settings.dark") : t("settings.light") }}
          </span>
          <span
            class="flex h-6 w-10 items-center rounded-full px-1"
            :style="{
              backgroundColor: isDark ? 'var(--accent)' : 'var(--border)',
            }"
          >
            <motion.span
              class="h-4 w-4 rounded-full"
              :style="{ backgroundColor: 'var(--bg-elevated)' }"
              :animate="{ x: isDark ? 16 : 0 }"
              :transition="{ type: 'spring', stiffness: 500, damping: 30 }"
            />
          </span>
        </motion.button>

        <div
          class="my-2 border-t"
          :style="{ borderColor: 'var(--border)' }"
        />

        <!-- 언어 -->
        <div
          class="px-2 pb-1 text-xs font-semibold uppercase tracking-wide"
          :style="{ color: 'var(--text-muted)' }"
        >
          {{ t("settings.language") }}
        </div>
        <div class="flex flex-col gap-1">
          <motion.button
            v-for="item in locales"
            :key="item.code"
            type="button"
            class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium"
            :style="{
              color: locale === item.code ? 'var(--accent)' : 'var(--text)',
              backgroundColor:
                locale === item.code ? 'var(--accent-soft)' : 'transparent',
            }"
            :while-hover="{ scale: 1.02 }"
            :while-tap="{ scale: 0.97 }"
            @click="setLocale(item.code)"
          >
            <span class="flex items-center gap-2">
              <span class="text-xs font-bold">{{ item.short }}</span>
              {{ item.label }}
            </span>
            <Icon
              v-if="locale === item.code"
              name="ph:check-bold"
              class="text-base"
            />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</template>
