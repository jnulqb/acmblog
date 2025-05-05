<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from "@giscus/vue";

const { isDark } = useData();
const route = useRoute();
const isLoaded = ref(false);
const hasError = ref(false);
const errorMessage = ref("");
// 创建一个引用来存储是否是开发环境
const isDev = ref(false);

// 在组件加载时检测环境
onMounted(() => {
  // 安全地检测是否是开发环境，避免直接在模板中使用 import.meta
  try {
    isDev.value = import.meta.env.DEV || false;
  } catch (e) {
    isDev.value = false;
  }
});

// Giscus 主题配置
const theme = computed(() => {
  return isDark.value ? "dark" : "light";
});

// 当前页面的路径信息
const currentPath = computed(() => route.path);

// 计算页面标题作为讨论标题
const pageTitle = computed(() => {
  // 从路径中提取页面名称，去除最后的斜杠
  const path = route.path.endsWith("/") ? route.path.slice(0, -1) : route.path;
  const segments = path.split("/");
  const pageName = segments[segments.length - 1] || "home";
  return pageName;
});

// Giscus配置
const giscusConfig = {
  repo: "jnulqb/acmblog",
  repoId: "R_kgDONDYa4w",
  category: "Announcements",
  categoryId: "DIC_kwDONDYa484CpyvW",
  mapping: "specific", // 改为specific而不是pathname
  term: computed(() => pageTitle.value), // 使用页面标题作为特定的映射术语
  inputPosition: "top",
  lang: "zh-CN",
  loading: "lazy",
  reactionsEnabled: "1",
  emitMetadata: "0",
};

// 在组件挂载后检查Giscus是否正确加载
onMounted(() => {
  // 检查页面是否应该显示评论
  console.log("当前路径:", route.path);
  console.log("使用的标题:", pageTitle.value);

  // 三秒后检查是否加载成功
  setTimeout(() => {
    const giscusFrame = document.querySelector("iframe.giscus-frame");
    if (!giscusFrame) {
      console.error("Giscus iframe未加载");
      hasError.value = true;
      errorMessage.value = "Giscus评论框加载失败，请检查网络连接或Giscus配置";
    } else {
      isLoaded.value = true;
      console.log("Giscus加载成功");
    }
  }, 3000);
});
</script>

<template>
  <div class="comments-container">
    <div class="comments-divider"></div>
    <h2>评论</h2>

    <!-- 显示调试信息 - 修复: 使用 isDev 引用而不是直接在模板中使用 import.meta -->
    <div v-if="isDev" class="debug-info">
      <p>当前路径: {{ currentPath }}</p>
      <p>映射标题: {{ pageTitle }}</p>
    </div>

    <!-- 加载错误提示 -->
    <div v-if="hasError" class="error-message">
      {{ errorMessage }}
      <p>请确认以下事项:</p>
      <ul>
        <li>GitHub仓库已开启Discussions功能</li>
        <li>已安装Giscus GitHub App并授权</li>
        <li>Giscus配置参数正确</li>
        <li>网络连接正常</li>
      </ul>
    </div>

    <!-- Giscus评论组件 -->
    <Giscus
      :repo="giscusConfig.repo"
      :repo-id="giscusConfig.repoId"
      :category="giscusConfig.category"
      :category-id="giscusConfig.categoryId"
      :mapping="giscusConfig.mapping"
      :term="giscusConfig.term"
      :input-position="giscusConfig.inputPosition"
      :theme="theme"
      :lang="giscusConfig.lang"
      :loading="giscusConfig.loading"
      :reactions-enabled="giscusConfig.reactionsEnabled"
      :emit-metadata="giscusConfig.emitMetadata"
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

.debug-info {
  padding: 0.5rem;
  margin-bottom: 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.error-message {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fff0f0;
  color: #d32f2f;
  border-left: 4px solid #d32f2f;
  border-radius: 2px;
}

.error-message ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.error-message li {
  margin-bottom: 0.25rem;
}
</style>
