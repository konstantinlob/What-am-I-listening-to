<template>
    <section>
        <TimeframeSelection />
        <div class="flex justify-center items-center h-[80vh] w-full p-5 relative">
            <transition name="statistics" mode="out-in">
                <component :is="slides[currentSlide]" :key="activeTimeframe" />
            </transition>
            <div class="absolute flex w-full h-full">
                <button class="w-1/3 h-full active:hidden" @click="previousSlide" />
                <button class="w-2/3 h-full active:hidden" @click="nextSlide" />
            </div>
        </div>
        <MusicPlayer />
    </section>
</template>

<script lang="ts" setup>
    import { Timeframe } from "~/assets/ts/enums";

    const currentSlide = useState<number>("currentSlide", () => 0);
    const activeTimeframe = useState<Timeframe>("activeTimeframe", () => Timeframe.Month);

    const slides = [
        resolveComponent("StatisticsGenreDoughnut"),
        resolveComponent("StatisticsPurplePlaceholder"),
    ];

    const nextSlide = () => {
        currentSlide.value++;
        if (currentSlide.value >= slides.length) {
            currentSlide.value = 0;
        }
    };
    const previousSlide = () => {
        currentSlide.value--;
        if (currentSlide.value < 0) {
            currentSlide.value = slides.length - 1;
        }
    };
</script>

<style scoped>
.statistics-enter-from{
  @apply opacity-0 scale-100;
}
.statistics-enter-to, .statistics-leave-from{
  @apply translate-x-0 opacity-100 scale-100;
}
.statistics-leave-to{
  @apply opacity-0;
}

.statistics-enter-active,
.statistics-leave-active{
  @apply transform transition ease-in-out duration-500;
}
</style>
