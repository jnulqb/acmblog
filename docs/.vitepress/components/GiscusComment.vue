<template>
  <div style="margin-top: 24px">
    <Giscus
      id="comments"
      repo="Fanceir/acmblog"
      repoid="R_kgDONBdNug"
      category="General"
      categoryid="DIC_kwDONBdNus4CjcGY"
      mapping="pathname"
      term="Welcome to giscus!"
      reactionsenabled="1"
      emitmetadata="0"
      inputposition="top"
      loading="lazy"
      :theme="isDark ? 'dark' : 'light'"
      :key="route.path"
    ></Giscus>
  </div>
</template>

<script setup>
import Giscus from "@giscus/vue";
import { useRoute, useData } from "vitepress";

const route = useRoute();
const { isDark } = useData();
</script>
