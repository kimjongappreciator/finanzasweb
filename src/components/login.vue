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
                    placeholder="Email"
      ></v-text-field>
      <v-text-field class="px-16 mx-16 mt-3"
                    outlined
                    placeholder="Contraseña"
      ></v-text-field>
      <v-container class="align-center px-16 mx-16">
      <v-btn  to="/homepage" class="purple white--text"> Iniciar sesion</v-btn>
      </v-container>

      <v-container class="align-center px-16 mx-16">
        <v-btn onclick="this.changeLog()"> Registrate</v-btn>
      </v-container>
    </v-card>

    <v-card v-if="login===false" class = logincard>
      <h1 class="purple--text px-16 mx-16 pt-5">Registrate</h1>
      <v-divider class="ma-5"></v-divider>
      <v-text-field class="px-16 mx-16 mt-10"
                    outlined
                    placeholder="Email"
      ></v-text-field>
      <v-text-field class="px-16 mx-16 mt-3"
                    outlined
                    placeholder="Contraseña"
      ></v-text-field>

      <v-btn  to="/home" class="purple white--text px-5 ma-15 "> Iniciar sesion</v-btn>

      <router-link to="/home"> <v-btn> Registrarse</v-btn></router-link>
    </v-card>

    </v-col>
  </v-row>
  </body>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    login: true,

  }),
  methods:{
    changeLog(){
      this.login = !this.login
    }

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
