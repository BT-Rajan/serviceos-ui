<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMockStore } from '../store/mockData'

const route = useRoute()
const store = useMockStore()

const project = computed(() => store.projects.find(p => p.id === route.params.id) || store.projects[0])
const projectTasks = computed(() => store.tasks.filter(t => t.project === project.value.id))
const projectDocs = computed(() => store.documents.filter(d => d.project === project.value.id))

const statusLabel = { running: 'Running', success: 'Complete', warning: 'At risk', danger: 'Blocked', neutral: 'Not started' }
</script>

<template>
  <div class="breadcrumb" style="margin-bottom: var(--space-3);">
    <router-link to="/projects">Projects</router-link> / <span>{{ project.name }}</span>
  </div>

  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>{{ project.name }}</h1>
      <p class="text-slate" style="margin-top:4px;">{{ project.client }} · Owned by {{ project.owner }}</p>
    </div>
    <div class="flex gap-3">
      <span class="badge" :class="`status-${project.status}`">{{ statusLabel[project.status] }}</span>
      <button class="btn btn-secondary">
        <svg class="icon icon-sm"><use href="#icon-edit-2" /></svg>
        Edit
      </button>
    </div>
  </div>

  <div class="grid grid-4" style="margin-bottom: var(--space-6);">
    <div class="card">
      <div class="text-sm text-slate">Progress</div>
      <div style="font-family:var(--font-display); font-size:var(--text-2xl); margin-top:var(--space-2);">{{ project.progress }}%</div>
    </div>
    <div class="card">
      <div class="text-sm text-slate">Budget</div>
      <div class="mono" style="font-family:var(--font-display); font-size:var(--text-2xl); margin-top:var(--space-2);">${{ project.budget.toLocaleString() }}</div>
    </div>
    <div class="card">
      <div class="text-sm text-slate">Due date</div>
      <div class="mono" style="font-family:var(--font-display); font-size:var(--text-2xl); margin-top:var(--space-2);">{{ project.due }}</div>
    </div>
    <div class="card">
      <div class="text-sm text-slate">Open tasks</div>
      <div style="font-family:var(--font-display); font-size:var(--text-2xl); margin-top:var(--space-2);">{{ projectTasks.filter(t => t.status !== 'done').length }}</div>
    </div>
  </div>

  <div class="grid grid-2" style="gap: var(--space-6); align-items:start;">
    <div class="card">
      <div class="card-header">
        <div class="card-title">Tasks</div>
        <router-link to="/tasks" class="text-sm">View board</router-link>
      </div>
      <div v-if="projectTasks.length" class="flex flex-col gap-3">
        <div v-for="t in projectTasks" :key="t.id" class="notif-item" :class="`status-${t.status === 'done' ? 'success' : t.priority === 'high' ? 'danger' : 'neutral'}`">
          <svg class="icon icon-sm icon-muted"><use href="#icon-check-square" /></svg>
          <div>
            <div class="notif-item-title">{{ t.title }}</div>
            <div class="notif-item-meta">{{ t.assignee }} · Due {{ t.due }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <svg class="icon"><use href="#icon-check-square" /></svg>
        <h4>No tasks yet</h4>
        <p>Break this project down into tasks to track progress.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <div class="card-title">Documents</div>
        <router-link to="/documents" class="text-sm">View all</router-link>
      </div>
      <div v-if="projectDocs.length" class="flex flex-col gap-3">
        <div v-for="d in projectDocs" :key="d.id" class="notif-item">
          <svg class="icon icon-sm icon-muted"><use href="#icon-file" /></svg>
          <div>
            <div class="notif-item-title">{{ d.name }}</div>
            <div class="notif-item-meta">{{ d.size }} · Updated {{ d.updated }}</div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <svg class="icon"><use href="#icon-file" /></svg>
        <h4>No documents</h4>
        <p>Upload files to share them with the project team.</p>
      </div>
    </div>
  </div>
</template>
