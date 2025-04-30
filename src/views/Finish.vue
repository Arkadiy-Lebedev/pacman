
<script setup lang="ts">
import Header from '@/components/Header.vue';
import { FTClient } from 'ft-client'
import ButtonAlfa from '@/UI/Button/ButtonAlfa.vue';
import { gsap } from 'gsap'
import { ref,onMounted } from 'vue'
import InputEmail from '@/UI/InputEmail/InputEmail.vue';
import CheckBoxGroup from '@/UI/CheckBoxGroup.vue';
import CheckBoxGroup2 from '@/UI/CheckBoxGroup2.vue';
import { useRouter } from 'vue-router'
import { useYandexMetrika } from 'yandex-metrika-vue3'

const yandexMetrika = useYandexMetrika()

// const ftClients = new FTClient('https://games-admin.fut.ru/api/', 'ecomomania')
const router = useRouter()

const contentRef = ref<HTMLElement | null>(null)
const check1 =ref(false)
const check2 =ref(false)
const validate = ref(true)
const email = ref<string | null>(null)
  const isPending = ref(false)

const sendData = async () => {
validate.value = true
if (!check1.value ) return
const EMAIL_REGEXP =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

if (!email.value || !EMAIL_REGEXP.test(email.value)) {
  validate.value = false
  return
} else {
  validate.value = true
}

const formData: {email:string,subscription?:string } = {
    email: email.value
  }
  if (check2.value){
    formData.subscription = email.value
  }

isPending.value = true
// const newRecord = await ftClients.createRecord(formData)
//   console.log(newRecord)
yandexMetrika.reachGoal('mail')

isPending.value = false
router.push({name:'tg'})
}

onMounted(() => {
if(!contentRef.value )return
    gsap.from(contentRef.value, { duration: 0.5, autoAlpha: 0, delay:0.2, ease: 'power1.out' })
 

})
</script>

<template>
  <div class="wrapper">
    <Header/>
    <div class="content">

<div ref="contentRef" class="main">
  <p class="title">
    Эмэйзинг!
    </p>
  <p class="text">
    Никакие страхи не помешают твоей работе в Альфа-Банке.
  </p>
  <div class="img-block">
        <img src="@/assets/images/finish/1.svg" alt="" class="img">
    </div>
    <p class="text --bold --not-mt">
      Начнёшь строить карьеру?
  </p>
  <p class="text ">
    Оставляй почту — пришлём полезное письмо о наших стажировках и расскажем про розыгрыш.
  </p>
  <div class="input-block">
       <InputEmail v-model="email"  :validate="validate"/>
   <div class="btn" @click="sendData" :class="{pending:isPending}" >
    <img src="@/assets/images/finish/arrow.svg" alt="" class="arrow">
   </div>
  </div>
  <div class="check-box">
  <CheckBoxGroup v-model="check1"/>
</div>
<div class="check-box">
  <CheckBoxGroup2 v-model="check2"/>
</div>

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


  .main{
   
    background-image: url("@/assets/images/finish/bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 6.75 / 100) calc(var(--app-width)* 9.28 / 100) calc(var(--app-width)* 4.8 / 100) calc(var(--app-width)* 5.28  / 100);
    /* height: calc(var(--app-width)* 122.7/ 100); */

  }

  .title{
    font-weight: 600;
    font-size: calc(var(--app-width)* 5.35 / 100);
    line-height: calc(var(--app-height)* 3.2 / 100);
}

.text{
  margin-top: calc(var(--app-width)* 3.2 / 100);
}

.img-block{
    text-align: center;
  }

  .img{
    width: calc(var(--app-width)* 49.1 / 100)
  }

  .--not-mt{
    margin-top: 0;
  }

  .input-block{
    display: flex;
    margin-top: calc(var(--app-width)* 3.5 / 100);
   align-content: stretch
  }

  .btn{ 
    cursor: pointer;
    height: auto;
    width: calc(var(--app-width)* 12.8 / 100);
    background-color: #8FFF00;
    display: flex; 
    align-items: center;
    justify-content: center; 
    transition: filter 0.3s ease-in-out;
  }

  .btn:hover{
filter: brightness(0.9);
  }

  .arrow{
    width: calc(var(--app-width)* 4.6 / 100);
  }

  .check-box{
    margin-top: calc(var(--app-width)* 3.5 / 100);
  }

  .pending{
    pointer-events: none;
    animation: fadeInOut 1s infinite;
}
@keyframes fadeInOut {
    0% {
        opacity: 0.8; /* Начальное состояние: полностью прозрачный */
    }
    50% {
        opacity: 0.5; /* Половина анимации: полностью непрозрачный */
    }
    100% {
        opacity: 0.8; /* Конечное состояние: снова полностью прозрачный */
    }
  }
  
    </style>