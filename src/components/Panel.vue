
<script setup lang="ts">
defineProps<{
    bonus1: number;
    bonus2: number;
    bonus3: number; 
}>()
    </script>
    
<template>
<div class="panel">
  <div class="item">
    <div class="">
       <img src="@/assets/images/panel/s1.svg" alt="" class="panel-img">
    </div>   
    <p class="item-text">{{bonus1}}/2</p>    
  </div>
  <div class="item">
    <div class="">
       <img src="@/assets/images/panel/s2.svg" alt="" class="panel-img">
    </div>   
    <p class="item-text">{{bonus2}}/2</p>    
  </div>
  <div class="item">
    <div class="">
       <img src="@/assets/images/panel/s3.svg" alt="" class="panel-img">
    </div>   
    <p class="item-text">{{bonus3}}/2</p>    
  </div>

</div>
  </template>

  <script setup lang="ts">
    
  </script>
  
  <style scoped>
.panel{
  position: fixed;
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