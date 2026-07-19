import { ref } from 'vue'

const KEY = 'serviceos-sidebar-collapsed'
const collapsed = ref(localStorage.getItem(KEY) === '1')
const mobileOpen = ref(false)

export function useSidebar() {
  function toggleCollapsed() {
    collapsed.value = !collapsed.value
    localStorage.setItem(KEY, collapsed.value ? '1' : '0')
  }

  function toggleMobile() {
    mobileOpen.value = !mobileOpen.value
  }

  function closeMobile() {
    mobileOpen.value = false
  }

  return { collapsed, mobileOpen, toggleCollapsed, toggleMobile, closeMobile }
}
