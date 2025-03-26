<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { gsap } from 'gsap'
import { useRouter } from 'vue-router'
import MenuGame from '@/components/menu-game/index.vue'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import type { IProduct } from '@/types/Product'

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

type Status = 'error' | 'warning' | 'success' | 'info' | ''  
const statusElement = ref<Status>('')

onMounted((): void => {
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
 
    if (list1.value.length == 0 && list2.value.length == 0 && list3.value.length == 0 && list4.value.length == 0) {
        current.value = 2
    }

    if (list1.value.length == 0 && list2.value.length == 0 && list3.value.length == 0 && list4.value.length == 0 &&
        list5.value.length == 0 && list6.value.length == 0 && list7.value.length == 0 
    ) {
        statusElement.value = 'success'
    }
}

const toLoby = () => {
    statusElement.value = ''
    gsap.to(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
    gsap.to(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
    setTimeout(() => {
        router.push({ name: 'loby' })
    }, 1000)

}

</script>

<template>
    <div class="main">
        <div ref="menuRef">
            <MenuGame />
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




            <div class="wrapper" v-if="current == 1">
                <div class="product">
                    <VueDraggableNext class="item" :list="list1" :group="{ name: 'product', put: list1.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list1" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size
                                
                             }">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product">
                    <VueDraggableNext class="item" :list="list2" :group="{ name: 'product', put: list2.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list2" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product">
                    <VueDraggableNext class="item" :list="list3" :group="{ name: 'product', put: list3.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list3" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product">
                    <VueDraggableNext class="item" :list="list4" :group="{ name: 'product', put: list4.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list4" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
            </div>



            <div class="wrapper2" v-if="current == 2">
                <div class=""></div>
                <div class="product">
                    <VueDraggableNext class="item" :list="list5" :group="{ name: 'product', put: list5.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list5" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product">
                    <VueDraggableNext class="item" :list="list6" :group="{ name: 'product', put: list6.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list6" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size

                            }">
                        </div>
                    </VueDraggableNext>
                </div>
                <div class="product">
                    <VueDraggableNext class="item" :list="list7" :group="{ name: 'product', put: list7.length < 1 }"
                        :sort="true" @change="log">
                        <div class="item__product" v-for="element in list7" :key="element.id">
                            <img :src="element.img" alt="" class="product__img" :style="{
                                height: element.size

                            }">
                        </div>
                    </VueDraggableNext>
                </div>

            </div>


            <div class="conveyor">
                <img :src="conveyor" alt="" class="conveyor__img">
                <img :class="{ anim: current == 1, 'anim2': current == 2 }" :src="line" alt="" class="conveyor__line">

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
                    <ButtonPepsi @click="toLoby" class="btn" text="Ура!" />
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
    font-weight: 600;
}

.section-modal__text {
    color: #0056D1;
    margin-top: calc(var(--app-height)* 3/ 100);
    margin-bottom: calc(var(--app-height)* 3/ 100);
    font-size: calc(var(--app-width)* 4.3 / 100);

}
.modal-wrapper-succes {
    position: absolute;
    width: calc(var(--app-width)* 90/ 100);
    top: 50%;
    left: 50%;
    background: #fff;

    z-index: 810;
    padding: calc(var(--app-width)* 6.3 / 100) calc(var(--app-width)* 4.7 / 100);
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
}

.btn_block {
    display: flex;
    justify-content: center;

}



.main{
    position: relative;
    height: 100%;
    width: 100%;
}


.container {
    width: calc(var(--app-width)* 90/ 100);
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
    width: 100%;  
    margin-left: -5vw;
    overflow: hidden;
}

.conveyor__img{
    width: 100%;
}

.conveyor__line{
    position: absolute;

    top: 0;
    left: -243%;
}

.anim{
    
    animation: conveer 2s ease 1s forwards;
}
.anim2 {

    animation: conveer2 2s ease  forwards;
}

@keyframes conveer {
    0% {
        transform: 0;
        /* Начальное положение */
    }

    100% {
        transform: translateX(30%);
        /* Конечное положение (влево) */
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
.wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    animation: slideLeftAnimation 2s ease 1s forwards;
   margin-left: -5vw;
    margin-top: calc(var(--app-height)* 1.5/ 100);
    transform: translateX(-100%);

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
    width: 100%;
    aspect-ratio: 1/1;


}

.product__img{  
    height: 100%;
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
</style>
