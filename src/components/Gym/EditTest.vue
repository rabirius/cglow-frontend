<template>
  <div id="edit__test">
    <b-button v-b-modal.new-test-modal squared variant="info" size="sm"
      >New</b-button
    >
    <b-modal id="new-test-modal" hide-footer title="New Test" size="xl">
      <b-form>
        <b-form-group label-cols-sm="3" label="Label" label-for="label">
          <b-form-input id="label" type="text" required></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Sample" label-for="sample">
          <b-form-checkbox-group>
            <b-form-checkbox id="sample"></b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Aditional" label-for="aditional">
          <b-form-checkbox-group>
            <b-form-checkbox id="aditional"></b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Weight" label-for="weight">
          <b-form-input
            id="weight"
            type="number"
            min="0"
            max="100"
            step="1"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Input" label-for="input">
          <b-form-textarea id="input" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Output" label-for="output">
          <b-form-textarea id="output" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>

      <b-button squared variant="info" size="sm">Create</b-button>
      <b-button squared variant="light" size="sm">Cancel</b-button>
    </b-modal>
    <div class="case__list" v-for="(data, index) in caseList" :key="index">
      <router-link to="">{{ data.Title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  computed: {
    caseList() {
      const store = this.$store
      if (store.state.gym.problem) {
        return store.state.gym.problem.Cases
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#edit__test {
  margin-top: 2rem;
}
.form-group {
  label {
    display: inline-block;
  }
  input {
    display: inline-block;
  }
}
#edit__test {
  .case__list {
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
