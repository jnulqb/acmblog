import DefaultTheme from "vitepress/theme";
import { Theme, useRoute } from "vitepress";
import "./tailwind.css";
import "./var.css";
import "./article.css";
import "./print.css";

import LinkCard from "../components/LinkCard.vue";
import HText from "../components/HText.vue";
import Comments from "../components/Comments.vue"; 

import mediumZoom from "medium-zoom";
import { onMounted, watch, nextTick, h } from "vue";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // 注册全局组件
    ctx.app.component("LinkCard", LinkCard);
    ctx.app.component("HText", HText);
    ctx.app.component("Comments", Comments); // 注册评论组件
  },

  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)", margin: 24 });
    };
    onMounted(() => initZoom());
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },

  // 扩展默认主题的布局
  Layout: () => {
    // 获取默认主题的布局
    const DefaultLayout = DefaultTheme.Layout;

    // 返回带有评论组件的布局
    return h(DefaultLayout, null, {
      // 在 "doc-after" 插槽添加评论组件
      "doc-after": () => h(Comments),
    });
  },
} satisfies Theme;
