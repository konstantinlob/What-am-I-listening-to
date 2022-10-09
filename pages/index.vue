<script lang="ts" setup>
    if(localStorage.getItem('auth-token') === null){
        if(localStorage.getItem('introduced') === null){
            localStorage.setItem('introduced', "true");
            navigateTo("/introduction");
        } else {
            navigateTo("/introduction"); //TODO: change to login before merge, is just for testing purposes
        }
    } else {
        navigateTo("/home");
    }
</script>
