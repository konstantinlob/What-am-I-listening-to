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
            :class="[activeTimeframe === Timeframe.Year ? 'before:w-full !text-white' : 'before:w-0']"
            @click="activeTimeframe = Timeframe.Year"
        >
            last year
        </span>
        <span
            class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors"
            :class="[activeTimeframe === Timeframe.AllTime ? 'before:w-full !text-white' : 'before:w-0']"
            @click="activeTimeframe = Timeframe.AllTime"
        >
            all time
        </span>
    </div>
</template>

<script lang="ts" setup>
    enum Timeframe {
        Month,
        Year,
        AllTime,
    }
    const activeTimeframe = useState<Timeframe>("activeTimeframe", () => Timeframe.Year);
</script>

<style scoped>
.hidden-green-underline {
    @apply before:h-1 before:rounded-md before:absolute before:-bottom-1 before:bg-spotify-green before:transition-all
}
</style>
