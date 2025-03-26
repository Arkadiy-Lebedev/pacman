<script setup lang="ts">
const modelValue = defineModel()

defineProps<{
  placeholder: string
  validate: boolean
}>()
</script>

<template>
  <input
    class="input-email"
    :class="{ error: !validate }"
    type="email"
    v-model="modelValue"
    :placeholder="placeholder"
  />
</template>

<style scoped>
.input-email {
  padding: calc(var(--app-width) * 3.2 / 100);
  padding-top: calc(var(--app-width)* 2.7 / 100);
padding-bottom: calc(var(--app-width)* 2.7 / 100);
  font-weight: normal;
  color: #0056D1;
  font-size: clamp(14px, 2.6dvh, 19px);
  border-radius: 6px;
  width: 100%;
  border: 2px solid #E5E5E5
}

.input-email::placeholder {
  font-weight: normal;
  color: #E5E5E5;
  font-size: clamp(14px, 2.6dvh, 19px);
  font-weight: 300;
}

.error {
  border: 2px solid rgb(236, 62, 62);
}
</style>
