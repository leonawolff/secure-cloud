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
                    <ul id="v-for-object">
                        <li v-for="value in this.groupData.userEmails" :key="value.name">
                            <router-link :to="{ name: 'Group', params: { groupName: value.name }}">
                                {{value.name}}
                            </router-link >
                        </li>
                    </ul>
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
        }
   },
};
</script>
<style scoped>

</style>