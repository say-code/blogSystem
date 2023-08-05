import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { HeadersPluginOptions } from "@mdit-vue/plugin-headers"


const headersPluginOptions: HeadersPluginOptions= {
  level: [2,5],
  shouldAllowNested: true
}

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "龙璃的博客",
  description: "龙璃的博客",

  theme,
  markdown: {
    headers: headersPluginOptions

  }

  // Enable it with pwa
  // shouldPrefetch: false,
});
