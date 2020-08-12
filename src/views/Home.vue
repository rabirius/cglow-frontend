<template>
  <div class="home">
    <div class="info">
      <h2>CgLow Online Judge</h2>
      <h4>
        Developed and maintined by
        <span
          ><a href="https://github.com/TariqueNasrullah"
            >TariqueNasrullah</a
          ></span
        >
      </h4>
    </div>
    <div class="construction">
      <h5>
        This site is under construction. You may set a problem
        <a href="/gym/list">Here</a>
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {}
}
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  position: relative;
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 400px;
    text-align: center;
  }
  .construction {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
}
</style>
