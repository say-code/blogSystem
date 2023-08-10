import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
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
  ],
  "/about/":"structure"

});
