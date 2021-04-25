<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
            <template v-if="user.loggedIn">
                <div class="card-header">{{groupName}}</div>
                <div class="card-body">
                    <div class="text-center">
                        Members:
                    </div>
                    <div v-if="Array.isArray(this.groupData.userNames)" >
                        <ul id="v-for-object">
                            <li v-for="value in this.groupData.userNames" :key="value">
                                <div>
                                    {{value}}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else >
                        <div>
                            {{this.groupData.userNames}}
                        </div>
                        <br/>
                    </div>
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
                                    Add Member
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">Add Group Member</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                                <v-text-field
                                                label="Name"
                                                required
                                                v-model="newMemberName"
                                                ></v-text-field>
                                                <v-text-field
                                                label="Email"
                                                required
                                                v-model="newMemberEmail"
                                                ></v-text-field>
                                        </v-container>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false;"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="dialog = false; saveMember(newMemberName, newMemberEmail); getGroupData()"
                                        >
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                    <v-divider></v-divider>
                    <br/>
                    <v-divider></v-divider>
                    <div class="text-center">
                        <v-btn v-if="user" elevation="2" to="/groups">View All Groups</v-btn>
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
import firebaseApp from '../firebase';
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  props: ['groupName'],
    data: () => ({
        dialog: false,
        groupData: [],
    }),
    mounted(){
            this.getGroupData();
        },
    methods: {
        getGroupData: function () {
            console.log("Loading groups");
            firebaseApp.firestore().collection("groups").where("name", "==", this.groupName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.groupData = doc.data();
                    console.log(this.groupData);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        },
        saveMember: function (newMemberName, newMemberEmail) {
            if (!Array.isArray(this.groupData.userNames) && !Array.isArray(this.groupData.userEmails)){
                var newUserNames = [this.groupData.userNames, newMemberName];
                var newEmails = [this.groupData.userEmails, newMemberEmail]
                firebaseApp.firestore().collection("groups").doc(this.groupName).update({userEmails: newEmails}, { merge: true });
                firebaseApp.firestore().collection("groups").doc(this.groupName).update({userNames: newUserNames}, { merge: true });
            }
            else{
                this.groupData.userNames.push(newMemberName);
                this.groupData.userEmails.push(newMemberEmail);
                firebaseApp.firestore().collection("groups").doc(this.groupName).update({userEmails: this.groupData.userEmails}, { merge: true });
                firebaseApp.firestore().collection("groups").doc(this.groupName).update({userNames: this.groupData.userNames}, { merge: true });
            }
            
        }
   },
};
</script>
<style scoped>

</style>