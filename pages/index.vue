<script lang="ts" setup>
    if(!localStorage.getItem('auth-token')){
        if(localStorage.getItem('introduced')){
            navigateTo("/login");
        } else {
            localStorage.setItem('introduced', "true");  // maybe move to end of /introduction 
            navigateTo("/introduction");
        }
    } else {
        navigateTo("/home");
    }
</script>
