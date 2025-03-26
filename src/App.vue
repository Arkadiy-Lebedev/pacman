<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
}, { passive: false });
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
