import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHelperStore = defineStore('helperStore', () => {
  const section_1 = ref(true)
  const section_2 = ref(false)
  const section_3_1 = ref(false)
  const section_3_2 = ref(false)
  const section_4 = ref(false)
  const section_5 = ref(true)

  const isNewImageS3 = ref(false)
  const isNewImageS4 = ref(false)

  const isInstruction = ref(false)

  const isComplitedSection_1 = ref(false)
  const isComplitedSection_2 = ref(false)
  const isComplitedSection_3 = ref(false)
  const isComplitedSection_4 = ref(false)
  

  return { section_1, section_2, section_3_1, section_3_2, section_4, isInstruction, section_5, isNewImageS3, isNewImageS4, 
    isComplitedSection_1, isComplitedSection_2, isComplitedSection_3, isComplitedSection_4 }
})
