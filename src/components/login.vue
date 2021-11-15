<template>
  <body>
  <v-row>
    <v-col>
     <v-img src="../assets/dino.png"
            position="center"
            max-height="550px"
            contain
            class="logo">
     </v-img>
    </v-col>
    <v-col>

    <v-card v-if="login===true" class="logincard">
      <h1 class="purple--text px-16 mx-16 pt-5">Iniciar sesion</h1>
      <v-divider class="ma-5"></v-divider>
      <v-text-field class="px-16 mx-16 mt-10"
                    outlined
                    placeholder="Usuario"
                    v-model="email"
      ></v-text-field>
      <v-text-field class="px-16 mx-16 mt-3"
                    outlined
                    placeholder="Contraseña"
                    v-model="pwd"
                    type="password"
      ></v-text-field>
      <v-container class="align-center px-16 mx-16">
      <v-btn  v-on:click="ath" class="purple white--text"> Iniciar sesion</v-btn>
      </v-container>

      <v-container class="align-center px-16 mx-16">
        <v-btn v-on:click="changeLog"> Registrate</v-btn>
      </v-container>
    </v-card>

    <v-card v-if="login===false" class = logincard>
      <h1 class="purple--text px-16 mx-16 pt-5">Registrate</h1>
      <v-divider class="ma-5"></v-divider>
      <v-text-field v-model="item.name" class="px-16 mx-16 mt-10"
                    outlined
                    placeholder="Nombre"
      ></v-text-field>
      <v-text-field v-model="item.username" class="px-16 mx-16 mt-3"
                    outlined
                    placeholder="Nombre de usuario"
      ></v-text-field>
      <v-text-field v-model="item.password" class="px-16 mx-16 mt-3"
                    outlined
                    placeholder="Contraseña"
      ></v-text-field>

      <v-container class="align-center px-16 mx-16">
        <v-btn class="purple white--text" @click="createUser" > Registrar </v-btn>
      </v-container>

      <v-container class="align-center px-16 mx-16">
        <v-btn v-on:click="changeLog"> Volver</v-btn>
      </v-container>
    </v-card>

    </v-col>
  </v-row>
  </body>
</template>

<script>
import userServices from "@/services/userServices";

export default {
  name: "login",
  data: () => ({
    login: true,
    email: "",
    pwd: "",
    userdata: {},
    item: {
      userId: '',
      name: '',
      username: '',
      password: '',
    }
  }),
  methods:{
    changeLog(){
      this.login = !this.login
    },

    async retrieveUser(){
      await userServices.getByUsername(this.email).then((response) =>{
        console.log(this.email)
        this.userdata = response.data;
        console.log(this.userdata)

      }).catch(e => {
        console.log(e);
      })
    },
    async ath(){
      await this.retrieveUser()
      console.log(this.userdata.password)
      if(this.userdata.password === this.pwd ){
        console.log("piola")
        //await this.$router.push({path: `/homepage`})
        await this.$router.push({path: `/homepage/${this.userdata.userId}`})
      }
      else{
        console.log("incorrecto")
      }


    },
    createUser(){
      userServices.create(this.item)
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        })
      this.$router.push("/")
    }
  },

  mounted() {

  }

}

</script>

<style scoped>
body{
  margin: 0;
  padding: 0;
  height: 100%;
  background:linear-gradient(0deg, rgba(58, 27, 164, 0.3), rgba(58, 27, 164, 0.3)), url(https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
}

.logo{
  margin-top: 25%;
}
.logincard{
  margin-top: 25%;
  margin-right: 15%;
  justify-content: center;
}


</style>
