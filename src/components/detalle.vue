<template>
<v-card>
  <v-card-text> Detalle de las facturas cobradas </v-card-text>

  <v-simple-table light>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Empresa
        </th>
        <th class="text-left">
          RUC
        </th>
        <th class="text-left">
          Dias Cobrados
        </th>

        <th class="text-left">
          Monto
        </th>
        <th class="text-left">
          Monto Obtenido
        </th>
        <th class="text-left">
          TEP
        </th>
        <th class="text-left">
          d
        </th>
        <th class="text-left">
          Valor neto
        </th>
        <th class="text-left">
          TCEA
        </th>

      </tr>
      </thead>
      <tbody>
      <tr
          v-for="bill in bills"
          :key="bill.company"
      >
        <td>{{ bill.company }}</td>
        <td>{{ bill.ruc }}</td>
        <td>{{ bill.days }}</td>
        <td>{{ bill.value }}</td>
        <td>{{bill.valueYouGet}}</td>
        <td>{{bill.tep}}%</td>
        <td>{{bill.d}} %</td>
        <td>{{bill.netWorth}} </td>
        <td>{{bill.tcea}}%</td>
        <td> <v-btn icon @click="deletebill(bill.paidBillId)"> <v-icon>mdi-delete</v-icon></v-btn></td>


      </tr>
      </tbody>


    </template>
  </v-simple-table>
</v-card>
</template>

<script>


import paidBillService from "@/services/paidBillService";

export default {
  name: "detalle",
  props:['Usid'],

  data: ()=>({
    bills: [],

  }),
  methods: {
    retrieveBills(){
      paidBillService.getByUserid(this.Usid).then((response) => {

        this.bills = response.data;
        console.log(response.data)
      }).catch(e => {
        console.log(e);
      })},

    deletebill(id){
      paidBillService.delete(id).then(console.log("success")).catch(e =>{
        console.log(e)
      })
      this.retrieveBills()
    }


  },
    mounted() {
    this.retrieveBills()
    }
}
</script>

<style scoped>

</style>
