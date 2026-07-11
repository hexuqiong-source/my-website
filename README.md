# Short Drama Studio

这是 `short-drama` Codex 技能的本地网页界面。

## 使用

1. 双击打开 `index.html`
2. 填写短剧项目参数
3. 点击左侧功能按钮，例如 `/start`、`/plan`、`/episode`
4. 复制右侧生成的指令
5. 粘贴到 Codex 新任务中执行

## 说明

- 这是纯前端本地页面，不需要 Node、Python、Docker。
- 项目状态保存在浏览器 `localStorage`。
- “导出项目 JSON” 可以把表单状态下载成文件。
- 真正的 AI 生成由已安装到 Codex 的 `short-drama` 技能完成。
