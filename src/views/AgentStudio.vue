<script setup>
import { ref } from 'vue'
import { useMockStore } from '../store/mockData'
import { useToast } from '../composables/useToast'

const store = useMockStore()
const { toast } = useToast()

const statusLabel = { success: 'Deployed', running: 'Testing', neutral: 'Draft' }

function deploy(agent) {
  agent.status = 'success'
  agent.deployed = 'Just now'
  toast({ title: `"${agent.name}" deployed`, status: 'success' })
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Agent Studio</h1>
      <p class="text-slate" style="margin-top:4px;">Build and deploy AI agents across support, sales, and operations.</p>
    </div>
    <button class="btn btn-primary">
      <svg class="icon icon-sm"><use href="#icon-plus" /></svg>
      New Agent
    </button>
  </div>

  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <div class="card card-rail status-success">
      <div class="text-sm text-slate">Deployed Agents</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">{{ store.agents.filter(a=>a.status==='success').length }}</div>
    </div>
    <div class="card card-rail status-running">
      <div class="text-sm text-slate">In Testing</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">{{ store.agents.filter(a=>a.status==='running').length }}</div>
    </div>
    <div class="card card-rail status-neutral">
      <div class="text-sm text-slate">Total Conversations</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">{{ store.agents.reduce((s,a)=>s+a.conversations,0).toLocaleString() }}</div>
    </div>
    <div class="card card-rail status-success">
      <div class="text-sm text-slate">Avg. Resolution Rate</div>
      <div style="font-family:var(--font-display); font-size:var(--text-3xl); margin-top:var(--space-2);">87%</div>
    </div>
  </div>

  <div class="grid grid-3">
    <div v-for="a in store.agents" :key="a.id" class="card card-rail" :class="`status-${a.status}`">
      <div class="card-header">
        <div class="flex items-center gap-3">
          <div class="avatar" style="background:var(--color-signal-soft); color:var(--color-signal);">
            <svg class="icon icon-sm"><use href="#icon-bot" /></svg>
          </div>
          <div><div class="card-title">{{ a.name }}</div><div class="card-subtitle">{{ a.purpose }}</div></div>
        </div>
        <span class="badge" :class="`status-${a.status}`">{{ statusLabel[a.status] }}</span>
      </div>
      <div class="info-row"><span class="label">Conversations</span><span class="value">{{ a.conversations.toLocaleString() }}</span></div>
      <div class="info-row"><span class="label">Deployed</span><span class="value">{{ a.deployed }}</span></div>
      <div class="flex gap-3" style="margin-top:var(--space-4);">
        <button class="btn btn-secondary" style="flex:1;">
          <svg class="icon icon-sm"><use href="#icon-sliders" /></svg>
          Configure
        </button>
        <button v-if="a.status !== 'success'" class="btn btn-primary" style="flex:1;" @click="deploy(a)">
          <svg class="icon icon-sm"><use href="#icon-zap" /></svg>
          Deploy
        </button>
      </div>
    </div>
  </div>
</template>
