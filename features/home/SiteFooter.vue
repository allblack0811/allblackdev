<script setup lang="ts">
import { motion } from "motion-v";

const { t } = useI18n();
const email = "yum969315@gmail.com";
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
      <p
        class="mb-3 text-sm"
        :style="{ color: 'var(--text-muted)' }"
      >
        {{ t("footer.message") }}
      </p>
      <motion.a
        :href="`mailto:${email}`"
        class="inline-flex items-center gap-2 text-lg font-semibold"
        :style="{ color: 'var(--accent)' }"
        :while-hover="{ scale: 1.05 }"
        :while-tap="{ scale: 0.96 }"
      >
        <Icon name="ph:envelope-simple-bold" />
        {{ email }}
      </motion.a>
      <p
        class="mt-8 text-xs"
        :style="{ color: 'var(--text-muted)' }"
      >
        {{ t("footer.rights") }}
      </p>
    </motion.div>
  </footer>
</template>
