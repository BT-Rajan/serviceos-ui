<script setup>
defineProps({
  status: { type: String, default: '' }, // running | success | warning | danger
  padded: { type: Boolean, default: true },
})
</script>

<template>
  <div
    class="card"
    :class="[status && 'card-rail', status && `status-${status}`]"
    :style="!padded ? { padding: 0 } : null"
  >
    <slot />
  </div>
</template>
