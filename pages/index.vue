<script lang="ts" setup>
    if (localStorage.getItem("auth-token") === null) {
        if (localStorage.getItem("introduced") === null) {
            localStorage.setItem("introduced", "true");
            await navigateTo("/introduction");
        } else {
            await navigateTo("/login");
        }
    } else {
        await navigateTo("/home");
    }
</script>
