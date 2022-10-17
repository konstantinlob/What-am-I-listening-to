<template>
    <div class="bg-gray z-[1] min-w-[100px] p-1">
        <Nuxt-Link to="/logout" class="no-tap-highlight">
            <img src="~/assets/images/logout-icon.png" alt="" class="h-5 inline-block">
            <span class="">
                Logout
            </span>
        </Nuxt-Link>
    </div>
</template>

<style scoped>
    .no-tap-highlight {
        -webkit-tap-highlight-color: transparent;
    }
</style>
