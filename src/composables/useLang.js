import { ref } from 'vue'
import { useToast } from './useToast'

const KEY = 'serviceos-lang'
const LANGS = { en: { dir: 'ltr', label: 'English' }, ar: { dir: 'rtl', label: 'العربية' } }
const lang = ref(localStorage.getItem(KEY) || 'en')

function apply(value) {
  const cfg = LANGS[value] || LANGS.en
  document.documentElement.setAttribute('lang', value)
  document.documentElement.setAttribute('dir', cfg.dir)
}
apply(lang.value)

export function useLang() {
  const { toast } = useToast()

  function toggle() {
    lang.value = lang.value === 'en' ? 'ar' : 'en'
    localStorage.setItem(KEY, lang.value)
    apply(lang.value)
    toast({ title: `Language set to ${LANGS[lang.value].label}`, status: 'running' })
  }

  return { lang, toggle }
}
