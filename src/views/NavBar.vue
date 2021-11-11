<template>
  <v-toolbar max-height="64px" color="#3A1BA4">
    <v-toolbar-items class="container pa-0">
      <v-col cols="4" class="col-sm-3 col-md-3 d-flex flex-row align-center pa-0">
        <div class="d-flex justify-center align-center my-auto ml-3 rounded-pill white dense--btn">
          <v-btn v-on:click="openBar " height="40px" class="rounded-l-pill white" icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-app-bar-nav-icon
                  class="rounded-r-pill dense--btn"
                  v-bind="attrs"
                  v-on="on"
              ></v-app-bar-nav-icon>
            </template>
            <v-list class="rounded-xl">
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "NavBar",

  methods: {
    reloadPage(){
      location.reload();
    },
    openBar(){

      this.$emit('buttonStatus')
    }
  }
}
</script>

<style scoped>

</style>
