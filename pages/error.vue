<script setup>
    function goBack() {
        let params = new URLSearchParams(window.location.search);
        navigateTo(params.get("redirect-uri"));
    }
</script>


<template>
    <div class="flex flex-col items-center">
        <img src="~/assets/gif/burning-room.gif" alt="burning room"/>
        <h1>Oops! Somthing went wrong</h1>
        <div @click="goBack()" class="bg-purple p-3 mt-10 rounded-md">back</div>
    </div>
</template>
