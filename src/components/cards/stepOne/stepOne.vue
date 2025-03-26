<script setup lang="ts">
import { ref, onMounted } from 'vue'
import btnAnswer from '@/UI/BtnAnswer.vue'
import type { IStep1 } from '@/data/game3'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import { game3StepOne } from '@/data/game3'

const props = defineProps<{
  active: boolean,
  
}>()

const emit = defineEmits(['next'])

const next = () => {
    emit('next')
}

type Status = 'error' | 'back' | 'success' | 'info_1' | 'info_2' | 'instruction' | '' | 'success_2'
const statusElement = ref<Status>('')
const questions = ref<IStep1[] | []>([])

onMounted((): void => {   
    questions.value = JSON.parse(JSON.stringify(game3StepOne))


})

const clickBtn = (id: number) => {
    questions.value.forEach((item) => {
        if (item.id === id) {
            item.isActive = true
        } else {
            item.isActive = false
        }
    })

    if (id == 2){
        statusElement.value = 'success'
    } else {
        statusElement.value = 'error'
    }
   
}

const restart = () => {
    statusElement.value = ''
    questions.value = JSON.parse(JSON.stringify(game3StepOne))
}

</script>

<template>
    <div class="step">
        <img src="@/assets/images/game3/step1-1.png" class="img">
        <div class="step-block">
            <p class="step__title">Выбери лучшее описание</p>
            <div v-if="active" class="answers">
                <btnAnswer v-for="elem in questions" :key="elem.id" @click="clickBtn(elem.id)" :text="elem.text"
                    :isActive="elem.isActive" :id="elem.id"></btnAnswer>

            </div>
        </div>
    </div>
    <Transition name="fade">
        <div v-if="statusElement != ''" class="main-overlay">
        </div>
    </Transition>
    <Transition name="fade">
        <div v-if="statusElement == 'success'" class="modal-wrapper-succes">
            <p class="section-modal__title">Правильно</p>
            <p class="section-modal__text">Отлично! Это описание подчёркивает вкус и помогает клиенту по&shy;нять,
                почему
                именно этот напиток — лучший выбор.
            </p>
            <div class="btn_block">
                <ButtonPepsi @click="next" class="btn" text="Далее" />
            </div>
        </div>
    </Transition>
    <Transition name="fade">
        <div v-if="statusElement == 'error'" class="modal-wrapper-succes">
            <p class="section-modal__title">Ошибка</p>
            <p class="section-modal__text">Описание должно быть конкрет&shy;ным и цепляющим. Подумай, что важнее всего для
                покупателя!
            </p>
            <div class="btn_block">
                <ButtonPepsi @click="restart" class="btn" text="Попробовать снова" />
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.step{    
    width: 100%;
    height: 100%;
  
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
    width: calc(var(--app-width)* 90/ 100);
    top: 50%;
    left: 50%;
    background: #fff;

    z-index: 810;
    padding: calc(var(--app-width)* 5.9 / 100)calc(var(--app-width)* 4.8 / 100);
    transform: translateY(-50%) translateX(-50%);
    border-radius: 10px;
}

.btn_block {
    display: flex;
    justify-content: center;
    gap: calc(var(--app-width)* 8 / 100);

}
</style>
