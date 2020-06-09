<template>
  <div class="auth">
    <div class="form-signin" >
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal text-warning" v-if="showSignup"> <i class="fa fa-user-plus"></i> Cadastro</h1>
        <h1 class="h3 mb-3 font-weight-normal text-primary" v-else><i class="fa fa-user"></i> Login</h1>
      </div>
      <div class="form-label-group" v-if="showSignup">
        <input
          type="text"
          id="inputName"
          class="form-control"
          placeholder="Nome"
          v-model="user.name"
          required
          autofocus
        />
        <label for="inputName">Nome</label>
      </div>
      <div class="form-label-group">
        <input
          type="email"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          v-model="user.email"
          required
          autofocus
        />
        <label for="inputEmail">Email</label>
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
        />
        <label for="inputPassword">Senha</label>
      </div>
      
      <div class="form-label-group" v-if="showSignup">
        <input
          type="password"
          id="inputConfirmPassword"
          placeholder="Confirmar senha"
          v-model="user.confirmPassword"
          class="form-control"
          required
        />
        <label for="inputConfirmPassword">Confirmar senha</label>
      </div>
      <div class="Signup" v-if="showSignup">
        <button class="btn btn-lg btn-warning btn-block" @click="signup">Inscrever</button>
        <span class="nav-sign" @click="alterSigninOrSignup">Já possui conta?</span>
      </div>
      <div class="signin" v-else>
        <button class="btn btn-lg btn-primary btn-block" @click="signin">Entrar</button>
        <span class="nav-sign" @click="alterSigninOrSignup">Não possui conta?</span>
      </div>
    </div>
  </div>
</template>

<script>
import {baseApiUrl , userKey , showError} from '@/global'
import axios from 'axios'

export default {
  data: function() {
    return {
      showSignup: false,
      user: {}
    };
  },
  methods: {
    alterSigninOrSignup() {
      this.showSignup = !this.showSignup;
      this.user = {}
    },
    signin(){
      axios.post(`${baseApiUrl}/signin` , this.user)
      .then(res => {
        this.$store.commit('setUser' , res.data)
        localStorage.setItem(userKey , JSON.stringify(res.data))
        this.$router.push({path: '/'})
      })
      .catch(showError)
    },
     signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.msgSuccess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    }
  }
};
</script>

<style>
.auth {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;
  padding: 0.75rem;
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; 
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; 
  transition: all 0.1s ease-in-out;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 12px;
  color: #777;
}
.nav-sign{
  color: #777;
  cursor: pointer;
 
}
.nav-sign:hover{
  color: #000;
}
</style>