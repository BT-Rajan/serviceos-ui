<script setup>
import { useRoute } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'

const route = useRoute()
</script>

<template>
  <router-view v-if="route.meta.layout === 'blank'" />
  <AppLayout v-else />
</template>
