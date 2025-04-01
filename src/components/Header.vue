
<script setup lang="ts">
import question from './icons/question.vue';
    </script>
    
<template>
<div class="header">
  <div class="">
    <img src="@/assets/images/logo.svg" alt="" class="logo">
  </div>
  <div class="">
<question/>
  </div>
</div>
  </template>

  <script setup lang="ts">
    
  </script>
  
  <style scoped>
.header{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: calc(var(--app-width) * 2.2 / 100) calc(var(--app-width) * 6.7 / 100);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo{
width:  calc(var(--app-width) * 33.4 / 100);
}
  </style>