<script setup lang="ts">
import { SendHorizontal } from 'lucide-vue-next';
</script>
<template>
  <section class="interaction-pane border-right glass-panel">
    <header class="pane-header border-bottom">
      <h2 class="font-display">Agent Nexus</h2>
      <div class="badge font-mono">IDLE</div>
    </header>
    <div class="chat-area">
      <!-- Chat history would go here -->
      <div class="sys-message font-mono">
        <span class="text-pulse">[SYS]</span> Neural link established.<br/>
        <span style="color:var(--color-text-muted)">Awaiting directives...</span>
      </div>
    </div>
    <div class="input-area border-top">
      <textarea class="font-mono bg-transparent" placeholder="Define UI structure..." rows="1"></textarea>
      <button class="send-btn"><SendHorizontal :size="18" /></button>
    </div>
  </section>
</template>
<style scoped>
.interaction-pane {
  width: 380px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(20, 20, 21, 0.4);
  z-index: 5;
}
.pane-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}
h2 {
  margin: 0;
  font-size: 1.3rem;
  letter-spacing: 1px;
}
.badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border: var(--border-thin-val);
  color: var(--color-text-muted);
}
.chat-area {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}
.sys-message {
  font-size: 0.85rem;
  margin-bottom: 1rem;
  line-height: 1.6;
}
.input-area {
  padding: 1.5rem;
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  background: rgba(0,0,0,0.2);
}
textarea {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  resize: none;
  outline: none;
  line-height: 1.5;
}
textarea::placeholder {
  color: var(--color-text-muted);
}
.send-btn {
  background: var(--color-text-primary);
  color: var(--color-basal);
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}
.send-btn:hover {
  background: var(--color-pulse);
}
</style>
