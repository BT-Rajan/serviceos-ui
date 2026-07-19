<script setup>
import { computed } from 'vue'

const props = defineProps({
  values: { type: Array, required: true },
  labels: { type: Array, default: () => [] },
  width: { type: Number, default: 480 },
  height: { type: Number, default: 160 }
})

const points = computed(() => {
  const min = Math.min(...props.values)
  const max = Math.max(...props.values)
  const range = max - min || 1
  const step = props.width / (props.values.length - 1 || 1)
  return props.values.map((v, i) => {
    const x = i * step
    const y = props.height - ((v - min) / range) * (props.height - 20) - 10
    return { x, y }
  })
})

const linePoints = computed(() => points.value.map(p => `${p.x},${p.y}`).join(' '))
const areaPoints = computed(() => `${linePoints.value} ${props.width},${props.height} 0,${props.height}`)
</script>

<template>
  <div>
    <svg :viewBox="`0 0 ${width} ${height}`" style="width:100%; height:auto;">
      <polyline :points="areaPoints" fill="var(--color-signal-soft)" opacity="0.6" stroke="none" />
      <polyline :points="linePoints" fill="none" stroke="var(--color-signal)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <g fill="var(--color-signal)">
        <circle v-for="(p, i) in points" :key="i" :cx="p.x" :cy="p.y" r="3" />
      </g>
    </svg>
    <div v-if="labels.length" class="chart-legend">
      <span v-for="(l, i) in labels" :key="i">{{ l }}</span>
    </div>
  </div>
</template>
