<template>
  <div class="driver-my-profile-screen">
    <div class="header d-flex justify-content-between">
      <div>
        <router-link to="/">
          <i class="fa fa-arrow-left"></i>
        </router-link>
        <b style="margin-left: 12px">Mon profil</b>
      </div>
      <div @click="isEditMode = true">
        <i class="fa fa-edit fa-2x"></i>
      </div>
    </div>
    <div class="body">
      <div>
        <i class="fa fa-4x fa-car"></i>
      </div>
      <div v-if="driver" style="width: 100%">
        <input v-model="driver.username" class="form-control mb-3" type="text" :disabled="!isEditMode" placeholder="Nom d'utilisateur" />
        <input v-model="driver.password" class="form-control mb-3" type="password" :disabled="!isEditMode" placeholder="Mot de passe" />
        <input v-model="driver.first_name" class="form-control mb-3" type="text" :disabled="!isEditMode" placeholder="Prénom" />
        <input v-model="driver.last_name" class="form-control mb-3" type="text" :disabled="!isEditMode" placeholder="Nom" />
        <label for="homme" class="mr-3">
          <input v-model="driver.gender" value="male" :disabled="!isEditMode" id="homme" name="sex" type="radio" class="mb-3" /> Homme
        </label>
        <label for="femme" class="ml-3">
          <input v-model="driver.gender" value="female" :disabled="!isEditMode" id="femme" name="sex" type="radio" class="mb-3" /> Femme
        </label>
        <input v-model="driver.phone_number" class="form-control mb-3" :disabled="!isEditMode" type="text" placeholder="Numéro de téléphone" />
        <input v-model="driver.car_model" class="form-control mb-3" :disabled="!isEditMode" type="text" placeholder="Numéro de téléphone" />
        <input v-model="driver.car_registration_number" class="form-control mb-3" :disabled="!isEditMode" type="text" placeholder="Numéro de téléphone" />        
        <button @click="signOut" class="btn btn-danger btn-block" v-if="!isEditMode">Se déconnecter</button>
        <button @click="save" class="btn btn-primary btn-block" v-if="isEditMode">Sauvegarder</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthenticatedDriverAsync, updateDriverProfileAsync } from "@/api.js"; 
export default {
    data() {
        return {
            isEditMode: false,
            driver: null
        }
    },
    created() {
        getAuthenticatedDriverAsync().then(response => {
            if(response.body.status == 'success') {
                this.driver = response.body.driver;
            }
        });
    },
    methods: {
        signOut() {
            // todo
        },
        save() {
            updateDriverProfileAsync(this.driver)
            .then(response => {
                if(response.body.status == "success") {
                    alert("Profil mis à jour avec succès !");
                    this.isEditMode = false;
                }
            })
        }
    }
};
</script>

<style>
.driver-my-profile-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.driver-my-profile-screen .header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px;
  background: #c4c4c4;
  padding-top: 24px;
}
.driver-my-profile-screen .body {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  flex-grow: 1;
}
</style>