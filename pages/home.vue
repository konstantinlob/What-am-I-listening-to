<template>
    <section class="flex flex-col items-center">
        <Navbar />
        <TimeframeSelection class="pb-5" />
        <div class="h-[80vh] w-[400px] relative">
            <transition name="statistics" mode="out-in">
                <component :is="slides[currentSlide]" :key="activeTimeframe" />
            </transition>
            <div class="absolute top-0 flex w-full h-full">
                <button class="w-1/3 h-full no-tap-highlight" @click="previousSlide" />
                <button class="w-2/3 h-full no-tap-highlight" @click="nextSlide" />
            </div>
        </div>
        <MusicPlayer class="absolute left-0 bottom-0 right-0" />
    </section>
</template>

<script lang="ts" setup>
    import { Timeframe } from "~/assets/ts/enums";

    const currentSlide = useState<number>("currentSlide", () => 0);
    const activeTimeframe = useState<Timeframe>("activeTimeframe", () => Timeframe.Month);

    const slides = [
        resolveComponent("StatisticsGenreDoughnut"),
        resolveComponent("StatisticsAudioFeaturesRadarChart"),
        resolveComponent("StatisticsArtistIceberg"),
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
  @apply translate-x-0 opacity-100 scale-100 scale-100;
}
.statistics-leave-to{
  @apply opacity-0;
}

.statistics-enter-active,
.statistics-leave-active{
  @apply transform transition ease-in-out duration-500;
}

.no-tap-highlight {
  -webkit-tap-highlight-color: transparent;
}
</style>
