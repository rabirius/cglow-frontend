<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view />
  </div>
</template>
<script>
import NavBar from '@/components/Navbar'
export default {
  components: { NavBar },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.$store.dispatch('authalert/clear')
    }
  }
}
</script>
<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  *:focus {
    outline: none;
  }
}
</style>
