<script setup>
import { computed } from 'vue'

const props = defineProps({
  segments: { type: Array, required: true } // [{ label, value, status }]
})

const total = computed(() => props.segments.reduce((s, seg) => s + seg.value, 0) || 1)
const circumference = 2 * Math.PI * 48

const arcs = computed(() => {
  let offset = 0
  return props.segments.map(seg => {
    const fraction = seg.value / total.value
    const length = fraction * circumference
    const arc = { ...seg, length, offset: -offset, pct: Math.round(fraction * 100) }
    offset += length
    return arc
  })
})
</script>

<template>
  <div class="flex items-center gap-4" dir="ltr">
    <svg viewBox="0 0 120 120" width="120" height="120">
      <circle cx="60" cy="60" r="48" fill="none" stroke="var(--color-border)" stroke-width="16" />
      <circle
        v-for="(a, i) in arcs" :key="i"
        cx="60" cy="60" r="48" fill="none"
        :stroke="`var(--status-${a.status})`" stroke-width="16"
        :stroke-dasharray="`${a.length} ${circumference - a.length}`"
        :stroke-dashoffset="a.offset"
        transform="rotate(-90 60 60)"
      />
    </svg>
    <div class="flex flex-col gap-3" style="flex:1;">
      <div v-for="(a, i) in arcs" :key="i" class="chart-legend-item">
        <span class="chart-legend-swatch" :style="{ background: `var(--status-${a.status})` }"></span>
        {{ a.label }} — {{ a.pct }}%
      </div>
    </div>
  </div>
</template>
