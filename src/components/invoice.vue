<template>
  <v-container>
  <v-card class="py=4 px=8 mb-4 rounded-lg d-flex">
  <v-card-title   class="justify-center align-center font-weight-bold text-h4 deep-purple--text">Invoices</v-card-title>
  </v-card>
  <v-card>
      <v-list>
        <v-list-item v-for="invoice in userInvoices" :key="invoice.id"> {{invoice.empresa}} </v-list-item>

      </v-list>
    </v-card>
  </v-container>
</template>

<script>


import invoiceService from "@/services/invoiceService";

export default {
  name: "invoice",
  props:['Uid'],

  data: () => ({
    userInvoices: [],
    id: ''
  }),
  methods:{
    retrieveInvoices(){
      invoiceService.getByUserid(this.id).then((response) =>{

        this.userInvoices = response.data;
        console.log(response.data)
      }).catch(e => {
        console.log(e);
      })
    }
  },

  mounted() {
    this.retrieveInvoices()
  },

  beforeMount() {
    this.id= this.Uid
  }
}
</script>

<style scoped>

</style>
