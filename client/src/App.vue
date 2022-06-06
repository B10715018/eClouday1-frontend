<template>
  <div>
    <nav-bar />
    <router-view/>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar.vue";
  // import NavBar from "@/components/layout.vue";

  export default {
    name: "App",
    components: {
      NavBar
    }
  };
</script>

<style lang="scss">
  @import "~bootstrap";
  @import "~bootstrap-vue";
  @import "./assets/scss/main.scss";


  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  @media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    // margin: 0 auto;
    max-width: 98% !important;
  }
}

.modal-dialog {
  margin: 10px auto !important;
}


.router-view {
  height: 100%;
  margin-left: 230px;
  padding: 0 12px;
  max-width: 100%;
}

.navbar-nav {
  height: 100%;
}
</style>
