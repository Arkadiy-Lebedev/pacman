<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import MenuGame from '@/components/menu-game/index.vue'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import { game2Elements } from '@/data/game2'
import type { IGame } from '@/data/game2'
import { useHelperStore } from '@/stores/helper'

import car from "@/assets/images/game2/car.svg"
import point from "@/assets/images/game2/point.svg"
import box1 from "@/assets/images/game2/box1.svg"
import box2 from "@/assets/images/game2/box2.svg"

const helperStore = useHelperStore()
const router = useRouter()

type Status = 'error' | 'back' | 'success' | 'info_1' | 'info_2' | 'instruction' | '' | 'success_2'
const statusElement = ref<Status>('')
const menuRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const elements = ref<IGame[] | []>([])

onMounted((): void => {
    if (menuRef.value) {
        console.log(555)
        gsap.from(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    }
    if (containerRef.value) {
        gsap.from(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    } 
    elements.value = JSON.parse(JSON.stringify(game2Elements))


        statusElement.value = 'info_1'

})

const rotate = (id: number) => {
    const el = elements.value.find((el) =>  el.id == id )
    console.log(elements.value)
    if (el) {        
        el.position += 90  
        el.rotate += 90 
        if (el.position > 360) el.position = 90
 
        if (elements.value.every((el) => {     
                console.log(el)         
            // if (el.id == 6 || el.id ==7 || el.id ==12) {            
            //     if (el.position == el.win || el.position == el.win * 2) {
            //         return true
            //     }
            //     else {
            //         return false
            //     }
            // }            

            // if (el.position == el.win) {
            //     return true
            // } else {
            //     return false
            // }
            if (el.win.includes(el.position)) {
                return true
            } else {
                return false
            }

        }))
        {
           statusElement.value = 'success'
       
        }

}
}

const toLoby = (statusGame: 'succes' | 'back') => {
    console.log(statusGame)
    statusElement.value = ''
    gsap.to(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    gsap.to(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    setTimeout(() => {
        if (statusGame == 'succes') {
            helperStore.isComplitedSection_2 = true
            router.push({
                name: 'loby', query: {       // GET-параметры
                    complited: 's2',
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

</script>

<template>
    <div class="main">
        <div ref="menuRef" class="menu__wrapper">
            <MenuGame @home="homeClick" @instruction="instructionClick" />
        </div>
        <div ref="containerRef" class="container">
            <div class="game">
                <img :src="car" class="car">
                <img :src="point" class="point">
                <img :src="box1" class="box1">
                <img :src="box2" class="box2">
                <img v-for="el in elements" :key="el.id" :class="['node', `node-${el.id}`]" :src="el.img" :style="{
                    transform: `rotate(${el.rotate}deg)`, 
                }" @click="rotate(el.id)">
            </div>
        </div>

        <Transition name="fade">
            <div v-if="statusElement != ''" class="main-overlay">
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="statusElement == 'info_1'" class="modal-wrapper-succes">
                <p class="section-modal__title">Ты попал на склад!</p>
                <p class="section-modal__text">Это ключевой этап цепи поставок, где мы управляем логистикой и наличием товаров, чтобы заказы поступали вовремя.
                </p>
              <p class="section-modal__subtext">Быстрая логистика — залог доверия клиентов:
                </p>
                <p class="section-modal__text --left --not-mrgn-btm">Товары поступают на платформы вовремя
                </p>
                <p class="section-modal__text --left --not-mrgn-top">В онлайн-магазинах всегда актуальные предложения
                </p>
                <p class="section-modal__text">Собери путь доставки и убедись, что все работает как часы!
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="statusElement = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition>
        <!-- <Transition name="fade">
            <div v-if="statusElement == 'info_2'" class="modal-wrapper-succes">

                <p class="section-modal__subtext">Быстрая логистика сохраняет доверие клиентов:
                </p>
                <p class="section-modal__text --left --not-mrgn-btm">Товары поступают на платфор&shy;мы вовремя
                </p>
                <p class="section-modal__text --left --not-mrgn-top">В онлайн-магазинах всегда представлены актуальные
                    предложе-ния
                </p>
                <p class="section-modal__text">Собери путь доставки и убедись, что все работает как часы!
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="statusElement = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition> -->
        <Transition name="fade">
            <div v-if="statusElement == 'instruction'" class="modal-wrapper-succes">
                <p class="section-modal__title">Твоя задача</p>
                <p class="section-modal__text">— построить подходящий маршрут для доставки нашей продукции клиентам.
                </p>
                <p class="section-modal__text --width-min">Тебе нужно нажимать на элемен&shy;ты дороги, чтобы выстроить путь до конечной
                    точки.
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

        <Transition name="fade">
            <div v-if="statusElement == 'success'" class="modal-wrapper-succes">
                <p class="section-modal__title">Отличная работа!</p>
                <p class="section-modal__text">Товары собраны и готовы к отправке. Благодаря тебе заказ будет
                    доставлен вовремя.
                </p>
                <p class="section-modal__subtext">Своевременные поставки — ключ к успешной работе онлайн-магазинов. Мы следим за:
                </p>
                <p class="section-modal__text --left --not-mrgn-btm">Доступностью товаров
                </p>
                <p class="section-modal__text --left --not-mrgn-btm --not-mrgn-top">Скоростью обработки заказов
                </p>
                <p class="section-modal__text --left  --not-mrgn-top">Правильной логистикой
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('succes')" class="btn" text="Круто!" />
                </div>
            </div>
        </Transition>

        <!-- <Transition name="fade">
            <div v-if="statusElement == 'success_2'" class="modal-wrapper-succes">
                <p class="section-modal__subtext">Своевременные поставки со скла&shy;дов очень важны для исправной
                    работы
                    онлайн магазинов.
                </p>

                <p class="section-modal__text">Мы следим за:
                </p>

                <p class="section-modal__text --left --not-mrgn-btm">Доступностью товаров
                </p>
                <p class="section-modal__text --left --not-mrgn-btm --not-mrgn-top">Скоростью обработки заказов
                </p>
                <p class="section-modal__text --left  --not-mrgn-top">Правильной логистикой
                </p>

                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('succes')" class="btn" text="Круто!" />
                </div>
            </div>
        </Transition> -->
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



.btn_block {
    display: flex;
    justify-content: center;
    gap: calc(var(--app-width)* 8 / 100);

}

.car{
    position: absolute;
    left: calc(var(--app-width)* 10 / 100);
    top: calc(var(--app-height)* 17 / 100);
    width: calc(var(--app-width)* 28 / 100);
}

.point{
    position: absolute;
    left: calc(var(--app-width)* 71.6 / 100);
    top: calc(var(--app-width)* 149.8 / 100);
    width: calc(var(--app-width)* 9.6 / 100);
    z-index: 10;
}

.box1{
    position: absolute;
    left: calc(var(--app-width)* 18.7 / 100);
    top: calc(var(--app-width)* 62.6 / 100);
    width: calc(var(--app-width)* 29.6 / 100);
    z-index: 10;
 
}

.box2 {
    position: absolute;
    left: calc(var(--app-width)* 64.7 / 100);
    top: calc(var(--app-width)* 111.6 / 100);
    width: calc(var(--app-width)* 29.6 / 100);
    z-index: 10;

}

.node{
    position: absolute;
    transition: all 0.3s linear;
    touch-action: manipulation;
}

.node-1 {
    left: calc(var(--app-width)* 47 / 100);
    top: calc(var(--app-width)* 35 / 100);
    width: calc(var(--app-width)* 23.3 / 100);
}

.node-2 {
    left: calc(var(--app-width)* 69.8  / 100);
    top: calc(var(--app-width)* 35 / 100);
    width: calc(var(--app-width)* 19.2 / 100);
}
.node-3 {
    left: calc(var(--app-width)* 76.8 / 100);
    top: calc(var(--app-width)* 54.9 / 100);
    width: calc(var(--app-width)* 12.15 / 100);
}

.node-12 {
    left: calc(var(--app-width)* 76.7 / 100);
    top: calc(var(--app-width)* 55.2 / 100);
    width: calc(var(--app-width)* 12.4 / 100);
}

.node-5 {
    left: calc(var(--app-width)* 43.3 / 100);
    top: calc(var(--app-width)* 77.3 / 100);
    width: calc(var(--app-width)* 19.8 / 100);
}
.node-6 {
    left: calc(var(--app-width)* 23.8 / 100);
    top: calc(var(--app-width)* 83.8 / 100);
    width: calc(var(--app-width)* 20.15 / 100);
}

.node-4 {
    left: calc(var(--app-width)* 51.4 / 100);
    top: calc(var(--app-width)* 62.75 / 100);
    width: calc(var(--app-width)* 26.4 / 100);
}

.node-7 {
    left: calc(var(--app-width)* 43.3 / 100);
    top: calc(var(--app-width)* 102.5 / 100);
    width: calc(var(--app-width)* 18.5 / 100);
}

.node-8 {
    left: calc(var(--app-width)* 40.9 / 100);
    top: calc(var(--app-width)* 113.85 / 100);
    width: calc(var(--app-width)* 21.1 / 100);
}

.node-9 {
    left: calc(var(--app-width)* 21.2 / 100);
    top: calc(var(--app-width)* 123.65 / 100);
    width: calc(var(--app-width)* 20.7 / 100);
}

.node-10 {
    left: calc(var(--app-width)* 21.2 / 100);
    top: calc(var(--app-width)* 141.65 / 100);
    width: calc(var(--app-width)* 18.9 / 100);
}

.node-11 {
    left: calc(var(--app-width)* 39.2 / 100);
    top: calc(var(--app-width)* 150.35 / 100);
    width: calc(var(--app-width)* 26.4 / 100);
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
    padding-left: 22px;
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
    width:100%;
    height: 100%;
    margin: 0 auto;
    background: #0056D1;
    padding-top: calc(var(--app-width)* 24.8 / 100);
    position: relative;
}
.--width-min{
    width: 95%;
}
</style>
