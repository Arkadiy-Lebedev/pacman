
<script setup lang="ts">
import ButtonAlfa from '@/UI/Button/ButtonAlfa.vue';
import Arrows from '@/components/icons/arrow.vue';
import Info1 from '@/components/Info1.vue';
import Info2 from '@/components/Info2.vue';
import Info3 from '@/components/Info3.vue';
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import { ref,onMounted } from 'vue';
import {useHelperStore} from '@/stores/helper';

const helperStore = useHelperStore()
const router = useRouter()

type TStep = 'step-1' | 'step-2' |'step-3'

const step = ref<TStep>('step-1')

defineProps<{
    isQuestion?: boolean;
}>()

const fingerRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)
    const btnRef = ref<HTMLElement | null>(null)

onMounted(()=>{
  if(!fingerRef.value) return
  gsap.from(contentRef.value, { duration: 0.5, autoAlpha: 0, delay:0.2, ease: 'power1.out' })
  gsap.from(btnRef.value, { duration: 0.5, autoAlpha: 0, delay:0.5, ease: 'power1.out' })

  const tl = gsap.timeline({ delay: 1.8 });

tl.to(fingerRef.value, { 
  duration: 0.5,
  x: -20, 
  y: 20, 
  ease: "none" 
})
.set(fingerRef.value, { x: 0, y: 0 }) // мгновенный сброс
.to(fingerRef.value, { 
  duration: 0.5, 
  x: -20, 
  y: -20, 
  ease: "none",
  delay:0.5
});

})

const toGo = ()=>{
  console.log(666)
  if(!helperStore.isInstruction){
    router.push({ name: 'stage-1' })
    helperStore.isInstruction=true
  } else {
    console.log(8888)
    helperStore.isShowRole=false
  }
}


    </script>
    
<template>
    <div class="content" v-if="step == 'step-1' ">
<div ref="contentRef" class="main">
  <img ref="fingerRef" src="@/assets/images/instruction/finger.svg" alt="" class="finger-img">
  <p class="text">
    Свайпай пальцем в сторону, куда собираешься бежать.
  </p>
<div class="info-game-1">

<Info1/>
</div>

<div class="info-arrow">
  <Arrows class="info-arrow-svg"/>
</div> 
</div>
<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa @click=" step = 'step-2'" text="Дальше"/>
</div>
</div>


<div class="content" v-if="step == 'step-2' ">
<div ref="contentRef" class="main">
  <p class="text">
    Если страх догонит тебя — потеряешь одну жизнь и вернешься на место, <span class="--bold">откуда начал</span>. Собранные точки и бонусы сохранятся.
  </p>
<div class="info-game-2">
<Info2/>
</div>
<p class="text">
  Но если потеряешь все жизни, то придется проходить уровень <span class="--bold">с самого начала</span>.
  </p>
</div>
<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa @click=" step = 'step-3'" text="Дальше"/>
</div>
</div>

<div class="content" v-if="step == 'step-3' ">
<div ref="contentRef" class="main main-step-3">
  <p class="text">
    Собрал монетку? Супер! У тебя есть <span class="--bold">8 секунд</span>, чтобы задеть монстра — тогда он исчезнет с поля на время, но вернётся! Будь начеку.
  </p>
<div class="info-game-3">
<Info3/>
</div>
</div>
<div ref="btnRef" class="btn-wrapper">
  <ButtonAlfa @click="toGo" text="Дальше"/>
</div>
</div>




  </template>


  
  <style scoped>
 .content{
    width: 87%;
    margin: 0 auto;
    height:100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-top: calc(var(--app-width)* 19 / 100);
  
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
    padding: calc(var(--app-width)* 7.75 / 100) calc(var(--app-width)* 5.28 / 100) calc(var(--app-width)* 6.4 / 100) calc(var(--app-width)* 5.28  / 100);
    height: calc(var(--app-width)* 122.7/ 100);
    position: relative;
  }
  
  .main-step-3{
    padding-bottom: 0;
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

  .info-arrow-svg{
    margin: 0 auto;
    display: block;
  }

  .info-game-1{
    width: 100%;
    height: calc(var(--app-width) * 46.7 / 100);
    overflow: hidden;
    position: relative;
  }

  .info-game-2{
    width: 100%;
    height: calc(var(--app-width) * 63 / 100);
    overflow: hidden;
    position: relative;
    padding-top: calc(var(--app-width) * 10 / 100);
  }

  .info-game-3{
    width: 100%;
    height: calc(var(--app-width) * 83 / 100);
    overflow: hidden;
    position: relative;
    padding-top: calc(var(--app-width) * 4 / 100);
}

  .finger-img{
    position: absolute;
    top: calc(var(--app-width) * 18 / 100);
    right: calc(var(--app-width) * 5 / 100);
    width: calc(var(--app-width) * 17 / 100);
  }
  </style>