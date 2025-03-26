<script setup lang="ts">
const props = defineProps<{
  active: boolean,
  
}>()


</script>

<template>
  <svg  viewBox="0 0 70 55" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_290_19122)">
      <path :class="{ active: active || false }"
        d="M11.15 14C11.15 12.426 12.426 11.15 14 11.15H42.2637C43.8377 11.15 45.1137 12.426 45.1137 14V35.6703C45.1137 37.2443 43.8377 38.5203 42.2637 38.5203H14C12.426 38.5203 11.15 37.2443 11.15 35.6703V14Z"
        fill="white" stroke="#979797" stroke-width="2.3" />
      <path :class="{ active: active || false }"
        d="M53.2358 18.6578L54.3835 23.2486C54.6697 24.3936 53.9073 25.5362 52.7401 25.7115L47.7364 26.4628C46.5271 26.6443 45.4395 25.7078 45.4395 24.4849V19.1428C45.4395 18.0383 46.3349 17.1428 47.4395 17.1428H51.2955C52.2132 17.1428 53.0132 17.7674 53.2358 18.6578Z"
        fill="white" stroke="#979797" stroke-width="2.3" />
      <circle cx="21.9508" cy="38.434" r="5.03132" fill="white" stroke="#D52B2B" stroke-width="2.3" />
      <path :class="{ active: active || false }"
        d="M45.7652 28.4231C45.7652 26.8491 47.0412 25.5731 48.6152 25.5731H55.9998C57.5739 25.5731 58.8498 26.8491 58.8498 28.4231V35.8077C58.8498 37.3817 57.5739 38.6577 55.9998 38.6577H48.6152C47.0412 38.6577 45.7652 37.3817 45.7652 35.8077V28.4231Z"
        fill="white" stroke="#979797" stroke-width="2.3" />
      <circle :class="{ active: active || false }" cx="47.9118" cy="38.434" r="5.03132" fill="white" stroke="#979797"
        stroke-width="2.3" />
    </g>
    <path :class="{ active: active || false }"
      d="M11.15 14C11.15 12.426 12.426 11.15 14 11.15H42.2637C43.8377 11.15 45.1137 12.426 45.1137 14V35.6703C45.1137 37.2443 43.8377 38.5203 42.2637 38.5203H14C12.426 38.5203 11.15 37.2443 11.15 35.6703V14Z"
      fill="white" stroke="#979797" stroke-width="2.3" />
    <path :class="{ active: active || false }"
      d="M53.2358 18.6578L54.3835 23.2486C54.6697 24.3936 53.9073 25.5362 52.7401 25.7115L47.7364 26.4628C46.5271 26.6443 45.4395 25.7078 45.4395 24.4849V19.1428C45.4395 18.0383 46.3349 17.1428 47.4395 17.1428H51.2955C52.2132 17.1428 53.0132 17.7674 53.2358 18.6578Z"
      fill="white" stroke="#979797" stroke-width="2.3" />
    <circle :class="{ active: active || false }" cx="21.9508" cy="38.434" r="5.03132" fill="white" stroke="#979797"
      stroke-width="2.3" />
    <path :class="{ active: active || false }"
      d="M45.7652 28.4231C45.7652 26.8491 47.0412 25.5731 48.6152 25.5731H55.9998C57.5739 25.5731 58.8498 26.8491 58.8498 28.4231V35.8077C58.8498 37.3817 57.5739 38.6577 55.9998 38.6577H48.6152C47.0412 38.6577 45.7652 37.3817 45.7652 35.8077V28.4231Z"
      fill="white" stroke="#979797" stroke-width="2.3" />
    <circle :class="{ active: active || false }" cx="47.9118" cy="38.434" r="5.03132" fill="white" stroke="#979797"
      stroke-width="2.3" />
    <defs>
      <filter v-if="active || false" id="filter0_f_290_19122" x="0" y="0" width="70" height="54.6152"
        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_290_19122" />
      </filter>
    </defs>
  </svg>


</template>

<style scoped>

.active{
  stroke:#D52B2B;
}

.active_fill{
  fill:#D52B2B;
}

</style>
