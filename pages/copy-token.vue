<script setup>
    const token = localStorage.getItem('auth-token')

    function copyToken(){
        navigator.clipboard.writeText(token);

        alert("Copied the text: " + token);
    }
</script>

<template>
    <div v-if="token">
        <button @click="copyToken()">Copy Token</button>
    </div>
    <div v-else>
        <p>You are not logged in</p>
    </div>
</template>
