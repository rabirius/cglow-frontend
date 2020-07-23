<template>
  <div id="login">
    <div class="form-wrapper">
      <b-alert show variant="warning" v-if="alert.message">{{
        alert.message
      }}</b-alert>
      <b-form @submit.prevent="handleSubmit">
        <b-form-group
          id="input-group-1"
          label="Username"
          label-for="username"
          description="Type your username"
        >
          <b-form-input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter Username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Password"
          label-for="password"
          description="Type your password here"
        >
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter Password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <div class="loader" v-if="loggingIn">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div class="btn-wrapper">
          <b-button
            block
            variant="primary"
            href="https://github.com/login/oauth/authorize?scope=user:email&client_id=df195a09d07846326df2"
            >Login With Github</b-button
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      username: '',
      password: '',
      submitted: false
    }
  },
  methods: {
    handleSubmit() {
      const store = this.$store
      const { username, password } = this
      if (username && password) {
        store.dispatch('authentication/login', { username, password })
      }
    }
  },
  computed: {
    alert() {
      return this.$store.state.authalert
    },
    logStatus() {
      return this.$store.state.authentication.status.loggedIn
    },
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn === true
    }
  },
  mounted() {
    if (this.$store.state.authentication.status.loggedIn === true) {
      this.$router.push('/')
      return
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 60%;
  margin: 0 auto;
  padding-top: 4rem;
  @media (max-width: 720px) {
    width: 90%;
  }
}
.loader {
  padding: 0 1rem;
  display: inline;
}
.btn-wrapper {
  padding: 2rem 1rem;
}
</style>
