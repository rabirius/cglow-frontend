<template>
  <div id="loader">
    <div class="err" v-if="alert.message">
      <b-alert show variant="warning">{{ alert.message }} </b-alert>
      <b-link to="/login">Return to login</b-link>
    </div>

    <b-spinner type="grow" label="Loading..." v-if="loggingIn"></b-spinner>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$store.state.authentication.status.loggedIn === true) {
      this.$router.push('/')
      return
    }
    const code = this.$route.query.code
    const store = this.$store
    if (code) {
      store.dispatch('authentication/gitlogin', { code })
    }
  },
  computed: {
    alert() {
      return this.$store.state.authalert
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn === true
    }
  }
}
</script>

<style lang="scss" scoped>
#loader {
  width: 60%;
  text-align: center;
  margin: 0 auto;
  @media (max-width: 720) {
    width: 90%;
  }
}
.err {
  display: block;
}
</style>
