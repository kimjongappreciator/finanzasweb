<template>
  <v-main>
    <NavBar @buttonStatus="changeButton"></NavBar>
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card v-if="buttontrue===true" color="#E8E8E8" class="flexcard" height="700px">
            <v-col>
              <v-row>
                <v-btn color="#3A00FF" class="pa-lg-12 mt-8 white--text" block>
                  Home
                </v-btn>
              </v-row>
              <v-row>
                <v-btn color="#3A1BA4" class="pa-lg-12 mt-4 mb-12  white--text" block>Invoices</v-btn>
              </v-row>
              <v-row>
                <v-btn icon color="#3A1BA4" class="mx-16 card-btn_icon">
                  <v-icon x-large>mdi-cog</v-icon>
                </v-btn>
                <v-btn icon color="#3A1BA4" class="mx-16 card-btn_icon2">
                  <v-icon x-large>mdi-logout</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-card>
        </v-col>
        <v-col>
            <v-card class="py=4 px=8 mb-4 rounded-lg d-flex">
              <v-card-title class="justify-center align-center card-title1">¡Hi {{ this.user.name }}, welcome back!</v-card-title>
            </v-card>
          <v-row>
            <v-card outlined elevation="2" class="ml-3 mr-4 my-6 card-outlined">
              <v-col>
                <v-row>
                  <v-card-title class="card-title1">TIR</v-card-title>
                </v-row>
                <v-row>
                  <v-col cols="8">
                  <v-icon large color="#3A1BA4" class="">mdi-office-building</v-icon>
                  <v-combobox :items="items" placeholder="Choose a bank" class="mx-3"></v-combobox>
                  </v-col>
                  <v-col>
                  <v-card-text>55%</v-card-text>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
            <v-card outlined elevation="2" class="ml-3 mr-4 my-6 card-outlined">
              <v-col>
                <v-row>
                  <v-card-title class="card-title1">TCA</v-card-title>
                </v-row>
                <v-row>
                  <v-icon x-large color="#3A1BA4" class="ml-3">mdi-office-building</v-icon>
                  <v-combobox :items="items" placeholder="Choose a bank" class="mx-5"></v-combobox>
                  <v-card-text>55%</v-card-text>
                </v-row>
              </v-col>
            </v-card>
            <v-card outlined elevation="2" class="ml-3 mr-4 my-4 card-outlined">
              <v-col>
              <v-row>
                <v-card-title class="card-title1">VAN</v-card-title>
              </v-row>
              <v-row>
                <v-icon x-large color="#3A1BA4">mdi-office-building</v-icon>
                <v-combobox :items="items" placeholder="Choose a bank"></v-combobox>
                <v-card-text>55%</v-card-text>
              </v-row>
              </v-col>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import NavBar from "../views/NavBar";
import userServices from "@/services/userServices";

export default {
  name: "homepage",
  components: {NavBar},
  data: () => ({
    items: ['BCP', 'Interbank', 'BBVA'],
    buttontrue: true,
    id: '',
    user: []
  }),
  methods:{

    retrieveUser() {
      userServices.getById(this.id).then((response) =>{
        console.log("aqui")
        console.log(this.id)
        this.user = response.data;

      }).catch(e => {
        console.log(e);
      })
    },
    changeButton(){
      this.buttontrue = !this.buttontrue
    }

  },

  beforeMount() {
    //console.log("XD")
    this.id = this.$route.params.id
    //console.log(this.id)
  },
  mounted() {
    this.retrieveUser()
  }
}
</script>

<style>
.card-btn_icon{
  position: absolute;
  left:0;
  bottom:0;
}
.card-btn_icon2{
  position: absolute;
  right:0;
  bottom:0;
}
.card-outlined{
  border-style: solid;
  border-color: #3A1BA4;
  border-width: thick;
}
.card-title1{
  color: #3A1BA4;
}

.flexcard{
  display: flex;
  flex-direction: column;
}
</style>
