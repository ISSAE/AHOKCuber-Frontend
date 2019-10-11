<template>
  <div class="register-screen">
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
          <input v-model="firstname" class="form-control mb-3" type="text" placeholder="Prénom" />
          <input v-model="lastname" class="form-control mb-3" type="text" placeholder="Nom" />
          <input v-model="phone" class="form-control mb-3" type="text" placeholder="Numéro de téléphone" />
          <input v-model="email" class="form-control mb-3" type="text" placeholder="Addresse email" />
          <input v-model="password" class="form-control mb-3" type="text" placeholder="Mot de passe" />
          <label for="homme" class="mr-3"><input v-model="sex" value="male" id="homme" name="sex" type="radio" class="mb-3"> Homme</label>
          <label for="femme" class="ml-3"><input  v-model="sex" value="female" id="femme" name="sex" type="radio" class="mb-3"> Femme</label>
        <button @click="register" class="btn btn-block btn-primary">Créer mon compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import { registerAsync } from '@/api';
export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            sex: "male"
        }
    },
    methods: {
        areInputsFilled(){
            return this.firstname && this.lastname && this.phone && this.email && this.password;
        },
        register() {
            if(this.areInputsFilled()) {
                let firstname = this.firstname;
                let lastname = this.lastname;
                let phone = this.phone;
                let email = this.email;
                let password = this.password;
                registerAsync({firstname, lastname, phone, email, password})
                .then(response => {
                    if(response.body.status === "success") {
                        alert("Compte créé avec succès ! Vous pouvez désormais vous connecter.");
                        this.$router.push("/login");
                    }
                });
                return "";
            }
            alert("Merci de remplir tous les champs !");
        }
    }
};
</script>

<style>

.register-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.register-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
}
.register-screen .body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
    flex-grow: 1;
}
</style>