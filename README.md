# RenderMind: AI 智能前端助手平台

RenderMind 是一个充满未来感的、由 AI 驱动的前端开发辅助平台。它利用大语言模型（LLM）的能力，为前端开发者提供快速原型设计、自动化 Bug 修复和接口文档生成的一站式解决方案。

## 🚀 核心功能

### 1. AI 自动化代码生成 (页面/表单)
- **描述**: 根据自然语言描述，秒级生成生产级别的 Vue 3 组件。
- **子功能**:
  - 带有校验逻辑的语义化表单生成。
  - 基于描述的复杂 UI 布局构建。
  - 生成代码的实时预览与交互：在代码生成完成后，点击 **“预览”** 按钮，系统会将返回的 Vue 组件代码动态挂载到右侧预览面板，支持即时编辑、热更新和错误高亮。使用时可在编辑区修改代码，预览区会实时刷新，帮助你快速迭代 UI。

### 2. AI Bug 解释器 (错误诊断)
- **描述**: 粘贴错误日志或代码片段，AI 立即提供根本原因分析及优化后的修复方案。
- **子功能**:
  - 深度定位逻辑错误。
  - 识别性能瓶颈。
  - 结合最佳实践的重构建议。

### 3. AI 接口文档自动生成
- **描述**: 将原始 JSON 响应或接口定义自动转换为精美、可交互的在线文档。
- **子功能**:
  - 自动生成 TypeScript 类型定义。
  - 交互式请求/响应示例。
  - 支持多种导出格式（Markdown, OpenAPI 等）。

---

## 🛠 技术栈

- **前端**: Vue 3 (Composition API), Vite, 原生 CSS (追求卓越的视觉美感)。
- **后端**: Node.js, Express, 多模型 AI 适配层 (支持 OpenAI, DeepSeek 等)。
- **交互设计**: 基于 SSE (Server-Sent Events) 的流式响应，确保护感官上的实时反馈。
- **设计风格**: 默认深色模式, 毛玻璃效果 (Glassmorphism), 微交互动画。

---

## 🎨 UI 与布局设计：视觉重构 - "Monolith & Pulse" (纪元与脉冲)

为了摆脱平庸的 AI 套路化设计，RenderMind 采用了一种 **“工业包豪斯 (Industrial Bauhaus)”** 结合 **“数字实验室 (Digital Lab)”** 的设计语言。追求极致的精度、工业感和高级感。

