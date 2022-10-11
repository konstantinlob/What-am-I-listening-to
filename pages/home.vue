<template>
    <section>
        <TimeframeSelection />
        <div class="flex justify-center items-center h-[80vh] w-full p-5">
            <transition name="statistics" mode="out-in">
                <component :is="slides[currentSlide]" @click="nextSlide" />
            </transition>
        </div>
        <MusicPlayer />
    </section>
</template>

<script lang="ts" setup>
    const currentSlide = useState<number>("currentSlide", () => 0);

    let slides = [
        resolveComponent("StatisticsPurplePlaceholder"),
        resolveComponent("StatisticsGreenPlaceholder"),
    ]

    const nextSlide = () => {
        currentSlide.value++;
        if (currentSlide.value >= slides.length) {
            currentSlide.value = 0;
        }
    };
</script>

<style scoped>
.statistics-enter-from{
  @apply translate-x-full opacity-0 rotate-12 scale-75;
}
.statistics-enter-to, .statistics-leave-from{
  @apply translate-x-0 opacity-100;
}
.statistics-leave-to{
  @apply -translate-x-full opacity-0 -rotate-12 scale-75;
}

.statistics-enter-active,
.statistics-leave-active{
  @apply transform transition ease-in-out duration-500;
}
</style>
