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
                        <v-row>
                            <v-btn @click="prompt=!prompt">New Group</v-btn>
                        </v-row>
                    <v-dialog v-model="prompt">
                        <v-card>
                            <v-card-title>AAAAAAAAAAAAAAAAAAAAA</v-card-title>
                            <v-card-text>
                                <v-text-field v-model="groupName" label="Enter group name here"></v-text-field>
                            </v-card-text>
                        </v-card>

                    </v-dialog>
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
        }),
    },
    data: () => ({
        dialog: false,
        prompt: false,
    }),
    methods: {
   },
}
</script>
