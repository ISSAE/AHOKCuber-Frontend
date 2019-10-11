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
        <input class="form-control mb-3" type="text" placeholder="Addresse email" />
        <input class="form-control mb-3" type="text" placeholder="Mot de passe" />
        <button class="btn btn-block btn-primary">Se connecter</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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