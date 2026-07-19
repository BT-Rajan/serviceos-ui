<script setup>
import { useMockStore } from '../store/mockData'
import { useToast } from '../composables/useToast'
import { useRouter } from 'vue-router'

const store = useMockStore()
const { toast } = useToast()
const router = useRouter()

function useTemplate(t) {
  toast({ title: `Starting from "${t.name}"`, status: 'running' })
  router.push('/workflow-designer')
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Templates</h1>
      <p class="text-slate" style="margin-top:4px;">Reusable workflow blueprints your team can launch in one click.</p>
    </div>
    <router-link class="btn btn-primary" to="/workflow-designer">
      <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
      New Template
    </router-link>
  </div>

  <div class="grid grid-3">
    <div v-for="t in store.templates" :key="t.id" class="card card-rail" :class="`status-${t.status}`">
      <div class="card-header">
        <div>
          <div class="card-title">{{ t.name }}</div>
          <div class="card-subtitle">{{ t.category }}</div>
        </div>
        <span class="chip">{{ t.steps }} steps</span>
      </div>
      <p class="text-sm text-slate">Used {{ t.uses }} times across active and completed workflows.</p>
      <div class="flex items-center justify-between" style="margin-top: var(--space-5);">
        <span class="badge" :class="`status-${t.status}`">{{ t.uses > 80 ? 'Popular' : 'Available' }}</span>
        <button class="btn btn-secondary btn-sm" @click="useTemplate(t)">
          Use template <svg class="icon icon-sm"><use href="#icon-chevron-right" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>
