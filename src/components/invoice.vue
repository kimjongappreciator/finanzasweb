<template>
  <v-row>
    <v-col cols="12">
      <v-card class="py=4 px=8 mb-2 rounded-lg d-flex">
        <v-card-title class="justify-center align-center font-weight-bold text-h4 deep-purple--text">Facturas
        </v-card-title>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>

        <v-data-table v-model="selected" :single-select="singleSelect" show-select :headers="headers" :items="userInvoices" item-key="company" @input="showSelected">
          <template v-slot:item.status="{item}">
            <v-chip :color="getColor(item.status)" dark>
              {{item.status}}
            </v-chip>
          </template>
          <v-template v-slot:top>
            <v-switch v-model="singleSelect" label="Single select"></v-switch>
          </v-template>
        </v-data-table>
        <v-row align="center" justify="center">
          <v-col class="justify-center" align="end">
            <v-btn  @click="overlayCollect = !overlayCollect"
                    outlined>Cobrar</v-btn>
          </v-col>
          <v-col class="justify-center">
              <v-btn @click="overlayAdd = !overlayAdd" outlined>
                Añadir Factura
              </v-btn>
          </v-col>
        </v-row>
        <v-overlay :value="overlayCollect"
                    :dark="false"
                   >
          <collect :facturas = "selectedIds" ></collect>

          <v-alert
              :value="alert"
              type="error">
            Por favor seleccione boletas que no esten cobradas.
          </v-alert>
          <v-row align="center" class="justify-center mt-5">
            <v-col align="center" class="justify-center">
              <v-btn  @click="overlayCollect = !overlayCollect"
                      outlined
                      color="deep-purple"
              >
                Atras
              </v-btn>
            </v-col>
          </v-row>
        </v-overlay>
        <v-overlay :value="overlayAdd"
                   :dark="false"
        >

          <v-alert
              :value="alert"
              type="error">
            Por favor seleccione boletas que no esten cobradas.
          </v-alert>
          <v-row align="center" class="justify-center mt-5">
            <v-col align="center" class="justify-center">
              <v-btn  @click="overlayAdd = !overlayAdd"
                      outlined
                      color="deep-purple"
              >
                Atras
              </v-btn>
            </v-col>
          </v-row>
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
      { text: 'Nombre de la Empresa', value: 'company', sortable:false},
      { text: 'RUC', value: 'ruc', sortable:false},
      { text: 'Monto', value: 'value', sortable:false},
      { text: 'Fecha de emision', value: 'emissionDate', sortable:false},
      { text: 'Fecha de pago', value: 'paidDate', sortable:false},
      { text: 'Estado', value: 'status', sortable: true},
    ],
    id: '',
    alert: false
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
        if (this.selected[i].status != "Cobrar" )
        {
          this.alert = true
          return
        }
        else {
        a.push(this.selected[i])
        }
      }
      this.alert = false
      this.selectedIds = a

      //let b = JSON.parse(JSON.stringify(this.selectedIds))
      console.log(a)
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
