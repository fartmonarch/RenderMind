<script setup lang="ts">
import { ref } from 'vue';
import { AlertTriangle, CheckCircle, XCircle, Search, RefreshCw, ChevronRight } from 'lucide-vue-next';

const diagnosticResults = ref([
  {
    id: 1,
    type: 'error',
    title: 'TYPE_ERROR',
    module: '脉冲引擎 V2 / 模块-7',
    description: '检测到冗余 API 调用。`fetchUserData()` 在渲染周期内被重复调用 3 次。',
    suggestion: '实现本地缓存层，使用 `useMemo` 或 `computed` 包裹异步请求。',
    line: 142,
    file: 'src/modules/pulse-engine/api.ts',
  },
  {
    id: 2,
    type: 'warning',
    title: 'PERF_WARNING',
    module: 'Auth-Stream / 控制器',
    description: '未使用的导入变量 `authConfig` 增加了 bundle 体积 (~2.4KB)。',
    suggestion: '移除未使用的导入，或使用 tree-shaking 友好的具名导入。',
    line: 8,
    file: 'src/auth/controller.ts',
  },
  {
    id: 3,
    type: 'success',
    title: 'OPTIMIZATION',
    module: '赛博有机 UI 套件 / 布局',
    description: 'CSS Grid 布局已优化，渲染性能提升 18%。',
    suggestion: '无需操作。当前实现已达到最优状态。',
    line: 0,
    file: 'src/ui-kit/layout.css',
  },
  {
    id: 4,
    type: 'error',
    title: 'RUNTIME_ERROR',
    module: '数据管道 / Stream-3',
    description: 'WebSocket 连接在 30s 后超时断开。`onMessage` 回调未正确处理重连逻辑。',
    suggestion: '添加指数退避重连策略和心跳检测机制。',
    line: 67,
    file: 'src/pipeline/websocket.ts',
  },
]);

const isScanning = ref(false);

const runDiagnostic = () => {
  isScanning.value = true;
  setTimeout(() => {
    isScanning.value = false;
  }, 3000);
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'error': return XCircle;
    case 'warning': return AlertTriangle;
    case 'success': return CheckCircle;
    default: return Search;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'error': return 'var(--color-error)';
    case 'warning': return 'var(--color-alert)';
    case 'success': return 'var(--color-pulse)';
    default: return 'var(--color-text-muted)';
  }
};

const selectedResult = ref<number | null>(null);

const toggleDetail = (id: number) => {
  selectedResult.value = selectedResult.value === id ? null : id;
};
</script>

<template>
  <div class="diagnostic-lab dot-matrix">
    <!-- Header Bar -->
    <div class="diag-header">
      <div class="diag-stats">
        <div class="stat-block">
          <span class="stat-num font-mono" style="color: var(--color-error);">2</span>
          <span class="font-label text-muted">错误</span>
        </div>
        <div class="stat-block">
          <span class="stat-num font-mono" style="color: var(--color-alert);">1</span>
          <span class="font-label text-muted">警告</span>
        </div>
        <div class="stat-block">
          <span class="stat-num font-mono text-pulse">1</span>
          <span class="font-label text-muted">优化</span>
        </div>
      </div>
      <button
        class="btn-primary"
        @click="runDiagnostic"
        :class="{ 'pulse-active': isScanning }"
        style="display: flex; align-items: center; gap: 6px;"
      >
        <RefreshCw :size="14" :class="{ 'spin': isScanning }" />
        {{ isScanning ? '扫描中...' : '运行诊断' }}
      </button>
    </div>

    <!-- Scan Line -->
    <div v-if="isScanning" class="scan-bar">
      <div class="scan-line"></div>
    </div>

    <!-- Results List -->
    <div class="results-list">
      <div
        v-for="result in diagnosticResults"
        :key="result.id"
        class="result-card"
        :class="{ expanded: selectedResult === result.id }"
        @click="toggleDetail(result.id)"
      >
        <div class="result-main">
          <div class="result-icon">
            <component
              :is="getTypeIcon(result.type)"
              :size="16"
              :stroke-width="1.5"
              :style="{ color: getTypeColor(result.type) }"
            />
          </div>
          <div class="result-info">
            <div class="result-top">
              <span class="result-title font-mono" :style="{ color: getTypeColor(result.type) }">
                {{ result.title }}
              </span>
              <span class="result-module font-label text-muted">{{ result.module }}</span>
            </div>
            <p class="result-desc">{{ result.description }}</p>
          </div>
          <ChevronRight
            :size="14"
            class="result-chevron"
            :class="{ rotated: selectedResult === result.id }"
          />
        </div>

        <!-- Expanded Detail -->
        <div v-if="selectedResult === result.id" class="result-detail">
          <div class="detail-section">
            <span class="font-label text-pulse">AI 建议</span>
            <p class="font-body">{{ result.suggestion }}</p>
          </div>
          <div class="detail-section" v-if="result.line > 0">
            <span class="font-label text-muted">位置</span>
            <code class="font-mono">{{ result.file }}:{{ result.line }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diagnostic-lab {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Header */
.diag-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background: var(--color-surface-container-low);
  border: var(--border-ghost);
}

.diag-stats {
  display: flex;
  gap: var(--space-8);
}

.stat-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.stat-num {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1;
}

/* Scan bar */
.scan-bar {
  width: 100%;
  height: 2px;
  background: var(--color-surface-container-lowest);
  overflow: hidden;
  position: relative;
}

.scan-line {
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--color-pulse), transparent);
  animation: scan-move 1.5s linear infinite;
}

@keyframes scan-move {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

.spin {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Results */
.results-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.result-card {
  background: var(--color-surface-container-low);
  border: var(--border-ghost);
  cursor: pointer;
  transition: all var(--transition-snap);
  overflow: hidden;
}

.result-card:hover {
  border-color: rgba(132, 150, 126, 0.4);
}

.result-card.expanded {
  border-color: rgba(0, 255, 65, 0.2);
}

.result-main {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
}

.result-icon {
  flex-shrink: 0;
}

.result-info {
  flex: 1;
  min-width: 0;
}

.result-top {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: 4px;
}

.result-title {
  font-size: 0.8rem;
  font-weight: 600;
}

.result-module {
  font-size: 0.6rem;
}

.result-desc {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

.result-chevron {
  color: var(--color-text-dim);
  transition: transform var(--transition-snap);
  flex-shrink: 0;
}
.result-chevron.rotated {
  transform: rotate(90deg);
}

/* Detail */
.result-detail {
  padding: var(--space-4) var(--space-6);
  padding-left: calc(var(--space-6) + 16px + var(--space-4));
  background: var(--color-surface-container-lowest);
  border-top: var(--border-ghost);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.detail-section p {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.detail-section code {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  padding: var(--space-1) var(--space-2);
  background: var(--color-surface-container);
}
</style>
