<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import MenuGame from '@/components/menu-game/index.vue'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import type { IProduct } from '@/types/Product'
import { useHelperStore } from '@/stores/helper'

const helperStore = useHelperStore()

import evervess from '@/assets/images/game1/Evervess.svg'
import cheetos from '@/assets/images/game1/cheetos.svg'
import cream from '@/assets/images/game1/cream.svg'
import juce from '@/assets/images/game1/juce.svg'
import lays from '@/assets/images/game1/lays.svg'
import milk from '@/assets/images/game1/milk.svg'
import yogurt from '@/assets/images/game1/yogurt.svg'
import conveyor from '@/assets/images/game1/conveyor.svg'
import line from '@/assets/images/game1/line.svg'

const router = useRouter()

const menuRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

type Status = 'error' | 'back' | 'success' | 'info_1' | 'info_2' | 'instruction' | '' | 'instructionRun'
const statusElement = ref<Status>('')
const runElem = ref<number>(9)

onMounted((): void => {
    statusElement.value = 'info_1'
    if (menuRef.value) {
        console.log(555)
        gsap.from(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    }
    if (containerRef.value) {
        gsap.from(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    }

   
})





const list1 = ref<IProduct[]>([{ id: 1, img: evervess, type: 'height', size: '22vw', size2: '100%', cl: 'evervess' }])
const list4 = ref<IProduct[]>([{ id: 1, img: lays, type: 'height', size: '22vw', size2: '100%', cl: 'lays' }])
const list5 = ref<IProduct[]>([{ id: 1, img: cheetos, type: 'height', size: '22vw', size2: '100%', cl: 'cheetos' }])


const list6 = ref<IProduct[]>([{ id: 1, img: juce, type: 'normal', size: '22vw', size2: '100%', cl: 'juce' }])
const list3 = ref<IProduct[]>([{ id: 1, img: yogurt, type: 'normal', size: '19vw', size2: '80%', cl: 'yogurt' }])


const list2 = ref<IProduct[]>([{ id: 1, img: cream, type: 'low', size: '12vw', size2: '50%', cl: 'cream' }])
const list7 = ref<IProduct[]>([{ id: 1, img: milk, type: 'low', size: '22vw', size2: '100%', cl: 'milk' }])


const current = ref<number>(1)

const popular1 = ref<IProduct[]>([])
const popular2 = ref<IProduct[]>([])
const popular3 = ref<IProduct[]>([])

const average1 = ref<IProduct[]>([])
const average2 = ref<IProduct[]>([])
const average3 = ref<IProduct[]>([])

const low1 = ref<IProduct[]>([])
const low2 = ref<IProduct[]>([])
const low3 = ref<IProduct[]>([])

const log = () => {  
let error = []

 
    if (list1.value.length == 0 && list2.value.length == 0 && list3.value.length == 0 && list4.value.length == 0) {
        current.value = 2
    }


    // if (popular1.value[0]?.type == 'height' && popular2.value[0]?.type == 'height' && popular3.value[0]?.type == 'height') {
    //     error.push(1)
    // }
    // if (((average1.value[0]?.type == 'normal' ? 1 : 0) + (average2.value[0]?.type == 'normal' ? 1 : 0) + (average3.value[0]?.type == 'normal' ? 1 : 0) == 2)) {
    //     error.push(2)
    // }
    // if (((low1.value[0]?.type == 'low' ? 1 : 0) + (low2.value[0]?.type == 'low' ? 1 : 0) + (low3.value[0]?.type == 'low' ? 1 : 0) == 2)) {
    //     error.push(3)
    // }
   
    // if (error.length == 3) {
    //     statusElement.value = 'success'

    //     return
    // }

    // if (list1.value.length == 0 && list2.value.length == 0 && list3.value.length == 0 && list4.value.length == 0 &&
    //     list5.value.length == 0 && list6.value.length == 0 && list7.value.length == 0 
    // ) {
    //     statusElement.value = 'error'
    // }

        if ((popular1.value.length > 0 && popular1.value[0]?.type !== 'height') || (popular2.value.length > 0 && popular2.value[0]?.type !== 'height') || (popular3.value.length > 0 && popular3.value[0]?.type !== 'height')) {
        error.push(1)
    
    }
    if ((average1.value.length > 0 && average1.value[0]?.type !== 'normal') || (average2.value.length > 0 && average2.value[0]?.type !== 'normal')  || (average3.value.length > 0 && average3.value[0]?.type !== 'normal') 
        
    ) {
     
        error.push(2)
    }
    if ((low1.value.length > 0 && low1.value[0]?.type !== 'low') || (low2.value.length > 0 && low2.value[0]?.type !== 'low') || (low3.value.length > 0 && low3.value[0]?.type !== 'low')) {
        error.push(3)
    }
   
    if (error.length > 0) {
        statusElement.value = 'error'
runElem.value = 9
clearTimeout(timeOutElem)
        return
    }

    if (list1.value.length == 0 && list2.value.length == 0 && list3.value.length == 0 && list4.value.length == 0 &&
        list5.value.length == 0 && list6.value.length == 0 && list7.value.length == 0 
    ) {
        statusElement.value = 'success'
    }


}

const toLoby = (statusGame: 'succes' | 'back') => {
    statusElement.value = ''
    gsap.to(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    gsap.to(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    setTimeout(() => {
        if (statusGame == 'succes') {
            helperStore.isComplitedSection_1 = true
            router.push({
                name: 'loby', query: {       // GET-параметры
                    complited: 's1',                    
                }})            
        }
        if (statusGame == 'back') {
            router.push({
                name: 'loby'
            })
        }
        
    }, 1000)

}

const rnd = (num: number): number => {
    return Math.floor(Math.random() * num)
}
const arr = ref<number[]>([])
const elem = ref(0)

let timeOutElem: any

const startTimout = () => {
    runElem.value = 9
    arr.value = []
    if (list1.value.length != 0) {
        arr.value.push(0)
        console.log(list1.value)
    }
    if (list2.value.length != 0) {
        arr.value.push(1)
        console.log(list2.value)
    }
    if (list3.value.length != 0) {
        arr.value.push(2)
        console.log(list3.value)
    }
    if (list4.value.length != 0) {
        arr.value.push(3)
        console.log(list3.value)
    }
    if (list5.value.length != 0) {
        arr.value.push(4)
        console.log(list4.value)
    }
    if (list6.value.length != 0) {
        arr.value.push(5)
        console.log(list5.value)
    }
    if (list7.value.length != 0) {
        arr.value.push(6)
        console.log(list6.value)
    }
    console.log(arr.value)

    //@ts-ignore
    const rndElem = (): number => {
        if(arr.value.length !=0){
             let rnditem = rnd(arr.value.length)
        if (arr.value.length == 1) {
            console.log(555)
            console.log(arr.value[0])
            return 0
        }
        if (elem.value == rnditem) {
           return rndElem()
        } else {
            console.log(rnditem)
            return rnditem
        }
    }  
        }
       

    elem.value = rndElem()
   
    runElem.value = arr.value[elem.value]
   
 timeOutElem =   setTimeout(() => { startTimout() }, 3600)
}

// startTimout()

//@ts-ignore
const start = (e: SortableEvent) => {
    e.item.closest('.product').classList.add('stop')
}
//@ts-ignore
const stop = (e: SortableEvent) => {
    e.item.closest('.product').classList.remove('stop')
}

const restart = () => {
console.log(6)
 list1.value = [{ id: 1, img: evervess, type: 'height', size: '22vw', size2: '100%', cl: 'evervess' }]
list4.value = [{ id: 1, img: lays, type: 'height', size: '22vw', size2: '100%', cl: 'lays' }]
 list5.value = [{ id: 1, img: cheetos, type: 'height', size: '22vw', size2: '100%', cl: 'cheetos' }]


 list6.value = [{ id: 1, img: juce, type: 'normal', size: '22vw', size2: '100%', cl: 'juce' }]
 list3.value = [{ id: 1, img: yogurt, type: 'normal', size: '19vw', size2: '80%', cl: 'yogurt' }]


 list2.value = [{ id: 1, img: cream, type: 'low', size: '12vw', size2: '50%', cl: 'cream' }]
 list7.value = [{ id: 1, img: milk, type: 'low', size: '22vw', size2: '100%', cl: 'milk' }]

popular1.value = []
popular2.value = []
popular3.value = []

average1.value = []
average2.value = []
average3.value = []

low1.value = []
low2.value = []
low3.value = []
 statusElement.value = ''
 startTimout()
}

const homeClick = () => {
 statusElement.value='back'

}

const instructionClick = () => {
    statusElement.value='instructionRun'

}


const gameStartClick = () => {
    statusElement.value = ''
    clearTimeout(timeOutElem)
    startTimout()

}

</script>

<template>
    <div class="main">
        <div ref="menuRef" class="menu__wrapper">
            <MenuGame @home="homeClick" @instruction="instructionClick"/>
        </div>
        <div ref="containerRef" class="container">


            <div class="box-wrapper">
                <p class="box__title">
                    Высокая популярность
                </p>
                <div class="box__conntent">
                    <VueDraggableNext class="item-out" :list="popular1"
                        :group="{ name: 'product', put: popular1.length < 1 }" :sort="true" @change="log">
                        <div class="item__product" v-for="element in popular1" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                            height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>

                    <VueDraggableNext class="item-out" :list="popular2"
                        :group="{ name: 'product', put: popular2.length < 1 }" :sort="true" @change="log">
                        <div class="item__product" v-for="element in popular2" :key="element.id">

                            <img :src="element.img" alt="" class="product__img" :style="{
                            height: element.size2

                                }">

                        </div>
                    </VueDraggableNext>

                    <VueDraggableNext class="item-out" :list="popular3"
                        :group="{ name: 'product', put: popular3.length < 1 }" :sort="true" @change="log">
                        <div class="item__product" v-for="element in popular3" :key="element.id">

                            <img :src="element.img" alt="" class="product__img" :style="{
                            height: element.size2

                                }">

                        </div>
                    </VueDraggableNext>
                </div>

            </div>


            <div class="box-wrapper">
                <p class="box__title">
                    Средняя популярность
                </p>
                <div class="box__conntent">
                    <VueDraggableNext class="item-out" :list="average1"
                        :group="{ name: 'product', put: average1.length < 1 }" :sort="true" @change="log">
                        <div class="item__product" v-for="element in average1" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>

                    <VueDraggableNext class="item-out" :list="average2"
                        :group="{ name: 'product', put: average2.length < 1 }" :sort="true" @change="log">
                        <div class="item__product" v-for="element in average2" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>

                    <VueDraggableNext class="item-out" :list="average3"
                        :group="{ name: 'product', put: average3.length < 1 }" :sort="true" @change="log">
                        <div class="item__product" v-for="element in average3" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
            </div>

            <div class="box-wrapper">
                <p class="box__title">
                    Низкая популярность
                </p>
                <div class="box__conntent">
                    <VueDraggableNext class="item-out" :list="low1" :group="{ name: 'product', put: low1.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in low1" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>

                    <VueDraggableNext class="item-out" :list="low2" :group="{ name: 'product', put: low2.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in low2" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>

                    <VueDraggableNext class="item-out" :list="low3" :group="{ name: 'product', put: low3.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in low3" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size2

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
            </div>




            <div class="wrapper">
                <div class="product" :class="{run: runElem==0}">
                    <VueDraggableNext class="item" :list="list1" :group="{ name: 'product', put: list1.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list1" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product" :class="{ run: runElem == 1 }">
                    <VueDraggableNext class="item" :list="list2" :group="{ name: 'product', put: list2.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list2" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product" :class="{ run: runElem == 2 }">
                    <VueDraggableNext class="item" :list="list3" :group="{ name: 'product', put: list3.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list3" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product" :class="{ run: runElem == 3 }">
                    <VueDraggableNext class="item" :list="list4" :group="{ name: 'product', put: list4.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list4" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>

                <div class="product" :class="{ run: runElem == 4 }">
                    <VueDraggableNext class="item" :list="list5" :group="{ name: 'product', put: list5.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list5" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product" :class="{ run: runElem == 5 }">
                    <VueDraggableNext class="item" :list="list6" :group="{ name: 'product', put: list6.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list6" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product" :class="{ run: runElem == 6 }">
                    <VueDraggableNext class="item" :list="list7" :group="{ name: 'product', put: list7.length < 1 }"
                        :sort="true" @change="log" @start="start" @end="stop">
                        <div class="item__product" v-for="element in list7" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :class="[element.cl]">
                        </div>
                    </VueDraggableNext>
                </div>
            </div>


            <div class="conveyor">
                <!-- <img :src="conveyor" alt="" class="conveyor__img"> -->
                <div class="conveyor__block" :class="{ 'run-Line': statusElement == '' || statusElement == 'instructionRun'|| statusElement == 'back' }"></div>
                <!-- <img :class="{ 'run-Line': statusElement == '' || statusElement == 'instructionRun'|| statusElement == 'back' }" :src="line" alt="" class="conveyor__line"> -->

            </div>
        </div>
        

        <Transition name="fade">
            <div v-if="statusElement != ''" class="main-overlay">
            </div>
        </Transition>
        <Transition name="fade">
            <div v-if="statusElement == 'success'" class="modal-wrapper-succes">
                <p class="section-modal__title">Все товары идеально распределены!</p>
                <p class="section-modal__text">Ты точно знаешь, как определить лидеров среди самых прибыльных позиций.
                </p>
                <p class="section-modal__text">Такой анализ помогает командам eCom эффективно планировать продажи и
                    выводить товары в топ.
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="toLoby(helperStore.section_2 ? 'succes' : 'back')" class="btn" text="Ура!" />
                </div>
            </div>
        </Transition>

         <Transition name="fade">
            <div v-if="statusElement == 'error'" class="modal-wrapper-succes">
                <p class="section-modal__title">Ой! Кажется, ты ошибся</p>
                <p class="section-modal__text --center">Давай попробуем снова?
                </p>
               
                <div class="btn_block">
                    <ButtonPepsi @click="restart" class="btn" text="Начать заново" />
                </div>
            </div>
        </Transition>

        
         <Transition name="fade">
            <div v-if="statusElement == 'info_1'" class="modal-wrapper-succes">
                <p class="section-modal__title">Ты в отделе Demand Accelerator!</p>
                <p class="section-modal__text">Здесь начинается путь продукта в eCom FMCG!
                </p>
                <p class="section-modal__text">Мы анализируем рынок, потреб&shy;ности покупателей и планируем стратегию ассортимента, чтобы каждый товар оказался в нужное время в нужном месте. 
                </p>
                <p class="section-modal__text">Благодаря нашим расчётам продажи идут по плану!
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="()=>statusElement = 'instruction'" class="btn" text="Далее" />
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="statusElement == 'instruction' || statusElement == 'instructionRun' " class="modal-wrapper-succes">
                <p class="section-modal__title">Задание</p>
                <p class="section-modal__text">Перед тобой онлайн-страница магазина, разделённая на три зоны. На конвейере двигаются товары с данными о продажах. 
                </p>
                <p class="section-modal__text">Твоя задача — разместить их правильно: 
                </p>
                <p class="section-modal__text --left --not-mt --not-mb"><svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.68848 0.756748L5.71731 0.162598L5.53232 1.30289C5.23789 3.10344 4.03318 4.77651 2.70437 5.95222C0.103022 8.25484 -0.466577 10.7574 0.338878 12.8231C1.10965 14.7999 3.06586 16.1535 5.05136 16.3794L5.51074 16.4313C4.37463 15.7222 3.64548 14.0657 3.89983 12.8278C4.1511 11.6112 5.0082 10.4717 6.65456 9.42032L7.48468 8.89149L7.79453 9.83977C7.9772 10.4001 8.29322 10.8502 8.61463 11.3074C8.76878 11.5278 8.92525 11.7505 9.06861 11.9874C9.56422 12.8097 9.69525 13.7242 9.37538 14.6315C9.08403 15.4563 8.60384 16.1047 7.94175 16.4643L8.6894 16.3794C10.5531 16.1677 11.9212 15.5169 12.8099 14.4285C13.6909 13.3496 14 11.9606 14 10.4819C14 9.10475 13.4458 7.68509 12.7922 6.50387C12.0261 5.12041 11.0264 3.97145 9.93496 2.85791C9.74612 3.24352 9.76077 3.39934 9.3723 4.01867C8.86784 2.65091 7.92097 1.50009 6.68848 0.756748Z" fill="#C32C2C"/>
<path d="M6.79854 4.76533L6.17014 4.36694L6.05044 5.13154C5.85993 6.33885 5.08041 7.46067 4.22059 8.24901C2.53736 9.79297 2.1688 11.471 2.68998 12.8561C3.18871 14.1816 4.4545 15.0892 5.73923 15.2406L6.03648 15.2755C5.30134 14.8 4.82954 13.6893 4.99412 12.8593C5.15671 12.0435 5.7113 11.2794 6.7766 10.5744L7.31373 10.2199L7.51422 10.8557C7.63242 11.2314 7.8369 11.5332 8.04488 11.8398C8.14462 11.9875 8.24587 12.1369 8.33863 12.2957C8.65932 12.8471 8.7441 13.4603 8.53713 14.0687C8.34861 14.6217 8.03789 15.0565 7.60948 15.2976L8.09325 15.2406C9.29919 15.0987 10.1844 14.6623 10.7595 13.9325C11.3295 13.2091 11.5295 12.2778 11.5295 11.2863C11.5295 10.3629 11.1709 9.41094 10.748 8.61891C10.2523 7.69126 9.60541 6.92086 8.89921 6.17421C8.77702 6.43277 8.78649 6.53725 8.53513 6.95252C8.20871 6.03541 7.59604 5.26376 6.79854 4.76533Z" fill="#FFA840"/>
</svg> — популярный товар, ставь наверх, чтобы привлечь больше покупателей  
                </p>
                <p class="section-modal__text --left --not-mt --not-mb"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 3.68617L1 3.68617L1 10.7363L7.5 10.7363L7.5 12.4781L15 7.08681L7.5 1.69556L7.5 3.68617Z" fill="#3D8DFF" stroke="#1F59AD"/>
</svg>
— средняя популярность, оставляй в центре для поддержки продаж
                </p>
                 <p class="section-modal__text --left --not-mt"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6 7.26473L12.6 1.10228L4.1 1.10228L4.1 7.26473L2 7.26473L8.5 14.3752L15 7.26473L12.6 7.26473Z" fill="#DE2B35" stroke="#A32C2C"/>
</svg>
— низкая популярность, перемещай вниз, освобождая место для востребованных товаров
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="gameStartClick" class="btn" text="Погнали!" />
                </div>
            </div>
        </Transition>

        <!-- <Transition name="fade">
            <div v-if="statusElement == 'instruction' || statusElement == 'instructionRun' " class="modal-wrapper-succes">
                <p class="section-modal__title">Правила</p>
                <p class="section-modal__text ">Обрати внимание на значки на товарах: 
                </p>
                <p class="section-modal__text --left"><svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.68848 0.756748L5.71731 0.162598L5.53232 1.30289C5.23789 3.10344 4.03318 4.77651 2.70437 5.95222C0.103022 8.25484 -0.466577 10.7574 0.338878 12.8231C1.10965 14.7999 3.06586 16.1535 5.05136 16.3794L5.51074 16.4313C4.37463 15.7222 3.64548 14.0657 3.89983 12.8278C4.1511 11.6112 5.0082 10.4717 6.65456 9.42032L7.48468 8.89149L7.79453 9.83977C7.9772 10.4001 8.29322 10.8502 8.61463 11.3074C8.76878 11.5278 8.92525 11.7505 9.06861 11.9874C9.56422 12.8097 9.69525 13.7242 9.37538 14.6315C9.08403 15.4563 8.60384 16.1047 7.94175 16.4643L8.6894 16.3794C10.5531 16.1677 11.9212 15.5169 12.8099 14.4285C13.6909 13.3496 14 11.9606 14 10.4819C14 9.10475 13.4458 7.68509 12.7922 6.50387C12.0261 5.12041 11.0264 3.97145 9.93496 2.85791C9.74612 3.24352 9.76077 3.39934 9.3723 4.01867C8.86784 2.65091 7.92097 1.50009 6.68848 0.756748Z" fill="#C32C2C"/>
<path d="M6.79854 4.76533L6.17014 4.36694L6.05044 5.13154C5.85993 6.33885 5.08041 7.46067 4.22059 8.24901C2.53736 9.79297 2.1688 11.471 2.68998 12.8561C3.18871 14.1816 4.4545 15.0892 5.73923 15.2406L6.03648 15.2755C5.30134 14.8 4.82954 13.6893 4.99412 12.8593C5.15671 12.0435 5.7113 11.2794 6.7766 10.5744L7.31373 10.2199L7.51422 10.8557C7.63242 11.2314 7.8369 11.5332 8.04488 11.8398C8.14462 11.9875 8.24587 12.1369 8.33863 12.2957C8.65932 12.8471 8.7441 13.4603 8.53713 14.0687C8.34861 14.6217 8.03789 15.0565 7.60948 15.2976L8.09325 15.2406C9.29919 15.0987 10.1844 14.6623 10.7595 13.9325C11.3295 13.2091 11.5295 12.2778 11.5295 11.2863C11.5295 10.3629 11.1709 9.41094 10.748 8.61891C10.2523 7.69126 9.60541 6.92086 8.89921 6.17421C8.77702 6.43277 8.78649 6.53725 8.53513 6.95252C8.20871 6.03541 7.59604 5.26376 6.79854 4.76533Z" fill="#FFA840"/>
</svg> Огонёк — популярный товар. Размести наверху, чтобы привлечь больше покупателей  
                </p>
                <p class="section-modal__text --left"><svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 3.68617L1 3.68617L1 10.7363L7.5 10.7363L7.5 12.4781L15 7.08681L7.5 1.69556L7.5 3.68617Z" fill="#3D8DFF" stroke="#1F59AD"/>
</svg>
Стрелка вправо — средняя популярность. Оставь в центре, чтобы поддерживать продажи
                </p>
                 <p class="section-modal__text --left"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6 7.26473L12.6 1.10228L4.1 1.10228L4.1 7.26473L2 7.26473L8.5 14.3752L15 7.26473L12.6 7.26473Z" fill="#DE2B35" stroke="#A32C2C"/>
</svg>
Стрелка вниз — низкая популярность. Перемести вниз, чтобы оставить место для более востребованных товаров
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="gameStartClick" class="btn" text="Играть" />
                </div>
            </div>
        </Transition> -->

          <Transition name="fade">
            <div v-if="statusElement == 'back'" class="modal-wrapper-succes">
                <p class="section-modal__title">Кажется, ты не завершил здесь все дела!</p>
                <p class="section-modal__text --center">Точно хочешь выйти?
                </p>
               
                <div class="btn_block">
                    <ButtonPepsi @click="toLoby('back')" class="btn" text="Да" />
                    <ButtonPepsi @click="statusElement=''" class="btn" text="Нет" />
                </div>
            </div>
        </Transition>
    </div>
</template>



<style scoped>

.evervess{
    height: 22vw;
}
.lays{
    height: 22vw;
}
.cheetos{
    height: 22vw;
}
.juce{
    height: 22vw;
}
.yogurt{
    height: 19vw;
}
.cream{
    height: 12vw;
}
.milk{
    height: 22vw;
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

.menu__wrapper{
position: relative;
    z-index: 900;
}

.--left{
    padding-left: 20px;
    position:relative
}

.--left::before{   
    position:absolute;
    content: "";
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #0056D1;
    margin-top:calc(var(--app-width)* 2.1 / 100);
    margin-left:calc(var(--app-width)* 1.2 / 100);
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
    width: 90%;
    height: 100%;
    margin: 0 auto;

    padding-top: calc(var(--app-width)* 24.8 / 100);
}

.item-out {
    /* width: calc(var(--app-width)* 29.5 / 100); */
    width: 100%;
    aspect-ratio:1/1;
    background: rgb(255, 255, 255);
    border-radius:10px;
}

.box__conntent{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: calc(var(--app-width)* 1 / 100);;
}

.box__conntent .item__product{
padding: 10%;
user-select: none;
  pointer-events: none;
  display: flex;
    justify-content: center;
    align-items: center;
}

.box__title {
    margin-bottom: calc(var(--app-height)* 1.5/ 100);
    font-size: calc(var(--app-width)* 5.35 / 100);
    color: #092348
}

.box-wrapper{
    margin-bottom: calc(var(--app-height)* 1.5/ 100);;
}




.conveyor {
    position: relative;
    width: calc(100% + 10vw);
    margin-left: -5vw;
    overflow: hidden;
    margin-top: calc(var(--app-width)* 25 / 100);
        
}

.conveyor__img{
    width: 100%;
}

.conveyor__block{
   width: calc(100% + 10vw);
    height:  calc(var(--app-width)* 3.8 / 100);
    background-color: #9EA1A3;
    background-image: url('@/assets/images/game1/line-bg.png');
    background-position: top; /* Располагаем изображение по верхнему краю */
  background-repeat: repeat-x; /* Повторяем изображение по горизонтали */
  background-size: auto; /* Сохраняем оригинальный размер изображения */
}

.conveyor__line{
    position: absolute;
    
    top: 0;
    left: 0;
    
}

.run-Line{
    animation: conveer 190s linear infinite;
}

/* .anim{
    
    animation: conveer 2s ease 1s forwards;
}
.anim2 {

    animation: conveer2 2s ease  forwards;
} */

@keyframes conveer {
    0% {
    background-position-x: 0%; /* Начальное положение (справа) */
  }
  100% {
    background-position-x: -10000%; /* Конечное положение (влево) */
  }
}




@keyframes conveer2 {
    0% {
        transform: translateX(30%);
        /* Начальное положение */
    }

    100% {
        transform: translateX(60%);
        /* Конечное положение (влево) */
    }
}
/* .wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    animation: slideLeftAnimation 2s ease 1s forwards;
   margin-left: -5vw;
    margin-top: calc(var(--app-height)* 1.5/ 100);
    transform: translateX(-100%);

} */

.wrapper {
    position: relative;
margin-top: calc(var(--app-width)* 7 / 100);

}

.wrapper2 {
    display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
        animation: slideLeftAnimation 2s ease forwards;
        margin-left: -5vw;
transform: translateX(-100%);
}

@keyframes slideLeftAnimation {
    0% {
        transform: translateX(-100%);
        /* Начальное положение */
    }

    100% {
        transform: translateX(0);
        /* Конечное положение (влево) */
    }
}

.item {
    width: 100%;
    height: 100%;


}

.product {
    position: absolute;
    top: 0;
    left: -100%;
    width: 20%;
    aspect-ratio: 1/1;


}

.run{
   animation: productRun 3.6s linear infinite; 
}

.stop{
    animation-play-state: paused;
}

@keyframes productRun {
    0% {
        left: 100%;
        /* Начальное положение */
    }

    100% {
        left: -100%;
        /* Конечное положение (влево) */
    }
}

.product__img{  
  
    margin: 0 auto;
    width: 100%;
}

/* .box__conntent .product__img {
    height: 100% !important;
    margin: 0 auto;
    width: 100% !important;
} */

.item__product {
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
   

}

.--not-mt{
    margin-top: 0;
}

.--not-mb{
    margin-bottom: 0;
}

@media (min-width: 768px) {
.product__img{  
    cursor:grab;
  margin: 0 auto;
  width: 100% !important;
  /* height: 100% !important; */
}
.box__conntent .item__product{
cursor:grab;
}

.run-Line{
    animation: conveer 225s linear infinite;
}
}

@media (min-width: 1024px) {
    .run-Line{
    animation: conveer 265s linear infinite;
}

.evervess{
    height: 9vh !important;
}
.lays{
    height: 9vh !important;
}
.cheetos{
    height: 9vh !important;
}
.juce{
    height: 9vh !important;
}
.yogurt{
    height: 7vh !important;
}
.cream{
    height: 5vh !important;
}
.milk{
    height: 9vh !important;
}

}


@media (min-width: 1440px) {
.run-Line{
    animation: conveer 325s linear infinite;
}
}


</style>
