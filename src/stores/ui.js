import { defineStore } from 'pinia'

const LANGS = {
  en: { dir: 'ltr', label: 'English' },
  ar: { dir: 'rtl', label: 'العربية' },
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: localStorage.getItem('serviceos-theme') || 'light',
    lang: 'en', // always boots LTR; explicit user action required to switch
    sidebarCollapsed: localStorage.getItem('serviceos-sidebar-collapsed') === '1',
    mobileSidebarOpen: false,
  }),
  getters: {
    dir: (state) => LANGS[state.lang].dir,
    langLabel: (state) => LANGS[state.lang].label,
  },
  actions: {
    applyDocumentAttrs() {
      document.documentElement.setAttribute('lang', this.lang)
      document.documentElement.setAttribute('dir', this.dir)
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('serviceos-theme', this.theme)
      this.applyDocumentAttrs()
    },
    toggleLang() {
      this.lang = this.lang === 'en' ? 'ar' : 'en'
      this.applyDocumentAttrs()
      // deliberately NOT persisted — direction should never silently
      // carry over between sessions; that was the root cause of pages
      // rendering RTL unexpectedly in the old multi-page build.
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
      localStorage.setItem('serviceos-sidebar-collapsed', this.sidebarCollapsed ? '1' : '0')
    },
    toggleMobileSidebar() {
      this.mobileSidebarOpen = !this.mobileSidebarOpen
    },
  },
})
