<template>
  <v-container>
  <v-card class="py=4 px=8 mb-4 rounded-lg d-flex">
  <v-card-title   class="justify-center align-center font-weight-bold text-h4 deep-purple--text">Invoices</v-card-title>
  </v-card>
  <v-card>
      <v-list>
        <v-list-item> a </v-list-item>
        <v-list-item> a </v-list-item>
        <v-list-item> a </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "invoice",
  data: () => ({
    userInvoices: []
  }),
  methods:{
    retrieveInvoices(){

    }
  }
}
</script>

<style scoped>

</style>
