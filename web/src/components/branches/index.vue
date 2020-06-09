<template>
  <div class="getBranches">
    <h1 class="mt-3 mb-3 title text-success">Filiais</h1>
    <router-link class="btn btn-success mt-3 mb-3" to="/create-branche"> <i class="fa fa-plus-square"></i> Filial</router-link>
    
    <table class="table table-striped table-md table-hover">
      <thead >
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Cidade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="branche in branches" :key="branche.id">
          <th scope="row">{{branche.id}}</th>
          <td>
            <router-link class="nav-link" :to="{name: 'infoBranche' , params: { id: branche.id}}">{{branche.name}}</router-link>
          </td>
          <td>{{branche.city}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
import { mapState } from "vuex";

export default {
  data: function(){
    return{
      vazio: true
    }
  },
  computed: mapState(["branches"]),
  methods: {
    getBranches() {
      axios
        .get(`${baseApiUrl}/branches`)
        .then(res => this.$store.commit("setBranches", res.data));
    }
  },
  mounted() {
    this.getBranches();
  }
};
</script>

<style>

</style>