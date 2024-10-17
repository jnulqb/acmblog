import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";
import { getSidebar } from "./utils/getSidebar";

export default defineConfig({
  title: "JNU ACM",
  titleTemplate: "Blog",
  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  description: "江南大学",
  srcDir: "./src",

  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "👋 关于ACM俱乐部", link: "/AboutMe.md" },
      { text: "💭 博客", link: "/Notes/index" },
      { text: "👫 学长的博客", link: "Friends.md" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Fanceir" }],
    footer: {
      copyright: "Copyright © 2005-present JNUACM",
    },
    sidebar: {
      "/Notes/": getSidebar("/docs/src", "/Notes/"),
    },
    outlineTitle: "导航栏",
    search: {
      provider: "local",
    },
  },

  markdown: {
    math: true,
  },

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPDocFooterLastUpdated\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/UpdateTime.vue", import.meta.url)
          ),
        },
        {
          find: /^.*\/VPFooter\.vue$/,
          replacement: fileURLToPath(
            new URL("./components/Footer.vue", import.meta.url)
          ),
        },
      ],
    },
  },
  lastUpdated: true,
});
