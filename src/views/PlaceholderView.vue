<script setup>
defineProps({ title: { type: String, required: true } })
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>{{ title }}</h1>
      <p class="text-slate" style="margin-top:4px;">Not migrated to Vue yet — next in the queue.</p>
    </div>
  </div>
  <AppCard>
    <p style="margin:0;">This page still lives in the original static HTML build. Say the word and it's next.</p>
  </AppCard>
</template>
