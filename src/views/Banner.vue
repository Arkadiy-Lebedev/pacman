<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import MenuGame from '@/components/menu-game/index.vue'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import { useHelperStore } from '@/stores/helper'
const helperStore = useHelperStore()
const router = useRouter()

type Status = 'error' | 'back' | 'success' | 'info_1' | 'info_2' | 'instruction' | '' | 'success_2'
const statusElement = ref<Status>('')

const contentText = ref(`Нужно обновить неактуальную информацию на карточке товара и сделать её готовой к продажам!`)

const menuRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
   
const imgStep1Ref = ref<HTMLElement | null>(null)
const imgStep2Ref = ref<HTMLElement | null>(null)
const imgStep3Ref = ref<HTMLElement | null>(null)
const imgStep4Ref = ref<HTMLElement | null>(null)

const content1Ref = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const isVisibleInfoText = ref(true)

onMounted((): void => {
    if (menuRef.value) {
        console.log(555)
        gsap.from(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    }
    if (containerRef.value) {
        gsap.from(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    } 
  


        statusElement.value = 'info_1'


})



const toLoby = (statusGame: 'succes' | 'back') => {
  
    statusElement.value = ''
    gsap.to(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    gsap.to(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    setTimeout(() => {
        if (statusGame == 'succes') {
            helperStore.isComplitedSection_4 = true
            router.push({
                name: 'loby', query: {       // GET-параметры
                    complited: 's4',
                }
            })
        }
        if (statusGame == 'back') {
            router.push({
                name: 'loby'
            })
        }

    }, 1000)

}

const homeClick = () => {
    statusElement.value = 'back'
}

const instructionClick = () => {
    statusElement.value = 'instruction'
}

const step = ref(1)
const step2 = () => {
    step.value++


    if(step.value == 2){
        gsap.to(imgStep1Ref.value, {
  duration: 1,
  filter: "blur(30px)",
  opacity:0,
    ease: "power2.inOut",
})

gsap.fromTo(imgStep2Ref.value, {
     duration: 1,
opacity:0,
filter: "blur(30px)",
  ease: "power2.inOut",
},
{     
    duration: 1,
    filter: "blur(0px)",
  opacity:1,
  delay: 0.3
})
setTimeout(() => {
    isVisibleInfoText.value=false
    contentText.value = 'Мы сделали цену более выгодной с помощью 25% скидки и этим привлекли больше покупателей!'
},500)

    }

    if(step.value == 3){
    gsap.to(imgStep2Ref.value, {
  duration: 1,
  filter: "blur(30px)",
  opacity:0,
    ease: "power2.inOut",
})

gsap.fromTo(imgStep3Ref.value, {
     duration: 1,
opacity:0,
filter: "blur(30px)",
  ease: "power2.inOut",
},
{     
    duration: 1,
    filter: "blur(0px)",
  opacity:1,
  delay: 0.3
})
setTimeout(() => {
    contentText.value = `Отформатировали описание напит-ка и вставили цепляющие фразы, чтобы клиент обратил внимание именно на этот товар!`
},500)

    }

    if(step.value == 4){
    gsap.to(imgStep3Ref.value, {
  duration: 1,
  filter: "blur(30px)",
  opacity:0,
    ease: "power2.inOut",
})

gsap.fromTo(imgStep4Ref.value, {
     duration: 1,
opacity:0,
filter: "blur(30px)",
  ease: "power2.inOut",
},
{     
    duration: 1,
    filter: "blur(0px)",
  opacity:1,
  delay: 0.3
})
setTimeout(() => {
    contentText.value = `Добавили разных деталей на баннер — яркий визуал помогает заинтересовать в покупке!`
},500)

    }

    if(step.value == 5){
        statusElement.value = 'success'
    }

if(step.value < 5){
        gsap.to(content1Ref.value, {
     duration: 0.6,
filter: "blur(30px)",
  ease: "power2.inOut",
  onComplete: () => {
    // Следующая анимация
    gsap.to(content1Ref.value, {
      duration: 0.4,
      filter: "blur(0px)",
      ease: "power2.inOut",
    });
  }
})
}


}


</script>

<template>
    <div class="main">
        <div ref="menuRef" class="menu__wrapper">
            <MenuGame @home="homeClick" @instruction="instructionClick" />
        </div>
        <div ref="containerRef" class="container">           
            <div class="img-block">
                <img @click="step2"  ref="imgStep4Ref" style="opacity: 0;" class="img"  src="@/assets/images/game4/img4.png" alt="">
                <img @click="step2" ref="imgStep3Ref" style="opacity: 0;" class="img"  src="@/assets/images/game4/img3.png" alt="">
                <img @click="step2" ref="imgStep2Ref" style="opacity: 0;" class="img"  src="@/assets/images/game4/img2.png" alt="">
                <img @click="step2" ref="imgStep1Ref" class="img"  src="@/assets/images/game4/img1.png" alt="">
                
            </div>
            <div ref="content1Ref" class="content">
                <p ref="textRef" class="content__text"> {{contentText }}
                        </p>
                     
            </div>

            <div class="btn_block ">
            <!-- <ButtonPepsi @click="step2" class="btn" text="Далее" outline /> -->
        </div>
        </div>        


        <Transition name="fade">
            <div v-if="statusElement != ''" class="main-overlay">
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="statusElement == 'success'" class="modal-wrapper-succes">
                <p class="section-modal__title">Молодец!</p>
                <p class="section-modal__text">Карточка обновлена: актуальная цена, точное описание и яркое изображение.
                </p>
                <p class="section-modal__text">Теперь клиенты получат нужную информацию, а товар станет лидером продаж!
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('succes')" class="btn" text="Класс!" />
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="statusElement == 'info_1'" class="modal-wrapper-succes banner">
                <p class="section-modal__title">Добро пожаловать в отдел Sales!</p>
                <p class="section-modal__text">Мы обеспечиваем успех в eCom, размещая товары там, где они нужны, и по правильной цене.
                </p>
                <p class="section-modal__text">Один из ключевых инструментов — баннеры. Они привлекают внимание, подчёркивают преиму-щества продукта и увеличивают конверсии.
                </p>
                 <p class="section-modal__text">Хороший баннер:
                </p>
                <p class="section-modal__text --left --not-mrgn-btm">Привлекает клиентов
                </p>
                <p class="section-modal__text --left --not-mrgn-btm --not-mrgn-top">Увеличивает клики и продажи
                </p>
                <p class="section-modal__text --left  --not-mrgn-top">Поддерживает доверие
     к продукту
                </p>
              
                <div class="btn_block">
                    <ButtonPepsi @click="statusElement = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition>

        <!-- <Transition name="fade">
            <div v-if="statusElement == 'info_2'" class="modal-wrapper-succes">
                <p class="section-modal__title">Ключевой инструмент в eCom</p>
                <p class="section-modal__text">Баннеры помогают направить внимание клиента, подчеркнуть преимущества продуктов и вызвать желание сделать покупку.
                </p>
          
                <p class="section-modal__text">В компании мы создаём такие баннеры, которые работают
на результат:
                </p>
                <p class="section-modal__text --left --not-mrgn-btm">Привлекают клиентов
                </p>
                <p class="section-modal__text --left --not-mrgn-btm --not-mrgn-top">Увеличивают клики и <br/>конверсии
                </p>
                <p class="section-modal__text --left  --not-mrgn-top">Поддерживают доверие
     к продукту
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="statusElement = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition> -->

        <Transition name="fade">
            <div v-if="statusElement == 'instruction'" class="modal-wrapper-succes">
                <p class="section-modal__title">Правила</p>
                <p class="section-modal__text">В отделе Sales мы следим за тем, чтобы у товаров были актуальные данные. Это помогает привлекать клиентов и увеличивать продажи.
                </p>
                <p class="section-modal__text">
Перед тобой баннер, который нужно обновить: исправить цену
и описание. Для этого нужно будет тапать на баннер.
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="statusElement = ''" class="btn" text="Играть" />
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="statusElement == 'back'" class="modal-wrapper-succes">
                <p class="section-modal__title">Кажется, ты не завершил здесь все дела!</p>
                <p class="section-modal__text --center">Точно хочешь выйти?
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('back')" class="btn" text="Да" />
                    <ButtonPepsi @click="statusElement = ''" class="btn" text="Нет" />
                </div>
            </div>
        </Transition>
    </div>
</template>



<style scoped>

.--mt{
    margin-top: calc(var(--app-width)* 4.25 / 100);;
}

.img-block{
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
}

.img-block .img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.content__text {
    color: #0056D1;

    font-size: calc(var(--app-width)* 4.25 / 100);

}

.content{
    width: 100%;
    padding: calc(var(--app-width)* 4.3 / 100) calc(var(--app-width)* 3.3 / 100);   
    border-radius: 10px;
    background: #fff;
    margin-top: calc(var(--app-height)* 3 / 100);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;

}

.fade-enter-from,
.fade-leave-to {
    opacity: 0 !important;
}

.menu__wrapper {
    position: relative;
    z-index: 900;
}



.btn_block {
    display: flex;
    justify-content: center; 
    margin-top: calc(var(--app-height)* 3 / 100);

}



.main-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 800;
}

.section-modal__title {
    color: #D52B2B;
    font-size: calc(var(--app-width)* 5.35 / 100);
    text-align: center;
  
}


.section-modal__text {
    color: #0056D1;
    margin-top: calc(var(--app-height)* 3/ 100);
    margin-bottom: calc(var(--app-height)* 3/ 100);
    font-size: calc(var(--app-width)* 4.25 / 100);

}

.--not-mrgn-top {
    margin-top: 0;
}

.--not-mrgn-btm {
    margin-bottom: 0;
}

.section-modal__subtext {
    color: #0056D1;
    font-size: calc(var(--app-width)* 4.2 / 100);
}

.banner .--left {
    padding-left: 15px;
    position: relative;
    margin-left: 10px;
}
.--left::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #0056D1;
    margin-top: calc(var(--app-width)* 1.5 / 100);
  
}

.modal-wrapper-succes {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    background: #fff;

    z-index: 810;
    padding: calc(var(--app-width)* 5.9 / 100) calc(var(--app-width)* 4.7 / 100);
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
}

.btn_block {
    display: flex;
    justify-content: center;
    gap: calc(var(--app-width)* 8 / 100);

}


.main{
    position: relative;
    height: 100%;
    width: 100%;
    
}


.container {
    width:90%;
    height: 100%;
    margin: 0 auto;
    padding-top: calc(var(--app-width)* 24.8 / 100);
    position: relative;
}

</style>
