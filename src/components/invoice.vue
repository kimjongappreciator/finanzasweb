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
          <v-col class="justify-center" align="center">
              <v-btn @click="overlayAdd = !overlayAdd" outlined>
                Añadir Factura
              </v-btn>
          </v-col>
          <v-col class="justify-center" align="left">
            <v-btn  @click="deleteBill"
                    outlined>Eliminar</v-btn>
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

          <v-card class="px-10">
            <v-card-text>Añadir</v-card-text>
            <v-divider></v-divider>
            <v-row>
              <v-col class="px-10">
                <v-text-field
                    label="Empresa"
                    placeholder="Ingrese empresa"
                    hint="For example, flowers or used cars"
                    v-model="item.company"
                ></v-text-field>
              </v-col>

              <v-col class="px-10">
                <v-text-field
                    label="RUC"
                    placeholder="Ingrese RUC de la empresa"
                    hint="For example, flowers or used cars"
                    v-model="item.ruc"
                ></v-text-field>
              </v-col>
              <v-col class="px-10">
                <v-text-field
                    label="Monto"
                    placeholder="Ingrese el monto de la factura"
                    hint="For example, flowers or used cars"
                    v-model="item.value"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols = 4>
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="Fecha de emision"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
              </v-col>

              <v-col cols = 4>
                <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="date2"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date2"
                        label="Fecha de pago"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date2"
                      no-title
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menu2 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu2.save(date2)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col class="px-10">
                <v-text-field
                    label="Periodo en dias"
                    placeholder="Ingrese el periodo de la factura"
                    hint="60 si es bimestre, 180 si es semestre"
                    v-model="item.dueTo"
                ></v-text-field>
              </v-col>
             </v-row>
            <v-row>
              <v-col class="px-10">
                <v-text-field
                    label="Estado"
                    placeholder="Ingrese el estado de la factura"
                    hint="Vencido, Cobrar, Cobrado"
                    v-model="item.status"
                ></v-text-field>
                </v-col>
            </v-row>
          </v-card>

          <v-row align="center" class="justify-center mt-5">
            <v-col align="center" class="justify-center">
              <v-btn  @click="overlayAdd = !overlayAdd"
                      outlined
                      color="deep-purple"
              >
                Atras
              </v-btn>
            </v-col>
            <v-col align="center" class="justify-center">
              <v-btn  @click="addInvoice"
                      outlined
                      color="deep-purple"
              >
                Añadir
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
    alert: false,
    item: {
      company: '',
      dueTo: '',
      emissionDate: '',
      paidDate: '',
      ruc: '',
      status: '',
      userId: '',
      value: ''
    },
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu2: false
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
    deleteBill(){
      let a = this.selected[0].billId
      invoiceService.delete(a).then(console.log(a)).catch(e => {
        console.log(e)
      })
    },
    addInvoice(){
      this.item.userId=this.id
      this.item.emissionDate = this.date
      this.item.paidDate = this.date2
      console.log(this.item)

      invoiceService.create(this.item).then(() => {
      })
          .catch(e => {
            console.log(e);
          })

      this.overlayAdd = !this.overlayAdd

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
