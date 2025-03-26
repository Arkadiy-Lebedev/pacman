<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import Home from '@/components/icons/home.vue'
import Question from '@/components/icons/question.vue'

const emit = defineEmits(['home', 'instruction'])

const home = () => {
  emit('home')
}
const instruction = () => {
  emit('instruction')
}

</script>

<template>
    <div class="menu">

        <div class="menu__items">
            <div @click="instruction">
                <Question class="question"></Question>
            </div>
            <div @click="home">                
            <Home class="home"></Home>
            </div>
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
    gap: calc(var(--app-width)* 7.1 / 100);
    margin-bottom: calc(var(--app-width)* 4 / 100);

}

.home{
    height: calc(var(--app-width)* 9.6 / 100);
    position: relative;
    z-index: 2;
}

.question{
    height: calc(var(--app-width)* 9.6 / 100);
    position: relative;
    z-index: 2;
}

</style>
