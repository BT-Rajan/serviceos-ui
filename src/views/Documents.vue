<script setup>
import { ref, computed } from 'vue'
import { useMockStore } from '../store/mockData'

const store = useMockStore()
const search = ref('')
const typeFilter = ref('all')

const typeIcon = { pdf: 'file', doc: 'file', sheet: 'file', image: 'image', archive: 'folder' }

const filtered = computed(() => store.documents.filter(d => {
  const matchesSearch = d.name.toLowerCase().includes(search.value.toLowerCase())
  const matchesType = typeFilter.value === 'all' || d.type === typeFilter.value
  return matchesSearch && matchesType
}))

const totalSizeLabel = computed(() => `${store.documents.length} files`)
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-6);">
    <div>
      <h1>Documents</h1>
      <p class="text-slate" style="margin-top:4px;">{{ totalSizeLabel }} shared across projects.</p>
    </div>
    <button class="btn btn-primary">
      <svg class="icon icon-sm"><use href="#icon-upload" /></svg>
      Upload
    </button>
  </div>

  <div class="filter-bar" style="margin-bottom: var(--space-5);">
    <label class="filter-search">
      <svg class="icon icon-sm icon-muted"><use href="#icon-search" /></svg>
      <input type="text" v-model="search" placeholder="Search documents…">
    </label>
    <button
      v-for="t in ['all', 'pdf', 'doc', 'sheet', 'image', 'archive']" :key="t"
      class="filter-chip" :class="{ active: typeFilter === t }"
      @click="typeFilter = t">
      {{ t === 'all' ? 'All types' : t }}
    </button>
  </div>

  <div class="card" style="padding:0;">
    <table class="table">
      <thead>
        <tr><th>Name</th><th>Project</th><th>Owner</th><th>Size</th><th>Updated</th><th></th></tr>
      </thead>
      <tbody>
        <tr v-for="d in filtered" :key="d.id">
          <td>
            <div class="flex items-center gap-2">
              <svg class="icon icon-sm icon-muted"><use :href="`#icon-${typeIcon[d.type] || 'file'}`" /></svg>
              <span style="font-weight:500;">{{ d.name }}</span>
            </div>
          </td>
          <td class="text-sm">{{ d.project }}</td>
          <td><span class="avatar avatar-sm">{{ d.owner }}</span></td>
          <td class="mono text-sm">{{ d.size }}</td>
          <td class="mono text-sm">{{ d.updated }}</td>
          <td>
            <button class="icon-button" aria-label="Download"><svg class="icon icon-sm"><use href="#icon-download" /></svg></button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!filtered.length" class="empty-state">
      <svg class="icon"><use href="#icon-file" /></svg>
      <h4>No documents found</h4>
      <p>Try a different search term or upload a new file.</p>
    </div>
  </div>
</template>
