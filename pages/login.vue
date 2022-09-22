<template>
    <div class="pageContainer">
        <div class="pageBody">
            <div>
                <h1 class="flex justify-center text-xl font-bold">What Am I Listening To?</h1>
                <h2 class="flex justify-center">Analyze your listening habits</h2>
            </div>
            <div class="flex flex-col items-center">
                <button class="bg-spotify-green px-8 py-4 h-min rounded-lg flex flex-row items-center font-bold">
                    <img src="~/assets/svg/Spotify_Logo_White.svg" alt="Spotify Logo" class="h-10"/>
                    <span class="pl-2 text-[25px]">login</span>
                </button>
                <span class="flex items-center">Secured by OAuth2.0</span>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <button class="bg-purple px-4 py-2 h-min rounded-lg flex flex-row items-center font-bold">
                <img src="~/assets/svg/Github_Logo_Black.svg" alt="GitHub Logo" class="h-8"/>
                <span class="pl-2 text-[20px]">GitHub repo</span>
            </button>
            <span class="text-center w-full">Developled by <br/> Benjamin Tallarek, Julius Jänchen, Konstantin Lobmayr, Pascal Heyn, Robin Walter</span>
        </div>
    </div>
</template>

<style scoped>
.pageContainer {
    @apply flex flex-col items-center justify-between h-full
}

.pageBody {
    @apply flex flex-col items-center justify-evenly grow
}
</style>
