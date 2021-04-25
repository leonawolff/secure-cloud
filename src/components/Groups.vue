<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
            <template v-if="user.loggedIn">
                <div class="card-header">Your Groups</div>
                <div class="card-body">
                    <div>wee</div>
                    <br/>
                    <template>
                        <v-row>
                            <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="600px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="dialog = true"
                                    >
                                    New Group
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">New Group</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                                <v-text-field
                                                label="Group Name"
                                                required
                                                v-model="groupName"
                                                ></v-text-field>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false; saveGroup(groupName)"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </template>
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
import firebaseApp from '../firebase';
export default {
    computed: {
        // map `this.user` to `this.$store.getters.user`
        ...mapGetters({
        user: "user"
        }),
    },
    data: () => ({
        dialog: false,
    }),
    methods: {
        saveGroup: function (groupName) {
            firebaseApp.firestore().collection("groups").doc(groupName).set({
                name: groupName,
                userEmails: this.user.data.email,
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        },
        getGroups: function () {
            var allGroups = firebaseApp.firestore().collection("groups");
            var groups = allGroups.where("userEmails" == this.user.data.email);
            console.log(groups);
        }
   },
}
</script>
