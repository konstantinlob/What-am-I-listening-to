<template>
    <div class="w-full flex justify-between font-bold px-5 py-2">
        <span 
            class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors" 
            :class="[activeTimeframe === Timeframe.Month ? 'before:w-full !text-white' : 'before:w-0']"
            @click="setActiveTimeframe(Timeframe.Month)" 
        >
            last month
        </span>
        <span class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors" 
            :class="[activeTimeframe === Timeframe.Year ? 'before:w-full !text-white' : 'before:w-0']"
            @click="setActiveTimeframe(Timeframe.Year)" 
        >
            last year
        </span>
        <span class="cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors" 
            :class="[activeTimeframe === Timeframe.AllTime ? 'before:w-full !text-white' : 'before:w-0']"
            @click="setActiveTimeframe(Timeframe.AllTime)" 
        >
            all time
        </span>
    </div>
</template>

<script lang="ts" scoped>
    enum Timeframe {
        Month,
        Year,
        AllTime,
    }

    let activeTimeframe = ref(Timeframe.Year);
    const setActiveTimeframe = (activeTimeframeInput: Timeframe) => {
        console.log(activeTimeframe);
        activeTimeframe.value = activeTimeframeInput;
    }

    export default {
        expose: ["activeTimeframe", "Timeframe"],
        data() {
            return {
                Timeframe,
                activeTimeframe,  
            }
        },
        methods: {
            setActiveTimeframe,
        },
    }
</script>

<style scoped>
/*hover:before:w-full*/

.hidden-green-underline {
    @apply before:h-1 before:rounded-md before:absolute before:-bottom-1 before:bg-spotify-green before:transition-all
}
</style>
