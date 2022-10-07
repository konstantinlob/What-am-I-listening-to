<template>
    <div>
        <div>
            <router-link to="/">Go Home</router-link>
        </div>
        <div v-if="error">
            <p>something went wrong</p>
            <p>{{ error }}</p>
        </div>
        <div v-else>
            <br>
            <p>You are logged in as {{ data?.display_name }}</p>
            <br>
            <p>{{ JSON.stringify(data) }}</p>
        </div>
    </div>
</template>

<script setup>
    const authToken = localStorage.getItem("auth-token");

    let data;
    let error;

    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    if (!response.ok) {
        error = await response.text();
    } else {
        data = await response.json();
    }
</script>
