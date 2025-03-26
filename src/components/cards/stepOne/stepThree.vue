<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import btnAnswer from '@/UI/BtnAnswer.vue'
import type { IStep1 } from '@/data/game3'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import { game3StepThree } from '@/data/game3'

const emit = defineEmits(['next'])

const next = () => {
    emit('next')
    statusElement.value = ''
}

type Status = 'error' | 'back' | 'success' | 'info_1' | 'info_2' | 'instruction' | '' | 'success_2'
const statusElement = ref<Status>('')
const questions = ref<IStep1[] | []>([])

const questionsComp = computed(() => {
    const newArr = questions.value.filter(el => el.isActive == true)
    return newArr
})

onMounted((): void => {   
    questions.value = JSON.parse(JSON.stringify(game3StepThree))


})

const clickBtn = (id: number) => {
    questions.value.forEach((item) => {
        if (item.id === id) {
            item.isActive = !item.isActive
        } 
    })   
}

const enter = () => {
    if (questions.value.every((el) => {
        if (el.id == 1 ) {
            if (el.isActive) {
                return true
            }
            else {
                return false
            }
        }
        if (el.id == 2) {
            if (el.isActive) {
                return true
            }
            else {
                return false
            }
        }
        if (el.id == 3) {
            if (!el.isActive) {
                return true
            }
            else {
                return false
            }
        }
        if (el.id == 4) {
            if (!el.isActive) {
                return true
            }
            else {
                return false
            }
        }
        if (el.id == 5) {
            if (!el.isActive) {
                return true
            }
            else {
                return false
            }
        }

    })) {
        statusElement.value = 'success'  
    } else {
        statusElement.value = 'error'
    }

}

const restart = () => {
    statusElement.value = ''
    questions.value = JSON.parse(JSON.stringify(game3StepThree))
}

</script>

<template>
    <div class="step">
        <img src="@/assets/images/game3/step3-1.png" class="img">
        <div class="step-block">
            <p class="step__title">Добавь подходящие ключевые слова</p>
            <p class="count" ><span :class="{error:questionsComp.length>2}">{{questionsComp.length}}</span>/2</p>
            <div class="answers">
                <btnAnswer v-for="elem in questions" :key="elem.id" @click="clickBtn(elem.id)" :text="elem.text"
                    :isActive="elem.isActive" :id="elem.id" mini></btnAnswer>
            </div>
        </div>
        <div class="btn_block ">
            <ButtonPepsi @click="enter" class="btn" text="Выбрать" outline />
        </div>
    </div>

    <Transition name="fade">
        <div v-if="statusElement != ''" class="main-overlay">
        </div>
    </Transition>
    <Transition name="fade">
        <div v-if="statusElement == 'success'" class="modal-wrapper-succes">
            <p class="section-modal__title">Отлично!</p>
            <p class="section-modal__text">Эти ключевые слова помогут покупателям легко найти напиток
                в онлайн-магазине и выбрать его среди других.
            </p>
            <div class="btn_block">
                <ButtonPepsi @click="next" class="btn" text="Далее" />
            </div>
        </div>
    </Transition>
    <Transition name="fade">
        <div v-if="statusElement == 'error'" class="modal-wrapper-succes">
            <p class="section-modal__title">Ошибка</p>
            <p class="section-modal__text">Важны только те слова, которые описывают вкус и категорию товара.
            </p>
            <div class="btn_block">
                <ButtonPepsi @click="restart" class="btn" text="Попробовать снова" />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.count{
    color: #0056D1;
    margin-top: calc(var(--app-height)* 1.6/ 100);
    margin-bottom: calc(var(--app-height)* 0/ 100);
    font-size: calc(var(--app-width)* 4 / 100);
    text-align: center;

}

.error{
    color: #D52B2B;
}

.step{    
    width: 100%;
    height: 100%;
    padding-bottom: calc(var(--app-width) * 9.8 / 100);
    overflow-y: auto;
}

.img{
    width: 100%;
}

.step-block{
    width: 100%;
    padding: calc(var(--app-width)* 4 / 100) calc(var(--app-width)* 3 / 100);   
    border-radius: 10px;
    background: #fff;
    margin-top: calc(var(--app-width)* 3.9 / 100);
    margin-bottom: calc(var(--app-width)* 1.8  / 100);
}

.step__title {
    color: #D52B2B;
    font-size: calc(var(--app-width)* 5.35 / 100);
    text-align: center;

}

.answers{
    margin-top: calc(var(--app-height)* 2.25 / 100);
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
    width:calc(var(--app-width)* 90/ 100);
    top: 50%;
    left: 50%;
    background: #fff;

    z-index: 810;
    padding: calc(var(--app-width)* 5.9 / 100) calc(var(--app-width)* 4.4 / 100);
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
}

.btn_block {
    display: flex;
    justify-content: center;
    gap: calc(var(--app-width)* 8 / 100);

}
</style>
