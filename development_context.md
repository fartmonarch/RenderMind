# RenderMind 开发上下文 (VibeCoding 同步)

> **重要提示**: 本文档作为 RenderMind (AI 智能前端助手平台) 开发过程中的持久化状态和上下文。它专为 AI 编码助手设计，旨在通过读取本文档快速恢复进度、理解已确立的设计语言，并从最新的检查点继续开发。

---

## 🏗 上下文概览
- **项目名称**: RenderMind (AI 驱动的前端助手)
- **设计哲学**: Monolith & Pulse (纪元与脉冲 - 工业包豪斯 + 数字实验室)
- **核心技术栈**: Vue 3 (Composition API, TypeScript), Vite, Express (Node.js), pnpm
- **当前状态**: 第一阶段 (基础框架搭建) **已完成**

---

## 🛠 第一阶段: 基础框架搭建 (操作记录)

### 1. 环境初始化
- **包管理器**: 切换至 `pnpm` (通过 `npm install -g pnpm` 全局安装)。
- **根目录配置**: 创建了 Monorepo 风格的根目录及统一的 `package.json`。
  - 添加了 `pnpm run start:all` 脚本，用于同时启动前后端。
  - 初始化了 `.env.example` 和 `.gitignore`。

### 2. 后端实现 (`/backend`)
- **技术**: Node.js + Express。
- **依赖**: `express`, `cors`, `dotenv`, `nodemon`。
- **关键文件**:
  - `src/server.js`: Express 入口，包含 CORS 和健康检查接口 (`/health`)。
  - `src/aiClient.js`: 预留多模型 AI 路由适配层 (OpenAI, DeepSeek 等)。
- **心跳测试**: `http://localhost:3000/health` -> 返回 `{"status":"ok"}`。

### 3. 前端实现 (`/frontend`)
- **技术**: Vite + Vue 3 + TypeScript。
- **关键结构**:
  - 划分了 `src/components/`, `src/pages/`, `src/assets/` 目录。
- **初版设计系统实现**:
  - `style.css`: 定义了核心色调 Token:
    - `--color-basal`: `#0a0a0a` (碳黑)
    - `--color-surface`: `#1a1a1b` (冷灰)
    - `--color-pulse`: `#00ff41` (脉冲绿)
    - `--color-alert`: `#ff5f00` (警示橙)
    - `--border-thin`: `0.5px solid rgba(255,255,255,0.1)`。
  - 清理了 Vite 默认模板，在 `App.vue` 中构建了一个中心化的初始 UI。

---

## 📝 下一检查点: 第二阶段计划 (视觉规范与布局)

**目标**: 实现“工业包豪斯”数字实验室 UI。

### 任务项:
1. **字体系统**: 引入 Google Fonts (`Bebas Neue` 用于标题, `JetBrains Mono` 用于代码和正文)。
2. **背景系统**: 实现点阵 (Dot-Matrix) 背景纹理和噪声 (Noise) 纹理叠加层。
3. **布局组件**: 
   - `Command Console` (左侧垂直窄边栏)。
   - `Interaction Pane` (中心浮动输入区)。
   - `The Forge` (代码与预览的网格分屏)。
4. **视觉效能**: 实现 0.5px 极细边框和非线性动态模糊 (Glassmorphism 毛玻璃效果)。

---

## 🚀 恢复开发指南
如果是新的一轮对话，请按以下步骤操作：
1. 运行安装并启动：
   ```bash
   pnpm install && pnpm run start:all
   ```
2. 参考 `frontend/src/style.css` 中的设计变量。
3. 在 `frontend/src/components/` 中开始构建具体的 UI 组件。
