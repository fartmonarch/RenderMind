<script setup lang="ts">
import { Code, MonitorPlay } from 'lucide-vue-next';
</script>
<template>
  <main class="the-forge dot-matrix">
    <div class="noise-overlay"></div>
    <header class="forge-header border-bottom glass-panel">
      <div class="tabs">
        <button class="tab"><Code :size="16"/> <span class="font-mono">Component.vue</span></button>
        <button class="tab active"><MonitorPlay :size="16"/> <span class="font-mono">Preview</span></button>
      </div>
      <div class="actions">
        <span class="font-mono text-muted text-xs">Vite HMR Active</span>
      </div>
    </header>
    <div class="forge-content">
      <div class="editor-pane border-right">
        <div class="line-numbers font-mono">
          <span>1</span><span>2</span><span>3</span><span>4</span>
        </div>
        <pre class="code font-mono text-muted">
&lt;template&gt;
  &lt;div class="container"&gt;
    &lt;!-- Generated output will appear here --&gt;
  &lt;/div&gt;
&lt;/template&gt;
        </pre>
      </div>
      <div class="preview-pane">
        <div class="glass-orb"></div>
        <div class="font-display floating-text">Awaiting Render</div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.the-forge {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.text-xs {
  font-size: 0.75rem;
}
.text-muted {
  color: var(--color-text-muted);
}
.forge-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 1.5rem;
  z-index: 10;
}
.tabs {
  display: flex;
  height: 100%;
}
.tab {
  background: none;
  border: none;
  border-right: var(--border-thin-val);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.tab:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.02);
}
.tab.active {
  color: var(--color-pulse);
  border-bottom: 1px solid var(--color-pulse);
  background: rgba(0, 255, 65, 0.02);
}
.forge-content {
  flex: 1;
  display: flex;
  z-index: 2; /* Content above noise */
}
.editor-pane {
  flex: 0.4;
  display: flex;
  background: rgba(10, 10, 10, 0.8);
  padding-top: 1rem;
}
.line-numbers {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 1rem;
  color: #444;
  user-select: none;
  font-size: 0.85rem;
  line-height: 1.6;
}
.code {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}
.preview-pane {
  flex: 0.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.glass-orb {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.15), transparent);
  box-shadow: 0 0 50px rgba(0, 255, 65, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 65, 0.2);
  animation: float 6s ease-in-out infinite;
}
.floating-text {
  margin-top: 2rem;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 4px;
  font-size: 1.2rem;
}
@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}
</style>
