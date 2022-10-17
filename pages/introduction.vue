<template>
    <section class="h-full px-9 pb-8 overflow-hidden" :class="{'bg-spotify-green': step === 0}">
        <transition
            mode="out-in"
            :name="transitionName"
        >
            <div v-if="step === 0" class="pt-24 flex flex-col h-full justify-between" @click="nextStep">
                <h1 class="text-4xl leading-[2.75rem] max-w-[12ch] font-bold"><p class="animate-move-in-delay-1 opacity-0">Hi,</p><p class="animate-move-in-delay-3 opacity-0">Welcome to What am I listening to</p></h1>
            </div>
            <div v-else-if="step === 1" class="mx-2 relative text-center grid place-content-center h-full">
                <div>
                    <img src="../assets/images/step-1.png" class="rounded-lg max-h-[288px] mx-auto">
                    <h1 class="mt-9 mb-4 font-bold text-2xl">I'm always trying to find out more about myself</h1>
                    <p>What better window into your <br>emotions is there than your listening habits?</p>
                </div>
                <button class="bg-spotify-green absolute bottom-0 w-full py-4 rounded-full font-bold text-base inline-flex items-center justify-center gap-[0.875rem]" @click="nextStep">
                    <span>Continue</span>
                    <ArrowRight class="w-4 aspect-square" />
                </button>
            </div>
            <div v-else-if="step === 2" class="mx-2 relative text-center grid place-content-center h-full">
                <div>
                    <img src="../assets/images/step-2.png" class="rounded-lg max-h-[288px] mx-auto">
                    <h1 class="mt-9 mb-4 font-bold text-2xl">Why don't you give it a try? Analyse yourself.</h1>
                    <p><br><br></p>
                </div>
                <div class="absolute bottom-0 w-full flex items-center gap-4">
                    <button class="bg-gray p-3 rounded-full" @click="previousStep">
                        <ArrowRight class="rotate-180 transform w-6 aspect-square" />
                    </button>
                    <NuxtLink to="/login" class="bg-spotify-green w-full py-4 rounded-full font-bold text-base inline-flex items-center justify-center gap-[0.875rem]">
                        Explore your taste
                    </NuxtLink>
                </div>
            </div>
        </transition>
    </section>
</template>

<script setup lang="ts">
    import ArrowRight from "~/assets/svg/arrow-right.svg?component";

    const step = useState<number>(() => 0);
    const transitionName = useState<string>(() => "slide-next");

    const previousStep = () => {
        transitionName.value = "slide-previous";
        step.value--;
    };
    const nextStep = () => {
        transitionName.value = "slide-next";
        step.value++;
    };

    setTimeout(() => step.value === 0 ? nextStep() : null, 8000);

</script>

<style scoped>

.slide-next-enter-active, .slide-next-leave-active{
  @apply transform transition ease-in-out duration-300;
}
.slide-next-enter-from{
  @apply translate-x-full opacity-0;
}
.slide-next-enter-to, .slide-next-leave-from{
  @apply translate-x-0 opacity-100;
}
.slide-next-leave-to{
  @apply -translate-x-full opacity-0;
}

.slide-previous-enter-active, .slide-previous-leave-active{
  @apply transform transition ease-in-out duration-300;
}
.slide-previous-enter-from{
  @apply -translate-x-full opacity-0;
}
.slide-previous-enter-to, .slide-previous-leave-from{
  @apply translate-x-0 opacity-100;
}
.slide-previous-leave-to{
  @apply translate-x-full opacity-0;
}
</style>
