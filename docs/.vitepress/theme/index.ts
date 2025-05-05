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
import { onMounted, watch, nextTick, h, defineComponent } from "vue";

// 创建一个包装评论组件，传递当前路由信息
const CommentsWithRoute = defineComponent({
  setup() {
    const route = useRoute();
    return () => h(Comments, { route: route });
  },
});

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // 注册全局组件
    ctx.app.component("LinkCard", LinkCard);
    ctx.app.component("HText", HText);
    ctx.app.component("Comments", Comments);
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
    const route = useRoute();

    // 返回带有评论组件的布局
    return h(DefaultLayout, null, {
      // 在 "doc-after" 插槽添加评论组件
      "doc-after": () => {
        // 只在文章页面显示评论（过滤掉首页和特殊页面）
        if (
          route.path.includes("/Notes/") &&
          !route.path.endsWith("/index.html")
        ) {
          console.log("显示评论:", route.path);
          return h(CommentsWithRoute);
        }
        return null; // 不显示评论
      },
    });
  },
} satisfies Theme;
