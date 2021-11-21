<template>
  <v-container>
 <v-card class="pa-15">
   <v-card-title>Hola</v-card-title>
   <v-simple-table light>
     <template v-slot:default>
       <thead>
       <tr>
         <th class="text-left">
           Nombre
         </th>
         <th class="text-left">
           Monto
         </th>
         <th class="text-left">
           Fecha de emision
         </th>
         <th class="text-left">
           Fecha de vencimiento
         </th>
         <th class="text-left">
           Dias calculados
         </th>
         <th class="text-left">
           Periodo (en dias)
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
           Valor que obtienes
         </th>
         <th class="text-left">
           TCEA
         </th>
       </tr>
       </thead>
       <tbody>
       <tr
           v-for="item in items"
           :key="item.company"
       >
         <td>{{ item.company }}</td>
         <td>{{ item.value }}</td>
         <td>{{ item.emissionDate }}</td>
         <td>{{ item.paidDate }}</td>
         <td>{{getDays(date, item.paidDate.toString())}}</td>
         <td>{{item.dueTo}}</td>
         <td>{{calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[0].toFixed(7)}} %</td>
         <td>{{calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[1].toFixed(7)}} %</td>
         <td>{{calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[2]}}</td>
         <td>{{ calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[3] }}</td>
         <td>{{ calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[4].toFixed(7) }} %</td>

       </tr>
       </tbody>


     </template>
   </v-simple-table>
   <v-row>
     <v-col cols="2">
       <v-select
           :items ="select"
           v-model="def"
           @change="setRate"

       >
       </v-select>

     </v-col>
     <v-col class="px-10">
      <v-text-field placeholder="Tasa (%)" v-model="tasa" > </v-text-field>
     </v-col>
     <v-col>
       <v-text-field v-if="tna===true" placeholder="Capitalizacion (Dias)" v-model="cap" > </v-text-field>
     </v-col>
     <v-col>
        <v-text-field placeholder="Costos iniciales" v-model="costos"></v-text-field>
     </v-col>
     <v-col>
       <v-text-field placeholder="Retencion" v-model="retencion"></v-text-field>
     </v-col>
   </v-row>
   <v-row>
     <v-col cols="2">
       <v-select
           :items ="selectM"
           v-model="defM"
           @change="setDolares"

       ></v-select>
     </v-col>

     <v-col cols ="4">
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
             label="Fecha de pago"
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

   </v-row>
 </v-card>
    <v-row class="pt-10">
      <v-col align="center" class="justify-center">
        <v-btn @click="Cobrarfunc"
              >
          Cobrar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import paidBillService from "@/services/paidBillService";
import invoiceService from "@/services/invoiceService";

export default {
  name: "collect",
  props:['facturas'],

  data:()=>({
    items: [],
    tna: false,
    select:['Tasa Nominal', 'Tasa Efectiva'],
    selectM:['Soles', 'Dolares'],
    def:'Tasa Efectiva',
    dias: [],
    tasa: "",
    cap: "" ,
    dolares: false,
    defM: 'Soles',
    costos: "",
    retencion: "",
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,


  }),
  methods:{
    parseData(){

      this.items = JSON.parse(JSON.stringify(this.facturas))

      console.log('aqui')
      console.log(this.facturas[0])
    },
    dateFormat(date){
      let newDate = date.split("-")
      let x = newDate[1] + '/' + newDate[2] + '/' + newDate[0]
      //console.log(x)
      return x
    },

    getDays(f1,f2){
      let f2d = new Date(this.dateFormat(f2))
      let f1d = new Date(this.dateFormat(f1))
      const diffTime = Math.abs(f2d - f1d);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //console.log(diffTime + " milliseconds");
      //console.log(diffDays + " days");
      //console.log(f2)
      //console.log(f1)

      return  diffDays
    },
    setRate(){
      this.tna=!this.tna
    },
    tn(plazo, capitalizacion){

      let m = plazo/capitalizacion
      let n = 1/capitalizacion
      let ntasa = this.tasa/100
      let ted = (Math.pow(1+(ntasa/m), n)-1)
      //console.log(ted)
      return ted
    },
    tefe(dias, plazo){
      let ntasa = this.tasa/100
      let ted = (Math.pow((1+ntasa),(dias/plazo)))-1
      //console.log(ted)
      return ted
    },
    tep(d){
      let t = d/(1+d)
      return t
    },

    vNeto(monto, t){
      let nmonto = monto * t
      return monto-nmonto
    },
    tcea(v1,v2,d){
      return(Math.pow((v1/v2),(360/d))-1)
    },

    calcTasaD(plazo, monto, d1,d2){
      let dias = this.getDays(d1,d2)

      let cambio = 0
      let d = 0
      let t = 0
      let x = 0
      let z = 0
      let tc = 0
      let arr = []
        if(this.tna === true){
          d = this.tn(plazo, this.cap)
          arr.push(d)
        }
        else{
          d= this.tefe(dias, plazo)
          arr.push(d*100)
        }
        t = this.tep(d)
        arr.push(t*100)
        x = this.vNeto(monto, t)
        z = this.vNeto(monto, t) - this.costos - this.retencion
      if(this.dolares === true)
        cambio = 4
      else
        cambio = 1

      tc = this.tcea(monto, z, dias)

      arr.push(x.toFixed(2)*cambio)
      arr.push(z.toFixed(2)*cambio)
      arr.push(tc*100)

      return arr

    },
    setDolares(){
        this.dolares = !this.dolares
    },
    cobrar(item){
        let x = { }
        x.company = item.company
        x.d=parseFloat(this.calcTasaD(item.dueTo, item.value,this.date, item.paidDate.toString())[1].toFixed(7))
        x.days = parseInt(this.getDays(this.date, item.paidDate.toString()))
        x.netWorth=parseFloat(this.calcTasaD(item.dueTo, item.value,this.date, item.paidDate.toString())[2].toFixed(7))
        x.ruc = item.ruc
        x.tcea = parseFloat(this.calcTasaD(item.dueTo, item.value,this.date, item.paidDate.toString())[4].toFixed(7))
        x.tep= parseFloat(this.calcTasaD(item.dueTo, item.value,this.date, item.paidDate.toString())[0].toFixed(7))
        x.userId = item.user.userId
        x.value = parseFloat(item.value)
        x.valueYouGet= parseFloat(this.calcTasaD(item.dueTo, item.value,this.date, item.paidDate.toString())[3].toFixed(7))


        return x
      },


    Cobrarfunc(){
      let array = []
      let x = { }

      for(let i=0; i<this.items.length; i++){
          array.push(this.cobrar(this.items[i]))
        }
      for(let j = 0; j <array.length; j++){
         console.log(array[j])
          x = array[j]
          console.log(x)
         paidBillService.create(x)
             .then(() => {
         })
             .catch(e => {
               console.log(e);
             })
       }

      let patch= {
        status: 'Cobrado'
      }


      for (let k = 0; k < array.length; k++){
        console.log(this.items[k].billId)
        invoiceService.patch(this.items[k].billId, patch).
        then(()=>{

        }).
        catch(e => {
          console.log(e)
        })
      }


    },




  },

  beforeMount() {
    this.parseData()
    console.log(this.facturas)
  }


}



</script>

<style scoped>

</style>
