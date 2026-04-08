<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Zap, Cpu, HardDrive, Wifi, ArrowRight, Clock, AlertTriangle } from 'lucide-vue-next';

const router = useRouter();

// System metrics (simulated live data)
const metrics = ref({
  throughput: 847,
  latency: 12,
  cpuLoad: 67,
  memoryUsage: 4.2,
  memoryTotal: 8.0,
  activeModules: 4,
  uptime: '14h 32m',
});

// Pulse chart data points
const pulseData = ref<number[]>([]);
const generatePulseData = () => {
  const data = [];
  for (let i = 0; i < 60; i++) {
    data.push(30 + Math.random() * 40 + Math.sin(i * 0.3) * 15);
  }
  return data;
};
pulseData.value = generatePulseData();

// Animate pulse
let pulseInterval: number;
onMounted(() => {
  pulseInterval = window.setInterval(() => {
    pulseData.value.shift();
    pulseData.value.push(30 + Math.random() * 40 + Math.sin(Date.now() * 0.003) * 15);
    metrics.value.throughput = 800 + Math.floor(Math.random() * 100);
    metrics.value.latency = 8 + Math.floor(Math.random() * 10);
    metrics.value.cpuLoad = 60 + Math.floor(Math.random() * 20);
  }, 500);
});

onUnmounted(() => {
  clearInterval(pulseInterval);
});

const pulsePath = (data: number[]) => {
  if (!data.length) return '';
  const width = 100;
  const height = 100;
  const step = width / (data.length - 1);
  let d = `M 0 ${height - data[0]}`;
  for (let i = 1; i < data.length; i++) {
    d += ` L ${i * step} ${height - data[i]}`;
  }
  return d;
};

const pulseAreaPath = (data: number[]) => {
  if (!data.length) return '';
  const base = pulsePath(data);
  return `${base} L 100 100 L 0 100 Z`;
};

// Workspace snapshots
const workspaces = ref([
  { name: '赛博有机 UI 套件', time: '4分钟前', status: 'active' },
  { name: 'Auth-Stream 逻辑控制', time: '1小时前', status: 'idle' },
  { name: '脉冲引擎 V2', time: '5小时前', status: 'warning' },
]);

// AI suggestion
const aiSuggestion = ref('项目 "脉冲引擎 V2" 在模块-7 中显示冗余 API 调用。最佳修复：实现本地缓存层。');
</script>

