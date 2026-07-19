<script setup>
defineProps({
  variant: { type: String, default: 'secondary' }, // primary | secondary | ghost | danger
  size: { type: String, default: 'md' }, // sm | md
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['click'])
</script>

<template>
  <button
    class="btn"
    :class="[`btn-${variant}`, size === 'sm' && 'btn-sm']"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <AppIcon v-if="icon" :name="icon" size="sm" />
    <slot />
  </button>
</template>
