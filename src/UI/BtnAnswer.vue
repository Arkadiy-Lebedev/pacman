<script setup lang="ts">
defineProps<{
    id: number;
    text: string;
    isActive: boolean;
    mini?: boolean;
}>()
</script>

<template>
    <div class="btn-answer pointer" :class="{ active: isActive, mini: mini }">
        <p class="btn-number">
            {{ id }}.
        </p>
        <p class="">
            {{ text }}
        </p>
    </div>

</template>

<style>

.btn-answer.active {
    background: #E5E5E5;
    transition: all 0.3s ease;
}



.btn-answer {
    display: flex;
    gap: 7px;
    text-align: left;  
    padding: calc(var(--app-height) * 2 / 100) calc(var(--app-width)* 2.9 / 100);
    margin-bottom: calc(var(--app-height) * 0.9 / 100);
    border-radius: 10px;
    border: 2px solid #E5E5E5;
    cursor: pointer;
    font-weight: 500;
    color: #0056D1;
}

.mini{
    padding: calc(var(--app-height) * 1.35 / 100) calc(var(--app-width)* 2.9 / 100);
        ;
}



</style>
