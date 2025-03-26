<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import Zoom from '@/components/icons/zoom.vue'
import Car from '@/components/icons/car.vue'
import Dooble from '@/components/icons/dooble.vue'
import Arrow from '@/components/icons/arrow.vue'
import { useHelperStore } from '@/stores/helper'

const helperStore = useHelperStore()


</script>

<template>
    <div class="menu">
        <div class="menu__items">
            <img class="img" src="@/components/menu/line.svg" alt="">
            <Zoom class="zoom" :active="!helperStore.section_2 && helperStore.isInstruction"></Zoom>
            <Car class="car" :active="!helperStore.section_3_1 && helperStore.isInstruction"></Car>
            <Dooble class="dooble" :active="!helperStore.section_4 && helperStore.isInstruction"></Dooble>
            <Arrow class="arrow" :active="!helperStore.section_5 && helperStore.isInstruction"></Arrow>

        </div>

    </div>
</template>

<style scoped>
.menu{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--app-width)* 20.8 / 100);
    background:white;
    border-bottom-right-radius: 40px;
    border-bottom-left-radius: 40px;
    display: flex;
    align-items:end;
    justify-content: center;
    z-index: 900;
}

.menu__items{
    display: flex;
    align-items:center;
    justify-content: center;
    position: relative;
    width: 81vw;
    /* background-image: url('@/components/menu/line.svg');
    background-repeat: no-repeat;
        background-position: 50% 50%; */
}

.zoom{
    height: calc(var(--app-width)* 15 / 100);
    position: relative;
    z-index: 2;
}
.car{
    height: calc(var(--app-width)* 15 / 100);
    margin-left: calc(var(--app-width)* 3 / 100);
        position: relative;
            z-index: 2;
}

.dooble{
    height: calc(var(--app-width)* 17.3 / 100);
    margin-left: calc(var(--app-width)* 2 / 100);
        position: relative;
            z-index: 2;
}

.arrow {
    height: calc(var(--app-width)* 16.2 / 100);
    margin-left: calc(var(--app-width)* 2 / 100);
        position: relative;
            z-index: 2;
}

.img{
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%) ;
    z-index: 1;
}

@media (min-width: 768px) {
    .img{       
    top: 50%;
    left: 50%;
    width: 80%;
    transform: translateY(-50%)  translateX(-50%);
   
}
}
</style>
