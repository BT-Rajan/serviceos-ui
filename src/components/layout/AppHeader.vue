<script setup>
import { useUiStore } from '../../stores/ui'

const ui = useUiStore()
</script>

<template>
  <header class="app-header">
    <button class="header-toggle" aria-label="Toggle sidebar" @click="ui.toggleMobileSidebar">
      <AppIcon name="menu" />
    </button>

    <label class="header-search">
      <AppIcon name="search" muted />
      <input type="text" placeholder="Search projects, tasks, clients…">
      <kbd>/</kbd>
    </label>

    <div class="header-spacer"></div>

    <div class="header-actions">
      <button class="icon-button" aria-label="Toggle theme" @click="ui.toggleTheme">
        <AppIcon :name="ui.theme === 'light' ? 'moon' : 'sun'" />
      </button>
      <button class="icon-button" aria-label="Toggle language" @click="ui.toggleLang">
        <AppIcon name="globe" />
      </button>
      <button class="icon-button" aria-label="Notifications">
        <AppIcon name="bell" />
        <span class="notif-dot"></span>
      </button>
      <button class="user-menu-trigger">
        <div class="avatar avatar-sm">RB</div>
        <AppIcon name="chevron-down" size="sm" muted />
      </button>
    </div>
  </header>
</template>
