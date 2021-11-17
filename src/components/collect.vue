<template>
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
</template>

<script>
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
    facturaC: {
      name: '',
      value: 0,
      days:0,
      tep: 0,
      d:0,
      netWorth:0,
      ValueYouGet: 0,
      tcea: 0,



    }
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
      return(Math.pow((v1/v2),(360/d)-1))
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
    cobrar(){
      for (let i =0; i < this.items.length; i++){
        this.facturaC.name = this.items[i].name
        this.facturaC.value = this.items[i].value
        this.facturaC.days = this.getDays(this.date, this.items[i].paidDate.toString())
        this.facturaC.tep=0
        this.facturaC.d=0
        this.facturaC.netWorth=0
        this.facturaC.ValueYouGet=0
        this.facturaC.tcea = 0
        //<td>{{calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[0].toFixed(7)}} %</td>
        //<td>{{calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[1].toFixed(7)}} %</td>
        //<td>{{calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[2]}}</td>
        //<td>{{ calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[3] }}</td>
        //<td>{{ calcTasaD(item.dueTo, item.value,date, item.paidDate.toString())[4].toFixed(7) }} %</td>
      }
    }


  },

  beforeMount() {
    this.parseData()
    console.log(this.facturas)
  }


}



</script>

<style scoped>

</style>
