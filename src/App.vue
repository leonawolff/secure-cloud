<template>
<v-app>
  <div>
    <navbar></navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";
export default {
  components: {
    navbar
  }
};
</script>