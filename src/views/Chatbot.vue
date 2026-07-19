<script setup>
import { ref, computed, nextTick } from 'vue'

const tab = ref('customer')

const conversations = ref([
  { id: 'acme', name: 'Meera Iyer', initials: 'MI', client: 'Acme Retail', time: '2m', status: 'warning', snippet: 'Is the POS hardware still on track for Aug 4?' },
  { id: 'northwind', name: 'Owen Farrell', initials: 'OF', client: 'Northwind Legal', time: '1h', status: 'success', snippet: 'Thanks, that resolves it!' },
  { id: 'meridian', name: 'Diego Nunes', initials: 'DN', client: 'Meridian Supply', time: '3h', status: 'neutral', snippet: 'Can I get an updated invoice?' }
])
const activeConv = ref('acme')

const messagesByConv = ref({
  acme: [
    { from: 'user', text: 'Hi — is the POS hardware still on track for the Aug 4 go-live?', time: '10:41 AM' },
    { from: 'bot', text: "Yes — the shipment from your vendor is confirmed for Jul 24, which leaves buffer before go-live. I'll flag your project owner if that changes.", time: '10:41 AM · Bot' },
    { from: 'user', text: 'Great, thank you!', time: '10:42 AM' }
  ],
  northwind: [
    { from: 'user', text: 'Can you confirm the redesign is live?', time: '9:10 AM' },
    { from: 'bot', text: "It went live this morning. You can view it at your production URL.", time: '9:11 AM · Bot' },
    { from: 'user', text: 'Thanks, that resolves it!', time: '9:12 AM' }
  ],
  meridian: [
    { from: 'user', text: 'Can I get an updated invoice?', time: '7:30 AM' },
    { from: 'bot', text: "I've sent the latest invoice to your billing contact on file.", time: '7:31 AM · Bot' }
  ]
})

const input = ref('')
const activeConvData = computed(() => conversations.value.find(c => c.id === activeConv.value))
const messages = computed(() => messagesByConv.value[activeConv.value] || [])

function send() {
  if (!input.value.trim()) return
  messages.value.push({ from: 'user', text: input.value, time: 'Just now' })
  const text = input.value
  input.value = ''
  setTimeout(() => {
    messages.value.push({ from: 'bot', text: `Got it — I'll look into "${text.slice(0, 40)}" and follow up shortly.`, time: 'Just now · Bot' })
  }, 700)
}

const knowledgeMessages = ref([
  { from: 'user', text: 'What is our SLA for vendor onboarding?', time: '11:02 AM' },
  { from: 'bot', text: 'Vendor onboarding has a 5 business day SLA from application to activation, per the Vendor Approval template.', time: '11:02 AM · Bot' }
])
const knowledgeInput = ref('')
function sendKnowledge() {
  if (!knowledgeInput.value.trim()) return
  knowledgeMessages.value.push({ from: 'user', text: knowledgeInput.value, time: 'Just now' })
  const text = knowledgeInput.value
  knowledgeInput.value = ''
  setTimeout(() => {
    knowledgeMessages.value.push({ from: 'bot', text: `Here's what I found on "${text.slice(0, 40)}" in the knowledge base.`, time: 'Just now · Bot' })
  }, 700)
}
</script>

