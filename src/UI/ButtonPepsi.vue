<script setup lang="ts">
defineProps<{
    text: string;
    outline?: boolean;
    disabled?: boolean;
}>()
</script>

<template>
    <div class="btn" :class="{ outline: outline, disabled:disabled }">
        <p class="btn-text">{{ text }}</p>
    </div>
</template>

<style scoped>
.btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #0056D1;
    height: calc(var(--app-width)* 9.3 / 100);
    padding-left: calc(var(--app-width)* 9.3 / 100);
    padding-right: calc(var(--app-width)* 9.3 / 100);
    cursor: pointer;
    transition: all 0.3s ease;

}

.disabled{
    background-color: #83a5d4;
}

.btn.outline{
    border: 2px solid #0056D1;
    background-color: transparent;
}

.btn-text {
    display: block;
    color: white;
    font-weight: 500;
    font-size: calc(var(--app-width)* 4.8 / 100);
            
}

.outline .btn-text{
    color: #0056D1;
    transition: all 0.3s ease;
}

@media (min-width: 768px) {
  .btn:not(.disabled):hover{
background-color: #092348;
  }

  .outline.btn:hover{
    border: 2px solid #092348;
    background-color: transparent;
    
  }

  .outline.btn:hover .btn-text{
    color: #092348;
  
  }

}
</style>