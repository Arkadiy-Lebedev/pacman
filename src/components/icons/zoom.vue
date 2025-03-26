<script setup lang="ts">
const props = defineProps<{
  active: boolean,
  
}>()


</script>

<template>
  <svg  viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_290_20406)">
      <circle :class="{ active: active || false}" cx="26.6667" cy="26.6669" r="15.4167" fill="white" stroke="#979797"
        stroke-width="2.5" />
      <path :class="{ active_fill: active || false }"
        d="M43.1161 44.8841C43.6043 45.3723 44.3957 45.3723 44.8839 44.8841C45.372 44.396 45.372 43.6045 44.8839 43.1164L43.1161 44.8841ZM37.1161 38.8841L43.1161 44.8841L44.8839 43.1164L38.8839 37.1164L37.1161 38.8841Z"
        fill="#979797" />
    </g>
    <circle :class="{ active: active || false }" cx="26.6667" cy="26.6669" r="15.4167" fill="white" stroke="#979797"
      stroke-width="2.5" />
    <path :class="{ active_fill: active || false }"
      d="M43.1161 44.8841C43.6043 45.3723 44.3957 45.3723 44.8839 44.8841C45.372 44.396 45.372 43.6045 44.8839 43.1164L43.1161 44.8841ZM37.1161 38.8841L43.1161 44.8841L44.8839 43.1164L38.8839 37.1164L37.1161 38.8841Z"
      fill="#979797" />
    <defs>
      <filter v-if="active || false" id="filter0_f_290_20406" x="0" y="0.000244141" width="55.25" height="55.25"
        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_290_20406" />
      </filter>
    </defs>
  </svg>

</template>

<style scoped>

.active{
  stroke:#0056D1;
}

.active_fill{
  fill:#0056D1;
}

</style>
