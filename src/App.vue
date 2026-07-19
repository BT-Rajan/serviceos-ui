<script setup>
import { onMounted } from 'vue'
import { useUiStore } from './stores/ui'
import IconSprite from './components/ui/IconSprite.vue'

const ui = useUiStore()
onMounted(() => ui.applyDocumentAttrs())
</script>

<template>
  <IconSprite />
  <router-view />
</template>
