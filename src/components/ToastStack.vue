<script setup>
import { useToast } from '../composables/useToast'
const { toasts } = useToast()

function iconFor(status) {
  if (status === 'success') return 'check-square'
  if (status === 'danger') return 'x'
  if (status === 'warning') return 'bell'
  return 'bar-chart'
}
</script>

<template>
  <div class="toast-stack">
    <div v-for="t in toasts" :key="t.id" class="toast" :class="`status-${t.status}`">
      <svg class="icon icon-sm"><use :href="`#icon-${iconFor(t.status)}`" /></svg>
      <div>
        <div style="font-size:var(--text-sm);font-weight:500;">{{ t.title }}</div>
        <div v-if="t.message" style="font-size:var(--text-xs);color:var(--color-slate);margin-top:2px;">{{ t.message }}</div>
      </div>
    </div>
  </div>
</template>
