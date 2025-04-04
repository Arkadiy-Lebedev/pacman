
<script setup lang="ts">
import Header from '@/components/Header.vue';
import Info from '@/components/info/Info.vue';

import { gsap } from 'gsap'
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const contentRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)
  const menRef = ref<HTMLElement | null>(null)

onMounted(() => {
if(!contentRef.value )return
    gsap.from(contentRef.value, { duration: 0.5, autoAlpha: 0, delay:0.2, ease: 'power1.out' })
    gsap.from(btnRef.value, { duration: 0.5, autoAlpha: 0, delay:0.5, ease: 'power1.out' })
  gsap.from(menRef.value, { duration: 0.5, y:-50, autoAlpha: 0, delay:0.8, ease: 'power1.out' })
})
</script>

<template>
  <div class="wrapper">
    <Header/>    
    <Info/>
  </div>
</template>
  
   
    <style scoped>
  .wrapper{
  width: 100%;
    height:100%;
  
  }

 
  
    </style>