### 核心视觉概念
- **主色调 (Basal Palette)**: 采用 **碳黑 (#0a0a0a)** 作为背景，**冷灰 (#1a1a1b)** 作为层级区分，配合高饱和度的 **脉冲绿 (#00ff41)** 或 **警示橙 (#ff5f00)** 作为点睛之笔。
- **字体规范 (Typography)**: 
  - **标题**: 使用具有强烈工业感的 **Bebas Neue** 或 **Space Grotesk**。
  - **正文/代码**: 使用极致清晰的 **JetBrains Mono** 或 **IBM Plex Mono**。
- **材质 (Materials)**: 抛弃圆角卡片。采用 **0.5px 极细线** 边框、**点阵底纹 (Dot-Matrix Background)**、以及 **非线性动态模糊 (Non-linear Blur)**。

### 空间布局
1. **动态分屏架构 (Adaptive Grid Architecture)**:
   - 界面不再是静态的侧边栏，而是由多个可伸缩的“功能模块”组成的网格。
   - **指令中控 (Command Console)**: 左侧垂直窄边栏，由极小化的图标组成，悬停时产生脉冲光晕。
   - **交互视窗 (Interaction Pane)**: 核心输入区，采用浮动式布局，背景带细微的噪声纹理 (Noise Texture) 以模拟实体显示屏感。

2. **渲染实验室 (The Forge)**:
   - **代码实时映射**: AI 生成代码时，字符不再是简单出现，而是伴随着模拟扫描线的动效。
   - **全息预览 (Hologram Preview)**: 预览窗口不再有边框，直接“漂浮”在网格背景之上，模拟全息投影的通透感。
   - **状态指示器**: 页面底部采用类似工业仪表盘的动态条形图，显示大模型生成的 Token 速率和延迟。

---

## 📝 提示词工程 (Engineered Prompts)
*(这些提示词经过精心调优，确保生成的代码不仅仅是功能正确，更具备优秀的 UI 基因)*
...

---

## 📝 提示词工程 (Prompt Templates)

### 代码生成提示词
```markdown
角色: 你是一位精通 Vue 3 (Composition API) 的资深前端架构师。
任务: 创建一个名为 [Name] 的 [Component Type] 组件，功能包括: [Requirements]。
约束:
- 使用 <script setup> 语法。
- 使用 Scoped 原生 CSS 进行样式设计。
- 确保符合可访问性 (ARIA) 标准。
- 仅输出单文件组件 (.vue) 的完整代码。
```

### Bug 分析提示词
```markdown
角色: 你是一位经验丰富的 Debug 专家。
错误日志: [Logs]
代码片段: [Code]
任务: 请分析该错误，用通俗易懂的语言解释原因，并给出修复后的代码。
```

---

## 📅 路线图

- [ ] **第一阶段**: 基础框架搭建 (Vite + Vue 3 + Express)。
- [ ] **第二阶段**: 全局视觉规范与布局组件开发。
- [ ] **第三阶段**: 封装多模型 AI 请求模块 (支持流式响应)。
- [ ] **第四阶段**: 代码实验室功能开发 (前端编辑器 + 预览引擎)。
- [ ] **第五阶段**: 修复站与文档工坊功能实现。
- [ ] **第六阶段**: 前后端联调、性能优化与最终打磨。
## 📁 项目结构
```
RenderMind/
├─ frontend/          # Vue 3 + Vite 前端代码
│   ├─ src/
│   │   ├─ components/   # 可复用 UI 组件
│   │   ├─ pages/        # 功能页面（代码实验室、修复站、文档工坊）
│   │   └─ assets/       # 静态资源、图标、图片
│   └─ vite.config.ts
├─ backend/           # Node.js + Express 后端服务
│   ├─ src/
│   │   ├─ routes/       # API 路由
│   │   ├─ services/     # 业务逻辑（AI 请求、流式处理）
│   │   └─ aiClient.js   # 多模型适配层入口
│   └─ server.js
├─ .env.example       # 环境变量示例文件
├─ README.md          # 项目说明文档（此文件）
├─ package.json       # 项目依赖与脚本
└─ pnpm-lock.yaml     # 锁定文件
```

## 🛠 环境准备 & 安装
```bash
# 1. 克隆仓库
git clone https://github.com/your-org/RenderMind.git
cd RenderMind

# 2. 安装依赖（推荐使用 pnpm）
pnpm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的 AI API Key、模型名称等
```

## 🚀 本地开发
```bash
# 前端开发（Vite）
pm run dev   # 访问 http://localhost:5173

# 后端开发（Express）
pm run server   # 访问 http://localhost:3000

# 同时启动（可选）
pm run start:all   # 使用 concurrently 同时运行前后端
```

## 🤖 AI 接口配置
在 `.env` 中提供以下变量（示例）：
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
DEEPSEEK_API_KEY=xxxxxxxxxxxxxx
AI_MODEL=gpt-4-turbo   # 支持 gpt-4-turbo、gpt-3.5-turbo、deepseek-coder 等
```
`backend/src/aiClient.js` 会根据 `AI_MODEL` 自动路由到对应的请求实现，统一返回 **SSE** 流式响应。

## 🎬 实时预览实现要点
- 使用 `@vue/compiler-sfc` 将后端返回的 `.vue` 代码字符串编译为组件对象。
- 通过 `app.component('DynamicComponent', component)` 动态挂载到右侧预览面板，实现 **即时编辑 → 热更新**。
- SSE 流式输出边接收边渲染，配合 `requestAnimationFrame` 实现“打字机”动画。
- 错误捕获：`try { … } catch (e) { showError(e) }`，并在编辑区高亮报错行，帮助快速定位。

## ✅ 测试 & 质量保障
- **单元测试**：`pnpm run test`（Jest + Vue Test Utils）
- **端到端测试**：`pnpm run cypress:open`（Cypress）
- **代码规范**：`pnpm run lint && pnpm run format`（ESLint + Prettier）

## 📦 部署指南
```bash
# 前端构建
pnpm run build   # 生成 dist/ 目录

# Docker 示例（生产环境）
# Dockerfile 已在根目录提供
docker build -t rendermind .
docker run -p 80:80 rendermind
```
> **提示**：若使用云平台（Vercel、Netlify），只需将 `frontend/` 目录作为前端项目部署，后端可单独部署为 Serverless 函数或容器服务。

## ❓ 常见问题 (FAQ)
1. **如何切换模型？** 修改 `.env` 中的 `AI_MODEL`，重启后端服务即可。
2. **实时预览卡顿或不刷新？** 检查网络 SSE 延迟，或在 `frontend/src/store/preview.js` 调整防抖时间（默认 200ms）。
3. **API Key 泄露怎么办？** 立即在对应平台撤销旧 Key，生成新 Key 并更新 `.env`，同时确保 `.env` 不被提交至 Git（已在 `.gitignore` 中配置）。

## 🤝 贡献指南
1. Fork 本仓库
2. 创建特性分支 `git checkout -b feat/your-feature`
3. 提交代码 `git commit -m "feat: description"`
4. Push 并提交 Pull Request
5. CI 将自动运行 lint、test，审查通过后即可合并。

## 📄 许可证
本项目采用 **MIT License**，详见 `LICENSE` 文件。

---

> 现在的 README 已经覆盖 **从项目结构、环境搭建、开发运行、AI 接口配置、实时预览实现细节、测试、部署、FAQ、贡献流程到许可证** 的完整闭环。你可以直接依据此文档完成项目的 **初始化 → 开发 → 部署** 全流程。若还有其他细节需要补充，请随时告知。
