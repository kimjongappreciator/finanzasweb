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
           Fecha de pago
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
       </tr>
       </thead>
       <tbody>
       <tr
           v-for="item in items"
           :key="item.empresa"
       >
         <td>{{ item.empresa }}</td>
         <td>{{ item.valor }}</td>
         <td>{{ item.fechaemision }}</td>
         <td>{{ item.fechapago }}</td>
         <td>{{getDays(item.fechaemision.toString(), item.fechapago.toString())}}</td>
         <td>{{item.plazo}}</td>
         <td>{{calcTasaD(item.plazo, item.valor,item.fechaemision.toString(), item.fechapago.toString())[0].toFixed(7)}} %</td>
         <td>{{calcTasaD(item.plazo, item.valor,item.fechaemision.toString(), item.fechapago.toString())[1].toFixed(7)}} %</td>
         <td>{{item.valor}}</td>
         <td>{{ calcTasaD(item.plazo, item.valor,item.fechaemision.toString(), item.fechapago.toString())[2] }}</td>
       </tr>
       </tbody>


     </template>
   </v-simple-table>
   <v-row>
     <v-col cols="3">
       <v-select
           :items ="select"
           v-model="def"
           @change="setRate"

       >
       </v-select>

     </v-col>
     <v-col>
      <v-text-field placeholder="Tasa (%)" v-model="tasa" > </v-text-field>
     </v-col>
     <v-col>
       <v-text-field v-if="tna===true" placeholder="Capitalizacion (Dias)" v-model="cap" > </v-text-field>
     </v-col>
     <v-col>
        <v-text-field placeholder="Costos Extra" v-model="costos"></v-text-field>
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
    costos: ""

  }),
  methods:{
    parseData(){
      this.items = JSON.parse(JSON.stringify(this.facturas))

      //console.log('aqui')
      //console.log(this.items)
    },
    dateFormat(date){
      let newDate = date.split("/")
      let x = newDate[1] + '/' + newDate[0] + '/' + newDate[2]
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

    calcTasaD(plazo, monto, d1,d2){
      let dias = this.getDays(d1,d2)
      let cambio = 0
      let d = 0
      let t = 0
      let x = 0
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
        x = this.vNeto(monto, t) - this.costos
      if(this.dolares === true)
        cambio = 4
      else
        cambio = 1


      arr.push(x.toFixed(2)*cambio)

      return arr

    },
    setDolares(){
        this.dolares = !this.dolares
    }
  },

  beforeMount() {
    this.parseData()
  }


}



</script>

<style scoped>

</style>
