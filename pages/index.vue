<script setup>
    if(!localStorage.getItem('auth-token')){
        navigateTo("/login");
    }else{
        navigateTo('/test');
    }
</script>
