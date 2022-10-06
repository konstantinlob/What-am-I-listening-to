<script lang="ts" setup>
    if(localStorage.getItem('auth-token') === null){
        if(localStorage.getItem('introduced') !== null){
            navigateTo("/login");
        } else {
            // 'true' is just for the human. it doesn't matter what is saved
            localStorage.setItem('introduced', "true");  // maybe move to end of /introduction 
            navigateTo("/introduction");
        }
    } else {
        navigateTo("/home");
    }
</script>
