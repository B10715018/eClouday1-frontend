<template>
  
    <!-- <div :style="{ 'margin-left': sidebarWidth }"> -->
      <router-view />
    <!-- </div> -->
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
import NavBar from "@/components/Sidebar.vue";
// import { sidebarWidth } from "@/components/sidebar/state";


export default {
  name: "App",
  components: {
    "nav-bar": NavBar,
  },
  data() {
    return {
      sidebarWidth: "100px"
    }
  },
  setup() {
    return { sidebarWidth };
  },
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
</style>
