---
layout: page
sidebar: false

hero:
  title: "Document"
  subTitle: "📚 欢迎来到本项目的使用说明书"

types:
  - name: "俱乐部新闻"
    desc: "club news"
    link: "/Notes/News/"
    icon: "✨"
  - name: "2024算法培养计划"
    desc: "2024 algorithm plan"
    link: "/Notes/2024AlgorithmPlan/"
    icon: "🏃"
# flow: true
---

<script setup>
import BlogArchive from '../../.vitepress/views/BlogArchive.vue'
</script>

<BlogArchive/>
<GiscusComment />
