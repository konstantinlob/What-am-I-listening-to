<script lang="ts" setup>
    function goBack() {
        const params = new URLSearchParams(window.location.search);
        navigateTo(params.get("redirect-uri"));
    }
</script>

<template>
    <div class="flex flex-col items-center">
        <img src="~/assets/gif/burning-room.gif" alt="burning room">
        <h1>Oops! Somthing went wrong</h1>
        <div class="bg-purple p-3 mt-10 rounded-md" @click="goBack()">
            back
        </div>
    </div>
</template>
