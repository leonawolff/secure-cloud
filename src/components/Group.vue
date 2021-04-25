<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <template v-if="user.loggedIn">
              <div class="card-header">Group Name</div>
              <div class="text-center">
                <v-btn v-if="user" elevation="2" to="/groups">View All Groups</v-btn>
              </div>
            </template>
            <template v-else>
              <div class="alert alert-danger" role="alert">Please log in to access your groups</div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>
<style scoped>

</style>