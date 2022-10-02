<script setup>
    localStorage.removeItem('auth-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('auth-state')  // not required but to be sure
    localStorage.removeItem('code-verifier')  // not required but to be sure
    navigateTo('/')
</script>