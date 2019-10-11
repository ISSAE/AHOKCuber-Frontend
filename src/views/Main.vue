<template>
  <div class="main-screen">
    <div>
      <i class="fa fa-4x fa-car"></i>
            <h1>CUBER</h1>
    </div>

    <div style="width: 80%">
      <router-link class="btn btn-block" style="background-color: white" to="/login">
      Se connecter
      </router-link>
      <router-link class="btn btn-block btn-primary" to="/register">
      Créer un compte
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.main-screen {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
</style>