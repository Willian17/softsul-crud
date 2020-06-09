<template>
  <div class="branchesById">
    <div class="jumbotron">
      <h1 class="title text-info"><strong>{{branche.name}}</strong></h1>
      <p class="lead text-secondary"
      >{{branche.city}} | {{branche.address}}</p>
      <hr class="my-4" />
      <p>Email: <strong>{{branche.email}}</strong></p>
      <p>CNPJ: <strong>{{branche.CNPJ}}</strong></p>

      <router-link :to="'/alter-branche/' + branche.id" class="btn btn-warning"> Alterar</router-link>
      <button class="btn btn-danger ml-3" @click="remove"> Remover</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl , showError } from "@/global";
export default {
  data: function() {
    return {
      branche: {}
    };
  },
  methods: {
    getData() {
      axios(`${baseApiUrl}/branche/${this.branche.id}`).then(
        res => (this.branche = res.data)
      );
    },
    remove(){
      axios.delete(`${baseApiUrl}/branche/${this.branche.id}`)
      .then(()=> {
        this.$toasted.global.msgSuccess()
        this.$router.push({name:'branches'})
      })
      .catch(showError)
    }
  },
  mounted() {
    this.branche.id = this.$route.params.id;
    this.getData();
  }
};
</script>

<style>
@media (min-width: 200px) and (max-width: 767.98px) { 
  .title{
    font-size: 30px;
  }
 }
@media (min-width: 768px) {
  .title{
    font-size: 50px;
  }
 }
</style>