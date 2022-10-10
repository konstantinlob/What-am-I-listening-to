<template>
    <section>
        <TimeframeSelection />
        <div class="flex justify-center items-center h-[80vh] w-full p-5">
            <transition name="statistics" mode="out-in">
                <StatisticsPurplePlaceholder v-if="currentSlide === 0" :key="activeTimeframe+'purple'" @click="nextSlide" />
                <StatisticsGenreDoughnut v-else-if="currentSlide === 1" :key="activeTimeframe+'genreDoughnut'" @click="nextSlide" />
            </transition>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { Timeframe } from "~/assets/ts/enums";

    const componentCount = 2;
    const currentSlide = useState<number>("currentSlide", () => 0);
    const activeTimeframe = useState<Timeframe>("activeTimeframe", () => Timeframe.Month);

    const nextSlide = () => {
        currentSlide.value++;
        if (currentSlide.value >= componentCount) {
            currentSlide.value = 0;
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
