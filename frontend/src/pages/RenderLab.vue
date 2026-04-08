<script setup lang="ts">
import { ref } from 'vue';
import { SendHorizontal, Play, RotateCcw, Copy, Download } from 'lucide-vue-next';

const codeContent = ref(`<template>
  <div class="hero-section">
    <h1 class="font-display">RENDERMIND</h1>
    <p class="subtitle">AI-Powered Frontend Forge</p>
    <div class="cta-group">
      <button class="btn-primary">开始构建</button>
      <button class="btn-secondary">查看文档</button>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #131313;
}
</style>`);

const chatMessages = ref([
  { type: 'system', text: '神经链路已建立。模块 v1.0.4 - 运行中' },
  { type: 'ai', text: '已就绪。请描述您需要生成的 UI 组件或页面结构。' },
]);

const inputText = ref('');
const isProcessing = ref(false);

// Neural interface sliders
const sliders = ref([
  { label: '创意度', value: 72, color: 'pulse' },
  { label: '精确度', value: 88, color: 'pulse' },
  { label: '复杂度', value: 45, color: 'muted' },
  { label: '动效强度', value: 60, color: 'pulse' },
]);

const lineNumbers = () => {
  return codeContent.value.split('\n').length;
};

const handleSend = () => {
  if (!inputText.value.trim()) return;
  chatMessages.value.push({ type: 'user', text: inputText.value });
  isProcessing.value = true;
  inputText.value = '';
  
  setTimeout(() => {
    chatMessages.value.push({
      type: 'ai',
      text: '正在解析指令并生成组件代码...'
    });
    isProcessing.value = false;
  }, 1500);
};
</script>

<template>
  <div class="render-lab">
    <!-- Left: Chat / Agent Nexus -->
    <aside class="agent-pane">
      <header class="agent-header">
        <h2 class="font-display" style="font-size: 0.9rem;">AGENT NEXUS</h2>
        <span class="badge" :class="isProcessing ? 'badge-pulse' : ''">
          {{ isProcessing ? '处理中' : '待命' }}
        </span>
      </header>

      <div class="chat-area">
        <div
          v-for="(msg, i) in chatMessages"
          :key="i"
          class="chat-msg"
          :class="'msg-' + msg.type"
        >
          <span class="msg-tag font-mono" v-if="msg.type === 'system'">
            <span class="text-pulse">[SYS]</span>
          </span>
          <span class="msg-tag font-mono" v-else-if="msg.type === 'ai'">
            <span class="text-pulse">[AI]</span>
          </span>
          <span class="msg-tag font-mono" v-else>
            <span style="color: var(--color-secondary);">[USR]</span>
          </span>
          <span class="msg-text">{{ msg.text }}</span>
        </div>
        <div v-if="isProcessing" class="processing-indicator">
          <div class="pulse-dot"></div>
          <div class="pulse-dot"></div>
          <div class="pulse-dot"></div>
        </div>
      </div>

      <div class="input-area">
        <textarea
          v-model="inputText"
          class="chat-input input-field font-mono"
          placeholder="定义 UI 结构..."
          rows="1"
          @keydown.enter.prevent="handleSend"
        ></textarea>
        <button class="send-btn btn-primary" @click="handleSend" style="padding: 8px 12px;">
          <SendHorizontal :size="16" />
        </button>
      </div>
    </aside>

    <!-- Center: Code Editor -->
    <div class="editor-pane">
      <div class="editor-toolbar">
        <div class="editor-tabs">
          <button class="editor-tab active font-mono">Component.vue</button>
          <button class="editor-tab font-mono">Styles.css</button>
        </div>
        <div class="editor-actions">
          <button class="topbar-btn" title="复制"><Copy :size="14" /></button>
          <button class="topbar-btn" title="下载"><Download :size="14" /></button>
        </div>
      </div>
      <div class="code-view">
        <div class="line-numbers font-mono">
          <span v-for="n in lineNumbers()" :key="n">{{ n }}</span>
        </div>
        <pre class="code-content font-mono">{{ codeContent }}</pre>
      </div>
    </div>

    <!-- Right: Neural Interface -->
    <aside class="neural-pane">
      <header class="neural-header">
        <h3 class="font-label">神经接口</h3>
        <span class="font-mono text-dim" style="font-size: 0.6rem;">模块 v1.0.4</span>
      </header>

      <div class="neural-controls">
        <div v-for="slider in sliders" :key="slider.label" class="slider-group">
          <div class="slider-header">
            <span class="font-label">{{ slider.label }}</span>
            <span class="font-mono text-pulse" style="font-size: 0.75rem;">{{ slider.value }}%</span>
          </div>
          <div class="slider-track">
            <div class="slider-fill" :style="{ width: slider.value + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="neural-actions">
        <button class="btn-primary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <Play :size="14" /> 执行渲染
        </button>
        <button class="btn-secondary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px;">
          <RotateCcw :size="14" /> 重置参数
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.render-lab {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

/* Agent Pane (Left) */
.agent-pane {
  width: 320px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  background: rgba(28, 27, 27, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: var(--border-ghost);
}

.agent-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  border-bottom: var(--border-ghost);
}

.chat-area {
  flex: 1;
  padding: var(--space-6);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.chat-msg {
  font-size: 0.8rem;
  line-height: 1.6;
  display: flex;
  gap: var(--space-2);
}

.msg-tag {
  font-size: 0.7rem;
  white-space: nowrap;
  flex-shrink: 0;
}

.msg-text {
  color: var(--color-text-secondary);
}

.msg-user .msg-text {
  color: var(--color-text-primary);
}

.processing-indicator {
  display: flex;
  gap: 4px;
  padding-left: 36px;
}

.pulse-dot {
  width: 4px;
  height: 4px;
  background: var(--color-pulse);
  animation: blink 1.2s ease-in-out infinite;
}
.pulse-dot:nth-child(2) { animation-delay: 0.2s; }
.pulse-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}

.input-area {
  padding: var(--space-4);
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
  background: var(--color-surface-container-lowest);
  border-top: var(--border-ghost);
}

.chat-input {
  flex: 1;
  resize: none;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  outline: none;
  line-height: 1.5;
  padding: var(--space-2);
}

.chat-input::placeholder {
  color: var(--color-text-dim);
}

/* Editor Pane (Center) */
.editor-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-toolbar {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border-ghost);
  background: var(--color-surface-container-low);
  padding-right: var(--space-4);
}

