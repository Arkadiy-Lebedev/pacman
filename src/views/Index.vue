
<script setup lang="ts">
import Header from '@/components/Header.vue';
import ButtonAlfa from '@/UI/Button/ButtonAlfa.vue';
import { gsap } from 'gsap'
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const contentRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)
  const menRef = ref<HTMLElement | null>(null)
    const isModal = ref(false)


onMounted(async() => {
if(!contentRef.value )return
    gsap.from(contentRef.value, { duration: 0.5, autoAlpha: 0, delay:0.2, ease: 'power1.out' })
    gsap.from(btnRef.value, { duration: 0.5, autoAlpha: 0, delay:1.7, ease: 'power1.out' })
  gsap.from(menRef.value, { duration: 0.5, y:-50, autoAlpha: 0, delay:0.8, ease: 'power1.out' })

})


</script>

<template> 
  <div class="wrapper">
    <div v-if="isModal" class="wrapper-modal">
      <div class="modal-content">
        <div class="modal-block">
          <p class="text"> В Telegram игра не работает:( Лучше переходи в браузер!</p>
        </div>

<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa @click=" router.push({ name: 'instruction' })" text="ХОРОШО"/>
</div>
      </div>
    </div>
    <Header/>
    <div class="content">
<div ref="menRef" class="img-block">
  <img src="@/assets/images/men.svg" alt="" class="men">
</div>
<div ref="contentRef" class="main">
  <p class="title">
    Добро пожаловать<br/>в Альфа-Банк!
  </p>
  <p class="text">
    Новая работа — <br/> тот ещё челлендж. Сейчас будем справляться со стрессом — убегай от страхов и собирай монетки. 
  </p>
  <p class="text">
    А по пути мы расскажем, как помогаем нашим стажёрам.
  </p>
</div>
<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa @click=" isModal=true" text="Дальше"/>
</div>

    </div>
   
      </div>
    </template>
  
   
    <style scoped>
.wrapper-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
   background: rgba(0, 0, 0, 0.5);/* Полупрозрачный фон */
  backdrop-filter: blur(10px); /* Размытие фона */
  -webkit-backdrop-filter: blur(10px); /* Для Safari */
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;

}

.modal-content{
    width: 87%;

}

.modal-block{
    background-image: url("@/assets/images/modal-bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 10.55 / 100) calc(var(--app-width)* 3.58 / 100) calc(var(--app-width)* 14.18 / 100) calc(var(--app-width)* 5.38 / 100)
}

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

  .men{
    width: calc(var(--app-width)* 37.3 / 100);

  }

  .title{
    font-weight: 600;
    font-size: calc(var(--app-width)* 5.35 / 100);
    line-height: calc(var(--app-height)* 3.2 / 100);
  }

  .text{
    margin-top: calc(var(--app-width)* 4.58 / 100);
  }

  .main{
    background-image: url("@/assets/images/modal-bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 11.28 / 100) calc(var(--app-width)* 0.58 / 100) calc(var(--app-width)* 7.28 / 100) calc(var(--app-width)* 4.38 / 100)
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