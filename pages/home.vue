<template>
    <section>
        <TimeframeSelection />
        <div class="flex justify-center items-center h-[80vh] w-full p-5">
            <transition name="statistics" mode="out-in">
                <StatisticsIcebergRecentlyPlayedTracks v-if="currentSlide === 0" @click="nextSlide()" />
                <StatisticsIcebergTopTracks v-else-if="currentSlide === 1" @click="nextSlide()" />
                <StatisticsIcebergTopArtists v-else-if="currentSlide === 2" @click="nextSlide()" />
            </transition>
        </div>
    </section>
</template>

<script lang="ts" setup>
    const componentCount = 3;
    const currentSlide = useState<number>("currentSlide", () => 0);

    const nextSlide = () => {
        currentSlide.value++;
        if (currentSlide.value >= componentCount) {
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
