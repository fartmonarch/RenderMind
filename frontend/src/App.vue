<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
import AppTopBar from './components/AppTopBar.vue';
</script>

<template>
  <div class="render-mind-layout">
    <AppSidebar />
    <div class="main-viewport">
      <AppTopBar />
      <div class="viewport-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <div class="noise-overlay"></div>
  </div>
</template>

<style scoped>
.render-mind-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: relative;
}

.main-viewport {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.viewport-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* Page transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s cubic-bezier(1, 0, 0, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
