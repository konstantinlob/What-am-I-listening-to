<template>
    <section class="w-full h-full flex justify-center items-center">
        <Doughnut :genres="genres" />
    </section>
</template>

<script lang="ts" setup>
    import Doughnut from "~/assets/vue/Doughnut.vue";

    const genres = [
        {
            name: "VueJs",
            count: 40,
        },
        {
            name: "EmberJs",
            count: 20,
        },
    ];
</script>
