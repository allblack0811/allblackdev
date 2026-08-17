<script setup lang="ts">
//
</script>

<template>
  <NuxtPage />
</template>

<style lang="css">
@import "~/assets/palette.css";

html,
body {
  background-color: var(--bg);
  color: var(--text);
  font-family:
    Noto Sans KR,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

#__nuxt {
  width: 100%;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}
</style>
