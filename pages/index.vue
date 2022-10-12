<script lang="ts" setup>
    if (localStorage.getItem("auth-token") === null) {
        if (localStorage.getItem("introduced") === null) {
            localStorage.setItem("introduced", "true");
            navigateTo("/introduction");
        } else {
            navigateTo("/login");
        }
    } else {
        navigateTo("/home");
    }
</script>
