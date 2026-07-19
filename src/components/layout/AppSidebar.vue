<script setup>
import { useUiStore } from '../../stores/ui'
import { NAV } from '../../nav'

const ui = useUiStore()
</script>

<template>
  <aside
    class="app-sidebar"
    :class="{ 'sidebar-collapsed': ui.sidebarCollapsed, open: ui.mobileSidebarOpen }"
  >
    <div class="sidebar-brand">
      <span class="dot"></span>
      <span>ServiceOS</span>
    </div>

    <nav class="sidebar-nav">
      <template v-for="group in NAV" :key="group.group">
        <div class="sidebar-group-label">{{ group.group }}</div>
        <router-link
          v-for="item in group.items"
          :key="item.key"
          class="nav-item"
          :class="{ active: $route.path === item.to }"
          :to="item.to"
        >
          <AppIcon :name="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </template>
    </nav>

    <div class="sidebar-footer">
      <button class="nav-item" style="width:100%" @click="ui.toggleSidebar">
        <AppIcon name="chevrons-left" directional />
        <span>Collapse</span>
      </button>
    </div>
  </aside>
</template>
