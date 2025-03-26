<script setup lang="ts">
import { FTClient } from 'ft-client'
import ButtonPepsi from '@/UI/ButtonPepsi.vue'
import ButtonPepsiGrey from '@/UI/ButtonPepsiGrey.vue'
import CheckBoxGroup from '@/UI/CheckBoxGroup.vue'
import CheckBoxGroup2 from '@/UI/CheckBoxGroup2.vue'
import InputEmail from '@/UI/InputEmail.vue'
import Menu from '@/components/menu/index.vue'
import { useHelperStore } from '@/stores/helper'
import { gsap } from 'gsap'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const ftClients = new FTClient('https://games-admin.fut.ru/api/', 'ecomomania')

const helperStore = useHelperStore()
const router = useRouter()
const route = useRoute()
const statusElement = ref<number>(0)
const email = ref<string>('')
const check2 = ref<boolean>(false)
const check1 = ref<boolean>(false)
const validate = ref(true)

const isShowSubtextSection1 = ref<boolean>(false)
const isShowSubtextSection2 = ref<boolean>(false)
const isShowSubtextSection3 = ref<boolean>(false)
const isShowSubtextSection4 = ref<boolean>(false)
const isShowSubtextSection5 = ref<boolean>(false)

const menuRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

onMounted((): void => {
  if (menuRef.value) {
    gsap.from(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
  }
  if (containerRef.value) {
    gsap.from(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
  }
  // setTimeout(() => {
  //   if (!helperStore.isInstruction) {
  //     statusElement.value = 1
  //     helperStore.section_2 = false
  //     helperStore.section_3_1 = false
  //     helperStore.section_3_2 = false
  //     helperStore.section_4 = false
  //   }
  // }, 1500)

  if (route.query.complited == 's1') {
    if (!helperStore.isInstruction) {
      toLobyReload()
      return
    }

    setTimeout(() => {
      statusElement.value = 99
      isShowSubtextSection2.value = true
      helperStore.section_2 = false
    }, 1000)
  }

  if (route.query.complited == 's2') {
    if (!helperStore.isInstruction) {
      toLobyReload()
      return
    }
    setTimeout(() => {
      statusElement.value = 99
      isShowSubtextSection3.value = true
      helperStore.section_3_1 = false
    }, 1000)
  }

  if (route.query.complited == 's3') {
    if (!helperStore.isInstruction) {
      toLobyReload()
      return
    }
    helperStore.isNewImageS3 = true
    setTimeout(() => {
      scrollDown()
      statusElement.value = 99
      isShowSubtextSection4.value = true
      helperStore.section_4 = false
    }, 1000)
  }

  if (route.query.complited == 's4') {
    if (!helperStore.isInstruction) {
      toLobyReload()
      return
    }
    helperStore.isNewImageS4 = true
    setTimeout(() => {
      statusElement.value = 8 // финал
      helperStore.section_5 = false
      isShowSubtextSection5.value = true
    }, 1000)
  }
})

const next = (): void => {
  console.log(statusElement.value)
  statusElement.value++
  // if (statusElement.value == 4) {
  //   scrollDown()
  // }

  if (statusElement.value == 6) {
    console.log(77)
    isShowSubtextSection1.value = true
    helperStore.section_2 = true
    helperStore.section_3_1 = true
    helperStore.section_3_2 = true
    helperStore.section_4 = true
    statusElement.value = 1
    helperStore.isInstruction = true
    const element: HTMLElement | null = document.querySelector('.container')
    if (element) {
      element.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}

const toGame = (page: 'analysis' | 'warehouse' | 'cards' | 'banner'): void => {
  if (!helperStore.isInstruction) return

  if(page == 'analysis' &&  helperStore.isComplitedSection_1) {
    statusElement.value = 20
    return
  }
  if(page == 'warehouse' &&  helperStore.isComplitedSection_2) {
    statusElement.value = 20
    return
  }
  if(page == 'cards' &&  helperStore.isComplitedSection_3) {
    statusElement.value = 20
    return
  }
  if(page == 'banner' &&  helperStore.isComplitedSection_4) {
    statusElement.value = 20
    return
  }


  statusElement.value = -1
    isShowSubtextSection1.value = false
  isShowSubtextSection2.value = false
  isShowSubtextSection3.value = false
  isShowSubtextSection4.value = false
  gsap.to(menuRef.value, { duration: 1, delay: 0.1, y: -200, ease: 'power2.inOut' })
  gsap.to(containerRef.value, { duration: 1, delay: 0.1, autoAlpha: 0.0, ease: 'power2.inOut' })
  setTimeout(() => {
    router.push({ name: page })
  }, 1000)
}

const toLobyReload = (): void => {
  router.push({
    name: 'loby'
  })
}

const scrollDown = (): void => {
  const element: HTMLElement | null = document.querySelector('.container')
  if (element) {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const sendData = async () => {
  validate.value = true
  if (!check1.value ) return
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  if (!EMAIL_REGEXP.test(email.value)) {
    validate.value = false
    return
  } else {
    validate.value = true
  }

  const formData = {
    email: email.value
  }

  const newRecord = await ftClients.createRecord(formData)
  console.log(newRecord)

  statusElement.value = 10
}



const validateInput = (event: InputEvent) => {
  // Регулярное выражение для проверки на английские символы
  const englishOnlyRegex = /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  // Получаем текущее значение input
  const newValue = (event.target as HTMLInputElement).value;

  // Если значение не соответствует регулярному выражению, откатываем его
  if (!englishOnlyRegex.test(newValue)) {
    // Убираем последний введенный символ
    email.value = email.value.slice(0, -1);
  } else {
    // Если все в порядке, обновляем значение
    email.value = newValue;
  }
};
</script>

<template>
  <section class="loby">
    <div ref="menuRef" class="menu__wrapper">
      <Menu />
    </div>
    <div ref="containerRef" class="container">
      <div class="section" :class="{ visible: statusElement == 1 }">
        <p class="section__title">Анализ и планирование</p>
        <img
          @click="toGame('analysis')"
          class="section__img"
          src="@/assets/images/main/s1.svg"
          alt=""
        />
        <!-- <Transition name="fade">
          <div v-if="statusElement == 1" class="section-modal ">
            <p class="section-modal__title">Анализ и планирование</p>
            <p class="section-modal__text">
              В eCom FMCG важна каждая деталь. На этом этапе создаётся стратегия ассортимента на основе
данных о рынке и потребителях.
            </p>
            <div class="btn_block">
              <ButtonPepsi @click="next" class="btn" text="Далее" />
            </div>
          </div>
        </Transition> -->
                <Transition name="fade">
          <div v-if="isShowSubtextSection1" class="section-modal">
            <img src="@/assets/mess.svg" alt="" class="img-mess">
            <p class="section-modal__subtext">Давай начнём с первой зоны!</p>
          </div>
        </Transition>
      </div>
      <div class="section" :class="{ visible: statusElement == 2 || isShowSubtextSection2 }">
        <p class="section__title">Поставка и логистика</p>
        <div class="section__img">
          <img
            @click="toGame('warehouse')"
            class="section__img --not-va"
            src="@/assets/images/main/s2.svg"
            alt=""
          />
          <Transition name="left">
            <div v-if="helperStore.section_2" class="overlay"></div>
          </Transition>
        </div>
        <!-- <Transition name="fade">
          <div v-if="statusElement == 2" class="section-modal">
            <p class="section-modal__title">Поставка и логистика</p>
            <p class="section-modal__text">           
              Тут управляют маршрутами доставки, чтобы товары гаранти&shy;рованно оказались у клиента.
            </p>
            <div class="btn_block">
              <ButtonPepsi @click="next" class="btn" text="Далее" />
            </div>
          </div>
        </Transition> -->
        <Transition name="fade">
          <div v-if="isShowSubtextSection2" class="section-modal">
                <img src="@/assets/mess.svg" alt="" class="img-mess">
            <p class="section-modal__subtext">Кажется, на складе нужна твоя помощь. Жми скорее!</p>
          </div>
        </Transition>
      </div>

      <div class="section" :class="{ visible: statusElement == 3 || isShowSubtextSection3 }">
        <p class="section__title">Оформление онлайн-витрины</p>
        <div class="section__images">
          <div class="section__img">
            <img
              @click="toGame('cards')"
              class="section__img"
              src="@/assets/images/main/s3-1.svg"
              alt=""
            />
            <Transition name="left">
              <div v-if="helperStore.section_3_1" class="overlay"></div>
            </Transition>
          </div>
          <div class="section__img">
            <img
              v-if="helperStore.isNewImageS3"
              @click="toGame('cards')"
              class="section__img"
              src="@/assets/images/main/s3-2-new.svg"
              alt=""
            />
            <img
              v-else
              @click="toGame('cards')"
              class="section__img"
              src="@/assets/images/main/s3-2.svg"
              alt=""
            />
            <Transition name="right">
              <div v-if="helperStore.section_3_1" class="overlay"></div>
            </Transition>
          </div>
        </div>
        <!-- <Transition name="fade">
          <div v-if="statusElement == 3" class="section-modal-3">
            <p class="section-modal__title">Оформление онлайн-витрины</p>
            <p class="section-modal__text">
              Здесь создаются качественные карточки и подготавливается ассортимент для размещения на платформе.
            </p>
            <div class="btn_block">
              <ButtonPepsi @click="next" class="btn" text="Далее" />
            </div>
          </div>
        </Transition> -->
        <Transition name="fade">
          <div v-if="isShowSubtextSection3" class="section-modal-3">
              <img src="@/assets/mess.svg" alt="" class="img-mess-bottom">
            <p class="section-modal__subtext">
              Товары уже на складе. Давай скорее подготовим их к продаже!
            </p>
          </div>
        </Transition>
      </div>

      <div
        class="section section-4"
        :class="{ visible: statusElement == 4 || isShowSubtextSection4 }"
      >
        <p class="section__title">Рекламная компания и реклама</p>
        <div class="section__img">
          <img
            @click="toGame('banner')"
            v-if="helperStore.isNewImageS4"
            class="section__img"
            src="@/assets/images/main/s4-new.svg"
            alt=""
          />
          <img
            @click="toGame('banner')"
            v-else
            class="section__img"
            src="@/assets/images/main/s4.svg"
            alt=""
          />
          <Transition name="left">
            <div v-if="helperStore.section_4" class="overlay"></div>
          </Transition>
        </div>
        <!-- <Transition name="fade">
          <div v-if="statusElement == 4" class="section-modal-3">
            <p class="section-modal__title">Рекламная кампания и продажи</p>
            <p class="section-modal__text">
              Это запуск рекламных кампаний и работа над видимостью товаров, чтобы они заняли
              топовые позиции в продажах.
            </p>
            <div class="btn_block">
              <ButtonPepsi @click="next" class="btn" text="Далее" />
            </div>
          </div>
        </Transition> -->
        <Transition name="fade">
          <div v-if="isShowSubtextSection4" class="section-modal-3">
              <img src="@/assets/mess.svg" alt="" class="img-mess-bottom">
            <p class="section-modal__subtext">Осталась последняя локация — вперед к финалу!</p>
          </div>
        </Transition>
      </div>
    </div>
    <Transition name="fade">
      <div v-if=" !helperStore.isInstruction || statusElement >0" class="main-overlay"></div>
    </Transition>

    <Transition name="fade">
      <div v-if="statusElement == 5" class="modal-wrapper --padding-modal">
        <p class="section-modal__title">Инструкция</p>
        <p class="section-modal__text">Каждая зона — это этап пути продукта от анализа до продаж. Тебе нужно исследовать все 4 ключевые зоны eCom.</p>

        <p class="section-modal__text">
          Пройди все этапы, выведи газировку в топы продаж и стань настоящим экспертом eCom!
        </p>
        <div class="btn_block">
          <ButtonPepsi @click="next" class="btn" text="За дело!" />
        </div>
      </div>
    </Transition>

    <!-- <Transition name="fade">
      <div v-if="statusElement == 6" class="modal-wrapper --padding-modal">
        <p class="section-modal__text">
          Каждая зона — это этап пути продукта от анализа до продаж.
        </p>

        <p class="section-modal__text">Начнём с анализа данных.</p>
        <div class="btn_block">
          <ButtonPepsi @click="next" class="btn" text="За дело!" />
        </div>
      </div>
    </Transition> -->

    <Transition name="fade">
      <div v-if="statusElement == 8" class="modal-wrapper">
        <p class="section-modal__title">Поздравляем! 🎉</p>
        <p class="section-modal__text">Ты провёл товар через весь цикл eCom:</p>
        <div class="flex">
          <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">1.</p>
          <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">
            Успешно разместил товары с учетом их продаж
          </p>
        </div>
        <div class="flex">
          <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">2.</p>
          <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">
            Организовал гарантированные поставки
          </p>
        </div>
        <div class="flex">
          <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">3.</p>
          <p class="section-modal__text --not-mrgn-top --not-mrgn-btm">
            Подготовил товар для размещения на платформе
          </p>
        </div>
        <div class="flex">
          <p class="section-modal__text --not-mrgn-top">4.</p>
          <p class="section-modal__text --not-mrgn-top">
            Подчеркнул преимущества товара и усилил его привлека&shy;тельность для покупателей 
          </p>
        </div>
        <p class="section-modal__text">
          Благодаря тебе товар стал <br/>лидером продаж! Теперь ты понимаешь, как работает eCom в FMCG и
          готов использовать знания в реальных задачах.
        </p>
        <div class="btn_block">
          <ButtonPepsi @click="next" class="btn" text="Далее" />
        </div>
      </div>
    </Transition>
 
    <Transition name="fade">
      <div v-if="statusElement == 9" class="modal-wrapper finish">
        <p class="section-modal__title">Оставь почту, чтобы выиграть годовой запас снеков</p>
        <InputEmail v-model="email" @input="validateInput" :validate="validate" placeholder="Почта" />
        <CheckBoxGroup v-model="check1" class="check" />
        <!-- <CheckBoxGroup2 v-model="check2" class="check" /> -->
        <div class="btn_block">
          <ButtonPepsiGrey @click="statusElement = 10" class="btn" text="Пропустить" />
          <ButtonPepsi @click="sendData" class="btn" text="Далее" :disabled="!check1 " />
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="statusElement == 10" class="modal-wrapper">
        <p class="section-modal__title">Ты на верном пути! 🎉</p>
        <p class="section-modal__text">
          Стань частью команды крупной FMCG-компании — узнай больше по ссылке!
        </p>

        <div class="btn_block">
          <ButtonPepsi class="btn" text="Перейти на сайт" outline />
        </div>
      </div>
    </Transition>
            <Transition name="fade">
            <div v-if="statusElement == 0  && !helperStore.isInstruction" class="modal-wrapper">
                <p class="section-modal__title">Добро пожаловать в eСомоманию — симулятор eCom FMCG!</p>
                <p class="section-modal__text">Хочешь узнать, как твои любимые продукты попадают в онлайн-магазины? Проверь свои силы
в eCom: пройди все этапы —
от планирования до продвижения — и выведи товар в топ!
                </p>

                <p class="section-modal__text">А в конце игры у тебя будет шанс выиграть годовой запас снеков!
                </p>
                <div class="btn_block">
                    <ButtonPepsi @click="statusElement = 5" class="btn" text="Далее" />
                </div>
            </div>
        </Transition>

        <Transition name="fade">
      <div v-if="statusElement == 20" class="modal-wrapper --padding-modal">
        <p class="section-modal__title">Ты уже помог здесь</p>
        <p class="section-modal__text --center">Давай перейдём к следующему этапу!</p>
     
        <div class="btn_block">
          <ButtonPepsi @click="statusElement = 0" class="btn" text="Перейти" />
        </div>
      </div>
    </Transition>
  </section>
</template>

<style></style>

<style scoped>
.img-mess{
  position: absolute;
  right: 3%;
  top: -23%;
  width: calc(var(--app-width) * 8.1 / 100);
}

.img-mess-bottom{
    position: absolute;
  right: 3%;
  bottom: -23%;
  width: calc(var(--app-width) * 8.1 / 100);
  transform:  scaleY(-1);
  
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}

.left-enter-active,
.left-leave-active {
  transition: all 1.5s ease;
}

.left-enter-from,
.left-leave-to {
  transform: translateX(-100%) !important;
}

.right-enter-active,
.right-leave-active {
  transition: all 1.5s ease;
}

.right-enter-from,
.right-leave-to {
  transform: translateX(100%) !important;
}

.menu__wrapper {
  position: relative;
  z-index: 900;
}

.check {
  margin-top: calc(var(--app-height) * 1.5 / 100);
}

.loby {
  height: 100vh;
}

.section__img {
  position: relative;
  z-index: 1;
}

.section__images {
  display: flex;
  gap: calc(var(--app-width) * 2.1 / 100);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-image: url('@/assets/images/main/lock.svg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.container {
  width: 90%;
  height:calc(var(--app-height) * 99 / 100);;
  margin: 0 auto;
  overflow-y: auto;
  padding-top: calc(var(--app-width) * 24.8 / 100);
  padding-bottom: 10px;
}

.section {
  position: relative;
  border-radius: 10px;
  margin-bottom: calc(var(--app-height) * 3 / 100);
}

.visible {
  z-index: 810;
}

.section__title {
  margin-bottom: calc(var(--app-height) * 1.5 / 100);
  font-size: calc(var(--app-width) * 5.35 / 100);
  color: #092348;
}
.section__img {
  width: 100%;
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

.section-modal {
  position: absolute;
  bottom: calc(var(--app-width) * -4.1 / 100);
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 810;
  padding: calc(var(--app-width) * 5.9 / 100) calc(var(--app-width) * 5.9 / 100);
  transform: translateY(109%);
  border-radius: 10px;
}

.section-modal-3 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  z-index: 810;
  padding: calc(var(--app-width) * 5.9 / 100) calc(var(--app-width) * 5.9 / 100);
  transform: translateY(-122%);
  border-radius: 10px;
}

.modal-wrapper {
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  background: #fff;

  z-index: 810;
  padding: calc(var(--app-width) * 5.9 / 100) calc(var(--app-width) * 4.7 / 100);
  transform: translateY(-50%) translateX(-50%);
  border-radius: 10px;
}

.--padding-modal.modal-wrapper {
  padding: calc(var(--app-width) * 5.9 / 100)
}

.modal-wrapper .section-modal__text {
  margin-top: 0;
}
.modal-wrapper .section-modal__title {
  margin-bottom: calc(var(--app-height) * 3 / 100);
}

.section-modal__title {
  color: #d52b2b;
  font-size: calc(var(--app-width) * 5.35 / 100);
  text-align: center;
}

.section-modal__text {
  color: #0056d1;
  margin-top: calc(var(--app-height) * 3 / 100);
  margin-bottom: calc(var(--app-height) * 3 / 100);
  font-size: calc(var(--app-width) * 4.2 / 100);
}

.section-modal__subtext {
  color: #0056d1;

  font-size: calc(var(--app-width) * 4.2 / 100);
}

.btn_block {
  display: flex;
  justify-content: center;
  gap:calc(var(--app-width) * 4.2 / 100);
}

.finish .btn_block {
  margin-top: calc(var(--app-height) * 3 / 100);
}

.flex {
  display: flex;
  gap: 8px;
  gap: 6px;
    margin-left: 6px;
}
.--not-mrgn-top {
  margin-top: 0;
}

.--not-mrgn-btm {
  margin-bottom: 0;
}

.section__img.--not-va{
  vertical-align:baseline !important
}
</style>
