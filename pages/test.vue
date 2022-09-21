<template>
    <div>
        <div>
            <router-link to="/">Go Home</router-link>
        </div>
        <p>You are logged in as {{ data.display_name }}</p>
        <br/>
        <p>{{ JSON.stringify(data) }}</p>
    </div>
</template>

<script setup>
    const auth_token = localStorage.getItem('auth-token')

    var data

    if(!auth_token){
        navigateTo('/login')
    }else{
        const api = useLazyAsyncData(async () => {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': `Bearer ${auth_token}`
                }
            })
            return await response.json()
        })
        data = api.data
    }
</script>