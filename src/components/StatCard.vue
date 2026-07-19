<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  suffix: { type: String, default: '' },
  status: { type: String, default: 'neutral' },
  badge: { type: String, default: '' },
  badgeStatus: { type: String, default: '' },
  mono: { type: Boolean, default: false }
})
</script>

<template>
  <div class="card card-rail" :class="`status-${status}`">
    <div class="text-sm text-slate">{{ label }}</div>
    <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);" :class="{ mono }">
      {{ value }}<span v-if="suffix" style="font-size:var(--text-lg); color:var(--color-slate);">{{ suffix }}</span>
    </div>
    <div v-if="badge" class="badge" :class="badgeStatus ? `status-${badgeStatus}` : ''" style="margin-top:var(--space-3);">{{ badge }}</div>
  </div>
</template>