.editor-tabs {
  display: flex;
  height: 100%;
}

.editor-tab {
  background: none;
  border: none;
  border-right: var(--border-ghost);
  color: var(--color-text-dim);
  font-size: 0.75rem;
  padding: 0 var(--space-6);
  cursor: pointer;
  transition: all var(--transition-snap);
  height: 100%;
  display: flex;
  align-items: center;
}

.editor-tab:hover {
  color: var(--color-text-primary);
}

.editor-tab.active {
  color: var(--color-pulse);
  border-bottom: 1px solid var(--color-pulse);
  background: rgba(0, 255, 65, 0.02);
}

.editor-actions {
  display: flex;
  gap: var(--space-2);
}

.code-view {
  flex: 1;
  display: flex;
  overflow: auto;
  background: var(--color-surface-container-lowest);
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: var(--space-4) var(--space-4);
  color: rgba(132, 150, 126, 0.3);
  user-select: none;
  font-size: 0.8rem;
  line-height: 1.7;
  text-align: right;
  min-width: 40px;
  border-right: var(--border-ghost);
}

.code-content {
  margin: 0;
  padding: var(--space-4);
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  line-height: 1.7;
  white-space: pre;
  overflow-x: auto;
}

/* Neural Pane (Right) */
.neural-pane {
  width: 260px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-container-low);
  border-left: var(--border-ghost);
}

.neural-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  border-bottom: var(--border-ghost);
}

.neural-controls {
  flex: 1;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-track {
  width: 100%;
  height: 3px;
  background: var(--color-surface-container-lowest);
  position: relative;
}

.slider-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary-container), var(--color-surface-tint));
  transition: width 0.3s ease;
}

.neural-actions {
  padding: var(--space-6);
  border-top: var(--border-ghost);
}

/* Top bar button (reused) */
.topbar-btn {
  background: none;
  border: none;
  color: var(--color-text-dim);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color var(--transition-snap);
}

.topbar-btn:hover {
  color: var(--color-text-primary);
}
</style>
