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
        <v-data-table v-model="selected" :single-select="singleSelect" show-select :headers="headers" :items="userInvoices" @input="showSelected">
          <template v-slot:item.status="{item}">
            <v-chip :color="getColor(item.status)" dark>
              {{item.status}}
            </v-chip>
          </template>
          <v-template v-slot:top>
            <v-switch v-model="singleSelect" label="Single select"></v-switch>
          </v-template>
        </v-data-table>
        <v-row align="center" justify-xl="center">
          <v-col>
            <v-btn  @click="overlayCollect = !overlayCollect">Cobrar</v-btn>
          </v-col>
        </v-row>
        <v-overlay :value="overlayCollect"
                    :dark="false"
                   >
          <collect :facturas = "selectedIds" ></collect>
          <v-card><v-btn  @click="overlayCollect = !overlayCollect">Volver</v-btn></v-card>
        </v-overlay>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>


import invoiceService from "@/services/invoiceService";
import Collect from "@/components/collect";

export default {
  name: "invoice",
  components: {Collect},
  props: ['Uid'],

  data: () => ({
    userInvoices: [],
    singleSelect: false,
    selected: [],
    selectedIds:[],
    title: '',
    overlayCollect: false,
    overlayAdd: false,
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
    showSelected(){
      let a=[]
      for(let i =0; i< this.selected.length; i++){

        a.push(this.selected[i])
      }
      this.selectedIds = a

      let b = JSON.parse(JSON.stringify(this.selectedIds))
      console.log(b)
    }
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
