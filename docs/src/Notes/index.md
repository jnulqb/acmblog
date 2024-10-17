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
  - name: "面经分享"
    desc: "interview experiences"
    link: "/Notes/Interviews/"
    icon: "🏃"
# flow: true
---

<script setup>
import BlogArchive from '../../.vitepress/views/BlogArchive.vue'
</script>

<BlogArchive/>
<GiscusComment />
