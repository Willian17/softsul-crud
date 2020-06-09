<template>
  <header class="header" v-if="user">
    <nav class="navbar navbar-light sticky-top flex-nowrap  shadow" style="background-color: #A0D334">
      <router-link class="navbar-brand col-3 col-lg-2 mr-1 px-3" to="/"><img src="@/assets/logo.png" alt="logo"></router-link>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        id="pe"
        @change="search"
        placeholder="Pesquisar"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <span class="nav-link" @click="logout">Sair</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import axios from 'axios'
import {baseApiUrl , userKey} from '@/global'
import {mapState} from 'vuex'

export default {
    computed: mapState(['user']),
    methods: {
        search(event){
            const value = event.target.value
             axios.get(`${baseApiUrl}/search-branches?search=${value}`)
             .then(res => this.$store.commit("setBranches" , res.data))
        },
        logout() {
        localStorage.removeItem(userKey);
        this.$store.commit("setUser", null);
        this.$router.push({name: "Auth"})
      }
    }
};
</script>

<style>
header.header {
  grid-area: header;
}
span.nav-link{
    cursor: pointer;
}

</style>