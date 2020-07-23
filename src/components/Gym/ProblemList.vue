<template>
  <div id="problem_list">
    <b-container>
      <template v-if="loading">
        <b-row class="justify-content-md-center">
          <b-col md="8">
            <vcl-list></vcl-list>
          </b-col>
        </b-row>
      </template>
      <template v-else>
        <template v-if="error.Message">
          <b-alert dismissible show variant="warning">
            {{ error.Message }}
          </b-alert>
        </template>
        <template v-else>
          <b-row class="justify-content-md-center">
            <b-col md="8">
              <div class="problem__list">
                <div>
                  <div class="title">Problems</div>
                  <div class="action">
                    <b-button v-b-modal.create-modal squared variant="info"
                      >New</b-button
                    >
                  </div>
                </div>
                <b-modal id="create-modal" hide-footer>
                  <template v-slot:modal-title>
                    Create new problem
                  </template>
                  <b-form @submit="onFormSubmit">
                    <b-form-group>
                      <b-form-input
                        id="input-1"
                        type="text"
                        required
                        placeholder="Title"
                        v-model="title"
                      ></b-form-input>
                    </b-form-group>
                    <b-button
                      squared
                      type="submit"
                      variant="info"
                      :disabled="btnDisabled"
                      >Create</b-button
                    >
                  </b-form>
                  <!-- <b-button @click="$bvModal.hide('create-modal')"
                    >Close Me</b-button
                  > -->
                </b-modal>
                <div
                  class="problem"
                  v-for="(problem, problemIdx) in problemList.Problems"
                  :key="problemIdx"
                >
                  <b-link
                    :to="{ name: 'gym_problem', params: { id: problem.ID } }"
                    >{{ problem.Title }}</b-link
                  >
                </div>
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
      problemList: null,
      loading: true,
      error: {
        Message: ''
      },
      title: '',
      btnDisabled: false
    }
  },
  mounted() {
    gymService.list().then(
      data => {
        this.problemList = data
        this.loading = false
      },
      error => {
        this.error.Message = error
        this.loading = false
      }
    )
  },
  methods: {
    onFormSubmit(evt) {
      this.btnDisabled = true
      evt.preventDefault()

      gymService.createNew(this.title).then(
        data => {
          this.problemList.Problems.push(data)
        },
        error => {
          this.error.Message = error
        }
      )
      this.$bvModal.hide('create-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
#problem_list {
  padding: 1rem 0;
}
.problem__list {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  padding: 1rem;
  background-color: white;
  .title {
    font-size: 1.2em;
    font-weight: 500;
    display: inline-block;
  }
  .action {
    display: inline-block;
    float: right;
  }
  .problem {
    margin: 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    a {
      font-size: 1.1em;
      font-weight: 500;
      text-decoration: none;
      color: #3598dc;
    }
  }
}
</style>
