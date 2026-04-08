<script setup lang="ts">
import { Terminal, CodeXml, LayoutDashboard, Settings, Activity } from 'lucide-vue-next';
</script>
<template>
  <aside class="command-console border-right glass-panel">
    <div class="logo font-display">RM</div>
    <nav class="tools">
      <button class="tool-btn active"><LayoutDashboard :size="20" stroke-width="1.5"/></button>
      <button class="tool-btn"><Terminal :size="20" stroke-width="1.5"/></button>
      <button class="tool-btn"><CodeXml :size="20" stroke-width="1.5"/></button>
    </nav>
    <div class="status">
      <button class="tool-btn"><Settings :size="20" stroke-width="1.5"/></button>
      <button class="tool-btn"><Activity :size="20" stroke-width="1.5" class="text-pulse"/></button>
    </div>
  </aside>
</template>
<style scoped>
.command-console {
  width: 65px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0;
  z-index: 10;
  background-color: var(--color-surface);
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 3rem;
  letter-spacing: 2px;
}
.tools {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.status {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.tool-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 8px;
  border-radius: 4px;
}
.tool-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}
.tool-btn.active {
  color: var(--color-pulse);
  border-right: 2px solid var(--color-pulse);
  border-radius: 0;
}
</style>
