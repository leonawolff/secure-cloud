<template>
    <v-app>
      <navbar></navbar>
        <router-view></router-view>
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