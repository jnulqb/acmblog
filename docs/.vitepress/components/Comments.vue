<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useData } from "vitepress";
import Giscus from "@giscus/vue";

const { isDark } = useData();

// Giscus 主题配置
const theme = computed(() => {
  return isDark.value ? "dark" : "light";
});

// 你需要将这些配置替换为你自己的
const giscusConfig = {
  repo: "jnulqb/acmblog",
  repoId: "R_kgDONDYa4w",
  category: "Announcements",
  categoryId: "DIC_kwDONDYa484CpyvW",
  mapping: "pathname",
  inputPosition: "top",
  lang: "zh-CN",
  loading: "lazy",
};
</script>

<template>
  <div class="comments-container">
    <div class="comments-divider"></div>
    <h2>评论</h2>
    <Giscus
      :repo="giscusConfig.repo"
      :repo-id="giscusConfig.repoId"
      :category="giscusConfig.category"
      :category-id="giscusConfig.categoryId"
      :mapping="giscusConfig.mapping"
      :input-position="giscusConfig.inputPosition"
      :theme="theme"
      :lang="giscusConfig.lang"
      :loading="giscusConfig.loading"
    />
  </div>
</template>

<style scoped>
.comments-container {
  margin-top: 2rem;
  padding-top: 1rem;
}

.comments-divider {
  height: 1px;
  background-color: var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>
