<script setup lang="ts">
import AboutSection from "#/home/AboutSection.vue";
import HeroSection from "#/home/HeroSection.vue";
import SiteFooter from "#/home/SiteFooter.vue";
import WorksSection from "#/home/WorksSection.vue";

const { t } = useI18n();

useSeoMeta({
  title: () => t("seo.homeTitle"),
  description: () => t("seo.description"),
  author: () => t("seo.author"),
  ogTitle: () => t("seo.siteTitle"),
  ogDescription: () => t("seo.description"),
  ogType: "profile",
  ogImage: "/profile.jpg",
  profileUsername: () => t("seo.author"),
  profileFirstName: () => t("seo.profileFirstName"),
  profileLastName: () => t("seo.profileLastName"),
  profileGender: "male",
  twitterCard: "summary_large_image",
  twitterTitle: () => t("seo.siteTitle"),
  twitterDescription: () => t("seo.description"),
  twitterImage: "/profile.jpg",
});
useHead({
  meta: [{ name: "keywords", content: () => t("seo.keywords") }],
});
</script>

<template>
  <div>
    <main>
      <HeroSection />
      <AboutSection />
      <WorksSection />
    </main>
    <SiteFooter />
  </div>
</template>
