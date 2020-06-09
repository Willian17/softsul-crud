<template>
  <div class="alter">
    <h1 class="text-primary">Alterar Filial</h1>
    <hr>
    <div>
      <div class="form-group">
        <label for="InputName">Nome</label>
        <input
          type="text"
          class="form-control"
          v-model="branche.name"
          id="InputName"
        />
      </div>
      <div class="form-group">
        <label for="InputCity">Cidade</label>
        <input
          type="text"
          class="form-control"
          v-model="branche.city"
          id="InputCity"
        />
      </div>
      <div class="form-group">
        <label for="InputCNPJ">CNPJ</label>
        <input
          type="text"
          class="form-control"
          v-model="branche.CNPJ"
          id="InputCNPJ"
        />
      </div>
      <div class="form-group">
        <label for="InputAddress">Endereço</label>
        <input
          type="text"
          class="form-control"
          v-model="branche.address"
          id="InputAddress"
        />
      </div>
      <div class="form-group">
        <label for="InputEmail">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="branche.email"
          id="InputEmail"
        />
      </div>
      <div class="form-group">
        <label for="InputLatitude">Latitude</label>
        <input
          type="number" step="any"
          class="form-control"
          v-model="branche.latitude"
          id="InputLatitude"
        />
      </div>
      <div class="form-group">
        <label for="InputLongitude">Longitude</label>
        <input
          type="number" step="any"
          class="form-control"
          v-model="branche.longitude"
          id="InputLongitude"
        />
      </div>
    
      <button type="submit" @click="putBranche" class="btn btn-primary mb-3">Confirmar</button>
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
    putBranche() {
       if(this.branche.CNPJ) {
           this.branche.CNPJ = this.branche.CNPJ.replace(/[^\d]+/g,'').replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
       }
      axios
        .put(`${baseApiUrl}/branche/${this.branche.id}`, this.branche)
        .then(() => {
           this.$toasted.global.msgSuccess();
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
.alter{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
div.form-group{
  width: 500px;
  
}
</style>