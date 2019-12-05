<template>
  <div class="login-screen">
    <div class="header">
      <router-link to="/">
        <i class="fa fa-arrow-left fa-2x"></i>
      </router-link>
    </div>
    <div class="body">
      <div>
        <i class="fa fa-4x fa-car"></i>
        <h1>CUBER</h1>
      </div>

      <div style="width: 100%">
        <input class="form-control mb-3" v-model="email" type="text" placeholder="Addresse email" />
        <input class="form-control mb-3" v-model="password" type="text" placeholder="Mot de passe" />
        <button class="btn btn-block btn-primary" @click="loginDriver">Se connecter en tant que conducteur</button>
        <button class="btn btn-block btn-primary" @click="loginClient">Se connecter en tant que client</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginDriverAsync, loginClientAsync } from "@/api.js";
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    loginDriver() {
      loginDriverAsync({email: this.email, password: this.password})
      .then(({body}) => {
        if(body.success) {  
          localStorage.setItem("user_type", "driver");
          localStorage.setItem("access_token", body.body.token);
          localStorage.setItem("user_profile", JSON.stringify(body.body.entity));
          alert("Connexion établie !");
          this.$router.push("/idle");
        } else {
          alert("Connexion échouée");
        }
      })
      .catch(() => {
        alert("Connexion échouée");
      });
    },
    loginClient() {
      loginClientAsync({email: this.email, password: this.password})
      .then(({body}) => {
        if(body.success) {  
          localStorage.setItem("user_type", "client");
          localStorage.setItem("access_token", body.body.token);
          localStorage.setItem("user_profile", JSON.stringify(body.body.entity));
          alert("Connexion établie !");
          this.$router.push("/where-to");
        } else {
          alert("Connexion échouée");
        }
      });
    }    
  }
};
</script>

<style>
.login-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.login-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
}
.login-screen .body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  flex-grow: 1;
}
</style>