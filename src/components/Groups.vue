<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
            <template v-if="user.loggedIn">
                <div class="card-header">Your Groups</div>
                <div class="card-body">
                    <div>Bees</div>
                    <br/>
                    <div class="text-center">
                        <v-btn elevation="2" v-bind="attrs" v-on="on">New Group</v-btn>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="alert alert-danger" role="alert">Please log in to access your groups</div>
            </template>
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



// function makeGroup(title, userEmail){
//     return {
//         title: title,
//         userEmail: userEmail
//     }
// }