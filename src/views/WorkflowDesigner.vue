<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '../composables/useToast'

const router = useRouter()
const { toast } = useToast()

const workflowName = ref('Client Onboarding — Draft')

const palette = [
  { type: 'trigger', icon: 'zap', label: 'Trigger', tint: 'running' },
  { type: 'task', icon: 'check-square', label: 'Task', tint: 'neutral' },
  { type: 'approval', icon: 'users', label: 'Approval', tint: 'warning' },
  { type: 'condition', icon: 'git-branch', label: 'Condition', tint: 'signal' },
  { type: 'notification', icon: 'bell', label: 'Notification', tint: 'neutral' },
  { type: 'integration', icon: 'refresh-cw', label: 'Integration', tint: 'neutral' },
  { type: 'delay', icon: 'clock', label: 'Delay', tint: 'neutral' },
  { type: 'end', icon: 'flag', label: 'End', tint: 'success' }
]

const nodes = ref([
  { id: 1, type: 'trigger', icon: 'zap', label: 'New client added' },
  { id: 2, type: 'task', icon: 'check-square', label: 'Send welcome email' },
  { id: 3, type: 'approval', icon: 'users', label: 'Manager sign-off' },
  { id: 4, type: 'end', icon: 'flag', label: 'Onboarding complete' }
])
let nextId = 5

function tintOf(type) {
  const p = palette.find(p => p.type === type)
  return p ? p.tint : 'neutral'
}

function addNode(item) {
  nodes.value.push({ id: nextId++, type: item.type, icon: item.icon, label: item.label })
}

function onDropCanvas(e) {
  const type = e.dataTransfer.getData('text/type')
  const item = palette.find(p => p.type === type)
  if (item) addNode(item)
}

function removeNode(id) {
  nodes.value = nodes.value.filter(n => n.id !== id)
}

function clearCanvas() {
  nodes.value = []
}

function testRun() {
  toast({ title: 'Test run started', message: `Simulating "${workflowName.value}"`, status: 'running' })
}

function saveWorkflow() {
  toast({ title: 'Workflow saved', message: `"${workflowName.value}" with ${nodes.value.length} steps`, status: 'success' })
  router.push('/workflow')
}

const nodeCount = computed(() => `${nodes.value.length} step${nodes.value.length === 1 ? '' : 's'}`)
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-5);">
    <div>
      <h1>Workflow Designer</h1>
      <p class="text-slate" style="margin-top:4px;">Drag steps from the palette onto the canvas, then connect them.</p>
    </div>
    <router-link class="btn btn-secondary" to="/workflow">
      <svg class="icon icon-sm"><use href="#icon-chevrons-left" /></svg>
      Back to Workflows
    </router-link>
  </div>

  <div class="designer-toolbar">
    <input type="text" class="input" v-model="workflowName">
    <span class="badge">{{ nodeCount }}</span>
    <div class="header-spacer"></div>
    <button class="btn btn-ghost" @click="clearCanvas">
      <svg class="icon icon-sm"><use href="#icon-trash-2" /></svg>
      Clear Canvas
    </button>
    <button class="btn btn-secondary" @click="testRun">
      <svg class="icon icon-sm"><use href="#icon-play" /></svg>
      Test Run
    </button>
    <button class="btn btn-primary" @click="saveWorkflow">
      <svg class="icon icon-sm"><use href="#icon-check-square" /></svg>
      Save Workflow
    </button>
  </div>

  <div class="designer-layout">
    <div class="designer-panel">
      <div class="designer-panel-title">Steps</div>
      <div
        v-for="item in palette" :key="item.type"
        class="palette-item" draggable="true"
        @dragstart="$event.dataTransfer.setData('text/type', item.type)"
        @click="addNode(item)">
        <div class="icon-wrap" :style="{ background: `var(--status-${item.tint}-soft, var(--color-signal-soft))` }">
          <svg class="icon icon-sm" :style="{ color: `var(--status-${item.tint}, var(--color-signal))` }"><use :href="`#icon-${item.icon}`" /></svg>
        </div>
        <span class="palette-item-label">{{ item.label }}</span>
      </div>
      <p class="text-xs text-slate" style="margin-top:var(--space-3);">Drag a step onto the canvas, or click it to drop one at the end.</p>
    </div>

    <div class="designer-canvas-wrap" @dragover.prevent @drop="onDropCanvas">
      <div v-if="nodes.length" class="designer-canvas">
        <template v-for="(n, i) in nodes" :key="n.id">
          <div class="designer-node" :class="`status-${tintOf(n.type)}`">
            <svg class="icon icon-sm icon-muted"><use :href="`#icon-${n.icon}`" /></svg>
            <span class="designer-node-label">{{ n.label }}</span>
            <button class="designer-node-remove" aria-label="Remove step" @click="removeNode(n.id)">
              <svg class="icon icon-sm"><use href="#icon-x" /></svg>
            </button>
          </div>
          <div v-if="i < nodes.length - 1" class="designer-connector"></div>
        </template>
      </div>
      <div v-else class="empty-state">
        <svg class="icon"><use href="#icon-layout" /></svg>
        <h4>Canvas is empty</h4>
        <p>Drag steps from the palette, or click one to add it here.</p>
      </div>
    </div>
  </div>
</template>
