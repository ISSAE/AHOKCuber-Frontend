<template>
  <div class="register-driver-screen">
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
        <input v-model="username" class="form-control mb-3" type="text" placeholder="username" />
        <input v-model="password" class="form-control mb-3" type="text" placeholder="Mot de passe" />
        <input v-model="first_name" class="form-control mb-3" type="text" placeholder="Prénom" />
        <input v-model="last_name" class="form-control mb-3" type="text" placeholder="Nom" />
        <input
          v-model="phone_number"
          class="form-control mb-3"
          type="text"
          placeholder="Numéro de téléphone"
        />
        <label for="homme" class="mr-3">
          <input v-model="gender" value="male" id="homme" name="gender" type="radio" class="mb-3" /> Homme
        </label>
        <label for="femme" class="ml-3">
          <input v-model="gender" value="female" id="femme" name="gender" type="radio" class="mb-3" /> Femme
        </label>
        <input
          v-model="car_model"
          class="form-control mb-3"
          type="text"
          placeholder="Modèle de vehicule"
        />
        <input
          v-model="car_registration_number"
          class="form-control mb-3"
          type="text"
          placeholder="Numéro de plaque d'immatriculation"
        />
        <button @click="register" class="btn btn-block btn-primary">Créer mon compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import { registerDriverAsync } from "@/api";
export default {
  data() {
    return {
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
      gender: "male",
      car_model: "",
      car_registration_number: ""
    };
  },
  methods: {
    areInputsFilled() {
      return (
        this.first_name &&
        this.last_name &&
        this.phone_number &&
        this.password &&
        this.username &&
        this.car_model &&
        this.car_registration_number
      );
    },
    register() {
      if (this.areInputsFilled()) {
        const payload = {};
        payload.username = this.username;
        payload.first_name = this.first_name;
        payload.last_name = this.last_name;
        payload.phone_number = this.phone_number;
        payload.password = this.password;
        payload.gender = this.gender;
        payload.car_model = this.car_model;
        payload.car_registration_number = this.car_registration_number;
        registerDriverAsync(payload).then(
          response => {
            if (response.body.status === "success") {
              alert(
                "Compte créé avec succès ! Vous pouvez désormais vous connecter."
              );
              this.$router.push("/login");
            }
          }
        );
        return "";
      }
      alert("Merci de remplir tous les champs !");
    }
  }
};
</script>

<style>
.register-driver-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.register-driver-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
}
.register-driver-screen .body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  flex-grow: 1;
}
</style>