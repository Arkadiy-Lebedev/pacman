
<script setup lang="ts">
import Header from '@/components/Header.vue';
import ButtonAlfa from '@/UI/Button/ButtonAlfa.vue';
import { gsap } from 'gsap'
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const contentRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)


onMounted(() => {
if(!contentRef.value )return
    gsap.from(contentRef.value, { duration: 0.5, autoAlpha: 0, delay:0.2, ease: 'power1.out' })
    gsap.from(btnRef.value, { duration: 0.5, autoAlpha: 0, delay:0.5, ease: 'power1.out' })

})
</script>

<template>
  <div class="wrapper">
    <Header/>
    <div class="content">

<div ref="contentRef" class="main">

  <p class="text">
    Ты столкнёшься лицом к лицу с главными <span class="--bold">страхами:</span> чтобы победить их, пройди по всем точкам в лабиринте.
  </p>
  <img src="@/assets/images/instruction/1.svg" alt="" class="instruction-img">
 
</div>
<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa @click=" router.push({ name: 'info' })" text="Дальше"/>
</div>

    </div>
   
      </div>
    </template>
  
   
    <style scoped>
  .wrapper{
  width: 100%;
    height:100%;
  padding-top: calc(var(--app-width)* 19 / 100);;
  }

  .content{
    width: 87%;
    margin: 0 auto;
    height:100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }


.instruction-img{
  width: 100%;
}



  .main{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-image: url("@/assets/images/modal-bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 7.75 / 100) calc(var(--app-width)* 5.28 / 100) calc(var(--app-width)* 0 / 100) calc(var(--app-width)* 5.28  / 100);
    height: calc(var(--app-width)* 122.7/ 100);

  }

  .btn-wrapper{
    margin-top: calc(var(--app-width)* 6.4 / 100) ;
    width: 100%;
  }

  .img-block{
    position: relative;
    margin-bottom: calc(var(--app-width)* -14.4 / 100) ;
    margin-left: auto;
    margin-right:  calc(var(--app-width)* 6.4 / 100) ;
    z-index: 8;
  }
  
    </style>