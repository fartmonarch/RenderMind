<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  LayoutDashboard,
  Terminal,
  ScanSearch,
  Database,
  Settings,
  Activity,
  HelpCircle,
  User
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();

const navItems = [
  { icon: LayoutDashboard, route: '/', label: '指令中控' },
  { icon: Terminal, route: '/render-lab', label: '渲染实验室' },
  { icon: ScanSearch, route: '/diagnostic', label: '诊断实验室' },
  { icon: Database, route: '/schema-vault', label: '架构金库' },
];

const bottomItems = [
  { icon: Settings, label: '系统设置' },
  { icon: HelpCircle, label: '帮助文档' },
];

const isActive = (path: string) => {
  return route.path === path;
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo" @click="navigateTo('/')">
      <span class="logo-text font-display">RM</span>
      <div class="logo-pulse"></div>
    </div>

    <!-- Main Navigation -->
    <nav class="sidebar-nav">
      <button
        v-for="item in navItems"
        :key="item.route"
        class="nav-btn"
        :class="{ active: isActive(item.route) }"
        :title="item.label"
        @click="navigateTo(item.route)"
      >
        <div class="nav-indicator" v-if="isActive(item.route)"></div>
        <component :is="item.icon" :size="20" :stroke-width="1.5" />
      </button>
    </nav>

    <!-- Bottom Actions -->
    <div class="sidebar-bottom">
      <button
        v-for="item in bottomItems"
        :key="item.label"
        class="nav-btn"
        :title="item.label"
      >
        <component :is="item.icon" :size="20" :stroke-width="1.5" />
      </button>

      <!-- Status Indicator -->
      <button class="nav-btn status-btn" title="系统状态">
        <Activity :size="20" :stroke-width="1.5" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 64px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-6) 0;
  background-color: var(--color-surface-container-low);
  border-right: var(--border-ghost);
  z-index: 100;
  position: relative;
}

/* Logo */
.sidebar-logo {
  position: relative;
  cursor: pointer;
  margin-bottom: var(--space-12);
}

.logo-text {
  font-size: 1.3rem;
  color: var(--color-text-primary);
  letter-spacing: 3px;
  transition: color var(--transition-snap);
}

.sidebar-logo:hover .logo-text {
  color: var(--color-pulse);
}

.logo-pulse {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--color-pulse);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.4); }
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.sidebar-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

/* Nav Button */
.nav-btn {
  position: relative;
  background: none;
  border: none;
  color: var(--color-text-dim);
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-snap);
  width: 44px;
  height: 44px;
}

.nav-btn:hover {
  color: var(--color-text-primary);
}

.nav-btn.active {
  color: var(--color-pulse);
}

/* Left indicator bar for active state */
.nav-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 24px;
  background: var(--color-pulse);
  box-shadow: 0 0 8px rgba(0, 255, 65, 0.3);
}

/* Status button glowing */
.status-btn {
  color: var(--color-pulse);
  animation: pulse-border 2s linear infinite;
}

@keyframes pulse-border {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
</style>
