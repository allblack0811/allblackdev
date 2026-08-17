<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { motion } from "motion-v";

const { t, locale, setLocale } = useI18n();
const email = "yum969315@gmail.com";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const locales = [
  { code: "ko", short: "KO" },
  { code: "en", short: "EN" },
] as const;
</script>

<template>
  <footer
    class="border-t px-6 py-20 text-center"
    :style="{ borderColor: 'var(--border)' }"
  >
    <motion.div
      :initial="{ opacity: 0, y: 30 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :in-view-options="{ once: true }"
      :transition="{ duration: 0.6 }"
    >
      <p class="mb-3 text-sm" :style="{ color: 'var(--text-muted)' }">
        {{ t("footer.message") }}
      </p>
      <motion.a
        :href="`mailto:${email}`"
        class="inline-flex items-center gap-2 text-lg font-semibold"
        :style="{ color: 'var(--accent)' }"
        :while-hover="{ scale: 1.05 }"
        :while-tap="{ scale: 0.96 }"
      >
        <!-- 아이콘이 텍스트보다 시각적으로 높아 보여 1px 아래로 광학 보정 -->
        <Icon name="ph:envelope-simple-bold" class="relative top-[1px]" />
        {{ email }}
      </motion.a>

      <div class="mt-8 flex items-center justify-center gap-4">
        <motion.button
          type="button"
          :aria-label="isDark ? t('settings.dark') : t('settings.light')"
          class="flex h-9 w-9 items-center justify-center rounded-full border"
          :style="{ borderColor: 'var(--border)', color: 'var(--text)' }"
          :while-hover="{ scale: 1.1 }"
          :while-tap="{ scale: 0.9 }"
          @click="() => toggleDark()"
        >
          <Icon
            :name="isDark ? 'ph:moon-stars-bold' : 'ph:sun-bold'"
            class="text-lg"
          />
        </motion.button>

        <div class="h-5 w-px" :style="{ backgroundColor: 'var(--border)' }" />

        <div class="flex items-center gap-1">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            :aria-pressed="locale === item.code"
            class="rounded-full px-3 py-1.5 text-xs font-semibold"
            :style="{
              color:
                locale === item.code ? 'var(--accent)' : 'var(--text-muted)',
              backgroundColor:
                locale === item.code ? 'var(--accent-soft)' : 'transparent',
            }"
            @click="setLocale(item.code)"
          >
            {{ item.short }}
          </button>
        </div>
      </div>

      <p class="mt-8 text-xs" :style="{ color: 'var(--text-muted)' }">
        {{ t("footer.rights") }}
      </p>
    </motion.div>
  </footer>
</template>
