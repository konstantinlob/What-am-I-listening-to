<script lang="ts" setup>
    interface ErrorType extends Error {
        fatal: boolean,
        statusCode: number,
        statusMessage: string,
        unhandled: boolean,
    }

    const props = defineProps<{
        error: ErrorType,
    }>();

    const is404Error = props.error.statusCode === 404;
    const allowGoBack = window.history.length > 1;

    async function goBack() {
        await clearError();
        window.history.back();
    }

    const reportLink = new URL("https://github.com/konstantinlob/What-am-I-listening-to/issues/new");
    reportLink.searchParams.append("title", "I Found a Bug");
    reportLink.searchParams.append("body", `
<!--- Provide a general summary of the issue in the Title above -->

## Expected Behavior
<!--- Tell us what should happen -->

## Current Behavior
<!--- Tell us what happens instead of the expected behavior -->

## Steps to Reproduce
<!--- Provide a link to a live example, or an unambiguous set of steps to -->
<!--- reproduce this bug. Include code to reproduce, if relevant -->
1.
2.
3.
4.

<!-- don't edit these lines. They are for us -->
${props.error.name}: ${props.error.message}
${JSON.stringify(props.error)}

${props.error.stack}
`);
</script>

<template>
    <section class="bg-spotify-black h-screen w-screen text-white relative">
        <div class="centered flex flex-col items-center">
            <img v-if="is404Error" src="~/assets/gif/404.gif" alt="">
            <img v-else src="~/assets/gif/burning-room.gif" alt="">
            <h1 v-if="is404Error">This page doesn't exist</h1>
            <h1 v-else>Oops! Somthing went wrong</h1>
            <NuxtLink to="/" class="button" @click="clearError">
                Home
            </NuxtLink>
            <button v-if="allowGoBack" class="button" @click="goBack">
                back
            </button>
        </div>
        <NuxtLink v-if="!is404Error" :to="reportLink.toString()" target="_blank" class="absolute left-[50%] translate-x-[-50%] bottom-0 underline text-[#05f]">
            Report this Error
        </NuxtLink>
    </section>
</template>

<style scoped>
    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .button {
        @apply bg-purple p-3 mt-6 min-w-[40%] rounded-md text-center;
    }
</style>
