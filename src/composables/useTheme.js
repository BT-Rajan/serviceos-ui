import { ref } from 'vue'
import { useToast } from './useToast'

const KEY = 'serviceos-theme'
const theme = ref(localStorage.getItem(KEY) || 'light')

function apply(value) {
  document.documentElement.setAttribute('data-theme', value)
}
apply(theme.value)

export function useTheme() {
  const { toast } = useToast()

  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem(KEY, theme.value)
    apply(theme.value)
    toast({ title: `Switched to ${theme.value} theme`, status: 'success' })
  }

  return { theme, toggle }
}
