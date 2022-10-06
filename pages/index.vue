<script lang="ts" setup>
    if(localStorage.getItem('auth-token') === null){
        if(localStorage.getItem('introduced') !== null){
            navigateTo("/login");
        } else {
            localStorage.setItem('introduced', "true");
            navigateTo("/introduction");
        }
    } else {
        navigateTo("/home");
    }
</script>
