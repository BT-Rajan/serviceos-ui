<script setup>
defineProps({
  status: { type: String, default: 'neutral' }, // running | success | warning | danger | neutral
})
</script>

<template>
  <span class="badge" :class="`status-${status}`"><slot /></span>
</template>
