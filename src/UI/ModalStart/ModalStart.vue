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
    <div ref="wrapRef" class="modal-wrapper" :class="[stage]" >
        <div ref="contantRef" class="modal-content">
            <div v-if="stage === 'stage-1'" class="modal-block">
                <div class="img-block">
                    <img src="@/assets/images/modal-start/1.png" alt="" class="img">
                </div>
                    <p class="modal-title">
                        «У меня нет опыта работы»
                    </p>
                    <p class="text">
                        В этом лабиринте за тобой побежит такой страх. Без опыта никуда не берут? Покажи ему, что <span class="--bold">главное — это желание, мотивация и скорость!</span>
                    </p>
            </div>
            <div v-if="stage === 'stage-2'" class="modal-block">
                <div class="img-block">
                    <img src="@/assets/images/modal-start/2.png" alt="" class="img">
                </div>
                    <p class="modal-title">
                        «Буду много тупить»
                    </p>
                    <p class="text">
                        Страх шепчет это прямо на ушко. Побежали от него подальше — с поддержкой ошибаться нестрашно. Даже полезно, чтобы научиться новому.
                    </p>
            </div>
            <div v-if="stage === 'stage-3'" class="modal-block">
                <div class="img-block">
                    <img src="@/assets/images/modal-start/3.png" alt="" class="img">
                </div>
                    <p class="modal-title">
                        «Не успею учиться и работать»
                    </p>
                    <p class="text">
                        Страх, который за тобой погонится, ничего не знает про тайм-менеджмент. С ним не о чем разговаривать, убегай!
                    </p>
            </div>
            <div class="btn-wrapper">
                 <ButtonAlfa @click="handleClick" text="ПОБЕЖАЛИ"/>
            </div>

        </div>
    </div>
</template>

<style scoped>

.stage-1 .img{
    width: calc(var(--app-width)*59.8 / 100);
}

.stage-2 .img{
    width: calc(var(--app-width)*55.8 / 100);
}

.stage-3 .img{
    width: calc(var(--app-width)*52.1 / 100);
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
    width: 87%;
    position: absolute;
    bottom: calc(var(--app-width)* 9.9 / 100) ;

    left: 50%;
    transform: translateX(-50%);
}

.modal-block{
    background-image: url("@/assets/images/modal-bg.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: calc(var(--app-width)* 4.55 / 100) calc(var(--app-width)* 3.58 / 100) calc(var(--app-width)* 11.18 / 100) calc(var(--app-width)* 5.38 / 100)
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