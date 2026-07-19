<script setup>
defineProps({
  steps: { type: Array, required: true }, // [{ label, state: 'done'|'current'|'', danger, icon }]
})
</script>

<template>
  <div class="wf-stepper">
    <template v-for="(s, i) in steps" :key="s.label">
      <div class="wf-step" :class="[s.state && `is-${s.state}`, s.danger && 'is-danger']">
        <div class="wf-step-dot">
          <AppIcon v-if="s.state === 'done'" name="check" size="sm" />
          <AppIcon v-else-if="s.danger" name="alert-triangle" size="sm" />
          <template v-else>{{ i + 1 }}</template>
        </div>
        <div class="wf-step-label">{{ s.label }}</div>
      </div>
      <div v-if="i < steps.length - 1" class="wf-connector" :class="s.state === 'done' && 'is-done'"></div>
    </template>
  </div>
</template>
