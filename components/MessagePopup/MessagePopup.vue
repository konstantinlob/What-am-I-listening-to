<template>
    <Teleport to="body">
        <!-- modal-background -->
        <div class="absolute inset-0 z-10 bg-[#0008] backdrop-blur-[1px]" @click="onClose" />
        <!-- modal -->
        <div class="absolute z-10 inset-6">
            <div class="relative w-full h-full bg-gray rounded-md">
                <button class="close-button" @click="onClose">
                    X
                </button>
                <div class="p-3 w-full h-full overflow-y-auto">
                    <slot />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
    const emits = defineEmits(["close"]);

    function onClose() {
        emits("close");
    }
</script>

<style scoped>
    .close-button {
        @apply absolute w-7 h-7 rounded-full top-0 right-0 z-20 bg-gray border-spotify-black border-[2px];
        transform: translate(50%, -50%);
    }
</style>
