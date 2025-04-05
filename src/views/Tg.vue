
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
    gsap.from(btnRef.value, { duration: 0.5, autoAlpha: 0, delay:0.6, ease: 'power1.out' })

})
</script>

<template>
  <div class="wrapper">
    <Header/>
    <div class="content">

<div ref="contentRef" class="main">

  <p class="text --bold not-mt">
    Комьюнити стажёров <br/>в Telegram
  </p>

        <img src="@/assets/images/tg/1.svg" alt="" class="tg-img">

  <p class="text">
    Хочешь узнать, с какой прикормки дуреют наши стажёры? Тогда подписывайся на наш <span class="--bold">Telegram-канал</span>, чтобы быть в курсе всех новостей и возможностей!
  </p>
</div>
<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa text="Вступить"/>
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

.tg-img{
  display: block;
  margin: 0 auto;
  width: calc(var(--app-width)* 64.3 / 100);
  margin-top: calc(var(--app-width)* 5.9 / 100);
}

  .text{
    margin-top: calc(var(--app-width)* 9.58 / 100);
  }

  .main{
    background-image: url("@/assets/images/tg/bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 6.98 / 100) calc(var(--app-width)* 8.78 / 100) calc(var(--app-width)* 7.08 / 100) calc(var(--app-width)* 5.38 / 100)
  }

  .btn-wrapper{
    margin-top: calc(var(--app-width)* 6.4 / 100) ;
    width: 100%;
  }

  .not-mt{
    margin-top: 0;
  }


  
    </style>