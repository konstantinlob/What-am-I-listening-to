<template>
    <section class="flex flex-col items-center">
        <TimeframeSelection class="pb-5" />
        <div class="h-[80vh] w-[400px]">
            <transition name="statistics" mode="out-in">
                <component :is="slides[currentSlide]" :key="activeTimeframe" @click="nextSlide" />
            </transition>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { Timeframe } from "~/assets/ts/enums";

    const currentSlide = useState<number>("currentSlide", () => 0);
    const activeTimeframe = useState<Timeframe>("activeTimeframe", () => Timeframe.Month);

    const slides = [
        resolveComponent("StatisticsGenreDoughnut"),
        resolveComponent("StatisticsArtistIceberg"),
    ];

    const nextSlide = () => {
        currentSlide.value++;
        if (currentSlide.value >= slides.length) {
            currentSlide.value = 0;
        }
    };
</script>

<style scoped>
.statistics-enter-from{
  @apply opacity-0 scale-100;
}
.statistics-enter-to, .statistics-leave-from{
  @apply translate-x-0 opacity-100 scale-100 scale-100;
}
.statistics-leave-to{
  @apply opacity-0;
}

.statistics-enter-active,
.statistics-leave-active{
  @apply transform transition ease-in-out duration-500;
}
</style>
