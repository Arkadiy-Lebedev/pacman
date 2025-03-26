<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <div class="wrapper__check">
    <div class="input-block">
          <input
      v-model="modelValue"
      class="check"
      type="checkbox"
      id="first_solution"
      name="solution"
      checked
      required
    />
    </div>

    <label class="label-check" for="first_solution">
      Я даю согласие <br> на
      <a target="_blank" class="label-check link" href="https://fut.ru/personal-data">
        обработку персональных данных</a></label
    >
  </div>
</template>

<style scoped>

.black{
  color: var(--color-text);
}


.check {
  flex-shrink: 0;
}

.input-block{

    border: 2px solid #979797;
    border-radius: 3px;
  height: 20px;
  width:20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

input[type='checkbox'] {
  appearance: none;
  background: transparent;
  border: 1px solid #0056D1;
  height: 12px;
  width:12px;
  border-radius: 2px;
  vertical-align: text-bottom;
  position: relative;
}

input[type='checkbox'] {
  border-radius: 3px;
}

input[type='checkbox']::before {
  content: '';
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  top: 0;
  background-repeat: no-repeat;
  background-position: center center;
}

input[type='checkbox']:checked::before {
  /* transform: rotate(50deg) translateY(-20%) translateX(-10%); */
  background-image: url('../assets/images/final/check.svg');
}

input[type='checkbox']:checked {

  background: #0056D1;

}

.wrapper__check {
  display: flex;
  gap: 7px;
  justify-content: flex-start;
}

.label-check {
  cursor: pointer;
  color:#979797;
    font-size: clamp(8px, 1.35vh, 11px);
  line-height: clamp(11px, 1.5vh, 15px);
}

.link {
color:#0056D1
}


</style>
