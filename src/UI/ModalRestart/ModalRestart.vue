<script setup lang="ts">
 import ButtonAlfa from '@/UI/Button/ButtonAlfa.vue';
 import { gsap } from 'gsap'
import { ref,onMounted } from 'vue'

 const contantRef = ref<HTMLElement | null>(null)
    const wrapRef = ref<HTMLElement | null>(null)

defineProps<{
    stage: 'stage-1' | 'stage-2' | 'stage-3';
}>()

const emit = defineEmits(['close'])

const handleClick = () => {
  emit('close')
}

onMounted(() => {
if(!wrapRef.value && !contantRef.value)return
    gsap.from(wrapRef.value, { duration: 0.3, autoAlpha: 0, ease: 'power1.out' })
    gsap.from(contantRef.value, { duration: 0.3, y:-50, autoAlpha: 0, delay: 0.2, ease: 'power1.out' })
})
</script>

<template>
    <div ref="wrapRef" class="modal-wrapper" :class="[stage]">
        <div ref="contantRef" class="modal-content">
            <div v-if="stage === 'stage-1'" class="modal-block">
                <div class="img-block">
                    <img src="@/assets/images/modal-restart/1.svg" alt="" class="img">
                </div>
                    <p class="modal-title">
                        Страх догнал тебя
                    </p>
                    <p class="text">
                        Не переживай, такое со всеми бывает. В Альфе не осуждают за ошибки, а помогают исправить их. Попробуй еще раз!
                    </p>
            </div>

            <div v-if="stage === 'stage-2'" class="modal-block">
                <div class="img-block">
                    <img src="@/assets/images/modal-restart/2.svg" alt="" class="img">
                </div>
                    <p class="modal-title">
                        Страх догнал тебя
                    </p>
                    <p class="text">
                        Ничего страшного:) С поддержкой друллег у тебя точно все получится!
                    </p>
            </div>
            <div class="btn-wrapper">
                 <ButtonAlfa @click="handleClick" text="Играть еще раз"/>
            </div>

        </div>
    </div>
</template>

<style scoped>
.stage-1 .img{
width: calc(var(--app-height)*28.6 / 100)
}

.stage-2 .img{
width: calc(var(--app-height)*31.2 / 100)
}

.modal-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    z-index: 8;

}

.modal-content{
    width: 89%;
    position: absolute;
    bottom: calc(var(--app-width)* 9.9 / 100) ;

    left: 50%;
    transform: translateX(-50%);
}

.modal-block{
    background-image: url("@/assets/images/modal-bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 4.55 / 100) calc(var(--app-width)* 5.7 / 100) calc(var(--app-width)* 11.18 / 100) calc(var(--app-width)* 5.38 / 100)
}

.modal-title{
    font-weight: 600;
    font-size: calc(var(--app-width)* 4.95 / 100);
    line-height: calc(var(--app-height)* 3.2 / 100);
}

.text{
    margin-top: calc(var(--app-width)* 3.75/ 100);
  }

  .img-block{
    text-align: center;
  }

  .btn-wrapper{
    margin-top: calc(var(--app-width)* 6.4/ 100);
  }
</style>