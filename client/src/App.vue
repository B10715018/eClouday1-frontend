<template>
  
    <div>
      <router-view  />

      <!-- <div v-else>
        <b-modal
          class="loadingModal"
          id="modal-1"
          ref="sending-modal"
          no-close-on-backdrop="true"
          hide-footer="true"
          hide-header-close="true"
          v-model="loadingmodalShow"
          centered
        >
        <div>
          <b-spinner class="text-center" label="Loading..."></b-spinner>
        </div>
        </b-modal>
      </div> -->
      
    </div>
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
import NavBar from "@/components/Sidebar.vue";
// import { sidebarWidth } from "@/components/sidebar/state";
import { isLoggedIn, login } from "@/utils/auth-service";

export default {
  name: "App",
  components: {
    "nav-bar": NavBar,
  },
  data() {
    return {
      sidebarWidth: "100px",
      loadingmodalShow: true
    }
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn();
    }
  },
  setup() {
    // return { sidebarWidth };
  },
  mounted () {
    if ( !isLoggedIn() ) { 
      console.log("not")
      login(); 
    } else { 
      this.loadingmodalShow = false
      console.log("isLoggedIn()",isLoggedIn())
    }
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

.loadingModal {
    border: 0;
    background: "#fff0";
    .modal-header {
      border: 0;
    }
  }
</style>
