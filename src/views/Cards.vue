<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import MenuGame from '@/components/menu-game/index.vue'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import StepOne from '@/components/cards/stepOne/stepOne.vue'
import StepTwo from '@/components/cards/stepOne/stepTwo.vue'
import StepThree from '@/components/cards/stepOne/stepThree.vue'
import { useHelperStore } from '@/stores/helper'
const router = useRouter()
const helperStore = useHelperStore()
type Status = 'error' | 'back' | 'success' | 'info_1' | 'info_2' | 'instruction' | '' | 'success_2'
const statusElementMain = ref<Status>('')
const menuRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const step = ref<number>(1)
    const isInstriction = ref(false)

onMounted((): void => {
    if (menuRef.value) {
        console.log(555)
        gsap.from(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    }
    if (containerRef.value) {
        gsap.from(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    } 
  

        statusElementMain.value = 'info_1'
     
})



const toLoby = (statusGame: 'succes' | 'back') => {
  
    statusElementMain.value = ''
    gsap.to(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    gsap.to(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    setTimeout(() => {
        if (statusGame == 'succes') {
            helperStore.isComplitedSection_3 = true
            router.push({
                name: 'loby', query: {       // GET-параметры
                    complited: 's3',
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

const next = (steps:number) => {
    step.value = steps
}
const finish = () => {

    statusElementMain.value = 'success'
}

const homeClick = () => {
    statusElementMain.value = 'back'
}

const instructionClick = () => {
    statusElementMain.value = 'instruction'
  
}
const backGame  = () => {
    statusElementMain.value = ''
    isInstriction.value =true
}
</script>

<template>
    <div class="main">
        <div ref="menuRef" class="menu__wrapper">
            <MenuGame @home="homeClick" @instruction="instructionClick" />
        </div>
        <div ref="containerRef" class="container">
            <Transition name="fade">
                <StepOne v-if="step==1" :active="isInstriction" @next="next(2)" />
            </Transition>
            <Transition name="fade">
                <StepTwo v-if="step == 2" @next="next(3)" />
            </Transition>
            <Transition name="fade">
                <StepThree v-if="step == 3" @next="finish" />
            </Transition>
        </div>

        <Transition name="fade">
            <div v-if="statusElementMain != ''" class="main-overlay">
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="statusElementMain == 'info_1'" class="modal-wrapper-succes">
                <p class="section-modal__title">Добро пожаловать в отдел маркетинга!</p>
                <p class="section-modal__text">Наша команда делает так, чтобы товары не просто попадали на полки, а выделялись среди <br/> других.
                </p>
                <p class="section-modal__text">Мы создаём рекламные кампании, прорабатываем визуальное оформление и наполняем онлайн-витрину качественными <br/>карточками.
                </p>
<p class="section-modal__text">Карточка товара — первый шаг
к продаже. Она должна: чётко описывать товар, привлекать внимание, содержать подходящие ключевые слова.
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="statusElementMain = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition>

                <!-- <Transition name="fade">
            <div v-if="statusElementMain == 'info_2'" class="modal-wrapper-succes">
                <p class="section-modal__title">Карточка товара — первый шаг к продаже</p>
                <p class="section-modal__text">Она должна:
                </p>
                
                <p class="section-modal__text --left --not-mrgn-btm">Четко описывать товар
                </p>
                <p class="section-modal__text --left --not-mrgn-btm --not-mrgn-top">Привлекать внимание внешним видом
                </p>
                <p class="section-modal__text --left  --not-mrgn-top">Содержать подходящие ключевые слова
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="statusElementMain = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition> -->

        <Transition name="fade">
            <div v-if="statusElementMain == 'success'" class="modal-wrapper-succes">
                <p class="section-modal__title">Так держать!</p>
                <p class="section-modal__text">Ты создал отличную карточку — теперь она точно привлечёт покупателей:
                </p>

                <p class="section-modal__text --left --not-mrgn-btm">Ярким изображением
                </p>
                <p class="section-modal__text --left --not-mrgn-btm --not-mrgn-top">Цепляющим описанием
                </p>
                <p class="section-modal__text --left  --not-mrgn-top">Правильными ключевыми словами
                </p>

                  <p class="section-modal__text --width">В маркетинге eCom мы создаём яркий образ брендов и продук&shy;тов. Оформление карточек — лишь один из инструментов продвижения!
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('succes')" class="btn" text="Здорово!" />
                </div>
            </div>
        </Transition>

        <!-- <Transition name="fade">
            <div v-if="statusElementMain == 'success_2'" class="modal-wrapper-succes">
                <p class="section-modal__subtext">В отделе маркетинга мы создаём яркий образ брендов и продуктов
                    в онлайн-пространстве.
                </p>
                <p class="section-modal__text">Оформление карточек — это лишь один из многих инструментов, которые
                    можно использовать для продвижения продукта!
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('succes')" class="btn" text="Здорово!" />
                </div>
            </div>
        </Transition> -->

        <Transition name="fade">
            <div v-if="statusElementMain == 'back'" class="modal-wrapper-succes">
                <p class="section-modal__title">Кажется, ты не завершил здесь все дела!</p>
                <p class="section-modal__text --center">Точно хочешь выйти?
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('back')" class="btn" text="Да" />
                    <ButtonPepsi @click="statusElementMain = ''" class="btn" text="Нет" />
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="statusElementMain == 'instruction'" class="modal-wrapper-succes">
                <p class="section-modal__title">Цель игры</p>
                <p class="section-modal__text">Перед тобой карточка товара, которую нужно прокачать:</p> 
                <div class="flex">
                    <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">1.
                    </p>
                    <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">Выбери лучшее описание
                    </p>
                </div>
                <div class="flex">
                    <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">2.
                    </p>
                    <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">Подбери качественное изображение
                    </p>
                </div>
                <div class="flex">
                    <p class="section-modal__text --not-mrgn-top ">3.
                    </p>
                    <p class="section-modal__text --not-mrgn-top">Добавь подходящие ключевые слова
                    </p>
                </div>

                <div class="btn_block">
                    <ButtonPepsi @click="backGame" class="btn" text="Играть" />
                </div>
            </div>
        </Transition>
    </div>
</template>



<style scoped>

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

.flex{
    display: flex;
    gap:8px
}

.btn_block {
    display: flex;
    justify-content: center;
    gap: calc(var(--app-width)* 8 / 100);

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

.--left {
    padding-left: 20px;
    position: relative
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
    width: calc(var(--app-width)* 90/ 100);
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

.--width{
    width: 95%;
}

</style>
