<template>
  <div id="edit_statement">
    <b-container>
      <template v-if="body.loaded">
        <p>Body</p>
        <div class="editor__wrapper">
          <GymProblemView
            :content="body.data"
            :editable="body.editable"
            v-on:onDataUpdate="onBodyUpdate"
          ></GymProblemView>
        </div>
      </template>
      <template v-if="input.loaded">
        <p>Input</p>
        <div class="editor__wrapper">
          <GymProblemView
            :content="input.data"
            :editable="input.editable"
            v-on:onDataUpdate="onInputUpdate"
          ></GymProblemView>
        </div>
      </template>
      <template v-if="output.loaded">
        <p>Output</p>
        <div class="editor__wrapper">
          <GymProblemView
            :content="output.data"
            :editable="output.editable"
            v-on:onDataUpdate="onOutputUpdate"
          ></GymProblemView>
        </div>
      </template>
      <template v-if="note.loaded">
        <p>Note</p>
        <div class="editor__wrapper">
          <GymProblemView
            :content="note.data"
            :editable="note.editable"
            v-on:onDataUpdate="onNoteUpdate"
          ></GymProblemView>
        </div>
      </template>
    </b-container>
  </div>
</template>

<script>
import GymProblemView from '../GymProblemView'
export default {
  components: {
    GymProblemView
  },
  methods: {
    onBodyUpdate: function(value) {
      const store = this.$store
      store.dispatch('gym/body_change', { value })
    },
    onInputUpdate: function(value) {
      const store = this.$store
      store.dispatch('gym/input_change', { value })
    },
    onOutputUpdate: function(value) {
      const store = this.$store
      store.dispatch('gym/output_change', { value })
    },
    onNoteUpdate: function(value) {
      const store = this.$store
      store.dispatch('gym/note_change', { value })
    }
  },
  computed: {
    body() {
      const store = this.$store
      if (store.state.gym.problem) {
        return {
          data: store.state.gym.problem.Body,
          loaded: true,
          editable: store.state.gym.problem.Editable
        }
      } else {
        return { data: null, loaded: false, editable: null }
      }
    },
    input() {
      const store = this.$store
      if (store.state.gym.problem) {
        return {
          data: store.state.gym.problem.Input,
          loaded: true,
          editable: store.state.gym.problem.Editable
        }
      } else {
        return { data: null, loaded: false, editable: null }
      }
    },
    output() {
      const store = this.$store
      if (store.state.gym.problem) {
        return {
          data: store.state.gym.problem.Output,
          loaded: true,
          editable: store.state.gym.problem.Editable
        }
      } else {
        return { data: null, loaded: false, editable: null }
      }
    },
    note() {
      const store = this.$store
      if (store.state.gym.problem) {
        return {
          data: store.state.gym.problem.Note,
          loaded: true,
          editable: store.state.gym.problem.Editable
        }
      } else {
        return { data: null, loaded: false, editable: null }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#edit_statement {
  margin-top: 2rem;
  .editor__wrapper {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-bottom: 1rem;
  }
}
</style>
