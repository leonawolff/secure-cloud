/* eslint-disable no-unused-vars */
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
                    <br/>
                    <div v-if="Array.isArray(this.groupData.userNames)">
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
                    <div>Group Files</div>
                    <br/>
                    <div v-if="this.groupFiles != null && this.groupFiles.length > 1">
                        <ul id="v-for-object">
                            <li v-for="i in this.groupFiles" :key="i">
                                <div>
                                    {{i.name}}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-if="this.groupFiles.length == 1">
                        {{this.groupFiles[0].name}}
                    </div>
                    <v-divider></v-divider>
                    <div>Upload File</div>
                    <br/>
                    <v-file-input
                    truncate-length="20"
                    className="fileUpload"
                    v-model="uploadedFile"
                    ></v-file-input>
                    <v-btn
                    color="green darken-1"
                    text
                    outline
                    @click="getInputFile(uploadedFile)"
                    >
                        Upload
                    </v-btn>
                    <br/>
                    <v-divider></v-divider>
                    <br/>
                    <template>
                        <v-row justify="center">
                            <v-dialog
                            v-model="dialog2"
                            scrollable
                            max-width="300px"
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                >
                                Choose Download File
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>Choose file to download</v-card-title>
                                <v-divider></v-divider>
                                <v-card-text style="height: 300px;">
                                <v-radio-group
                                    v-model="downloadFileName"
                                    column
                                >
                                    <ul v-for="i in this.groupFiles" :key="i">
                                        <v-radio :label="i.name" :value="i.name">
                                        </v-radio>
                                    </ul>
                                </v-radio-group>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="dialog2 = false"
                                >
                                    Close
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="downloadFile(); dialog2 = false"
                                >
                                    Save
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                            </v-dialog>
                        </v-row>
                        </template>
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
// eslint-disable-next-line no-unused-vars
import { RSA } from 'hybrid-crypto-js';
import firebase from "firebase/app";
import "firebase/storage";
var fileDownload = require('js-file-download');
import './Group.css';
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
        dialog2: false,
        groupData: [],
        uploadedFile: null,
        groupFiles: [],
        downloadFileName: "",
    }),
    mounted(){
            this.getGroupData();
            this.getGroupFiles();
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
            
        },
        getInputFile: function (uploadedFile){
            if(uploadedFile != null){
                this.uploadFile();
            }
        },
        encryptFile: function (){
           // var rsa = new RSA();

        },
        uploadFile: function (){
            var storageRef = firebase.storage().ref();
            console.log(this.uploadedFile.name);
            var fileFolderRef = storageRef.child(this.groupName + '/' + this.uploadedFile.name);
            // eslint-disable-next-line no-unused-vars
            fileFolderRef.put(this.uploadedFile).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });

        },
        getGroupFiles: function (){
            var groupFolderRef = firebase.storage().ref(this.groupName);
            groupFolderRef.listAll()
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        this.groupFiles.push(itemRef);
                        console.log(itemRef);
                    });
                }).catch((error) => {
                    console.log(error);
                });
        },
        downloadFile: function (){
            var itemRef = firebase.storage().ref(this.groupName + "/" + this.downloadFileName);

            itemRef.getDownloadURL()
            // eslint-disable-next-line no-unused-vars
            .then((url) => {

                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = () => {
                var blob = xhr.response;
                fileDownload((blob), this.downloadFileName)
                };
                xhr.open('GET', url);
                xhr.send();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
};
</script>
<style scoped>

</style>