<template>
  <div class="command-center dot-matrix">
    <div class="cc-grid">
      <!-- Left Column: Pulse + Resources -->
      <div class="cc-left">
        <!-- System Pulse Chart -->
        <section class="panel pulse-panel">
          <div class="panel-header">
            <h2 class="font-label">系统脉冲</h2>
            <span class="font-mono text-muted" style="font-size: 0.7rem;">实时吞吐量监控</span>
          </div>
          <div class="pulse-chart">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="pulse-svg">
              <defs>
                <linearGradient id="pulseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="rgba(0, 255, 65, 0.3)" />
                  <stop offset="100%" stop-color="rgba(0, 255, 65, 0)" />
                </linearGradient>
              </defs>
              <path :d="pulseAreaPath(pulseData)" fill="url(#pulseGrad)" />
              <path :d="pulsePath(pulseData)" fill="none" stroke="var(--color-pulse)" stroke-width="0.5" />
            </svg>
            <div class="pulse-stats">
              <div class="stat">
                <span class="stat-value font-mono text-pulse">{{ metrics.throughput }}</span>
                <span class="stat-label font-label">req/s</span>
              </div>
              <div class="stat">
                <span class="stat-value font-mono">{{ metrics.latency }}ms</span>
                <span class="stat-label font-label">延迟</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Resource Allocation -->
        <section class="panel resources-panel">
          <div class="panel-header">
            <h2 class="font-label">资源分配</h2>
          </div>
          <div class="resource-grid">
            <div class="resource-item">
              <div class="resource-icon"><Cpu :size="16" :stroke-width="1.5" /></div>
              <div class="resource-info">
                <span class="font-label text-muted">CPU 负载</span>
                <div class="progress-bar"><div class="progress-bar-fill" :style="{ width: metrics.cpuLoad + '%' }"></div></div>
                <span class="font-mono" style="font-size: 0.75rem;">{{ metrics.cpuLoad }}%</span>
              </div>
            </div>
            <div class="resource-item">
              <div class="resource-icon"><HardDrive :size="16" :stroke-width="1.5" /></div>
              <div class="resource-info">
                <span class="font-label text-muted">内存</span>
                <div class="progress-bar"><div class="progress-bar-fill" :style="{ width: (metrics.memoryUsage / metrics.memoryTotal * 100) + '%' }"></div></div>
                <span class="font-mono" style="font-size: 0.75rem;">{{ metrics.memoryUsage }}GB / {{ metrics.memoryTotal }}GB</span>
              </div>
            </div>
            <div class="resource-item">
              <div class="resource-icon"><Wifi :size="16" :stroke-width="1.5" /></div>
              <div class="resource-info">
                <span class="font-label text-muted">活跃模块</span>
                <span class="font-mono text-pulse" style="font-size: 1.2rem; font-weight: 600;">{{ metrics.activeModules }}</span>
              </div>
            </div>
            <div class="resource-item">
              <div class="resource-icon"><Clock :size="16" :stroke-width="1.5" /></div>
              <div class="resource-info">
                <span class="font-label text-muted">运行时间</span>
                <span class="font-mono" style="font-size: 0.85rem;">{{ metrics.uptime }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: Workspaces + AI -->
      <div class="cc-right">
        <!-- Workspaces -->
        <section class="panel workspaces-panel">
          <div class="panel-header">
            <h2 class="font-label">工作区快照</h2>
            <button class="btn-secondary" style="padding: 2px 12px; font-size: 0.6rem;" @click="router.push('/schema-vault')">
              查看全部 <ArrowRight :size="10" style="margin-left: 4px;" />
            </button>
          </div>
          <div class="workspace-list">
            <div
              v-for="ws in workspaces"
              :key="ws.name"
              class="workspace-card"
              :class="{ 'ws-warning': ws.status === 'warning' }"
              @click="router.push('/render-lab')"
            >
              <div class="ws-left">
                <Zap :size="14" :stroke-width="1.5" :class="ws.status === 'active' ? 'text-pulse' : ws.status === 'warning' ? 'text-alert' : 'text-dim'" />
                <div class="ws-info">
                  <span class="ws-name">{{ ws.name }}</span>
                  <span class="ws-time font-mono text-muted">修改于: {{ ws.time }}</span>
                </div>
              </div>
              <ArrowRight :size="14" class="ws-arrow" />
            </div>
          </div>
        </section>

        <!-- Neural Assistant -->
        <section class="panel ai-panel">
          <div class="panel-header">
            <h2 class="font-label">
              <AlertTriangle :size="12" class="text-alert" style="margin-right: 6px;" />
              神经助手
            </h2>
            <span class="badge badge-alert">AI 建议</span>
          </div>
          <p class="ai-suggestion font-body">{{ aiSuggestion }}</p>
          <div class="ai-actions">
            <button class="btn-primary" @click="router.push('/diagnostic')">查看诊断</button>
            <button class="btn-secondary">忽略</button>
          </div>
        </section>

        <!-- Quick Actions -->
        <section class="panel actions-panel">
          <div class="panel-header">
            <h2 class="font-label">快速操作</h2>
          </div>
          <div class="action-grid">
            <button class="action-btn" @click="router.push('/render-lab')">
              <span class="font-label">新建项目</span>
            </button>
            <button class="action-btn" @click="router.push('/diagnostic')">
              <span class="font-label">运行诊断</span>
            </button>
            <button class="action-btn" @click="router.push('/schema-vault')">
              <span class="font-label">资产管理</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.command-center {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: var(--space-6);
}

.cc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  height: 100%;
  min-height: 0;
}

.cc-left, .cc-right {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-height: 0;
}

/* Panel */
.panel {
  background: var(--color-surface-container-low);
  border: var(--border-ghost);
  padding: var(--space-6);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.panel-header h2 {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
}

/* Pulse Chart */
.pulse-panel {
  flex: 1;
  min-height: 200px;
}

.pulse-chart {
  position: relative;
  width: 100%;
  height: calc(100% - 40px);
  min-height: 150px;
}

.pulse-svg {
  width: 100%;
  height: 100%;
}

.pulse-stats {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  display: flex;
  gap: var(--space-8);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1;
}

.stat-label {
  font-size: 0.55rem;
  margin-top: 4px;
  color: var(--color-text-dim);
}

/* Resources */
.resource-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.resource-item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-surface-container-lowest);
  border: var(--border-ghost);
}

.resource-icon {
  color: var(--color-text-dim);
  padding-top: 2px;
}

.resource-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

/* Workspaces */
.workspace-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.workspace-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: var(--color-surface-container-lowest);
  border: var(--border-ghost);
  cursor: pointer;
  transition: all var(--transition-snap);
}

.workspace-card:hover {
  border-color: rgba(0, 255, 65, 0.3);
  background: var(--color-surface-container);
}

.workspace-card.ws-warning {
  border-left: 2px solid var(--color-alert);
}

.ws-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.ws-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ws-name {
  font-size: 0.85rem;
  color: var(--color-text-primary);
}

.ws-time {
  font-size: 0.65rem;
}

.ws-arrow {
  color: var(--color-text-dim);
  transition: color var(--transition-snap);
}

.workspace-card:hover .ws-arrow {
  color: var(--color-pulse);
}

/* AI Panel */
.ai-panel {
  border-left: 2px solid var(--color-alert);
}

.ai-suggestion {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.ai-actions {
  display: flex;
  gap: var(--space-3);
}

/* Quick Actions */
.action-grid {
  display: flex;
  gap: var(--space-3);
}

.action-btn {
  flex: 1;
  background: var(--color-surface-container-lowest);
  border: var(--border-ghost);
  color: var(--color-text-secondary);
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-snap);
  text-align: center;
}

.action-btn:hover {
  border-color: rgba(0, 255, 65, 0.3);
  color: var(--color-pulse);
  background: var(--color-surface-container);
}
</style>
