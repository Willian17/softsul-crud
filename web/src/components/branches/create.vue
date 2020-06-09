<template>
  <div class="create">
    <h1 class="text-warning">Adicionar uma filial</h1>
    <hr class="my-4"/>
    <div>
      <div class="form-group">
        <label for="InputName">Nome</label>
        <input type="text" class="form-control" v-model="branche.name" id="InputName" required />
      </div>
      <div class="form-group">
        <label for="InputCity">Cidade</label>
        <input type="text" class="form-control" v-model="branche.city" id="InputCity" required />
      </div>
      <div class="form-group">
        <label for="InputCNPJ">CNPJ</label>
        <input type="text" class="form-control" v-model="branche.CNPJ" id="InputCNPJ" required />
      </div>
      <div class="form-group">
        <label for="InputAddress">Endereço</label>
        <input type="text" class="form-control" v-model="branche.address" id="InputAddress" required />
      </div>
      <div class="form-group">
        <label for="InputEmail">Email</label>
        <input type="email" class="form-control" v-model="branche.email" id="InputEmail" required />
      </div>
      <div class="form-group">
        <label for="InputLatitude">Latitude</label>
        <input
          type="number"
          step="any"
          class="form-control"
          v-model="branche.latitude"
          id="InputLatitude"
          required
        />
      </div>
      <div class="form-group">
        <label for="InputLongitude">Longitude</label>
        <input
          type="number"
          step="any"
          class="form-control"
          v-model="branche.longitude"
          id="InputLongitude"
          required
        />
      </div>

      <button @click="postBranche" class="btn btn-warning mb-3">Confirmar</button>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl , showError } from "@/global";
export default {
    data: function(){
        return{
            branche: {}
        }
    },
    methods: {
        postBranche(){
          if(this.branche.CNPJ) {
            this.branche.CNPJ =  this.branche.CNPJ.replace(/[^\d]+/g,'').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
          }
           axios.post(`${baseApiUrl}/branches` , this.branche)
           .then(()=> {
             this.branche = {}
              this.$toasted.global.msgSuccess()
             })
           .catch(showError)
        }
    }
};
</script>

<style>
.create{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
div.form-group{
  width: 500px;
}

@media (max-width: 767.98px) {
  div.form-group{
    width: 300px;
  }
}
</style>