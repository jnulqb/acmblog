// 声明 Vue 模块
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明 Giscus 模块
declare module "@giscus/vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    {
      repo: string;
      repoId: string;
      category: string;
      categoryId: string;
      mapping: string;
      term?: string;
      theme?: string;
      lang?: string;
      loading?: string;
      inputPosition?: string;
      reactionsEnabled?: string;
    },
    {},
    any
  >;
  export default component;
}
