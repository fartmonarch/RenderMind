# RenderMind 开发上下文 (VibeCoding 同步)

> **重要提示**: 本文档作为 RenderMind (AI 智能前端助手平台) 开发过程中的持久化状态和上下文。它专为 AI 编码助手设计，旨在通过读取本文档快速恢复进度、理解已确立的设计语言，并从最新的检查点继续开发。

---

## 🏗 上下文概览
- **项目名称**: RenderMind (AI 驱动的前端助手)
- **设计哲学**: Monolith & Pulse (纪元与脉冲 - 工业包豪斯 + 数字实验室)
- **核心技术栈**: Vue 3 (Composition API, TypeScript), Vite, Express (Node.js), Vue Router 4, pnpm
- **设计参考源**: Stitch MCP 项目 `AI Frontend Assistant` (ID: `5348249582586514265`)
- **当前状态**: 第三阶段 (路由系统 + 多页面应用 + 性能优化 + Stitch 设计同步) **已完成**

---

## 🛠 开发历程总结

### 第一阶段: 基础框架搭建
- **包管理与依赖**: 使用 `pnpm`；配置了 Monorepo 结构的 `package.json`（带有 `concurrently` 的 `start:all`）。 具有 `.env` 等标准环境变量设置。
- **后端架构**: Express + CORS + Dotenv + Nodemon。已开放 `/health` API。
- **前端架构**: Vite + Vue 3 + TS 搭建，清除了默认内容。

### 第二阶段: 全局视觉规范与布局组件开发
- **设计系统实现 (The Industrial Bauhaus)**
  - 核心色调变量引入 (Carbon Black `#0a0a0a`, Pulse Green `#00ff41` 等)。
  - `style.css`: 引入点阵背景 (`.dot-matrix`)，SVG噪点遮罩层 (`.noise-overlay`)，极细边框，及非线性透明组件 (`.glass-panel`)。
  - **字体挂载**: `Bebas Neue` / `JetBrains Mono` / `Space Grotesk`。
  - **图标系统**: `lucide-vue-next` 提供科技感线条。
- **组件分块化架构体系 (Flexbox Grid)**
  - `CommandConsole.vue`: 超细长条指令侧边栏。
  - `InteractionPane.vue`: 用户指令对话输入窗。
  - `TheForge.vue`: 代码编辑与渲染预览主区。

### 第三阶段: 路由系统 + 多页面应用 + 性能优化 + Stitch 设计同步 (当前)

#### 3.1 性能修复 — 页面加载缓慢
- **根因**: `index.html` 和 `style.css` 引用外部 Google Fonts (`fonts.googleapis.com`)，在中国网络环境下超时阻塞渲染 (30秒+)。
- **修复**: 移除所有外部 CDN 字体链接，改用系统字体回退链：
  - Display/Headline: `'Space Grotesk' → 'Segoe UI' → system-ui`
  - Body: `'Inter' → 'Segoe UI' → system-ui`
  - Mono: `'JetBrains Mono' → 'Cascadia Code' → 'Consolas'`
- **结果**: 加载时间降至 **< 1秒**。

#### 3.2 路由系统搭建 — 按钮跳转修复
- **根因**: 未安装 Vue Router，按钮为纯静态 UI。
- **修复**:
  - 安装 `vue-router@4` 依赖。
  - 新建 `frontend/src/router/index.ts`，定义四条核心路由 (懒加载)。
  - `main.ts` 注册 `app.use(router)`。
  - 路由守卫自动更新 `document.title`。
- **路由表**:
  | 路径 | 名称 | 组件 | 说明 |
  |------|------|------|------|
  | `/` | command-center | `CommandCenter.vue` | 指令中控 (首页) |
  | `/render-lab` | render-lab | `RenderLab.vue` | 渲染实验室 |
  | `/diagnostic` | diagnostic | `DiagnosticLab.vue` | 诊断实验室 |
  | `/schema-vault` | schema-vault | `SchemaVault.vue` | 架构金库 |

#### 3.3 Stitch 设计系统完整同步
- **设计源**: Stitch MCP 项目 "AI Frontend Assistant" 的 "Monolith & Pulse" 设计规范。
- **style.css 全面重构** — 完整实现 Stitch 设计 Token 系统:
  - **Basal Palette**: Carbon Black `#131313`, Surface 层级 (`container-lowest` → `container-highest`)。
  - **功能色**: Pulse Green `#00ff41` (主色), Warning Orange `#ff5f00` (警告), Error `#ffb4ab`。
  - **Ghost Border**: `0.5px solid rgba(132, 150, 126, 0.2)` — 替换旧版 `1px` 边框。
  - **过渡**: 机械式 snap `cubic-bezier(1, 0, 0, 1)` — 遵循 Stitch "不使用标准过渡"规则。
  - **新增组件类**: `.btn-primary` / `.btn-secondary` (Monolith 按钮), `.badge` / `.badge-pulse` / `.badge-alert`, `.card`, `.input-field`, `.progress-bar`, `.scan-effect`, `.pulse-active` (脉冲动画)。
  - **绝对零几何**: 全局 `border-radius: 0`。

