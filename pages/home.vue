<template>
    <section class="flex flex-col items-center">
        <Navbar />
        <TimeframeSelection class="pb-5" />
        <div class="h-[80vh] w-[400px] relative">
            <transition name="statistics" mode="out-in">
                <component :is="slides[currentSlide]" :key="activeTimeframe" />
            </transition>
            <!-- manuell/desktop controlls on the side of the page -->
            <button class="absolute top-0 left-0 w-[25px] h-full no-tap-highlight" @click="previousSlide" />
            <button class="absolute top-0 right-0 w-[25px] h-full no-tap-highlight" @click="nextSlide" />
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

    let touchstartX: number | null = null;

    function checkDirection(delta: number) {
        if (delta < -50) { previousSlide(); }
        if (delta > 50) { nextSlide(); }
    }

    function onTouchStart(e: any) {
        touchstartX = e.changedTouches[0].screenX;
    }

    function onTouchEnd(e: any) {
        if (touchstartX === null) {
            return;
        }

        const touchendX = e.changedTouches[0].screenX;
        checkDirection(touchstartX - touchendX);
        touchstartX = null;
    }

    onMounted(() => {
        document.addEventListener("touchstart", onTouchStart);
        document.addEventListener("touchend", onTouchEnd);
    });

    onBeforeUnmount(() => {
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchend", onTouchEnd);
    });
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
