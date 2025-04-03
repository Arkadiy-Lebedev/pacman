
<script setup lang="ts">
import question from './icons/question.vue';

defineProps<{
    count: number;
    stage: 'stage1' | 'stage2' | 'stage3';
}>()

const total = 5
    </script>
    
<template>
<div v-if="stage === 'stage1'" class="wrapper-lives">
  <div v-for="live in total" :key="live" class="">
  
    <img v-if="live<=count" src="@/assets/images/live.svg" alt="" class="live-img">
    <img v-else src="@/assets/images/live-dead.svg" alt="" class="live-img">
  </div>
</div>

<div v-if="stage === 'stage2'" class="wrapper-lives">
  <div v-for="live in total" :key="live" class="">
  
    <img v-if="live<=count" src="@/assets/images/live-s2.svg" alt="" class="live-img">
    <img v-else src="@/assets/images/live-dead-s2.svg" alt="" class="live-img">
  </div>
</div>

<div v-if="stage === 'stage3'" class="wrapper-lives">
  <div v-for="live in total" :key="live" class="">
  
    <img v-if="live<=count" src="@/assets/images/live-s3.svg" alt="" class="live-img">
    <img v-else src="@/assets/images/live-dead-s3.svg" alt="" class="live-img">
  </div>
</div>


  </template>


  
  <style scoped>
  .wrapper-lives{
    display: flex;
    gap:calc(var(--app-width) * 1.8 / 100);
    align-items:center

  }

  .live-img{
    width: calc(var(--app-width) * 6.9 / 100);
  }

  </style>