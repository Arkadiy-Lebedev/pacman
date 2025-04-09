
<script setup lang="ts">
import { ref } from 'vue';
import s1 from '@/assets/images/panel/s1.png';
import s2 from '@/assets/images/panel/s2.png';
import s3 from '@/assets/images/panel/s3.png';
import s21 from '@/assets/images/panel/s2-1.png';
import s22 from '@/assets/images/panel/s2-2.png';
import s23 from '@/assets/images/panel/s2-3.png';
import s31 from '@/assets/images/panel/s3-1.png';
import s32 from '@/assets/images/panel/s3-2.png';
import s33 from '@/assets/images/panel/s3-3.png';

const images = {
  stage1:{
    i1:s1,
     i2: s2,
     i3: s3,
  } ,
  stage2:{
    i1:s21,
     i2: s22,
     i3: s23,
  },
  stage3:{
    i1:s31,
     i2: s32,
     i3: s33,
  }

}

defineProps<{
    bonus1: number;
    bonus2: number;
    bonus3: number; 
    stage: 'stage1' | 'stage2' | 'stage3';
}>()
    </script>
    
<template>
<div class="panel">
  <div class="item">
    <div class="">
       <img :src="images[stage].i1" alt="" class="panel-img">
    </div>   
    <p class="item-text">{{bonus1}}/2</p>    
  </div>
  <div class="item">
    <div class="">
       <img :src="images[stage].i2" alt="" class="panel-img">
    </div>   
    <p class="item-text">{{bonus2}}/2</p>    
  </div>
  <div class="item">
    <div class="">
       <img :src="images[stage].i3" alt="" class="panel-img">
    </div>   
    <p class="item-text">{{bonus3}}/2</p>    
  </div>

</div>
  </template>

  <script setup lang="ts">

  </script>
  
  <style scoped>
.panel{
  position: absolute;
  bottom: calc(var(--app-width) * 9.9 / 100);
  left: 50%;
  transform: translateX(-50%);
  background-image: url('@/assets/images/panel/bg.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 87%;
  padding: calc(var(--app-width)* 4.2 / 100) calc(var(--app-width)* 6.7 / 100);
    padding-bottom: calc(var(--app-width)* 2 / 100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
}

.panel-img{
width:  calc(var(--app-width) * 11 / 100);
}

.item{
  display: flex;
  align-items: center;
  gap:  calc(var(--app-width) * 1.6 / 100);
}
  </style>