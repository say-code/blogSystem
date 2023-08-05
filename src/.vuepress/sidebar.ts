import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
  "/project/": [
    "",
  ],
  "/docs/": [
    "",
    {
      text: "JVM",
      collapsible: true,
      prefix: "jvm/",
      children: [
        "导航",
        "简述",
        {
          text: "内存与垃圾回收篇",
          collapsible: true,
          children:[
            "内存与垃圾回收篇-类加载子系统",
            "内存与垃圾回收篇-运行时数据区",
          ]
        }

      ],
    },
    {
      text: "环境配置",
      collapsible: true,
      prefix: "environment/",
      children: "structure"
    }
  ]

});