#### 3.4 页面布局架构重构
- **App.vue**: 从三面板硬编码改为 `AppSidebar + AppTopBar + <router-view>` 标准布局，支持页面过渡动画。
- **新建核心组件**:
  - `AppSidebar.vue` (64px): 取代旧 `CommandConsole.vue`。集成 `router.push()` 导航，带激活指示器 (2px 绿色侧边条)、Logo 脉冲动效和底部工具栏。
  - `AppTopBar.vue` (48px): 显示当前页面标题、模块版本号 (`CMD_CENTER_V2.1` 等)、实时时钟和 `NEURAL_LINK` 状态指示器。
- **新建四个功能页面**:
  - `pages/CommandCenter.vue` — 首页看板：实时 SVG 脉冲图表 (500ms 刷新)、CPU/内存/模块资源监控、工作区快照列表、AI 建议面板 (橙色警告边框)、快速操作按钮组。
  - `pages/RenderLab.vue` — 三栏 IDE 布局：左侧 Agent Nexus 聊天面板 (含消息类型标识 `[SYS]/[AI]/[USR]` 和处理中脉冲动画)、中间代码编辑器 (行号 + 语法高亮)、右侧神经接口 (4 个参数滑杆 + 执行/重置按钮)。
  - `pages/DiagnosticLab.vue` — 诊断结果列表：错误/警告/优化分类统计、可展开详情卡片 (AI 建议 + 文件位置)、扫描线动画。
  - `pages/SchemaVault.vue` — 资产管理：网格/列表视图切换、搜索过滤、资产卡片 (图标 + 元数据 + 状态边框)。
- **旧组件保留** (未删除，但不再被 App.vue 引用): `CommandConsole.vue`, `InteractionPane.vue`, `TheForge.vue`, `HelloWorld.vue`。

---

## 📝 下一检查点: 第四阶段计划 (多模型 AI 请求流式模块)

**目标**: 封装多模型请求通道，实现与 OpenAI 兼容格式或 DeepSeek 接口的 SSE (Server-Sent Events) 流式联播。

### 任务项:
1. **Node.js 服务端接入**: 完善 `backend/src/aiClient.js` 提供标准封装和错误重试机制。
2. **前后端 SSE 通道**: 于 Express 构建返回大模型流式的 SSE 流响应。
3. **前端状态处理**: 使用前端网络 fetch 获取流数据，支持中断与恢复。
4. **实时反馈界面**: 将从 LLM 不断生成的 Chunk 反映到 `RenderLab.vue` 的 Agent Nexus 聊天面板以形成打字机效果。
5. **代码生成管道**: AI 生成的代码实时渲染到 RenderLab 中间的代码编辑器区域。

---

## 🚀 恢复开发指南

### 启动服务
```bash
pnpm install && pnpm run start:all
```
> 后端: `http://localhost:3000` | 前端: `http://localhost:5173`

### 项目架构速览
```
frontend/src/
├── main.ts                  # 入口，注册 Vue Router
├── App.vue                  # 根布局: Sidebar + TopBar + RouterView
├── style.css                # 全局设计 Token (Stitch 同步)
├── router/index.ts          # 四条路由 (懒加载)
├── components/
│   ├── AppSidebar.vue       # 主导航侧边栏 (64px, 带路由跳转)
│   └── AppTopBar.vue        # 顶部状态栏 (48px, 时钟+模块版本)
└── pages/
    ├── CommandCenter.vue    # / — 指令中控 (看板+脉冲图)
    ├── RenderLab.vue        # /render-lab — 渲染实验室 (三栏IDE)
    ├── DiagnosticLab.vue    # /diagnostic — 诊断实验室
    └── SchemaVault.vue      # /schema-vault — 架构金库
```

### CSS 设计 Token 速查
- **颜色**: `var(--color-pulse)` `var(--color-alert)` `var(--color-surface-container-*)` `var(--color-text-primary/secondary/muted/dim)`
- **排版**: `.font-display` `.font-headline` `.font-label` `.font-mono` `.font-body`
- **组件**: `.btn-primary` `.btn-secondary` `.badge` `.card` `.input-field` `.glass-panel` `.dot-matrix`
- **边框**: `var(--border-ghost)` — 0.5px Ghost Border
- **动效**: `.pulse-active` `.scan-effect` `var(--transition-snap)`
