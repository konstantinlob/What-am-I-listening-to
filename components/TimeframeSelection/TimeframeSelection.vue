<template>
    <div class="w-full flex justify-around font-bold pt-6 pb-2">
        <span
            class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors"
            :class="[activeTimeframe === Timeframe.Month ? 'before:w-full !text-white' : 'before:w-0']"
            @click="activeTimeframe = Timeframe.Month"
        >
            last month
        </span>
        <span
            class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors"
            :class="[activeTimeframe === Timeframe.HalfYear ? 'before:w-full !text-white' : 'before:w-0']"
            @click="activeTimeframe = Timeframe.HalfYear"
        >
            last 6 months
        </span>
        <span
            class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors"
            :class="[activeTimeframe === Timeframe.Year ? 'before:w-full !text-white' : 'before:w-0']"
            @click="activeTimeframe = Timeframe.Year"
        >
            last year
        </span>
    </div>
</template>

<script lang="ts" setup>
    import { Timeframe } from "~/assets/ts/enums";

    const activeTimeframe = useState<Timeframe>("activeTimeframe", () => Timeframe.Month);
</script>

<style scoped>
.hidden-green-underline {
    @apply before:h-1 before:rounded-md before:absolute before:-bottom-1 before:bg-spotify-green before:transition-all
}
</style>
