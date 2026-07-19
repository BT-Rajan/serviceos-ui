<script setup>
import { computed } from 'vue'

const props = defineProps({
  values: { type: Array, required: true }, // [{ label, value, status }]
  height: { type: Number, default: 160 }
})

const max = computed(() => Math.max(...props.values.map(v => v.value)) || 1)
</script>

<template>
  <div class="flex items-end gap-3" dir="ltr" :style="{ height: height + 'px' }">
    <div v-for="(v, i) in values" :key="i" class="flex flex-col items-center gap-2" style="flex:1; height:100%; justify-content:flex-end;">
      <div
        :style="{
          width: '100%',
          maxWidth: '32px',
          height: Math.max(4, (v.value / max) * (height - 28)) + 'px',
          background: `var(--status-${v.status || 'running'})`,
          borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0'
        }"
        :title="`${v.label}: ${v.value}`"
      ></div>
      <span class="text-xs text-slate mono">{{ v.label }}</span>
    </div>
  </div>
</template>
