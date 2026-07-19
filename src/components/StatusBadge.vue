<script setup>
defineProps({
  status: { type: String, default: 'neutral' },
  label: { type: String, required: true }
})
</script>

<template>
  <span class="badge" :class="`status-${status}`">{{ label }}</span>
</template>
