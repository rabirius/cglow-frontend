<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <GymProblemView></GymProblemView>
  </div>
</template>

<script>
import GymProblemView from '@/components/GymProblemView.vue'
export default {
  name: 'Home',
  components: { GymProblemView }
}
</script>
<style lang="scss" scoped></style>
