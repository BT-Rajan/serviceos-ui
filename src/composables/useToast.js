import { ref } from 'vue'

const toasts = ref([])
let nextId = 1

export function useToast() {
  function toast({ title, message = '', status = 'running', duration = 4000 }) {
    const id = nextId++
    toasts.value.push({ id, title, message, status })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  return { toasts, toast }
}
