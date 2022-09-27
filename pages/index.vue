<script lang="ts" setup>
    if(!localStorage.getItem('auth-token')){
        navigateTo("/login");
    } else {
        navigateTo("/home");
    }
</script>
