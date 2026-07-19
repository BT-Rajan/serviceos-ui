<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: String, default: '' }, // '', 'sm', 'lg'
  muted: { type: Boolean, default: false },
  signal: { type: Boolean, default: false },
  directional: { type: Boolean, default: false }, // flips in RTL (e.g. chevrons, back arrows)
})
</script>

<template>
  <svg
    class="icon"
    :class="[size && `icon-${size}`, muted && 'icon-muted', signal && 'icon-signal', directional && 'icon-directional']"
  ><use :href="`#icon-${name}`" /></svg>
</template>
