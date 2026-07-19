<script setup>
import { useUiStore } from '../../stores/ui'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const ui = useUiStore()
</script>

<template>
  <div class="app-shell" :class="{ 'sidebar-collapsed': ui.sidebarCollapsed }">
    <AppSidebar />
    <AppHeader />
    <main class="app-main">
      <router-view />
    </main>
  </div>
  <div
    v-if="ui.mobileSidebarOpen"
    class="sidebar-scrim"
    @click="ui.toggleMobileSidebar"
  ></div>
</template>

<style scoped>
.sidebar-scrim {
  position: fixed; inset: 0; background: rgba(10, 20, 15, 0.4); z-index: 140;
}
</style>
