<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconSprite from '../components/IconSprite.vue'
import { useTheme } from '../composables/useTheme'
import { useLang } from '../composables/useLang'

const router = useRouter()
const { theme, toggle: toggleTheme } = useTheme()
const { toggle: toggleLang } = useLang()

const email = ref('rukmani@cogzidel.com')
const password = ref('demo-password')
const showPassword = ref(false)
const keepSignedIn = ref(true)
const submitting = ref(false)

function submit() {
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    router.push('/dashboard')
  }, 500)
}
</script>

<template>
  <IconSprite />
  <div class="auth-shell">
    <div class="auth-panel">
      <div class="auth-card">
        <div class="flex items-center justify-between" style="margin-bottom: var(--space-8);">
          <div class="sidebar-brand" style="padding:0;">
            <span class="dot"></span>
            <span>ServiceOS</span>
          </div>
          <div class="flex gap-2">
            <button class="icon-button" aria-label="Toggle theme" @click="toggleTheme">
              <svg class="icon"><use :href="theme === 'dark' ? '#icon-sun' : '#icon-moon'" /></svg>
            </button>
            <button class="icon-button" aria-label="Toggle language" @click="toggleLang">
              <svg class="icon"><use href="#icon-globe" /></svg>
            </button>
          </div>
        </div>

        <h2>Welcome back</h2>
        <p style="margin-top: var(--space-2); margin-bottom: var(--space-6);">Sign in to your operations panel.</p>

        <form @submit.prevent="submit">
          <div class="field">
            <label class="field-label" for="email">Email</label>
            <input class="input" type="email" id="email" v-model="email" placeholder="you@company.com" required>
          </div>

          <div class="field">
            <div class="flex items-center justify-between">
              <label class="field-label" for="password">Password</label>
              <a href="#" class="text-xs" style="font-size:var(--text-xs);" @click.prevent>Forgot password?</a>
            </div>
            <div style="position:relative;">
              <input
                class="input" :type="showPassword ? 'text' : 'password'" id="password"
                v-model="password" placeholder="••••••••" required
                style="padding-inline-end: 44px;">
              <button
                type="button" aria-label="Show password" @click="showPassword = !showPassword"
                style="position:absolute; top:0; inset-inline-end:0; height:38px; width:38px; background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:var(--color-slate-soft);">
                <svg class="icon icon-sm"><use :href="showPassword ? '#icon-eye' : '#icon-lock'" /></svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between" style="margin-bottom: var(--space-5);">
            <label class="checkbox">
              <input type="checkbox" v-model="keepSignedIn">
              Keep me signed in
            </label>
          </div>

          <button class="btn btn-primary btn-lg" type="submit" style="width:100%;" :disabled="submitting">
            {{ submitting ? 'Signing in…' : 'Sign in' }}
          </button>
        </form>

        <div class="flex items-center gap-3" style="margin: var(--space-6) 0; color: var(--color-slate-soft); font-size: var(--text-xs);">
          <div style="flex:1; height:1px; background:var(--color-border);"></div>
          <span>OR CONTINUE WITH</span>
          <div style="flex:1; height:1px; background:var(--color-border);"></div>
        </div>

        <div class="flex gap-3">
          <button class="btn btn-secondary" style="flex:1;" type="button">
            <svg class="icon icon-sm"><use href="#icon-mail" /></svg>
            SSO
          </button>
          <button class="btn btn-secondary" style="flex:1;" type="button">
            <svg class="icon icon-sm"><use href="#icon-shield" /></svg>
            Security key
          </button>
        </div>

        <p class="text-slate" style="text-align:center; margin-top: var(--space-8); font-size: var(--text-sm);">
          Don't have an account? <a href="#" @click.prevent>Contact your admin</a>
        </p>
      </div>
    </div>

    <div class="auth-side">
      <div style="max-width: 420px; position:relative; z-index:2;">
        <h1 style="color: var(--color-bg); font-size: var(--text-3xl);">Every engagement, one panel.</h1>
        <p style="color: #9BA4B0; margin-top: var(--space-4); font-size: var(--text-base);">
          Projects, workflows, tasks, and agents — tracked with the same status rail, end to end.
        </p>

        <div class="flex flex-col gap-3" style="margin-top: var(--space-8);">
          <div class="flex items-center gap-3" style="background:rgba(255,255,255,0.04); border-inline-start:3px solid var(--status-running); padding:var(--space-3) var(--space-4); border-radius:var(--radius-md);">
            <svg class="icon icon-sm" style="color:var(--status-running);"><use href="#icon-git-branch" /></svg>
            <span style="color:#EDEFF2; font-size:var(--text-sm);">Client Onboarding — running</span>
          </div>
          <div class="flex items-center gap-3" style="background:rgba(255,255,255,0.04); border-inline-start:3px solid var(--status-success); padding:var(--space-3) var(--space-4); border-radius:var(--radius-md);">
            <svg class="icon icon-sm" style="color:var(--status-success);"><use href="#icon-check-square" /></svg>
            <span style="color:#EDEFF2; font-size:var(--text-sm);">Q3 Vendor Review — complete</span>
          </div>
          <div class="flex items-center gap-3" style="background:rgba(255,255,255,0.04); border-inline-start:3px solid var(--status-warning); padding:var(--space-3) var(--space-4); border-radius:var(--radius-md);">
            <svg class="icon icon-sm" style="color:var(--status-warning);"><use href="#icon-bell" /></svg>
            <span style="color:#EDEFF2; font-size:var(--text-sm);">Invoice #4021 — needs approval</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
