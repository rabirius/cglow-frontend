<template>
  <div id="register">
    <div class="upper-part">
      <p>Join CgLow</p>
      <h2>Create your account</h2>
    </div>
    <div class="form-wrapper">
      <b-alert show variant="warning" v-if="alert.message">{{
        alert.message
      }}</b-alert>
      <b-form @submit.prevent="handleSubmit">
        <b-form-group id="input-group-1" label="Username" label-for="username">
          <b-form-input
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter Username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1" label="Email" label-for="email">
          <b-form-input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password" label-for="password">
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter Password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Confirm Password"
          label-for="cpassword"
          :description="passwordErrorMessage"
        >
          <b-form-input
            id="cpassword"
            v-model="cpassword"
            type="password"
            placeholder="Enter Password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Sign Up</b-button>
        <div class="loader" v-if="loggingIn">
          <b-spinner type="grow" label="Loading..."></b-spinner>
        </div>
        <div class="btn-wrapper">
          <b-button
            block
            variant="primary"
            href="https://github.com/login/oauth/authorize?scope=user:email&client_id=df195a09d07846326df2"
            >Signup with Github</b-button
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
      email: '',
      cpassword: '',
      password: '',
      submitted: false,
      passwordErrorMessage: ''
    }
  },
  methods: {
    handleSubmit() {
      const store = this.$store
      const { username, email, password, cpassword } = this
      if (password != cpassword) {
        this.passwordErrorMessage = 'Passwords did not match'
        return
      }
      if (username && password) {
        store.dispatch('authentication/register', { username, email, password })
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
  width: 40%;
  margin: 0 auto;
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
.upper-part {
  text-align: center;
  padding: 2rem 0;
}
</style>
