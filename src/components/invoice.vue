<template>
  <v-row>
    <v-col cols="12">
      <v-card class="py=4 px=8 mb-2 rounded-lg d-flex">
        <v-card-title class="justify-center align-center font-weight-bold text-h4 deep-purple--text">Invoices
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-data-table v-model="selected" :single-select="singleSelect" show-select :headers="headers" :items="userInvoices">
          <template v-slot:item.status="{item}">
            <v-chip :color="getColor(item.status)" dark>
              {{item.status}}
            </v-chip>
          </template>
          <v-template v-slot:top>
            <v-switch v-model="singleSelect" label="Single select"></v-switch>
          </v-template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>


import invoiceService from "@/services/invoiceService";

export default {
  name: "invoice",
  props: ['Uid'],

  data: () => ({
    userInvoices: [],
    singleSelect: false,
    selected: [],
    title: '',
    headers: [
      { text: 'Company Name', value: 'empresa', sortable:false},
      { text: 'RUC', value: 'ruc', sortable:false},
      { text: 'Value', value: 'valor', sortable:false},
      { text: 'Date of Issue', value: 'fechaemision', sortable:false},
      { text: 'Payment Date', value: 'fechapago', sortable:false},
      { text: 'Status', value: 'status', sortable: true},
    ],
    id: ''
  }),
  methods: {
    retrieveInvoices() {
      invoiceService.getByUserid(this.id).then((response) => {

        this.userInvoices = response.data;
        console.log(response.data)
      }).catch(e => {
        console.log(e);
      })
    },
    getColor (status) {
      if (status == "Vencido") return 'red'
      else if (status == "Cobrar") return 'blue'
      else return 'green'
    },
  },

  mounted() {
    this.retrieveInvoices()
  },

  beforeMount() {
    this.id = this.Uid
  }
}
</script>

<style scoped>

</style>
