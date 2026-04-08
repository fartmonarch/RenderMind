<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Bell, Maximize2, Minimize2 } from 'lucide-vue-next';

const route = useRoute();

const pageTitle = computed(() => {
  return (route.meta?.title as string) || 'Forge';
});

const moduleVersion = computed(() => {
  const versions: Record<string, string> = {
    '/': 'CMD_CENTER_V2.1',
    '/render-lab': 'RENDER_LAB_V1.4',
    '/diagnostic': 'DIAG_MODULE_V1.2',
    '/schema-vault': 'VAULT_SYS_V3.0',
  };
  return versions[route.path] || 'MODULE_V1.0';
});

const currentTime = ref('');
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
updateTime();
setInterval(updateTime, 1000);
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <h1 class="topbar-title font-display">{{ pageTitle }}</h1>
      <span class="topbar-module font-mono">{{ moduleVersion }}</span>
    </div>
    <div class="topbar-right">
      <span class="topbar-clock font-mono">{{ currentTime }}</span>
      <div class="topbar-status">
        <span class="status-dot"></span>
        <span class="font-label">NEURAL_LINK</span>
      </div>
      <button class="topbar-btn" title="通知">
        <Bell :size="16" :stroke-width="1.5" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  background: var(--color-surface-container-low);
  border-bottom: var(--border-ghost);
  z-index: 50;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.topbar-title {
  font-size: 0.95rem;
  color: var(--color-text-primary);
  letter-spacing: 2px;
}

.topbar-module {
  font-size: 0.65rem;
  color: var(--color-text-dim);
  letter-spacing: 0.1em;
  padding: 2px 8px;
  background: var(--color-surface-container-lowest);
  border: var(--border-ghost);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.topbar-clock {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.topbar-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: var(--color-pulse);
  box-shadow: 0 0 6px var(--color-pulse);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.topbar-status .font-label {
  color: var(--color-pulse);
  font-size: 0.6rem;
}

.topbar-btn {
  background: none;
  border: none;
  color: var(--color-text-dim);
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-snap);
}

.topbar-btn:hover {
  color: var(--color-text-primary);
}
</style>
