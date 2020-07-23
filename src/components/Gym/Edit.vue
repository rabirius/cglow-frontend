<template>
  <div id="edit">
    <template v-if="Error">
      <b-container>
        <b-alert dismissible show variant="warning">
          {{ Error }}
        </b-alert>
      </b-container>
    </template>
    <template v-else>
      <b-container>
        <b-alert v-if="alertMessage" dismissible show variant="warning">
          {{ alertMessage }}
        </b-alert>
        <div class="main__editor">
          <div>
            <h3 class="title">{{ problemTitle }}</h3>
            <div class="action">
              <b-button
                @click="buttonPressed"
                :disabled="saving"
                :to="buttonLinkDirrection"
                squared
                variant="info"
                >{{ buttonTitle }}</b-button
              >
            </div>
          </div>
          <router-link
            class="router-link"
            :to="{ name: 'gym_problem_edit_statement' }"
            >Statement</router-link
          >
          <router-link
            class="router-link"
            :to="{ name: 'gym_problem_edit_test' }"
            >Tests</router-link
          >
          <router-view />
        </div>
      </b-container>
    </template>
  </div>
</template>

<script>
export default {
  mounted() {
    const store = this.$store
    const id = this.$route.params.id
    store.dispatch('gym/load', { id })
  },
  computed: {
    buttonLinkDirrection() {
      const store = this.$store
      if (store.state.gym.update.updated) {
        return { name: 'gym_problem', params: { id: this.$route.params.id } }
      }
      return ''
    },
    Error() {
      const store = this.$store
      return store.state.authalert.message
    },
    alertMessage() {
      return this.$store.state.gym.alert.Message
    },
    problemTitle() {
      const store = this.$store
      if (store.state.gym.problem) {
        return store.state.gym.problem.Title
      }
      return ''
    },
    buttonTitle() {
      const store = this.$store
      if (store.state.gym.update.updated) {
        return 'Done'
      }
      return 'Save'
    },
    saving() {
      const store = this.$store
      if (store.state.gym.update.updating) {
        return true
      }
      return false
    }
  },
  methods: {
    buttonPressed() {
      const store = this.$store
      if (store.state.gym.update.updated) {
        return
      } else {
        store.dispatch('gym/save')
      }
    }
  },
  beforeDestroy() {
    const store = this.$store
    store.dispatch('gym/clear')
  }
}
</script>

<style lang="scss" scoped>
#edit {
  .main__editor {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 0.5rem 0.5rem;
    .action {
      float: right;
    }
    .title {
      display: inline-block;
    }
  }
  .router-link {
    padding: 1rem 1rem;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    &:hover {
      border-bottom: 5px solid #72b1db;
    }
  }
  .router-link-exact-active {
    border-bottom: 5px solid #499ed6;
  }
}
</style>
