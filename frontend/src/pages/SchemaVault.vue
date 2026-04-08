<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FileCode, Image, Database, Plus, Search, Grid, List, Clock, HardDrive } from 'lucide-vue-next';

const router = useRouter();

const viewMode = ref<'grid' | 'list'>('grid');
const searchQuery = ref('');

const assets = ref([
  {
    id: 1,
    name: '赛博有机 UI 套件',
    type: 'component',
    icon: FileCode,
    size: '24.8 KB',
    lastModified: '4 分钟前',
    status: 'active',
  },
  {
    id: 2,
    name: 'Auth-Stream 控制器',
    type: 'module',
    icon: Database,
    size: '12.1 KB',
    lastModified: '1 小时前',
    status: 'idle',
  },
  {
    id: 3,
    name: '脉冲引擎 V2',
    type: 'module',
    icon: Database,
    size: '45.3 KB',
    lastModified: '5 小时前',
    status: 'warning',
  },
  {
    id: 4,
    name: '品牌资产包',
    type: 'asset',
    icon: Image,
    size: '2.1 MB',
    lastModified: '1 天前',
    status: 'idle',
  },
  {
    id: 5,
    name: '数据管道配置',
    type: 'config',
    icon: FileCode,
    size: '8.4 KB',
    lastModified: '2 天前',
    status: 'idle',
  },
  {
    id: 6,
    name: '全局状态管理',
    type: 'module',
    icon: Database,
    size: '16.7 KB',
    lastModified: '3 天前',
    status: 'idle',
  },
]);

const filteredAssets = () => {
  if (!searchQuery.value) return assets.value;
  return assets.value.filter(a =>
    a.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'active': return 'status-active';
    case 'warning': return 'status-warning';
    default: return 'status-idle';
  }
};
</script>

<template>
  <div class="schema-vault dot-matrix">
    <!-- Toolbar -->
    <div class="vault-toolbar">
      <div class="toolbar-left">
        <div class="search-box">
          <Search :size="14" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            class="search-input input-field font-mono"
            placeholder="搜索资产..."
          />
        </div>
      </div>
      <div class="toolbar-right">
        <div class="view-toggle">
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'grid' }"
            @click="viewMode = 'grid'"
          >
            <Grid :size="14" />
          </button>
          <button
            class="toggle-btn"
            :class="{ active: viewMode === 'list' }"
            @click="viewMode = 'list'"
          >
            <List :size="14" />
          </button>
        </div>
        <button class="btn-primary" style="display: flex; align-items: center; gap: 6px;">
          <Plus :size="14" /> 新建资产
        </button>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="asset-grid">
      <div
        v-for="asset in filteredAssets()"
        :key="asset.id"
        class="asset-card"
        :class="getStatusClass(asset.status)"
        @click="router.push('/render-lab')"
      >
        <div class="card-top">
          <div class="card-icon">
            <component :is="asset.icon" :size="24" :stroke-width="1" />
          </div>
          <span class="card-type font-label">{{ asset.type }}</span>
        </div>
        <h3 class="card-name">{{ asset.name }}</h3>
        <div class="card-meta">
          <span class="font-mono text-dim" style="font-size: 0.65rem;">
            <HardDrive :size="10" style="margin-right: 4px; vertical-align: middle;" />
            {{ asset.size }}
          </span>
          <span class="font-mono text-dim" style="font-size: 0.65rem;">
            <Clock :size="10" style="margin-right: 4px; vertical-align: middle;" />
            {{ asset.lastModified }}
          </span>
        </div>
      </div>
    </div>

    <!-- List View  -->
    <div v-else class="asset-list">
      <div class="list-header">
        <span class="font-label text-muted" style="flex: 2;">名称</span>
        <span class="font-label text-muted" style="flex: 1;">类型</span>
        <span class="font-label text-muted" style="flex: 1;">大小</span>
        <span class="font-label text-muted" style="flex: 1;">修改时间</span>
      </div>
      <div
        v-for="asset in filteredAssets()"
        :key="asset.id"
        class="list-row"
        :class="getStatusClass(asset.status)"
        @click="router.push('/render-lab')"
      >
        <div style="flex: 2; display: flex; align-items: center; gap: 10px;">
          <component :is="asset.icon" :size="16" :stroke-width="1.5" class="text-dim" />
          <span>{{ asset.name }}</span>
        </div>
        <span class="font-label text-muted" style="flex: 1;">{{ asset.type }}</span>
        <span class="font-mono text-dim" style="flex: 1; font-size: 0.75rem;">{{ asset.size }}</span>
        <span class="font-mono text-dim" style="flex: 1; font-size: 0.75rem;">{{ asset.lastModified }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.schema-vault {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Toolbar */
.vault-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.toolbar-left {
  flex: 1;
  max-width: 400px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-dim);
  pointer-events: none;
}

.search-input {
  padding-left: 32px !important;
  font-size: 0.75rem;
}

.view-toggle {
  display: flex;
  border: var(--border-ghost);
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--color-text-dim);
  padding: 6px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all var(--transition-snap);
}

.toggle-btn:first-child {
  border-right: var(--border-ghost);
}

.toggle-btn.active {
  color: var(--color-pulse);
  background: rgba(0, 255, 65, 0.05);
}

.toggle-btn:hover {
  color: var(--color-text-primary);
}

/* Grid */
.asset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4);
}

.asset-card {
  background: var(--color-surface-container-low);
  border: var(--border-ghost);
  padding: var(--space-6);
  cursor: pointer;
  transition: all var(--transition-snap);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.asset-card:hover {
  border-color: rgba(0, 255, 65, 0.3);
  background: var(--color-surface-container);
}

.asset-card.status-warning {
  border-left: 2px solid var(--color-alert);
}

.asset-card.status-active {
  border-left: 2px solid var(--color-pulse);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-icon {
  color: var(--color-text-dim);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-container-lowest);
  border: var(--border-ghost);
}

.card-type {
  font-size: 0.55rem;
  color: var(--color-text-dim);
}

.card-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-primary);
}

.card-meta {
  display: flex;
  gap: var(--space-4);
}

/* List */
.asset-list {
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  padding: var(--space-3) var(--space-4);
  border-bottom: var(--border-ghost);
}

.list-row {
  display: flex;
  align-items: center;
  padding: var(--space-4);
  border-bottom: var(--border-ghost);
  cursor: pointer;
  transition: all var(--transition-snap);
  font-size: 0.8rem;
}

.list-row:hover {
  background: var(--color-surface-container-low);
}

.list-row.status-warning {
  border-left: 2px solid var(--color-alert);
}

.list-row.status-active {
  border-left: 2px solid var(--color-pulse);
}
</style>
