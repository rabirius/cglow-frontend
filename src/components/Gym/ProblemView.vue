<template>
  <div class="problem__view">
    <b-container>
      <template v-if="loading">
        <vcl-list></vcl-list>
      </template>
      <template v-else>
        <template v-if="error.Message">
          <b-alert dismissible show variant="warning">
            {{ error.Message }}
          </b-alert>
        </template>
        <template v-else>
          <b-row class="justify-content-md-center">
            <b-col md="12">
              <div class="problem__body">
                <div class="title">
                  <h3>{{ problem.Title }}</h3>
                </div>
                <div class="action">
                  <b-button
                    :disabled="!editable"
                    :to="{
                      name: 'gym_problem_edit_statement',
                      params: { id: this.$route.params.id }
                    }"
                    squared
                    variant="info"
                    >Edit</b-button
                  >
                </div>
                <div class="problem__info">
                  Limits {{ problem.TimeLimit }}ms, {{ problem.MemoryLimit }}MB
                </div>
                <div class="problem__description" v-html="problem.Body"></div>
                <div class="title">
                  <h4>Input</h4>
                </div>
                <div class="input__description" v-html="problem.Input"></div>
                <div class="title">
                  <h4>Output</h4>
                </div>
                <div class="output__description" v-html="problem.Output"></div>
                <div class="title">
                  <h5>Notes</h5>
                </div>
                <div class="notes__description" v-html="problem.Note"></div>
              </div>
            </b-col>
          </b-row>
        </template>
      </template>
    </b-container>
  </div>
</template>

<script>
import { VclList } from 'vue-content-loading'
import { gymService } from '../../_services/index'
export default {
  components: { VclList },
  data() {
    return {
      problem: null,
      loading: true,
      error: {
        Message: ''
      }
    }
  },
  mounted() {
    gymService.details(this.$route.params.id).then(
      data => {
        this.problem = data
        this.loading = false
      },
      error => {
        this.loading = false
        this.error.Message = error
      }
    )
  },
  computed: {
    editable() {
      return this.problem && this.problem.Editable ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
.problem__view {
  font-family: Ubuntu, Helvetica, sans-serif;
}
.problem__body {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 1rem 1rem;
  margin: 1rem 0;
  background-color: white;
  .title {
    padding: 0.5rem 0;
    display: inline-block;
  }
  .action {
    float: right;
  }
  .problem__info {
    font-style: italic;
  }
  .problem__description {
    padding: 1rem 0;
  }
}
</style>