<template>
  <div class="flex items-center justify-between" style="margin-bottom: var(--space-4);">
    <div>
      <h1>Chatbot</h1>
      <p class="text-slate" style="margin-top:4px;">Customer-facing support bot and internal knowledge assistant.</p>
    </div>
  </div>

  <div class="tabs">
    <button class="tab" :class="{ active: tab === 'customer' }" @click="tab = 'customer'">Customer Chatbot</button>
    <button class="tab" :class="{ active: tab === 'knowledge' }" @click="tab = 'knowledge'">Knowledge Chatbot</button>
  </div>

  <div v-if="tab === 'customer'">
    <div class="grid" style="grid-template-columns: 260px 1fr 260px; gap: var(--space-4); height: 560px;">
      <div class="card" style="padding: var(--space-3); overflow-y:auto;">
        <div class="flex items-center justify-between" style="padding: 0 var(--space-2) var(--space-2);">
          <span class="text-sm" style="font-weight:600;">Conversations</span>
          <span class="badge status-warning">{{ conversations.filter(c => c.status === 'warning').length }} waiting</span>
        </div>
        <div
          v-for="c in conversations" :key="c.id"
          class="conv-list-item" :class="[`status-${c.status}`, { active: activeConv === c.id }]"
          @click="activeConv = c.id">
          <div class="avatar avatar-sm">{{ c.initials }}</div>
          <div style="flex:1; min-width:0;">
            <div class="flex items-center justify-between"><span class="conv-list-name">{{ c.name }}</span><span class="conv-list-time">{{ c.time }}</span></div>
            <div class="conv-list-snippet">{{ c.snippet }}</div>
          </div>
        </div>
      </div>

      <div class="card chat-window" style="padding:0;">
        <div class="flex items-center justify-between" style="padding: var(--space-4); border-bottom:1px solid var(--color-border);">
          <div class="flex items-center gap-3">
            <div class="avatar avatar-sm">{{ activeConvData?.initials }}</div>
            <div><div style="font-size:var(--text-sm); font-weight:600;">{{ activeConvData?.name }}</div><div class="text-xs text-slate-soft">{{ activeConvData?.client }}</div></div>
          </div>
          <button class="btn btn-secondary btn-sm">Hand off to agent</button>
        </div>
        <div class="chat-messages">
          <div v-for="(m, i) in messages" :key="i" class="chat-bubble-row" :class="m.from === 'user' ? 'from-user' : 'from-bot'">
            <div class="avatar avatar-sm" :style="m.from === 'bot' ? { background: 'var(--color-signal-soft)', color: 'var(--color-signal)' } : {}">
              {{ m.from === 'bot' ? 'AI' : activeConvData?.initials }}
            </div>
            <div><div class="chat-bubble">{{ m.text }}</div><div class="chat-bubble-meta">{{ m.time }}</div></div>
          </div>
        </div>
        <div class="chat-input-bar">
          <input type="text" v-model="input" placeholder="Type a reply…" @keyup.enter="send">
          <button class="btn btn-primary btn-icon" aria-label="Send" @click="send"><svg class="icon icon-sm"><use href="#icon-chevron-right" /></svg></button>
        </div>
      </div>

      <div class="card">
        <div class="card-title" style="margin-bottom: var(--space-3);">Customer</div>
        <div class="info-row"><span class="label">Client</span><span class="value">{{ activeConvData?.client }}</span></div>
        <div class="info-row"><span class="label">Project</span><span class="value">Client Onboarding</span></div>
        <div class="info-row"><span class="label">Channel</span><span class="value">Web widget</span></div>
        <div class="info-row"><span class="label">Bot resolution</span><span class="value">In progress</span></div>
        <div class="card-title" style="margin: var(--space-5) 0 var(--space-2);">Suggested articles</div>
        <div class="flex flex-col gap-2">
          <div class="chip" style="width:100%; justify-content:flex-start;">Go-live checklist</div>
          <div class="chip" style="width:100%; justify-content:flex-start;">Hardware shipment tracking</div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="card chat-window" style="padding:0; height: 560px; max-width: 760px;">
      <div class="flex items-center justify-between" style="padding: var(--space-4); border-bottom:1px solid var(--color-border);">
        <div class="flex items-center gap-3">
          <div class="avatar avatar-sm" style="background:var(--color-signal-soft); color:var(--color-signal);">AI</div>
          <div><div style="font-size:var(--text-sm); font-weight:600;">Internal Knowledge Assistant</div><div class="text-xs text-slate-soft">Answers from playbooks, templates, and policies</div></div>
        </div>
      </div>
      <div class="chat-messages">
        <div v-for="(m, i) in knowledgeMessages" :key="i" class="chat-bubble-row" :class="m.from === 'user' ? 'from-user' : 'from-bot'">
          <div class="avatar avatar-sm" :style="m.from === 'bot' ? { background: 'var(--color-signal-soft)', color: 'var(--color-signal)' } : {}">
            {{ m.from === 'bot' ? 'AI' : 'RB' }}
          </div>
          <div><div class="chat-bubble">{{ m.text }}</div><div class="chat-bubble-meta">{{ m.time }}</div></div>
        </div>
      </div>
      <div class="chat-input-bar">
        <input type="text" v-model="knowledgeInput" placeholder="Ask about a policy, template, or process…" @keyup.enter="sendKnowledge">
        <button class="btn btn-primary btn-icon" aria-label="Send" @click="sendKnowledge"><svg class="icon icon-sm"><use href="#icon-chevron-right" /></svg></button>
      </div>
    </div>
  </div>
</template>
